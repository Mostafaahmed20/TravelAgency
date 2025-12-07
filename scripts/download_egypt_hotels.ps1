# Downloads hotel-specific images into public/images/egyptHotel
# Edit the URLs below to match each hotel's official/royalty-free image.
# Ensure licensing compliance for any source you use.

$ErrorActionPreference = 'Stop'

$root = Join-Path (Split-Path $PSScriptRoot -Parent) 'public/images/egyptHotel'
If (!(Test-Path $root)) { New-Item -ItemType Directory -Path $root | Out-Null }

# Map hotel image filenames to source URLs (1920px wide recommended)
$hotels = @{
  'four-seasons-cairo-nile-plaza.jpg'       = 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'intercontinental-cairo-semiramis.jpg'    = 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'zamalek-nile-view.jpg'                   = 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'fairmont-nile-city.jpg'                  = 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'sofitel-cairo-nile-el-gezirah.jpg'       = 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'hilton-cairo-zamalek-residences.jpg'     = 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920';
}

Write-Host "Downloading Egypt hotel images to" $root -ForegroundColor Cyan

foreach ($kvp in $hotels.GetEnumerator()) {
  $fileName = $kvp.Key
  $url = $kvp.Value
  $outPath = Join-Path $root $fileName

  Write-Host "→" $fileName "from" $url -ForegroundColor Green
  try {
    Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing
  } catch {
    Write-Warning "Failed to download $fileName from $url. Using placeholder."
    $placeholder = @"
<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'>
  <rect width='100%' height='100%' fill='#1F2937'/>
  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='42' font-family='Arial'>
    $fileName
  </text>
</svg>
"@
    Set-Content -Path $outPath -Value $placeholder -Encoding UTF8
  }
}

Write-Host "All hotel downloads completed." -ForegroundColor Cyan
