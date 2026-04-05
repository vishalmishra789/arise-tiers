import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// Initialize Supabase with your provided keys
const supabase = createClient(
  'https://jhipshrdvmctznnqqpjw.supabase.co',
  'sb_publishable_FDXMOLse1zW8FL7Uv3JA_w_27S_ibXp'
);

export default function AriseNetwork() {
  const [players, setPlayers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const { data } = await supabase
      .from('players')
      .select('*')
      .order('total_points', { ascending: false });
    if (data) setPlayers(data);
  }

  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.ign.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || (p.tiers && p.tiers[filter]);
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-yellow-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full h-[90px] bg-[#050505]/90 backdrop-blur-xl border-b border-[#1f2026] flex justify-center items-center z-50">
        <div className="flex gap-8 text-[12px] font-black uppercase tracking-widest text-[#929292]">
          <button className="hover:text-white transition-colors text-yellow-500 border-b-2 border-yellow-500 pb-1">Leaderboard</button>
          <button className="hover:text-white transition-colors">Staff</button>
          <button className="hover:text-white transition-colors">Rules</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto pt-32 px-6">
        {/* Header Section */}
        <section className="text-center mb-20">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none mb-4">
            ARISE <span className="text-[#ffb400]">NETWORK</span>
          </h1>
          <p className="text-xl text-[#929292] max-w-2xl mx-auto">
            The elite standard for Minecraft combat analytics in the Asia region.
          </p>
        </section>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {['all', 'Crystal', 'Mace', 'Sword', 'Nethpot'].map((gm) => (
              <button 
                key={gm}
                onClick={() => setFilter(gm)}
                className={`px-6 py-3 rounded-xl font-bold text-[11px] uppercase border transition-all ${
                  filter === gm ? 'bg-[#1c1d23] border-[#ffb400] text-white' : 'bg-[#0d0e12] border-[#1f2026] text-[#929292]'
                }`}
              >
                {gm}
              </button>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Search Player..."
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#0d0e12] border border-[#1f2026] px-4 py-3 rounded-xl w-full md:w-64 focus:border-[#ffb400] outline-none transition-all"
          />
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-3">
          {filteredPlayers.map((player, index) => (
            <div key={player.ign} className="bg-[#0d0e12] border border-[#1f2026] p-5 rounded-2xl flex items-center justify-between hover:border-[#ffb400]/50 transition-colors">
              <div className="flex items-center gap-6">
                <span className={`w-10 h-10 flex items-center justify-center rounded-lg font-black ${
                  index === 0 ? 'bg-[#ffb400] text-black shadow-[0_0_15px_rgba(255,180,0,0.3)]' : 'bg-[#1f2026]'
                }`}>
                  {index + 1}
                </span>
                <div className="flex items-center gap-3">
                  <img src={`https://mc-heads.net/avatar/${player.ign}/40`} className="rounded-lg" alt="skin" />
                  <span className="font-bold text-lg">{player.ign}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-[10px] text-[#929292] font-black uppercase">Points</div>
                  <div className="text-[#ffb400] font-black text-xl">{player.total_points}</div>
                </div>
                <div className="hidden md:flex gap-2">
                  {Object.entries(player.tiers || {}).map(([kit, tier]) => (
                    <span key={kit} className="bg-black border border-[#222] px-3 py-1 rounded-lg text-[10px] font-black text-[#ffb400]">
                      {kit}: {tier as string}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
