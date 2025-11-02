@echo off
echo.
echo ====================================
echo SIMPLE VIDEO STITCHER
echo ====================================
echo.
echo This will stitch your hero videos together.
echo.
echo Please drag and drop your ffmpeg.exe file onto this window,
echo then press Enter.
echo.
set /p FFMPEG_PATH="Path to ffmpeg.exe: "

REM Remove quotes if present
set FFMPEG_PATH=%FFMPEG_PATH:"=%

REM Check if ffmpeg exists
if not exist "%FFMPEG_PATH%" (
    echo.
    echo ERROR: ffmpeg.exe not found at that location!
    echo.
    pause
    exit /b 1
)

echo.
echo Found ffmpeg! Starting video processing...
echo.

REM Create temp directory
mkdir temp_videos 2>nul

REM Trim videos
echo Trimming videos to 4.5 seconds each...
"%FFMPEG_PATH%" -i "public\videos\hero-video.mp4" -t 4.5 -c copy "temp_videos\temp1.mp4" -y
"%FFMPEG_PATH%" -i "C:\Users\tanne\Downloads\5980032-uhd_4096_2160_24fps.mp4" -t 4.5 -c copy "temp_videos\temp2.mp4" -y
"%FFMPEG_PATH%" -i "C:\Users\tanne\Downloads\5979710-uhd_4096_2160_24fps.mp4" -t 4.5 -c copy "temp_videos\temp3.mp4" -y
"%FFMPEG_PATH%" -i "C:\Users\tanne\Downloads\5978074-uhd_4096_2160_24fps.mp4" -t 4.5 -c copy "temp_videos\temp4.mp4" -y
"%FFMPEG_PATH%" -i "C:\Users\tanne\Downloads\6111024-uhd_3840_2160_25fps.mp4" -t 4.5 -c copy "temp_videos\temp5.mp4" -y
"%FFMPEG_PATH%" -i "C:\Users\tanne\Downloads\4325585-uhd_4096_2160_25fps.mp4" -t 4.5 -c copy "temp_videos\temp6.mp4" -y
"%FFMPEG_PATH%" -i "C:\Users\tanne\Downloads\4327265-uhd_4096_2160_25fps.mp4" -t 4.5 -c copy "temp_videos\temp7.mp4" -y

REM Create concat list
echo file 'temp1.mp4' > temp_videos\concat.txt
echo file 'temp2.mp4' >> temp_videos\concat.txt
echo file 'temp3.mp4' >> temp_videos\concat.txt
echo file 'temp4.mp4' >> temp_videos\concat.txt
echo file 'temp5.mp4' >> temp_videos\concat.txt
echo file 'temp6.mp4' >> temp_videos\concat.txt
echo file 'temp7.mp4' >> temp_videos\concat.txt

REM Change to temp directory for concat
cd temp_videos

echo.
echo Stitching videos together...
"%FFMPEG_PATH%" -f concat -safe 0 -i concat.txt -c copy "..\public\videos\hero-video-stitched.mp4" -y

REM Go back
cd ..

REM Clean up
echo.
echo Cleaning up temporary files...
rmdir /s /q temp_videos

echo.
echo ====================================
echo DONE! Video saved to:
echo public\videos\hero-video-stitched.mp4
echo ====================================
echo.
pause