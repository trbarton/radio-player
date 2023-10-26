#!/bin/bash

now=$(date +%d-%m-%Y-%H%M)
ffmpeg -t 30 -re -i https://livestream.mediaworks.nz/radio_origin/george_128kbps/chunklist.m3u8 /home/ubuntu/recording-${now}.mp3

# Wait 10 seconds
sleep 10

# Upload the file to R2
rclone copy /home/ubuntu/recording-${now}.mp3 r2buckets:recordings-dev/ --s3-upload-cutoff=100M --s3-chunk-size=100M

# Wait 10 seconds
sleep 10

# Delete the file
rm /home/ubuntu/recording-${now}.mp3