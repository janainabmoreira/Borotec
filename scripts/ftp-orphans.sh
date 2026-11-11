#!/usr/bin/env bash
# Lista (SÓ LEITURA — não apaga nada) as pastas do servidor que não
# correspondem a nenhuma rota pré-renderizada em dist/. Sobras de builds
# antigos (ex.: /categorias/, produtos renomeados) continuam respondendo 200 e
# o .htaccess não consegue redirecioná-las, porque o mod_dir responde antes.
#
# Uso (no CI, depois do build): FTP_SERVER FTP_USERNAME FTP_PASSWORD FTP_DIR
set -uo pipefail

source "$(dirname "$0")/ftp-base.sh"
if ! resolve_ftp_base; then
  echo "::warning::Pasta do site não encontrada no FTP — listagem não feita."
  exit 0
fi
BASE="$FTP_BASE"
MAX_DEPTH=5
# Pastas que não são rotas: assets do build e imagens estáticas de public/.
SKIP_RE='^(assets|blog/.*\.(webp|png|jpe?g)|\.well-known|cgi-bin)'

expected=$(cd dist && find . -name index.html -printf '%h\n' | sed 's#^\./\?##' | grep -v '^$' | sort -u)

list_dirs() {
  local rel=$1 depth=$2
  [ "$depth" -gt "$MAX_DEPTH" ] && return
  curl -sS --connect-timeout 20 "${FTP_OPTS[@]}" --user "$FTP_USERNAME:$FTP_PASSWORD" "$BASE$rel" 2>/dev/null \
    | tr -d '\r' | awk '/^d/ { name=$NF; if (name != "." && name != "..") print name }' \
    | while IFS= read -r name; do
        local child="${rel}${name}/"
        echo "${child%/}"
        list_dirs "$child" $((depth + 1))
      done
}

server=$(list_dirs "" 1 | grep -Ev "$SKIP_RE" | sort -u)

if [ -z "$server" ]; then
  echo "::warning::Não foi possível listar as pastas do servidor (nenhuma encontrada)."
  exit 0
fi

orphans=$(comm -23 <(echo "$server") <(echo "$expected"))
echo "Pastas no servidor: $(echo "$server" | wc -l) | rotas no build: $(echo "$expected" | wc -l)"
if [ -n "$orphans" ]; then
  echo "Pastas no servidor SEM rota correspondente (não foram apagadas):"
  echo "$orphans" | sed 's#^#  /#; s#$#/#'
else
  echo "Nenhuma pasta sobrando."
fi
