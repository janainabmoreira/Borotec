#!/usr/bin/env bash
# Descobre a pasta raiz do site no FTP. Usada pelo deploy e pela listagem de
# pastas órfãs (source scripts/ftp-base.sh; BASE=$(resolve_ftp_base)).
#
# Tenta, nesta ordem, e usa a primeira que tiver index.html E assets/:
#   1. a própria pasta de login ("./") — na KingHost o usuário FTP já entra
#      na raiz do site (/www no FileZilla);
#   2. FTP_DIR relativo à pasta de login (ex.: "www/");
#   3. FTP_DIR absoluto (ex.: "/www/", que no curl é "%2Fwww/").
# Imprime a URL escolhida em stdout; o resto (diagnóstico) vai para stderr.
# Exige FTP_SERVER, FTP_USERNAME, FTP_PASSWORD; FTP_DIR é opcional.

resolve_ftp_base() {
  local dir="${FTP_DIR:-}"
  dir="${dir#./}"
  dir="${dir#/}"
  [ -n "$dir" ] && [ "${dir%/}" = "$dir" ] && dir="$dir/"

  local candidates=("")
  if [ -n "$dir" ]; then
    candidates+=("$dir" "%2F$dir")
  fi

  local c url listing label
  for c in "${candidates[@]}"; do
    url="ftp://$FTP_SERVER/$c"
    label="${c:-./ (pasta de login)}"
    listing=$(curl -sS --connect-timeout 20 --user "$FTP_USERNAME:$FTP_PASSWORD" --list-only "$url" 2>/dev/null | tr -d '\r' | sort) || listing=""
    if grep -qx 'index.html' <<<"$listing" && grep -qx 'assets' <<<"$listing"; then
      echo "Pasta do site no FTP: $label" >&2
      echo "Conteúdo:" >&2
      sed 's/^/  /' <<<"$listing" >&2
      echo "$url"
      return 0
    fi
    echo "Descartada: $label (não tem index.html e assets/)" >&2
    if [ -z "$c" ]; then
      echo "  conteúdo da pasta de login: $(tr '\n' ' ' <<<"${listing:-(vazia ou sem acesso)}")" >&2
    fi
  done
  return 1
}
