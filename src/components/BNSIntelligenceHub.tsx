import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const BNS_DATA = [
    { id: 'FIR-2023-001', section: '111', type: 'Organized Crime', victim: 'Govt. Property', status: 'Inquiry', risk: 'High' },
    { id: 'FIR-2023-002', section: '303', type: 'Larceny', victim: 'Individual', status: 'Arrested', risk: 'Medium' },
    { id: 'FIR-2023-003', section: '111', type: 'Organized Crime', victim: 'Private Enterprise', status: 'Pending', risk: 'Critical' },
    { id: 'FIR-2023-004', section: '304', type: 'Burglary', victim: 'Individual', status: 'Closed', risk: 'Low' },
    { id: 'FIR-2023-005', section: '70', type: 'Sexual Offences', victim: 'Individual', status: 'Trial', risk: 'High' },
    { id: 'FIR-2023-006', section: '111', type: 'Organized Crime', victim: 'Public Infrastructure', status: 'Inquiry', risk: 'High' },
];

export const BNSIntelligenceHub = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const filteredData = BNS_DATA.filter(item => {
        const matchesSearch = item.id.toLowerCase().includes(search.toLowerCase()) ||
            item.type.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || item.type === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="glass-card flex flex-col h-full min-h-[400px]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search FIR or Section..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Organized Crime">Organized Crime</option>
                        <option value="Larceny">Larceny</option>
                        <option value="Burglary">Burglary</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/30 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                            <th className="px-6 py-4">FIR Number</th>
                            <th className="px-6 py-4">BNS Section</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Current Status</th>
                            <th className="px-6 py-4">Risk Factor</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {filteredData.map((item) => (
                            <tr key={item.id} className="hover:bg-blue-500/5 transition-colors group">
                                <td className="px-6 py-4 text-sm font-medium text-slate-200">{item.id}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-slate-800 rounded text-[11px] font-mono text-blue-400">§ {item.section}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-400">{item.type}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={cn(
                                        "flex items-center gap-1.5",
                                        item.status === 'Arrested' ? 'text-emerald-500' : 'text-amber-500'
                                    )}>
                                        <div className={cn("w-1.5 h-1.5 rounded-full", item.status === 'Arrested' ? 'bg-emerald-500' : 'bg-amber-500')} />
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge risk={item.risk} />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-500">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Badge = ({ risk }: { risk: string }) => {
    const colors: Record<string, string> = {
        'Critical': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        'High': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        'Medium': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        'Low': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    };

    return (
        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 w-fit", colors[risk] || colors.Low)}>
            {risk === 'Critical' && <AlertCircle className="w-3 h-3" />}
            {risk}
        </span>
    );
};
