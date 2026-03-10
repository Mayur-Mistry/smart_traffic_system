# Intelligent Traffic Detection Models and Data Schemas

## Models

### TrafficLight
A model for traffic lights which can be green, yellow, or red.

```python
class TrafficLight:
    def __init__(self, color):
        self.color = color

    def change_color(self, new_color):
        self.color = new_color
```

### Vehicle
A model to represent vehicles on the road.

```python
class Vehicle:
    def __init__(self, vehicle_type, license_plate):
        self.vehicle_type = vehicle_type
        self.license_plate = license_plate
```

### TrafficSensor
A model for traffic sensors that can detect vehicles.

```python
class TrafficSensor:
    def __init__(self, location):
        self.location = location
        self.detected_vehicles = []

    def detect_vehicle(self, vehicle):
        self.detected_vehicles.append(vehicle)
```

## Data Schemas

### Traffic Data Schema
```json
{
    "timestamp": "2026-03-10T20:09:33Z",
    "location": "Main St & 1st Ave",
    "count": 5,
    "light_color": "green"
}
```

### Vehicle Data Schema
```json
{
    "license_plate": "ABC123",
    "vehicle_type": "car",
    "timestamp": "2026-03-10T20:09:33Z"
}
```
```