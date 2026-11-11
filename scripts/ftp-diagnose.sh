#!/usr/bin/env bash
# DIAGNÓSTICO TEMPORÁRIO do FTP (só leitura). Para cada variação de conexão
# de scripts/ftp-base.sh, mostra a conversa completa do curl -v na pasta de
# login: TLS, login, PWD (pasta em que o login caiu) e a listagem.
# O GitHub mascara usuário e senha (são secrets) no log.
# Remover quando o deploy automático estiver estável.
set -uo pipefail
source "$(dirname "$0")/ftp-base.sh"

for v in "${FTP_VARIANTS[@]}"; do
  label="${v%%|*}"
  read -r -a opts <<<"${v#*|}"
  echo "::group::$label  (curl ${opts[*]})"
  # curl envia PWD sozinho logo após o login; a resposta 257 é a pasta atual.
  curl -v --connect-timeout 15 --max-time 40 "${opts[@]}" \
    --user "$FTP_USERNAME:$FTP_PASSWORD" --list-only "ftp://$FTP_SERVER/" 2>&1 \
    | grep -vE '^\* +(CAfile|CApath|ALPN)|^\{ \[|^\} \[' | head -80
  echo "exit=${PIPESTATUS[0]}"
  echo "::endgroup::"
done
exit 0
