import asyncio
import base64
import cv2
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .services.inference import LocalInferenceEngine
from .services.stream_handler import StreamHandler

app = FastAPI(title="Smart Traffic Surveillance & Management System")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = LocalInferenceEngine(model_type="yolov8")
stream_handlers = {
    "cam1": StreamHandler(),
    "cam2": StreamHandler(),
    "cam3": StreamHandler(),
    "cam4": StreamHandler(),
}

@app.get("/")
def read_root():
    return {"status": "Smart Traffic API is running"}

class StreamConfigRequest(BaseModel):
    cam_id: str
    url: str

@app.post("/api/set_stream")
def set_stream(request: StreamConfigRequest):
    if request.cam_id not in stream_handlers:
        return {"status": "error", "message": "Invalid camera ID"}
    stream_handlers[request.cam_id].set_source(request.url)
    return {"status": "success", "cam_id": request.cam_id, "stream_url": request.url}

@app.websocket("/ws/video/{cam_id}")
async def video_endpoint(websocket: WebSocket, cam_id: str):
    await websocket.accept()
    
    if cam_id not in stream_handlers:
        await websocket.send_json({"status": "error", "message": "Invalid camera ID"})
        await websocket.close()
        return

    handler = stream_handlers[cam_id]
    
    # Simple simulated stream for demonstration since we may not have a real RTSP source.
    # We will just generate blank frames or text frames to show processing.
    # In a real setup, stream_handler would yield frames from cv2.VideoCapture
    try:
        while True:
            # Get next frame from stream
            frame = handler.get_next_frame()
            if frame is None:
                await websocket.send_json({"status": "no_signal"})
                await asyncio.sleep(0.5)
                continue
                
            # Process frame through Local Inference Engine
            processed_frame, detections, override_status = engine.process_frame(frame)
            
            # Encode frame to JPEG
            _, buffer = cv2.imencode('.jpg', processed_frame)
            frame_base64 = base64.b64encode(buffer).decode('utf-8')
            
            # Send payload to frontend
            payload = {
                "status": "ok",
                "frame": frame_base64,
                "detections": detections,
                "override_active": override_status
            }
            await websocket.send_json(payload)
            await asyncio.sleep(0.01) # Yield fast for fluid streams
            
    except WebSocketDisconnect:
        print("Client disconnected from video stream")
