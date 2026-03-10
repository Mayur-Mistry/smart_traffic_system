import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function LiveAlerts() {
    const mockAlerts = [
        { id: 1, type: "Ambulance", time: "Just now", conf: "98%", cam: "CAM 01" },
        { id: 2, type: "Fire_Truck", time: "2 min ago", conf: "92%", cam: "CAM 03" },
        { id: 3, type: "Accident_Risk", time: "15 min ago", conf: "85%", cam: "CAM 02" },
    ];

    return (
        <div className="flex flex-col gap-3">
            {mockAlerts.map((alert) => (
                <div key={alert.id} className="p-3.5 bg-gradient-to-r from-red-950/40 to-black/20 border border-red-500/20 rounded-xl flex items-start justify-between shadow-lg shadow-red-900/5 group hover:border-red-500/40 transition-colors">
                    <div className="flex gap-3.5 items-center">
                        <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-500/20 transition-colors">
                            <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="font-bold text-red-400 text-sm">{alert.type}</p>
                            <p className="text-xs text-neutral-400 font-mono">{alert.cam} - {alert.time}</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-mono bg-red-500/10 text-red-400 px-2 py-1 rounded-md border border-red-500/20">
                        CONF: {alert.conf}
                    </span>
                </div>
            ))}

            <div className="p-4 bg-black/20 border border-white/5 rounded-xl flex items-center justify-center mt-1">
                <p className="text-xs text-neutral-500 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    No other active alerts
                </p>
            </div>
        </div>
    );
}
