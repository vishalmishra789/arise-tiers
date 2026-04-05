import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const supabase = createClient(
  'https://jhipshrdvmctznnqqpjw.supabase.co',
  'sb_publishable_FDXMOLse1zW8FL7Uv3JA_w_27S_ibXp'
);

const POINT_SCALE: Record<string, number> = {
  "HT1": 40, "LT1": 32, "HT2": 24, "LT2": 20, "HT3": 16, "LT3": 12, "HT4": 8, "LT4": 4, "HT5": 2, "LT5": 1
};

export default function AdminPanel() {
  const [form, setForm] = useState({ ign: '', reg: 'AS', kit: 'Crystal', tier: 'HT1' });

  async function handleUpdate() {
    // 1. Get existing data to merge tiers
    const { data: existing } = await supabase.from('players').select('tiers').eq('ign', form.ign).single();
    const newTiers = { ...(existing?.tiers || {}), [form.kit]: form.tier };
    
    // 2. Calculate new total points
    const newTotal = Object.values(newTiers).reduce((acc, t) => acc + (POINT_SCALE[t as string] || 0), 0);

    const { error } = await supabase.from('players').upsert({
      ign: form.ign,
      reg: form.reg,
      tiers: newTiers,
      total_points: newTotal
    });

    if (error) alert("Error: " + error.message);
    else alert("Player updated successfully!");
  }

  async function handleDelete() {
    if (!confirm(`Delete ${form.ign}?`)) return;
    const { error } = await supabase.from('players').delete().eq('ign', form.ign);
    if (error) alert(error.message);
    else alert("Player removed.");
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 flex flex-col items-center">
      <div className="bg-[#0d0e12] border border-[#1f2026] p-8 rounded-3xl w-full max-w-md">
        <h2 className="text-[#ffb400] text-2xl font-black mb-6">ADMIN CONTROL</h2>
        <input 
          className="w-full bg-black border border-[#333] p-3 rounded-xl mb-4"
          placeholder="Minecraft IGN"
          onChange={(e) => setForm({...form, ign: e.target.value})}
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select className="bg-black border border-[#333] p-3 rounded-xl" onChange={(e) => setForm({...form, kit: e.target.value})}>
            <option value="Crystal">Crystal</option>
            <option value="Mace">Mace</option>
            <option value="Sword">Sword</option>
          </select>
          <select className="bg-black border border-[#333] p-3 rounded-xl" onChange={(e) => setForm({...form, tier: e.target.value})}>
            {Object.keys(POINT_SCALE).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <button onClick={handleUpdate} className="w-full bg-[#ffb400] text-black font-black p-4 rounded-xl mb-2">SAVE DATA</button>
        <button onClick={handleDelete} className="w-full bg-red-600 text-white font-black p-4 rounded-xl">DELETE PLAYER</button>
      </div>
    </div>
  );
}
