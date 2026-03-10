# Smart Traffic Surveillance & Management System

Welcome to the **Smart Traffic AI Platform**. This system is a high-performance, full-stack application designed to ingest real-time traffic video streams (such as RTSP cameras or YouTube Live feeds), process them using localized Computer Vision/AI models, and display the results on a beautiful, trending Neumorphic/Glassmorphic dashboard.

![Banner](/media__1773169144231.png)

## 🏗️ Architecture & Frameworks

The system is separated into two primary microservices that run concurrently:

### 1. The Frontend (Next.js + React 19)
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Design Language:** A premium, high-contrast "Dark Mode Default" featuring subtle glassmorphism (`backdrop-blur`), neumorphic button presses (`neu-pressed`), radial gradients, and fluid micro-animations.
- **Icons:** Powered by [Lucide React](https://lucide.dev/).
- **Role:** Handles the graphical user interface. It establishes **WebSockets** with the backend to receive base64-encoded live video frames and renders them smoothly in the `VideoGrid`.

### 2. The Backend (Python + FastAPI)
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Asynchronous python server)
- **Server:** [Uvicorn](https://www.uvicorn.org/)
- **AI/Vision Engine:** OpenCV (`cv2`), PyTorch, and YOLOv8 structure.
- **Stream Ingestion:** Uses [yt-dlp](https://github.com/yt-dlp/yt-dlp) to resolve live YouTube links into raw streams, and custom `StreamHandler` threads to aggressively drain the frame buffer, ensuring **zero-latency** real-time playback.
- **Role:** The powerhouse. It processes video feeds, runs the AI bounding-box detection, triggers Emergency Overrides (e.g. for Ambulances), and broadcasts the frames to the frontend via WebSockets (`/ws/video/{cam_id}`).

---

## 🚀 How to Run the System Locally

To launch this platform, you need to open **two terminal windows**. One terminal will run the Frontend, and the other will run the Backend.

### Step 1: Start the Backend (FastAPI)
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. *(Optional but Recommended)* Create and activate a Virtual Environment.
3. Install the Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Uvicorn server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```
   *Alternatively, if you are on Windows, you can simply run the provided script:*
   ```powershell
   .\start_backend.ps1
   ```
*The backend should now be listening at `http://localhost:8000`.*

### Step 2: Start the Frontend (Next.js)
1. Open a **second** terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the Node modules:
   ```bash
   npm install
   ```
3. Run the Next.js development server:
   ```bash
   npm run dev
   ```
*The frontend should now be running at `http://localhost:3000`.*

---

## 🎮 How to Use the Dashboard

1. **Open the Dashboard:** Navigate to `http://localhost:3000` in your browser.
2. **View Default Streams:** By default, the backend will generate "Simulated" traffic overlays. You will see 4 camera tiles actively communicating with the backend.
3. **Connect a Live Camera:**
   - In the "**Live Camera Grid**" section, click the dropdown menu to select a target (e.g., `CAM 02`).
   - Paste an RTSP link or a **YouTube Live Stream link** into the input field.
   - Click **Connect**. 
   - *The backend will spin up a background thread, securely resolve the HLS payload, and stream it to that specific tile in real-time.*
4. **Disconnect/Revert:** Click the red **Cancel** button next to a custom URL to immediately sever the stream and return to the fallback artificial stream, without refreshing the page!
