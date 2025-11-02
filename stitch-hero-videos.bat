@echo off
echo Creating stitched hero video...
echo.
echo This script requires ffmpeg to be installed.
echo If you don't have ffmpeg, download it from: https://ffmpeg.org/download.html
echo.

REM Create a text file listing all videos
(
echo file 'C:\Users\tanne\recoveryplus\public\videos\hero-video.mp4'
echo file 'C:\Users\tanne\Downloads\5980032-uhd_4096_2160_24fps.mp4'
echo file 'C:\Users\tanne\Downloads\5979710-uhd_4096_2160_24fps.mp4'
echo file 'C:\Users\tanne\Downloads\5978074-uhd_4096_2160_24fps.mp4'
echo file 'C:\Users\tanne\Downloads\6111024-uhd_3840_2160_25fps.mp4'
echo file 'C:\Users\tanne\Downloads\4325585-uhd_4096_2160_25fps.mp4'
echo file 'C:\Users\tanne\Downloads\4327265-uhd_4096_2160_25fps.mp4'
) > video_list.txt

REM Trim each video to 4.5 seconds and create temporary files
ffmpeg -i "C:\Users\tanne\recoveryplus\public\videos\hero-video.mp4" -t 4.5 -c copy temp1.mp4
ffmpeg -i "C:\Users\tanne\Downloads\5980032-uhd_4096_2160_24fps.mp4" -t 4.5 -c copy temp2.mp4
ffmpeg -i "C:\Users\tanne\Downloads\5979710-uhd_4096_2160_24fps.mp4" -t 4.5 -c copy temp3.mp4
ffmpeg -i "C:\Users\tanne\Downloads\5978074-uhd_4096_2160_24fps.mp4" -t 4.5 -c copy temp4.mp4
ffmpeg -i "C:\Users\tanne\Downloads\6111024-uhd_3840_2160_25fps.mp4" -t 4.5 -c copy temp5.mp4
ffmpeg -i "C:\Users\tanne\Downloads\4325585-uhd_4096_2160_25fps.mp4" -t 4.5 -c copy temp6.mp4
ffmpeg -i "C:\Users\tanne\Downloads\4327265-uhd_4096_2160_25fps.mp4" -t 4.5 -c copy temp7.mp4

REM Create trimmed video list
(
echo file 'temp1.mp4'
echo file 'temp2.mp4'
echo file 'temp3.mp4'
echo file 'temp4.mp4'
echo file 'temp5.mp4'
echo file 'temp6.mp4'
echo file 'temp7.mp4'
) > trimmed_list.txt

REM Concatenate all videos
ffmpeg -f concat -safe 0 -i trimmed_list.txt -c copy "C:\Users\tanne\recoveryplus\public\videos\hero-video-stitched.mp4"

REM Clean up temporary files
del temp1.mp4 temp2.mp4 temp3.mp4 temp4.mp4 temp5.mp4 temp6.mp4 temp7.mp4
del video_list.txt trimmed_list.txt

echo.
echo Video stitching complete!
echo Output saved to: public\videos\hero-video-stitched.mp4
pause