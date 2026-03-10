"use client";

import { useEffect, useState } from "react";
import { Link, Video, CameraOff } from "lucide-react";

export default function VideoGrid() {
    type CamId = "cam1" | "cam2" | "cam3" | "cam4";
    const camIds: CamId[] = ["cam1", "cam2", "cam3", "cam4"];

    // State maps for each camera
    const [frames, setFrames] = useState<Record<CamId, string | null>>({ cam1: null, cam2: null, cam3: null, cam4: null });
    const [connected, setConnected] = useState<Record<CamId, boolean>>({ cam1: false, cam2: false, cam3: false, cam4: false });
    const [activeCamId, setActiveCamId] = useState<CamId>("cam1");
    const [customUrl, setCustomUrl] = useState("");

    const handleSetStream = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:8000/api/set_stream", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cam_id: activeCamId, url: customUrl })
            });
        } catch (err) {
            console.error("Failed to set stream", err);
        }
    };

    useEffect(() => {
        const websockets: WebSocket[] = [];

        camIds.forEach(cam => {
            const ws = new WebSocket(`ws://localhost:8000/ws/video/${cam}`);

            ws.onopen = () => setConnected(prev => ({ ...prev, [cam]: true }));
            ws.onclose = () => setConnected(prev => ({ ...prev, [cam]: false }));

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.status === "no_signal") {
                        setFrames(prev => ({ ...prev, [cam]: null }));
                    } else if (data.frame) {
                        setFrames(prev => ({ ...prev, [cam]: `data:image/jpeg;base64,${data.frame}` }));
                    }
                } catch (err) {
                    // Ignore parse errors
                }
            };
            websockets.push(ws);
        });

        return () => websockets.forEach(ws => ws.close());
    }, []);

    return (
        <div className="flex flex-col flex-1 gap-4">
            <form onSubmit={handleSetStream} className="flex gap-3">
                <select
                    value={activeCamId}
                    onChange={e => setActiveCamId(e.target.value as CamId)}
                    className="bg-black/40 border border-neutral-700/50 rounded-lg text-sm px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
                >
                    <option value="cam1">CAM 01</option>
                    <option value="cam2">CAM 02</option>
                    <option value="cam3">CAM 03</option>
                    <option value="cam4">CAM 04</option>
                </select>

                <div className="relative flex-1 group">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Enter stream URL (leave empty to revert to simulation)..."
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        className="w-full bg-black/40 border border-neutral-700/50 rounded-lg text-sm pl-9 pr-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                    />
                </div>
                <button type="submit" className="neu-button px-5 py-2.5 text-sm bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 transition shrink-0 flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Connect
                </button>
                {customUrl && (
                    <button
                        type="button"
                        onClick={() => {
                            setCustomUrl("");
                            fetch("http://localhost:8000/api/set_stream", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ cam_id: activeCamId, url: "" })
                            });
                        }}
                        className="neu-button px-5 py-2.5 text-sm bg-red-600/10 hover:bg-red-600/20 text-red-400 transition shrink-0 flex items-center gap-2 border-red-500/20"
                    >
                        Cancel
                    </button>
                )}
            </form>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {camIds.map((cam, idx) => (
                    <div key={cam} className="neu-pressed relative overflow-hidden flex flex-col rounded-xl border border-white/5 bg-gradient-to-br from-neutral-900/50 to-neutral-900/20 shadow-xl min-h-[250px]">
                        <div className="absolute top-3 left-3 z-10 status-badge-red flex items-center gap-1.5 bg-black/60 backdrop-blur-md">
                            <span className={`w-2 h-2 rounded-full ${connected[cam] ? 'bg-red-500 animate-pulse' : 'bg-neutral-500'}`}></span>
                            {connected[cam] ? 'REC' : 'OFFLINE'}
                        </div>
                        <div className="absolute top-3 right-3 z-10 text-[10px] sm:text-xs font-mono bg-black/60 text-neutral-300 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
                            CAM 0{idx + 1}
                        </div>

                        {frames[cam] ? (
                            <img src={frames[cam]!} alt={`Feed ${cam}`} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 bg-black/40">
                                <CameraOff className="w-12 h-12 mb-3 opacity-30 animate-pulse text-red-400" />
                                <p className="text-sm tracking-wide font-mono text-red-400/80">NO SIGNAL / STREAM UNAVAILABLE</p>
                                <p className="text-xs tracking-wide text-neutral-500 mt-2">Connecting or Awaiting visual data...</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
