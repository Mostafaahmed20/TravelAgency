# Downloads high-quality images for destinations into public/images/destinations
# Edit the URLs below to preferred royalty-free sources (e.g., Unsplash/Pexels). Ensure usage complies with licensing.

$ErrorActionPreference = 'Stop'

$root = Join-Path (Split-Path $PSScriptRoot -Parent) 'public/images/destinations'
If (!(Test-Path $root)) { New-Item -ItemType Directory -Path $root | Out-Null }

$images = @{
  'istanbul.jpg'        = 'https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'trabzon-uzungol.jpg' = 'https://images.pexels.com/photos/14064544/pexels-photo-14064544.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'tbilisi-batumi.jpg'  = 'https://images.pexels.com/photos/7664739/pexels-photo-7664739.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'baku-qabala.jpg'     = 'https://images.pexels.com/photos/4553366/pexels-photo-4553366.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'dubai.jpg'           = 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'sharm-el-sheikh.jpg' = 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'antalya.jpg'         = 'https://images.pexels.com/photos/5864433/pexels-photo-5864433.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'santorini.jpg'       = 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'marrakech.jpg'       = 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'maldives.jpg'        = 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'prague.jpg'          = 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'kuala-lumpur.jpg'    = 'https://images.pexels.com/photos/1382408/pexels-photo-1382408.jpeg?auto=compress&cs=tinysrgb&w=1920';
  'phuket.jpg'          = 'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=1920';
}

Write-Host "Downloading destination images to" $root -ForegroundColor Cyan

foreach ($kvp in $images.GetEnumerator()) {
  $fileName = $kvp.Key
  $url = $kvp.Value
  $outPath = Join-Path $root $fileName

  Write-Host "→" $fileName "from" $url -ForegroundColor Green
  try {
    Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing
  } catch {
    Write-Warning "Failed to download $fileName from $url. Using placeholder."
    # Create a simple placeholder image if download fails
    $placeholder = @"
<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'>
  <rect width='100%' height='100%' fill='#0F766E'/>
  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='48' font-family='Arial'>
    $fileName
  </text>
</svg>
"@
    Set-Content -Path $outPath -Value $placeholder -Encoding UTF8
  }
}

Write-Host "All downloads completed." -ForegroundColor Cyan
