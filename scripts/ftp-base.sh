#!/usr/bin/env bash
# Descobre COMO conectar no FTP e ONDE está a raiz do site. Usado pelo deploy
# e pela listagem de pastas órfãs:
#   source scripts/ftp-base.sh
#   resolve_ftp_base || exit 1     # define FTP_BASE e FTP_OPTS (array)
#   curl "${FTP_OPTS[@]}" ... "$FTP_BASE<arquivo>"
#
# Testa as variações de conexão abaixo, na ordem, e em cada uma as pastas:
#   1. a própria pasta de login ("./") — o FileZilla cai direto em /www;
#   2. FTP_DIR relativo (ex.: "www/");
#   3. FTP_DIR absoluto (ex.: "/www/" → "%2Fwww/").
# Fica com a PRIMEIRA combinação cuja listagem tenha index.html E assets/.
# Sem isso, retorna 1 e nada deve ser enviado.
# Exige FTP_SERVER, FTP_USERNAME, FTP_PASSWORD; FTP_DIR é opcional.

# rótulo|opções do curl. Todas as variações com TLS vêm ANTES das sem
# criptografia: o FTP simples só é usado se nenhuma com TLS funcionar.
FTP_VARIANTS=(
  "TLS explícito · passivo · IPv4|--ipv4 --ftp-pasv --ssl-reqd"
  "TLS explícito sem validar certificado · passivo · IPv4|--ipv4 --ftp-pasv --ssl-reqd --insecure"
  "TLS explícito · passivo · IPv6|--ipv6 --ftp-pasv --ssl-reqd"
  "TLS explícito · ativo · IPv4|--ipv4 --ftp-port - --ssl-reqd"
  "FTP simples (SEM criptografia) · passivo · IPv4|--ipv4 --ftp-pasv"
  "FTP simples (SEM criptografia) · ativo · IPv4|--ipv4 --ftp-port -"
)

ftp_dir_candidates() {
  local dir="${FTP_DIR:-}"
  dir="${dir#./}"
  dir="${dir#/}"
  [ -n "$dir" ] && [ "${dir%/}" = "$dir" ] && dir="$dir/"
  echo ""
  if [ -n "$dir" ]; then
    echo "$dir"
    echo "%2F$dir"
  fi
}

resolve_ftp_base() {
  FTP_BASE=""
  FTP_OPTS=()
  local v label opts c url listing rc errf
  errf=$(mktemp)
  for v in "${FTP_VARIANTS[@]}"; do
    label="${v%%|*}"
    read -r -a opts <<<"${v#*|}"
    while IFS= read -r c; do
      url="ftp://$FTP_SERVER/$c"
      listing=$(curl -sS --connect-timeout 15 --max-time 40 "${opts[@]}" \
        --user "$FTP_USERNAME:$FTP_PASSWORD" --list-only "$url" 2>"$errf")
      rc=$?
      listing=$(tr -d '\r' <<<"$listing" | sort)
      if grep -qx 'index.html' <<<"$listing" && grep -qx 'assets' <<<"$listing"; then
        FTP_BASE="$url"
        FTP_OPTS=("${opts[@]}")
        echo "::notice title=Conexão FTP escolhida::$label | pasta: ${c:-./ (pasta de login)}" >&2
        echo "Conteúdo da pasta:" >&2
        sed 's/^/  /' <<<"$listing" >&2
        rm -f "$errf"
        return 0
      fi
      echo "Descartada: $label | pasta: ${c:-./} | curl=$rc | itens=$(grep -c . <<<"$listing") | $(tail -1 "$errf")" >&2
    done < <(ftp_dir_candidates)
  done
  rm -f "$errf"
  return 1
}
