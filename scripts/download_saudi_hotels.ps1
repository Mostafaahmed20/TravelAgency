# Download Saudi Arabia Hotels Images
$baseDir = "public\images\saudiArabiaHotels"
$hotels = @{
    "makkah-clock-tower.jpg" = "https://images.pexels.com/photos/4350061/pexels-photo-4350061.jpeg?auto=compress&cs=tinysrgb&w=1920"
    "pullman-zamzam.jpg" = "https://images.pexels.com/photos/7294706/pexels-photo-7294706.jpeg?auto=compress&cs=tinysrgb&w=1920"
    "ritz-carlton-riyadh.jpg" = "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920"
    "jeddah-hilton.jpg" = "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1920"
}

if (-not (Test-Path $baseDir)) {
    New-Item -ItemType Directory -Path $baseDir -Force | Out-Null
}

Write-Host "Downloading Saudi Arabia hotel images..." -ForegroundColor Green

foreach ($hotel in $hotels.GetEnumerator()) {
    $filename = $hotel.Key
    $url = $hotel.Value
    $outputPath = Join-Path $baseDir $filename
    
    Write-Host "Downloading: $filename" -ForegroundColor Cyan
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing
        Write-Host "  Downloaded successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "  Failed to download" -ForegroundColor Red
    }
}

Write-Host "`nAll Saudi Arabia hotel images processed!" -ForegroundColor Green
