import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Shield, Clock } from 'lucide-react';
import { Staff } from '../types';
import { STAFF_ROLES } from '../constants';

interface TestersProps {
  staff: Staff[];
}

export default function TestersView({ staff }: TestersProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStaff = useMemo(() => {
    return [...staff]
      .filter(s => s.username?.toLowerCase().includes(searchQuery.toLowerCase()) || s.discord_id.includes(searchQuery))
      .sort((a, b) => {
        const priorityA = STAFF_ROLES[a.role as keyof typeof STAFF_ROLES]?.priority || 999;
        const priorityB = STAFF_ROLES[b.role as keyof typeof STAFF_ROLES]?.priority || 999;
        if (priorityA !== priorityB) return priorityA - priorityB;
        return a.display_order - b.display_order;
      });
  }, [staff, searchQuery]);

  const onlineCount = staff.filter(s => s.status !== 'Offline').length;

  const getStatusColor = (status: Staff['status']) => {
    switch (status) {
      case 'Online': return 'bg-emerald-500';
      case 'Idle': return 'bg-yellow-500';
      case 'Do Not Disturb': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-emerald-500 font-bold text-sm">{onlineCount} Online</span>
           </div>
           <div className="text-gray-500 font-bold text-sm">Total: {staff.length}</div>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-brand-primary transition-colors" />
          <input
            type="text"
            placeholder="Search testers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 h-12 pl-12 pr-4 rounded-xl bg-black/40 border border-white/10 focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all outline-none text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStaff.map((member, idx) => {
            const roleConfig = STAFF_ROLES[member.role as keyof typeof STAFF_ROLES];
            
            return (
              <motion.div
                key={member.discord_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] rounded-3xl transition-opacity" />
                <div className={`relative p-6 rounded-3xl bg-black/40 border transition-all flex items-center gap-4 ${roleConfig?.frame || 'border-white/5 group-hover:border-white/10'}`}>
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-full bg-white/5 border overflow-hidden ${roleConfig?.color ? 'border-current' : 'border-white/10'}`}>
                       <img 
                        src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.discord_id}`} 
                        alt={member.username}
                        className="w-full h-full object-cover"
                       />
                    </div>
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-4 border-[#050505] ${getStatusColor(member.status)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold truncate transition-colors ${roleConfig?.color || 'text-white'}`}>
                      {member.username || `User_${member.discord_id.slice(-4)}`}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${roleConfig?.color || 'text-emerald-400 opacity-80'}`}>
                        {member.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                       <Shield className={`w-3 h-3 ${roleConfig?.color || 'text-brand-primary'}`} />
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">{member.status}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
        })}
      </div>
    </div>
  );
}
