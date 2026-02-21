import React, { useState, useMemo, useEffect } from 'react';
import { Target, Activity, Database, Users, TrendingUp, Info, MapPin, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { predictRisk } from '../lib/api';

export const PredictiveRiskCalculator = () => {
    const [weights, setWeights] = useState({
        alpha: 0.4, // Historical Crime
        beta: 0.3,  // Seasonality Impact
        gamma: 0.2, // Proximity to Police Station (1/D_ps)
        delta: 0.1, // Population Density
    });

    // --- LIVE PREDICTION STATE ---
    const [lat, setLat] = useState(18.9221);
    const [lon, setLon] = useState(72.8337);
    const [tod, setTod] = useState('Night');
    const [dist, setDist] = useState(1.5);
    const [liveScore, setLiveScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePredict = async () => {
        setLoading(true);
        try {
            const res = await predictRisk({
                latitude: lat,
                longitude: lon,
                time_of_day: tod,
                dist_to_ps: dist
            });
            setLiveScore(res.risk_score);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
        if (score > 8) return { text: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20 shadow-rose-500/5' };
        if (score > 5) return { text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20 shadow-amber-500/5' };
        return { text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20 shadow-emerald-500/5' };
    };

    const styles = getRiskStyles(liveScore || riskScore / 10);

    return (
        <div className="glass-card flex flex-col p-8 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-app-background rounded-lg border border-app-border">
                        <Target className="w-5 h-5 text-app-primary" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-app-text uppercase tracking-widest">Predictive Engine</h2>
                        <p className="text-[10px] text-app-text-dim font-bold uppercase tracking-tighter">BNS Predictive Engine v4.0</p>
                    </div>
                </div>

                <div className={cn("px-6 py-3 rounded-2xl border transition-all duration-500 flex flex-col items-center gap-1 shadow-lg", styles.bg, styles.border)}>
                    <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", styles.text)}>Live Risk Level</span>
                    <div className={cn("text-3xl font-black italic tracking-tighter", styles.text)}>
                        {liveScore !== null ? liveScore : riskScore}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                {/* Manual Weights */}
                <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-app-primary uppercase tracking-[0.2em] mb-4">Weight Calibration</h3>
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
                </div>

                {/* AI Prediction Tool */}
                <div className="space-y-4 bg-app-background/50 p-4 rounded-2xl border border-app-border">
                    <h3 className="text-[10px] font-black text-app-accent uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> AI Live Inference
                    </h3>

                    <div className="space-y-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-bold text-app-text-dim uppercase">Target Lat/Lon</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={lat}
                                    onChange={e => setLat(parseFloat(e.target.value))}
                                    className="w-1/2 bg-app-card border border-app-border rounded-lg px-2 py-1 text-xs text-app-text outline-none"
                                />
                                <input
                                    type="number"
                                    value={lon}
                                    onChange={e => setLon(parseFloat(e.target.value))}
                                    className="w-1/2 bg-app-card border border-app-border rounded-lg px-2 py-1 text-xs text-app-text outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-bold text-app-text-dim uppercase">Temporal Context</label>
                            <select
                                value={tod}
                                onChange={e => setTod(e.target.value)}
                                className="bg-app-card border border-app-border rounded-lg px-2 py-1 text-xs text-app-text outline-none"
                            >
                                <option>Morning</option>
                                <option>Afternoon</option>
                                <option>Evening</option>
                                <option>Night</option>
                            </select>
                        </div>

                        <button
                            onClick={handlePredict}
                            disabled={loading}
                            className="w-full py-2 bg-app-primary text-white text-[10px] font-black uppercase rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all mt-2"
                        >
                            {loading ? 'ANALYZING...' : 'RUN RF_REGRESSOR'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-app-border">
                <div className="bg-app-background p-4 rounded-2xl border border-app-border relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-app-primary/5 blur-3xl rounded-full" />
                    <code className="text-[9px] text-app-primary font-black font-mono block mb-2 tracking-wider">
                        UPLINK: STATUS_ACTIVE // MODEL: RF_V4
                    </code>
                    <div className="flex items-start gap-3">
                        <Info className="w-4 h-4 text-app-text-dim shrink-0 mt-0.5" />
                        <p className="text-[9px] leading-relaxed text-app-text-dim font-medium">
                            Live inference uses a pre-trained Random Forest model based on 1000+ synthetic BNS records calibrated to Mumbai geography.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Slider = ({ label, icon: Icon, value, onChange }: any) => (
    <div className="space-y-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Icon className="w-3 h-3 text-app-text-dim" />
                <span className="text-[9px] font-black text-app-text-dim uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-[9px] font-black text-app-primary italic">{(value * 100).toFixed(0)}%</span>
        </div>
        <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-1 bg-app-card rounded-full appearance-none cursor-pointer accent-app-primary border border-app-border"
        />
    </div>
);
