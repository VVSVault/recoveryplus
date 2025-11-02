# PowerShell script to stitch hero videos
Write-Host "Creating stitched hero video..." -ForegroundColor Green
Write-Host ""
Write-Host "This script requires ffmpeg to be installed." -ForegroundColor Yellow
Write-Host "If you don't have ffmpeg, download it from: https://ffmpeg.org/download.html" -ForegroundColor Yellow
Write-Host ""

# Check if ffmpeg is available
$ffmpegPath = $null

# Common ffmpeg locations
$possiblePaths = @(
    "C:\ffmpeg\bin\ffmpeg.exe",
    "C:\Program Files\ffmpeg\bin\ffmpeg.exe",
    "C:\Program Files (x86)\ffmpeg\bin\ffmpeg.exe",
    "$env:USERPROFILE\ffmpeg\bin\ffmpeg.exe",
    "$env:USERPROFILE\Downloads\ffmpeg\bin\ffmpeg.exe",
    "ffmpeg"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $ffmpegPath = $path
        Write-Host "Found ffmpeg at: $path" -ForegroundColor Green
        break
    } elseif (Get-Command $path -ErrorAction SilentlyContinue) {
        $ffmpegPath = $path
        Write-Host "Found ffmpeg in PATH" -ForegroundColor Green
        break
    }
}

if (-not $ffmpegPath) {
    Write-Host "ffmpeg not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please do one of the following:" -ForegroundColor Yellow
    Write-Host "1. Add ffmpeg to your PATH" -ForegroundColor Yellow
    Write-Host "2. Place ffmpeg.exe in one of these locations:" -ForegroundColor Yellow
    foreach ($path in $possiblePaths[0..4]) {
        Write-Host "   - $path" -ForegroundColor Gray
    }
    Write-Host ""
    $customPath = Read-Host "Or enter the full path to ffmpeg.exe"
    if (Test-Path $customPath) {
        $ffmpegPath = $customPath
    } else {
        Write-Host "Invalid path. Exiting." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit
    }
}

# Define video paths
$videos = @(
    "C:\Users\tanne\recoveryplus\public\videos\hero-video.mp4",
    "C:\Users\tanne\Downloads\5980032-uhd_4096_2160_24fps.mp4",
    "C:\Users\tanne\Downloads\5979710-uhd_4096_2160_24fps.mp4",
    "C:\Users\tanne\Downloads\5978074-uhd_4096_2160_24fps.mp4",
    "C:\Users\tanne\Downloads\6111024-uhd_3840_2160_25fps.mp4",
    "C:\Users\tanne\Downloads\4325585-uhd_4096_2160_25fps.mp4",
    "C:\Users\tanne\Downloads\4327265-uhd_4096_2160_25fps.mp4"
)

# Create temporary directory
$tempDir = "temp_videos"
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

# Trim each video to 4.5 seconds
Write-Host "Trimming videos to 4.5 seconds each..." -ForegroundColor Cyan
for ($i = 0; $i -lt $videos.Length; $i++) {
    $inputVideo = $videos[$i]
    $outputVideo = "$tempDir\temp$($i+1).mp4"
    
    Write-Host "Processing: $(Split-Path $inputVideo -Leaf)" -ForegroundColor Gray
    & $ffmpegPath -i $inputVideo -t 4.5 -c copy $outputVideo -y -loglevel error
}

# Create concat list
$concatList = "$tempDir\concat_list.txt"
$content = ""
for ($i = 1; $i -le $videos.Length; $i++) {
    $content += "file 'temp$i.mp4'`n"
}
$content | Out-File -FilePath $concatList -Encoding ASCII

# Concatenate videos
Write-Host "Stitching videos together..." -ForegroundColor Cyan
$outputPath = "C:\Users\tanne\recoveryplus\public\videos\hero-video-stitched.mp4"
& $ffmpegPath -f concat -safe 0 -i $concatList -c copy $outputPath -y -loglevel error

# Clean up
Write-Host "Cleaning up temporary files..." -ForegroundColor Gray
Remove-Item -Path $tempDir -Recurse -Force

Write-Host ""
Write-Host "Video stitching complete!" -ForegroundColor Green
Write-Host "Output saved to: public\videos\hero-video-stitched.mp4" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"