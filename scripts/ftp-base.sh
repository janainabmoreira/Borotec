#!/usr/bin/env bash
# Descobre COMO conectar no FTP e ONDE está a raiz do site. Usado pelo deploy:
#   source scripts/ftp-base.sh
#   resolve_ftp_base || exit 1     # define FTP_BASE e FTP_OPTS (array)
#   curl "${FTP_OPTS[@]}" --user ... "$FTP_BASE<arquivo>"
#
# O que se sabe do servidor (KingHost, diagnóstico de 10/11/2026):
# - o login já cai na raiz do site (/www no FileZilla), mas PWD dá 550 e
#   NLST/LIST da pasta atual dá "450 /www: No such file or directory" — por
#   isso a trava NÃO usa listagem, e sim SIZE/MDTM (curl -I) em arquivos que
#   só existem na raiz: index.html, robots.txt e sitemap.xml;
# - o certificado TLS é o genérico "*.kinghost.net", não ftp.borotec.com.br:
#   a 1ª variação conecta no IP de FTP_SERVER mas valida o certificado por um
#   nome sob *.kinghost.net (--connect-to). --insecure fica só como reserva;
# - IPv6 não existe nos runners do GitHub e o modo ativo não funciona.
#
# Exige FTP_SERVER, FTP_USERNAME, FTP_PASSWORD; FTP_DIR é opcional.

# Qualquer nome coberto por *.kinghost.net serve: o certificado é validado
# por ele (cadeia GlobalSign), e --connect-to manda a conexão para FTP_SERVER.
FTP_TLS_NAME="ftp-borotec.kinghost.net"

# Define V_LABEL, V_HOST e V_OPTS da variação $1; retorna 1 depois da última.
# Ordem: TLS validado → TLS sem validar (reserva) → FTP sem criptografia.
ftp_variant() {
  case "$1" in
    0) V_LABEL="TLS explícito · certificado VALIDADO (*.kinghost.net) · passivo · IPv4"
       V_HOST="$FTP_TLS_NAME"
       V_OPTS=(--ipv4 --ftp-pasv --ssl-reqd --connect-to "$FTP_TLS_NAME:21:$FTP_SERVER:21") ;;
    1) V_LABEL="TLS explícito · certificado NÃO validado (--insecure, reserva) · passivo · IPv4"
       V_HOST="$FTP_SERVER"
       V_OPTS=(--ipv4 --ftp-pasv --ssl-reqd --insecure) ;;
    2) V_LABEL="FTP simples · SEM criptografia (último recurso) · passivo · IPv4"
       V_HOST="$FTP_SERVER"
       V_OPTS=(--ipv4 --ftp-pasv) ;;
    *) return 1 ;;
  esac
}

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

# Tamanho (bytes) de um arquivo no servidor via SIZE; vazio se não existir.
ftp_size() {
  curl -sS --connect-timeout 15 --max-time 40 -I "${FTP_OPTS[@]}" \
    --user "$FTP_USERNAME:$FTP_PASSWORD" "$FTP_BASE$1" 2>/dev/null \
    | tr -d '\r' | awk -F': ' 'tolower($1)=="content-length" {print $2}'
}

resolve_ftp_base() {
  FTP_BASE=""
  FTP_OPTS=()
  local i=0 c f ok
  while ftp_variant "$i"; do
    while IFS= read -r c; do
      FTP_BASE="ftp://$V_HOST/$c"
      FTP_OPTS=("${V_OPTS[@]}")
      ok=1
      for f in index.html robots.txt sitemap.xml; do
        if [ -z "$(ftp_size "$f")" ]; then ok=0; break; fi
      done
      if [ "$ok" = 1 ]; then
        echo "::notice title=Conexão FTP escolhida::$V_LABEL | pasta: ${c:-./ (pasta de login)}" >&2
        return 0
      fi
      echo "Descartada: $V_LABEL | pasta: ${c:-./} | sem $f (SIZE)" >&2
    done < <(ftp_dir_candidates)
    i=$((i + 1))
  done
  FTP_BASE=""
  FTP_OPTS=()
  return 1
}

# Grava e apaga .deploy-test na pasta escolhida. Confirma que STOR funciona e
# que a transferência é binária (TYPE I) antes do upload real.
ftp_write_test() {
  local tmp out rc
  tmp=$(mktemp)
  printf 'teste de escrita do deploy\r\nlinha 2\n' > "$tmp"
  out=$(curl -sS -v --connect-timeout 15 --max-time 40 "${FTP_OPTS[@]}" \
    --user "$FTP_USERNAME:$FTP_PASSWORD" -T "$tmp" "${FTP_BASE}.deploy-test" \
    --quote "-DELE .deploy-test" 2>&1)
  rc=$?
  rm -f "$tmp"
  echo "$out" | grep -E '^[<>] (TYPE|STOR|DELE|2[0-9][0-9] |5[0-9][0-9] |4[0-9][0-9] )' | grep -v PASS >&2
  if [ "$rc" -ne 0 ]; then
    echo "::error::Teste de gravação (.deploy-test) falhou: curl=$rc" >&2
    return 1
  fi
  if ! grep -q '^> TYPE I' <<<"$out"; then
    echo "::error::Teste de gravação não usou modo binário (TYPE I)" >&2
    return 1
  fi
  echo "Teste de gravação OK (.deploy-test enviado em TYPE I e apagado)." >&2
}
