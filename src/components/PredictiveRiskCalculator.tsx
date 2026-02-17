import React, { useState, useMemo } from 'react';
import { Target, Activity, Database, Users, TrendingUp, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export const PredictiveRiskCalculator = () => {
    const [weights, setWeights] = useState({
        alpha: 0.4, // Historical Crime
        beta: 0.3,  // Seasonality Impact
        gamma: 0.2, // Proximity to Police Station (1/D_ps)
        delta: 0.1, // Population Density
    });

    const BASE_VALUES = {
        Ch: 85,
        Si: 60,
        Dps: 2,
        Pd: 75
    };

    const riskScore = useMemo(() => {
        const { Ch, Si, Dps, Pd } = BASE_VALUES;
        const { alpha, beta, gamma, delta } = weights;
        const calculated = (alpha * Ch) + (beta * Si) + (gamma * (1 / Dps) * 100) + (delta * Pd);
        return Math.min(Math.round(calculated), 100);
    }, [weights]);

    const getRiskStyles = (score: number) => {
        if (score > 80) return { text: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20 shadow-rose-500/5' };
        if (score > 50) return { text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20 shadow-amber-500/5' };
        return { text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20 shadow-emerald-500/5' };
    };

    const styles = getRiskStyles(riskScore);

    return (
        <div className="glass-card flex flex-col p-8 h-full">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <Target className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-slate-100 uppercase tracking-widest">Risk Calculation</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">BNS Predictive Engine v4.0</p>
                    </div>
                </div>

                <div className={cn("px-6 py-3 rounded-2xl border transition-all duration-500 flex flex-col items-center gap-1 shadow-lg", styles.bg, styles.border)}>
                    <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", styles.text)}>Overall Index</span>
                    <div className={cn("text-3xl font-black italic tracking-tighter", styles.text)}>{riskScore}</div>
                </div>
            </div>

            <div className="space-y-8 flex-1">
                <Slider
                    label="Historical Bias (α)"
                    icon={Database}
                    value={weights.alpha}
                    onChange={(v: number) => setWeights({ ...weights, alpha: v })}
                />
                <Slider
                    label="Seasonal Variance (β)"
                    icon={Activity}
                    value={weights.beta}
                    onChange={(v: number) => setWeights({ ...weights, beta: v })}
                />
                <Slider
                    label="Response Proximity (γ)"
                    icon={Target}
                    value={weights.gamma}
                    onChange={(v: number) => setWeights({ ...weights, gamma: v })}
                />
                <Slider
                    label="Population Hubs (δ)"
                    icon={Users}
                    value={weights.delta}
                    onChange={(v: number) => setWeights({ ...weights, delta: v })}
                />
            </div>

            <div className="mt-10 pt-8 border-t border-slate-800">
                <div className="bg-[#020617] p-5 rounded-2xl border border-slate-800/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
                    <code className="text-[10px] text-blue-400 font-black font-mono block mb-4 tracking-wider">
                        R = Σ[w_i * v_i] + ε
                    </code>
                    <div className="flex items-start gap-3">
                        <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                        <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                            The algorithmic weights determine the prioritization of satellite data against historical BNS filings. Re-calibration is recommended every 12 hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Slider = ({ label, icon: Icon, value, onChange }: any) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-slate-950 border border-slate-800 rounded flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-[11px] font-black text-blue-500 italic">{(value * 100).toFixed(0)}%</span>
        </div>
        <div className="relative group">
            <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-900 rounded-full appearance-none cursor-pointer accent-blue-600 group-hover:bg-slate-800 transition-all border border-slate-800"
            />
        </div>
    </div>
);
