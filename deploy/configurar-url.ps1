# Genera manifest-produccion.xml a partir de manifest.prod.xml, insertando tu URL.
# Uso:  .\configurar-url.ps1 -Url "https://programa-estado-nacion.github.io/auditoria-cifras-pen"
param([Parameter(Mandatory=$true)][string]$Url)
$Url = $Url.TrimEnd('/')
$src = Join-Path $PSScriptRoot 'manifest.prod.xml'
$dst = Join-Path $PSScriptRoot 'manifest-produccion.xml'
(Get-Content $src -Raw) -replace '__BASE_URL__', $Url | Set-Content $dst -Encoding UTF8
Write-Host "Listo. Manifiesto generado en: $dst"
Write-Host "Base usada: $Url"
