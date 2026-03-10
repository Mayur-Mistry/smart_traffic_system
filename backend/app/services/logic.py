def check_emergency_override(detections):
    """
    Priority Logic:
    If label: 'Ambulance' or label: 'Fire_Truck' is detected with confidence > 0.85, 
    trigger the Emergency_Traffic_Override function to simulate green-light signaling.
    """
    for det in detections:
        label = det.get("label")
        conf = det.get("confidence")
        
        if label in ["Ambulance", "Fire_Truck"] and conf > 0.85:
            return True
            
    return False
