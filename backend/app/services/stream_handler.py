import cv2
import numpy as np
import time
import math
import threading
import yt_dlp

def resolve_youtube_url(url: str) -> str:
    """Extracts direct stream URL using yt-dlp for OpenCV capture."""
    ydl_opts = {
        'format': 'best',
        'quiet': True,
        'no_warnings': True,
        'live_from_start': False
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # We must use download=False to just extract info
            info = ydl.extract_info(url, download=False)
            if 'url' in info:
                return info['url']
            elif 'formats' in info:
                return info['formats'][-1]['url'] 
    except Exception as e:
        print(f"Error resolving YouTube link: {e}")
    return url

class StreamHandler:
    def __init__(self, source=None):
        self.source = source
        self.cap = None
        self.simulated = source is None
        self.latest_frame = None
        self.lock = threading.Lock()
        self.stopped = False
        
        if not self.simulated:
            self.start_capture(self.source)
            
        self.frame_idx = 0
        
    def start_capture(self, source):
        self.stopped = False
        # Ensure ffmpeg backend can capture HLS correctly for Youtube Live
        import os
        os.environ["OPENCV_FFMPEG_CAPTURE_OPTIONS"] = "rtsp_transport;udp"
        self.cap = cv2.VideoCapture(source, cv2.CAP_FFMPEG)
        self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        
        # Start background thread to continually read frames
        threading.Thread(target=self.update, daemon=True).start()
        
    def update(self):
        while not self.stopped:
            if self.cap is not None and self.cap.isOpened():
                ret, frame = self.cap.read()
                if ret:
                    with self.lock:
                        self.latest_frame = frame
                else:
                    self.cap.set(cv2.CAP_PROP_POS_FRAMES, 0) # loop
            else:
                time.sleep(0.1)

    def set_source(self, source):
        # Resolve YouTube URLs to direct stream links
        if source and ('youtube.com' in source or 'youtu.be' in source):
            print(f"Resolving YouTube URL: {source}")
            resolved_url = resolve_youtube_url(source)
            self.source = resolved_url
        else:
            self.source = source
            
        self.simulated = source is None or source == ""
        
        # Stop existing background thread
        self.stopped = True
        if self.cap:
            self.latest_frame = None
            self.cap.release()
            time.sleep(0.1) # brief wait for thread to die
            
        if not self.simulated:
            print(f"Opening capture for source: {self.source}")
            self.start_capture(self.source)
            
        self.frame_idx = 0

    def get_next_frame(self):
        if self.simulated:
            # Generate a procedural mock traffic frame for demonstration purposes
            self.frame_idx += 1
            frame = np.zeros((480, 640, 3), dtype=np.uint8)
            
            # Simple panning background
            offset = self.frame_idx % 640
            cv2.line(frame, (offset, 0), (offset, 480), (50, 50, 50), 2)
            
            # Road markings
            cv2.line(frame, (0, 240), (640, 240), (255, 255, 255), 2)
            
            cv2.putText(frame, f"Simulated Frame #{self.frame_idx}", (10, 30), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (200, 200, 200), 2)
                        
            time.sleep(0.03) # Simulate 30fps wait
            return frame
        else:
            with self.lock:
                if self.latest_frame is not None:
                    return self.latest_frame.copy()
            return None
