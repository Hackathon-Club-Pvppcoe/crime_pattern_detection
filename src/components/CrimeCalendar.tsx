import React from 'react';
import { Calendar, Clock, CloudRain, Sun, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

export const CrimeCalendar = () => {
    // Simulated data for the SVG chart
    const data = [
        { h: 20, v: 45 }, { h: 21, v: 55 }, { h: 22, v: 85 }, { h: 23, v: 120 },
        { h: 0, v: 110 }, { h: 1, v: 95 }, { h: 2, v: 130 }, { h: 3, v: 140 },
        { h: 4, v: 80 }, { h: 5, v: 40 }, { h: 6, v: 30 }, { h: 7, v: 25 }
    ];

    const maxVal = 150;
    const width = 400;
    const height = 120;

    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (d.v / maxVal) * height;
        return `${x},${y}`;
    }).join(' ');

    const areaPoints = `0,${height} ${points} ${width},${height}`;

    return (
        <div className="glass-card p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black tracking-widest text-neutral-200 uppercase">Temporal Analysis</h3>
                        <p className="text-[10px] text-neutral-500 font-medium">BNS Activity Trend (24h Window)</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                    <span className="text-[10px] font-bold text-amber-500 uppercase">High Night Risk</span>
                </div>
            </div>

            <div className="relative h-32 w-full mt-4">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="crimeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map(p => (
                        <line
                            key={p}
                            x1="0" y1={height * p} x2={width} y2={height * p}
                            stroke="#171717" strokeWidth="1" strokeDasharray="4 4"
                        />
                    ))}

                    {/* Area */}
                    <polyline points={areaPoints} fill="url(#crimeGradient)" />

                    {/* Line */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    />

                    {/* Interactive Points */}
                    {data.map((d, i) => {
                        const x = (i / (data.length - 1)) * width;
                        const y = height - (d.v / maxVal) * height;
                        return (
                            <circle
                                key={i} cx={x} cy={y} r="4"
                                className="fill-black stroke-blue-500 stroke-2 hover:r-6 transition-all cursor-pointer"
                            />
                        );
                    })}
                </svg>

                {/* X-Axis Labels */}
                <div className="flex justify-between mt-4">
                    {['20:00', '22:00', '00:00', '02:00', '04:00', '06:00'].map(t => (
                        <span key={t} className="text-[10px] font-bold text-neutral-600 font-mono">{t}</span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="p-4 bg-black/50 border border-neutral-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-neutral-500">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Peak Hour</span>
                    </div>
                    <div className="text-xl font-black text-neutral-200">03:14 AM</div>
                    <div className="text-[10px] text-rose-500 font-bold mt-1">+14% vs Average</div>
                </div>
                <div className="p-4 bg-black/50 border border-neutral-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-neutral-500">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Confidence</span>
                    </div>
                    <div className="text-xl font-black text-emerald-500">92.4%</div>
                    <div className="text-[10px] text-neutral-500 font-bold mt-1">AI Logic v2.4</div>
                </div>
            </div>
        </div>
    );
};
