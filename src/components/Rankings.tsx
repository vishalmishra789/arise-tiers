import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Info, Trophy, MapPin, ExternalLink, X } from 'lucide-react';
import { Player, Gamemode } from '../types';
import { ICON_MAP, GAMEMODES, TITLES, TIER_CONFIG } from '../constants';

interface RankingsProps {
  players: Player[];
}

export default function RankingsView({ players }: RankingsProps) {
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode | 'Overall'>('Overall');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showRankSystem, setShowRankSystem] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Simple debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredPlayers = useMemo(() => {
    let result = [...players];
    
    if (selectedGamemode !== 'Overall') {
      result = result.filter(p => p.tiers && p.tiers[selectedGamemode]);
    }

    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(p => p.ign.toLowerCase().includes(searchLower));
    }

    // Sort
    if (selectedGamemode === 'Overall') {
      result.sort((a, b) => b.points - a.points);
    } else {
      // Sort by tier weight
      const tierWeight = (tier: string) => {
        const weights: Record<string, number> = {
          HT1: 50, LT1: 45, HT2: 40, LT2: 35, HT3: 30, LT3: 25, HT4: 20, LT4: 15, HT5: 10, LT5: 5, RET: 0
        };
        return weights[tier] || 0;
      };
      result.sort((a, b) => tierWeight(b.tiers[selectedGamemode]) - tierWeight(a.tiers[selectedGamemode]));
    }

    return result;
  }, [players, selectedGamemode, searchQuery]);

  const getTitle = (points: number) => {
    return TITLES.find(t => points >= t.min) || TITLES[TITLES.length - 1];
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4 p-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl">
          <button
            onClick={() => setSelectedGamemode('Overall')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedGamemode === 'Overall' ? 'bg-brand-primary text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Trophy className="w-4 h-4" />
            <span>OVERALL</span>
          </button>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex gap-1">
            {GAMEMODES.map(gm => (
              <button
                key={gm}
                onClick={() => setSelectedGamemode(gm)}
                className={`p-1.5 rounded-xl transition-all border ${selectedGamemode === gm ? 'bg-white/10 border-white/20' : 'border-transparent grayscale hover:grayscale-0 hover:bg-white/5'}`}
              >
                <img src={ICON_MAP[gm]} alt={gm} className="w-7 h-7 rounded-lg object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-brand-primary transition-colors" />
          <input
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 h-12 pl-12 pr-4 rounded-xl bg-black/40 border border-white/10 focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all outline-none text-sm"
          />
        </div>
      </div>

      {/* Info Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="text-gray-500 text-xs font-bold tracking-widest uppercase">
            {filteredPlayers.length} Ranked Players
          </div>
          {selectedGamemode !== 'Overall' && (
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400" /> High Tier</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Low Tier</span>
            </div>
          )}
        </div>
        <button 
          onClick={() => setShowRankSystem(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-bold transition-all"
        >
          <Info className="w-4 h-4 text-brand-primary" />
          <span>Information</span>
        </button>
      </div>

      {/* Grid for Gamemode specific view */}
      {selectedGamemode !== 'Overall' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* We'll group by Tier blocks as in screenshot */}
          {[1, 2, 3, 4, 5].map(tierNum => {
            const highTier = `HT${tierNum}`;
            const lowTier = `LT${tierNum}`;
            const playersInTier = filteredPlayers.filter(p => p.tiers[selectedGamemode] === highTier || p.tiers[selectedGamemode] === lowTier);
            
            if (playersInTier.length === 0) return null;

            return (
              <div key={tierNum} className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-900/10 border border-purple-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    <span className="font-display font-bold uppercase tracking-tight">Tier {tierNum}</span>
                  </div>
                  <div className="flex gap-3 text-[10px]">
                    <span className="text-red-400">{playersInTier.filter(p => p.tiers[selectedGamemode].startsWith('HT')).length}</span>
                    <span className="text-emerald-400">{playersInTier.filter(p => p.tiers[selectedGamemode].startsWith('LT')).length}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {playersInTier.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => setSelectedPlayer(p)}
                      className={`w-full p-4 rounded-2xl bg-black/40 border transition-all hover:scale-[1.02] flex items-center justify-between group ${p.tiers[selectedGamemode].startsWith('HT') ? 'border-red-500/20 hover:border-red-500/40' : 'border-emerald-500/20 hover:border-emerald-500/40'}`}
                    >
                      <div className="flex items-center gap-4">
                        <img src={`https://mc-heads.net/avatar/${p.ign}/32`} className="w-8 h-8 rounded-lg" alt="" />
                        <span className="font-bold text-sm">{p.ign}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 rounded bg-black/40 text-[10px] font-bold text-brand-accent uppercase">{p.region}/AU</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List for Overall view */
        <div className="space-y-8">
          <div className="grid gap-4">
            {filteredPlayers.slice(0, visibleCount).map((player, idx) => {
              const title = getTitle(player.points);
              const isTop3 = idx < 3;
              const rankStyles = [
                "bg-rank-1/10 border-rank-1/30 glow-rank-1 text-rank-1",
                "bg-rank-2/10 border-rank-2/30 text-rank-2",
                "bg-rank-3/10 border-rank-3/30 text-rank-3"
              ];
              
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.01, 0.3) }}
                  onClick={() => setSelectedPlayer(player)}
                  className={`group relative cursor-pointer rounded-2xl border transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] overflow-hidden ${isTop3 ? rankStyles[idx] : "bg-white/[0.03] border-white/5 hover:border-white/10"}`}
                >
                  <div className="relative p-3 sm:p-5 sm:px-8 flex items-center gap-3 sm:gap-6">
                    {/* Rank Badge */}
                    <div className={`flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-black/40 font-display font-black text-sm sm:text-lg flex-shrink-0 border border-white/5 ${isTop3 ? "" : "text-gray-500 group-hover:text-brand-primary"}`}>
                      {idx === 0 ? "👑" : idx + 1}
                    </div>
                    
                    {/* Player Info */}
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <img src={`https://mc-heads.net/avatar/${player.ign}/64`} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-2xl flex-shrink-0" alt={player.ign} />
                      <div className="truncate">
                        <h3 className="font-bold text-sm sm:text-base group-hover:text-brand-primary transition-colors truncate">{player.ign}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5 truncate">
                          <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${title.color}`}>
                            <span>{title.icon}</span>
                            {title.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="flex flex-col items-center flex-shrink-0 px-4 sm:px-6 border-x border-white/5">
                      <span className={`text-lg sm:text-2xl font-black font-display tracking-tight ${isTop3 ? "text-inherit" : "text-brand-primary"}`}>{player.points}</span>
                      <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest">Points</span>
                    </div>

                    {/* Region */}
                    <div className="hidden md:flex px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] font-black tracking-widest flex-shrink-0">
                      {player.region}/AU
                    </div>

                    {/* Tiers List (Matching Screenshot) */}
                  <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0 min-w-[300px] justify-end pr-2">
                    {GAMEMODES.map((gm) => {
                      const tier = player.tiers?.[gm];
                      const config = tier ? TIER_CONFIG[tier] : null;
                      
                      return (
                        <div key={gm} className="flex flex-col items-center gap-1 group/tier relative">
                          <div className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${tier ? "bg-white/10 border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.05)]" : "bg-black/20 border-white/5 opacity-10 grayscale"}`}>
                            <img src={ICON_MAP[gm]} className="w-5 h-5 rounded-sm object-cover" alt={gm} loading="lazy" />
                            {tier && (
                              <div className="absolute inset-0 bg-brand-primary/5 animate-pulse rounded-full pointer-events-none" />
                            )}
                          </div>
                          {tier ? (
                            <div className={`px-1 rounded-sm bg-black/60 border border-white/5 text-[6px] font-black uppercase tracking-tighter ${config?.color || 'text-gray-400'}`}>
                              {tier}
                            </div>
                          ) : (
                            <div className="h-[10px]" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {visibleCount < filteredPlayers.length && (
            <div className="flex justify-center pb-10">
              <button 
                onClick={() => setVisibleCount(prev => prev + 50)}
                className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-95 shadow-xl"
              >
                Load More Players
              </button>
            </div>
          )}
        </div>
      )}

      {/* Ranking System Modal */}
      <AnimatePresence>
        {showRankSystem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowRankSystem(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-[2rem] bg-[#0A0A0A] border border-white/10 p-10 overflow-auto max-h-[80vh] custom-scrollbar"
            >
              <button 
                onClick={() => setShowRankSystem(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                    <Info className="w-5 h-5 text-brand-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-black tracking-tight">Ranking System</h2>
                </div>
                <p className="text-gray-500 text-sm">Each rank you earn in any game mode gives you points. Your total points across all game modes determine your overall ranking position and title.</p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 px-1 border-l-2 border-brand-primary pl-3">Points per Rank</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(TIER_CONFIG).filter(([k]) => k !== 'RET').map(([key, info]) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black bg-black/40 border border-white/10 group-hover:scale-110 transition-transform ${info.color}`}>{key}</span>
                        <span className="font-bold text-sm text-brand-primary">{info.points} pts</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 px-1 border-l-2 border-brand-primary pl-3">Titles</h3>
                  <div className="space-y-2">
                    {TITLES.map((title) => (
                      <div key={title.name} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group transition-all hover:bg-white/10">
                        <div className="flex items-center gap-3">
                          <span className="text-xl group-hover:scale-125 transition-transform">{title.icon}</span>
                          <span className={`font-bold text-sm ${title.color}`}>{title.name}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{title.min}+ pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Player Detail Modal - MATCHING SCREENSHOT */}
      <AnimatePresence>
        {selectedPlayer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedPlayer(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-[420px] rounded-[2.5rem] bg-[#0A0A0A] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] mx-auto"
              >
              {/* Animated Background Pulse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-brand-primary/5 rounded-full blur-[100px] animate-pulse" />

              <div className="relative p-10 flex flex-col items-center">
                <button 
                  onClick={() => setSelectedPlayer(null)}
                  className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-3xl font-display font-black tracking-tight mb-8 text-white z-10">{selectedPlayer.ign}</h2>

                <div className="relative mb-8 group">
                   <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full scale-150 transition-transform group-hover:scale-[2]" />
                   <div className="relative w-32 h-48 bg-black/20 rounded-3xl border border-white/10 flex items-center justify-center p-4 overflow-hidden">
                      <img 
                        src={`https://mc-heads.net/body/${selectedPlayer.ign}/120`} 
                        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,184,0,0.3)]" 
                        alt={selectedPlayer.ign} 
                      />
                   </div>
                </div>

                <div className="flex flex-col items-center gap-4 mb-10 z-10">
                  <div className="shimmer relative inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-brand-primary/10 border border-brand-primary/50 text-brand-primary shadow-[0_0_50px_rgba(255,184,0,0.3)]">
                    <div className="absolute inset-0 bg-brand-primary/10 animate-pulse rounded-2xl" />
                    <span className="text-xl relative z-10">{getTitle(selectedPlayer.points).icon}</span>
                    <span className="text-sm font-black uppercase tracking-[0.2em] relative z-10">{getTitle(selectedPlayer.points).name}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedPlayer.region}/AU</span>
                    <a 
                      href={`https://namemc.com/profile/${selectedPlayer.ign}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2 rounded-xl bg-[#0072FF]/20 border border-[#0072FF]/30 text-white hover:bg-[#0072FF]/40 transition-all text-xs font-black uppercase tracking-widest"
                    >
                      <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                         <span className="text-[10px] text-black">N</span>
                      </div>
                      <span>NAMEMC →</span>
                    </a>
                  </div>
                </div>

                 <div className="w-full space-y-4 z-10">
                   <div className="p-0.5 rounded-3xl bg-gradient-to-r from-brand-primary/20 via-brand-accent/20 to-brand-primary/20 border border-white/5 shadow-2xl">
                    <div className="flex items-center justify-between p-4 px-6 rounded-[1.4rem] bg-black/90 relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-24 h-full bg-brand-primary/10 blur-2xl" />
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                           <Trophy className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">RANKING</span>
                           <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mt-0.5">OVERALL</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl sm:text-2xl font-black font-display text-white italic tracking-tighter decoration-brand-primary/50 underline underline-offset-4">
                          ({selectedPlayer.points} points)
                        </span>
                      </div>
                    </div>
                   </div>

                   <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                     <div className="grid grid-cols-4 gap-3 sm:gap-4">
                        {GAMEMODES.map((gm) => {
                          const tier = selectedPlayer.tiers?.[gm];
                          const config = tier ? TIER_CONFIG[tier] : null;
                          return (
                            <div key={gm} className="flex flex-col items-center gap-1.5 group/item">
                              <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${tier ? 'bg-white/10 border-white/20 shadow-lg' : 'bg-black/40 border-white/5 opacity-10'}`}>
                                <img src={ICON_MAP[gm]} className="w-3/5 h-3/5 object-contain" alt={gm} />
                                {tier && <div className="absolute inset-0 bg-brand-primary/5 rounded-full animate-pulse" />}
                              </div>
                              {tier && (
                                <div className={`px-1.5 py-0.5 rounded-sm bg-black/60 text-[6px] sm:text-[7px] font-black border border-white/5 whitespace-nowrap ${config?.color || 'text-gray-500'}`}>
                                  {tier}
                                </div>
                              )}
                            </div>
                          )
                        })}
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
