"use client";

import { useState } from "react";
import { Cpu, UploadCloud } from "lucide-react";

export default function ModelZoo() {
    const [activeModel, setActiveModel] = useState("yolov8n.pt");

    return (
        <div className="flex flex-col gap-5">
            <div className="space-y-3">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Active Model Target</label>
                <div className="relative">
                    <select
                        value={activeModel}
                        onChange={(e) => setActiveModel(e.target.value)}
                        className="w-full appearance-none bg-black/40 border border-neutral-700/50 rounded-xl text-sm pl-4 pr-10 py-3 text-neutral-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all cursor-pointer shadow-inner"
                    >
                        <option value="yolov8n.pt">YOLOv8 Nano (Fastest)</option>
                        <option value="yolov8s.pt">YOLOv8 Small (Balanced)</option>
                        <option value="yolov8x.pt">YOLOv8 Xtra (Accurate)</option>
                        <option value="faster_rcnn.pth">Faster R-CNN</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-900/40 to-black/20 border border-indigo-500/20 rounded-xl p-4 flex gap-3 items-start shadow-lg shadow-indigo-900/5">
                <Cpu className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-indigo-200/90 text-xs leading-relaxed">Local inference active. Processing streams at ~30 FPS on specialized CPU hardware.</p>
            </div>

            <button className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold tracking-wide rounded-xl transition-all border border-neutral-700/50 flex flex-row items-center justify-center gap-2 hover:border-neutral-500/50">
                <UploadCloud className="w-4 h-4" />
                IMPORT CUSTOM WEIGHTS (.pt)
            </button>
        </div>
    );
}
