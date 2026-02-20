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
                    <div key={asset.id} className="glass-card p-5 group hover:border-app-primary/30 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-app-background rounded-lg group-hover:bg-app-primary/10 transition-colors border border-app-border">
                                <asset.icon className="w-5 h-5 text-app-primary" />
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
                        <div className="text-sm font-bold text-app-text">{asset.type}</div>
                        <div className="text-[10px] text-app-text-dim font-medium mb-3">{asset.model}</div>
                        <div className="h-1 w-full bg-app-background rounded-full overflow-hidden border border-app-border">
                            <div
                                className={cn("h-full transition-all duration-1000", asset.battery !== 'N/A' ? 'bg-app-primary' : 'bg-app-text-dim')}
                                style={{ width: asset.battery !== 'N/A' ? asset.battery : '100%' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Personnel Directory */}
                <div className="xl:col-span-2 glass-card p-0 overflow-hidden">
                    <div className="p-6 border-b border-app-border flex items-center justify-between bg-app-card/30">
                        <h3 className="text-sm font-bold text-app-text-dim uppercase tracking-widest flex items-center gap-2">
                            <Users className="w-4 h-4 text-app-primary" />
                            Personnel Strategic Directory
                        </h3>
                        <div className="flex gap-2">
                            <button className="text-[10px] font-bold px-3 py-1.5 rounded bg-app-primary hover:brightness-110 transition-colors text-white">ADD UNIT</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-app-border text-[10px] font-black uppercase text-app-text-dim tracking-tighter">
                                    <th className="px-6 py-4">Officer Details</th>
                                    <th className="px-6 py-4">Current Unit</th>
                                    <th className="px-6 py-4">Operational Status</th>
                                    <th className="px-6 py-4 text-right pr-12">Action Hub</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-app-border/50">
                                {personnel.map((p) => (
                                    <tr key={p.id} className="hover:bg-app-card/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-app-card flex items-center justify-center text-[10px] font-bold border border-app-border group-hover:border-app-primary/50">
                                                    {p.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-app-text">{p.name}</div>
                                                    <div className="text-[10px] text-app-text-dim">{p.rank}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-app-text-dim font-medium">#{p.unit}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", p.pulse)} />
                                                <span className="text-[10px] font-bold text-app-text-dim uppercase">{p.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right pr-8">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 hover:bg-app-card rounded text-app-text-dim"><Phone className="w-3 h-3" /></button>
                                                <button className="p-1.5 hover:bg-app-card rounded text-app-text-dim"><Radio className="w-3 h-3" /></button>
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
                    <h3 className="text-sm font-bold mb-6 text-app-text-dim uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-4 h-4 text-app-success" />
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
                                <div className="text-[10px] font-black text-app-text-dim mb-1">{item.time} HOURS</div>
                                <div className="text-xs font-bold text-app-text">{item.task}</div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 rounded-lg border border-app-border text-[10px] font-bold hover:bg-app-card transition-colors uppercase tracking-widest text-app-text-dim">
                        Full Roster View
                    </button>
                </div>
            </div>
        </div>
    );
};
