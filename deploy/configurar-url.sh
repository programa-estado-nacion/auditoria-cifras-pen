#!/usr/bin/env bash
# Equivalente de configurar-url.ps1 para macOS y Linux.
# Genera manifest-produccion.xml a partir de manifest.prod.xml con la URL indicada.
# Uso:  ./configurar-url.sh https://aguero-pen.github.io/auditoria-cifras-pen
set -euo pipefail
[ $# -eq 1 ] || { echo "Uso: $0 <url-base>"; exit 1; }
url="${1%/}"
dir="$(cd "$(dirname "$0")" && pwd)"
sed "s|__BASE_URL__|${url}|g" "$dir/manifest.prod.xml" > "$dir/manifest-produccion.xml"
echo "Listo. Manifiesto generado en: $dir/manifest-produccion.xml"
echo "Base usada: $url"
