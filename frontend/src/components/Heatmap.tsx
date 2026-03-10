export default function Heatmap() {
  return (
    <div className="flex-1 w-full h-full bg-gradient-to-br from-neutral-900/80 to-black rounded-xl border border-white/5 flex items-center justify-center p-5 relative overflow-hidden shadow-inner">
      {/* Mock Heatmap Visualization */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen bg-gradient-radial from-orange-500/20 via-transparent to-transparent"></div>

      <div className="grid grid-cols-6 grid-rows-3 gap-2 w-full h-full opacity-70">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-opacity duration-1000"
            style={{
              backgroundColor: i % 5 === 0 ? '#ef4444' : i % 3 === 0 ? '#f59e0b' : '#10b981',
              opacity: Math.random() * 0.4 + 0.4
            }}
          ></div>
        ))}
      </div>

      <div className="absolute bottom-5 right-5 bg-black/80 px-4 py-2 rounded-lg text-xs text-neutral-300 backdrop-blur-md border border-white/10 shadow-2xl">
        Avg. Density: <span className="text-orange-400 font-bold ml-1">High Activity</span>
      </div>
    </div>
  );
}
