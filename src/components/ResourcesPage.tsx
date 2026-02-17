import React from 'react';
import { Users, Truck, Radio, MapPin, Phone, ShieldCheck, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

const personnel = [
    { id: 1, name: 'Vikram Singh', rank: 'DIG', unit: 'Zone 4 Strategic', status: 'Active', pulse: 'bg-emerald-500' },
    { id: 2, name: 'Ananya Sharma', rank: 'ACP', unit: 'Intelligence Unit', status: 'On-Call', pulse: 'bg-blue-500' },
    { id: 3, name: 'Sanjay Dutt', rank: 'DCP', unit: 'Operations', status: 'Field', pulse: 'bg-amber-500' },
    { id: 4, name: 'Rahul Varma', rank: 'Inspector', unit: 'Zone 2 Response', status: 'Active', pulse: 'bg-emerald-500' },
    { id: 5, name: 'Priya Mani', rank: 'SI', unit: 'Cyber Lab', status: 'Active', pulse: 'bg-emerald-500' },
];

const assets = [
    { id: 1, type: 'Patrol Vehicle', model: 'Scorpio-N (Modified)', status: 'Operational', battery: '92%', icon: Truck },
    { id: 2, type: 'Surveillance Drone', model: 'DJI Matrice 300', status: 'Charging', battery: '45%', icon: Radio },
    { id: 3, type: 'Mobile Command Post', model: 'BNS Unit 7', status: 'Deployed', battery: '100%', icon: MapPin },
    { id: 4, type: 'Forensic Kit', model: 'Level 4 Bio', status: 'In-Transit', battery: 'N/A', icon: ShieldCheck },
];

export const ResourcesPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Asset Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {assets.map((asset) => (
                    <div key={asset.id} className="glass-card p-5 group hover:border-blue-500/30 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-600/10 transition-colors">
                                <asset.icon className="w-5 h-5 text-blue-500" />
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                asset.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-500' :
                                    asset.status === 'Charging' ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-blue-500/10 text-blue-500'
                            )}>
                                {asset.status}
                            </span>
                        </div>
                        <div className="text-sm font-bold text-slate-100">{asset.type}</div>
                        <div className="text-[10px] text-slate-500 font-medium mb-3">{asset.model}</div>
                        <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full transition-all duration-1000", asset.battery !== 'N/A' ? 'bg-blue-500' : 'bg-slate-700')}
                                style={{ width: asset.battery !== 'N/A' ? asset.battery : '100%' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Personnel Directory */}
                <div className="xl:col-span-2 glass-card p-0 overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/30">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            Personnel Strategic Directory
                        </h3>
                        <div className="flex gap-2">
                            <button className="text-[10px] font-bold px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 transition-colors">ADD UNIT</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-800 text-[10px] font-black uppercase text-slate-500 tracking-tighter">
                                    <th className="px-6 py-4">Officer Details</th>
                                    <th className="px-6 py-4">Current Unit</th>
                                    <th className="px-6 py-4">Operational Status</th>
                                    <th className="px-6 py-4">Action Hub</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {personnel.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold border border-slate-700 group-hover:border-blue-500/50">
                                                    {p.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-200">{p.name}</div>
                                                    <div className="text-[10px] text-slate-500">{p.rank}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400 font-medium">#{p.unit}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", p.pulse)} />
                                                <span className="text-[10px] font-bold text-slate-300 uppercase">{p.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 hover:bg-slate-700 rounded"><Phone className="w-3 h-3" /></button>
                                                <button className="p-1.5 hover:bg-slate-700 rounded"><Radio className="w-3 h-3" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Operations Schedule */}
                <div className="glass-card p-6">
                    <h3 className="text-sm font-bold mb-6 text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        Next 24h Deployment
                    </h3>
                    <div className="space-y-6">
                        {[
                            { time: '18:00', task: 'Shift Change - Zone 4 Delta', color: 'border-blue-500' },
                            { time: '21:00', task: 'Night Patrol Launch (Urban Core)', color: 'border-amber-500' },
                            { time: '00:00', task: 'Drone Perimeter Sweep', color: 'border-purple-500' },
                            { time: '04:00', task: 'Rapid Response Test Drills', color: 'border-emerald-500' },
                        ].map((item, i) => (
                            <div key={i} className={cn("pl-4 border-l-2 py-1", item.color)}>
                                <div className="text-[10px] font-black text-slate-500 mb-1">{item.time} HOURS</div>
                                <div className="text-xs font-bold text-slate-200">{item.task}</div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 rounded-lg border border-slate-800 text-[10px] font-bold hover:bg-slate-800 transition-colors uppercase tracking-widest">
                        Full Roster View
                    </button>
                </div>
            </div>
        </div>
    );
};
