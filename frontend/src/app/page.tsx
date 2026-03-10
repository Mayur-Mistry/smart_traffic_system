import VideoGrid from "@/components/VideoGrid";
import Heatmap from "@/components/Heatmap";
import LiveAlerts from "@/components/LiveAlerts";
import ModelZoo from "@/components/ModelZoo";
import { Activity, LayoutDashboard, Radio, Server, Map } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col gap-6">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 glass-panel border-b-2 border-b-indigo-500/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 border border-indigo-500/30 flex items-center justify-center">
            <Activity className="text-emerald-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Smart<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Traffic AI</span>
            </h1>
            <p className="text-neutral-400 text-xs mt-0.5 tracking-wide">SURVEILLANCE & INFERENCE ENGINE</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-neutral-300 font-semibold tracking-wider">SYSTEM ONLINE</span>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
            <Server className="w-4 h-4 text-neutral-400" />
            <span className="text-xs text-neutral-400 font-mono">NODE-01</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Main Content Area */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          <section className="glass-panel flex-1 min-h-[500px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 mix-blend-screen pointer-events-none"></div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                Live Camera Grid
              </h2>
              <div className="status-badge-green">ACTIVE FEEDS: 4</div>
            </div>
            <VideoGrid />
          </section>

          <section className="glass-panel h-[300px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                Traffic Density Heatmap
              </h2>
            </div>
            <Heatmap />
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <section className="glass-panel flex-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-2xl -z-10 pointer-events-none"></div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
              <Radio className="w-5 h-5 text-red-500 animate-pulse" />
              Emergency Alerts
            </h2>
            <LiveAlerts />
          </section>

          <section className="glass-panel">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
              <Server className="w-5 h-5 text-purple-400" />
              Inference Target
            </h2>
            <ModelZoo />
          </section>
        </div>
      </div>
    </main>
  );
}
