import React, { useEffect, useState } from 'react';
import { Shield, Activity, Crosshair, Radar } from 'lucide-react';

export const CityHeatmap = () => {
    const [scannedPoints, setScannedPoints] = useState<{ x: number, y: number, id: number, label: string }[]>([]);

    useEffect(() => {
        const sections = ['111', '303', '70', '103', '115'];
        const interval = setInterval(() => {
            setScannedPoints(prev => {
                const newPoints = [...prev, {
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 80 + 10,
                    id: Date.now(),
                    label: `BNS §${sections[Math.floor(Math.random() * sections.length)]}`
                }];
                return newPoints.slice(-8);
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full min-h-[550px] bg-[#020617] relative overflow-hidden border border-slate-800 rounded-2xl group shadow-2xl">
            {/* Real Intelligence Hub - User Provided Map Background */}
            <div className="absolute inset-0 z-0">
                {/* 
                    The image is loaded from /src/map.jpg. 
                    Object-fit cover ensures it scales in accordance to the window/container size.
                */}
                <img
                    src="/src/map.jpg"
                    alt="Strategic Map"
                    className="w-full h-full object-cover opacity-50 mix-blend-luminosity grayscale contrast-125 transition-transform duration-1000 group-hover:scale-105"
                    onError={(e) => {
                        // Fallback in case map.jpg is not yet present, trying jpeg
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('map.jpeg')) {
                            target.src = '/src/map.jpeg';
                        } else {
                            target.style.display = 'none';
                        }
                    }}
                />

                {/* Advanced Grid & Vignette for Premium Look */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617] opacity-60" />

                {/* Scanning Line Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="w-full h-[2px] bg-blue-500/20 absolute top-0 animate-[scan-vertical_4s_linear_infinite]" />
                </div>
            </div>

            {/* Dynamic UI Elements */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {scannedPoints.map(point => (
                    <div
                        key={point.id}
                        className="absolute w-4 h-4 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    >
                        <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-40" />
                        <div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_15px_#f43f5e]" />

                        <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-lg text-[9px] font-black text-slate-100 backdrop-blur-md shadow-2xl">
                            {point.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Premium Overlays */}
            <div className="absolute top-8 left-8 z-20 flex flex-col gap-4">
                <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl shadow-2xl">
                    <div className="flex items-center gap-4">
                        <Radar className="w-6 h-6 text-blue-500 animate-spin-slow" />
                        <div>
                            <span className="text-[10px] font-black tracking-[0.2em] text-slate-200 uppercase">Live Intelligence Feed</span>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] text-slate-500 font-bold uppercase">Sector: Mumbai-Sion Strategic</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
                <div className="bg-slate-950/90 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl max-w-sm shadow-2xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Crosshair className="w-4 h-4 text-rose-500" />
                        <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Signal Trace</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-slate-400 font-medium italic">
                        "Visualizing BNS §111 & §303 hotspots directly over the Kurla-Sion corridor. System is scaling to fit window geometry."
                    </p>
                </div>

                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 flex gap-4">
                    <div className="text-center px-4">
                        <div className="text-sm font-black text-blue-500 italic">BKC_NODE_01</div>
                        <div className="text-[8px] text-slate-600 font-bold uppercase mt-0.5">Primary Link</div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scan-vertical {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                    }
                .animate-spin-slow {
                    animation: spin 12s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};
