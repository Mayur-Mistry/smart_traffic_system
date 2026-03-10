import cv2
import random
from .logic import check_emergency_override

class LocalInferenceEngine:
    def __init__(self, model_type="yolov8"):
        self.model_type = model_type
        # In a real deployed application, you'd load the Ultralytics model here.
        # e.g., self.model = YOLO('yolov8n.pt')
        print(f"Loaded {model_type} model. (Simulated)")
        
        # Simulated labels for demonstration
        self.labels = ["Car", "Pedestrian", "Truck", "Bus", "Motorcycle", "Ambulance", "Fire_Truck"]

    def process_frame(self, frame):
        """
        Process a single image frame, predict objects, and return bounding boxes.
        Also triggers Emergency_Traffic_Override if an ambulance or fire truck is detected.
        """
        # In a real app:
        # results = self.model(frame)
        # for r in results:
        #    ...
        
        # Simulated Detections
        # Randomly generate 1 to 5 detections
        seq = random.choices(self.labels, weights=[50, 20, 15, 5, 5, 2, 1], k=random.randint(1, 5))
        
        detections = []
        height, width, _ = frame.shape
        
        for label in seq:
            # Simulate BBox
            x1 = random.randint(0, width - 100)
            y1 = random.randint(0, height - 100)
            x2 = x1 + random.randint(50, 100)
            y2 = y1 + random.randint(50, 100)
            conf = random.uniform(0.5, 0.99)
            
            detections.append({
                "label": label,
                "confidence": round(conf, 2),
                "bbox": [x1, y1, x2, y2]
            })
            
            # Draw bbox on frame (OpenCV)
            # Use red bounding box for emergency vehicles, green for others
            color = (0, 0, 255) if label in ["Ambulance", "Fire_Truck"] else (0, 255, 0)
            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
            cv2.putText(frame, f"{label} {conf:.2f}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
            
        # Priority Logic: Check if Ambulance or Fire Truck is detected with conf > 0.85
        override_active = check_emergency_override(detections)
        
        if override_active:
            # Emphasize frame to show override
            cv2.rectangle(frame, (0, 0), (width, height), (0, 0, 255), 10)
            cv2.putText(frame, "EMERGENCY OVERRIDE: GREEN LIGHT ACTIVATED", (50, 50), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)

        return frame, detections, override_active
