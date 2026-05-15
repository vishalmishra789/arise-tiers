import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Sword, Shield, Target, Zap, Waves, Axe, Hammer, Info, ChevronRight, Trophy, Clock } from 'lucide-react';
import { ICON_MAP } from '../constants';

export default function GuideView() {
  const [activeTab, setActiveTab] = useState<'gamemodes' | 'tutorial'>('gamemodes');
  const [selectedGM, setSelectedGM] = useState<string | null>(null);

  const guides = [
    {
      id: 'Sword',
      title: 'Sword PvP',
      icon: Sword,
      color: 'border-blue-500 bg-blue-500/5',
      eval: [
        'Fights will be FT10',
        'Minimum score for LT3: 7-10 against LT3 Tester',
        'Minimum score for HT3 Eval: 10-6 against LT3 Tester'
      ],
      high: [
        'Fights will be FT10',
        'Minimum score for HT3: 7-10 against HT3',
        'T2+ Fights will be based on True Score'
      ],
      kit: [
        '4 Armor Pieces (Protection III)',
        'Diamond Sword (Sweeping Edge III)'
      ]
    },
    {
      id: 'Potion',
      title: 'Potion PvP',
      icon: Waves,
      color: 'border-purple-500 bg-purple-500/5',
      eval: [
        'Fights will be FT5',
        'Minimum score for LT3: 3-5 against LT3 Tester',
        'Minimum score for HT3 Eval: 10-6 against LT3 Tester'
      ],
      high: [
        'Fights will be FT10',
        'Minimum score for HT3: 8-10 against HT3',
        'T2+ Fights will be FT15 and based on True Score'
      ],
      kit: [
        '4 Armor Pieces (Protection IV)',
        'Sharpness V Diamond Sword',
        'Power V, Punch II Bow',
        '24 Arrows'
      ]
    },
    {
      id: 'Nethpot',
      title: 'Netherite Potion',
      icon: Shield,
      color: 'border-orange-500 bg-orange-500/5',
      eval: [
        'Fights will be FT4',
        'Minimum score for LT3: 3-4 against LT3 Tester',
        'Minimum score for HT3 Eval: 4-2 against LT3 Tester'
      ],
      high: [
        'Fights will be FT4',
        'Minimum score for HT3: 3-4 against HT3 Tester',
        'Minimum score for LT2: 3-4 against LT2',
        'Minimum score for HT2: 3-4 against HT2',
        'Minimum score for LT1: 4-2 against all HT2s/LT2s'
      ],
      kit: [
        '4 Armor Pieces (Protection IV, Mending, Unbreaking III)',
        'Sharpness V Netherite Sword',
        '3 Totem of Undying'
      ]
    },
    {
       id: 'Crystal',
       title: 'Crystal PvP',
       icon: Zap,
       color: 'border-pink-500 bg-pink-500/5',
       eval_kit: [
         '14 Totems of Undying',
         'No Weakness Arrows',
         '(First to 3 Wins)'
       ],
       high_kit: [
         '8 Totems of Undying',
         '(First to 3 for HT3, 4 for T2+)'
       ],
       universal: [
         '64 Respawn Anchors',
         'No Enchanted Golden Apples',
         '1 Elytra (No Unbreaking/Mending)',
         '4 Netherite Armor Pieces'
       ]
    }
  ];

  return (
    <div className="min-h-screen pt-32 px-6 pb-20 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-primary/20 mb-6">
          <Book className="w-8 h-8 text-brand-primary" />
        </div>
        <h1 className="text-5xl font-display font-black mb-4 leading-tight">Complete Guide</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Your comprehensive resource for understanding testing procedures, 
          queue systems, and detailed gamemode specifications.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-16">
        <button
          onClick={() => setActiveTab('gamemodes')}
          className={`px-8 py-3 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'gamemodes' ? 'bg-brand-primary text-black' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}
        >
          <Sword className="w-5 h-5" />
          <span>Game Modes</span>
        </button>
        <button
          onClick={() => setActiveTab('tutorial')}
          className={`px-8 py-3 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'tutorial' ? 'bg-brand-primary text-black' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}
        >
          <Book className="w-5 h-5" />
          <span>Tutorial</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'gamemodes' ? (
          <motion.div
            key="gamemodes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
               {guides.map(g => (
                 <button
                  key={g.id}
                  onClick={() => {
                    const el = document.getElementById(g.id);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 hover:border-brand-primary/30 transition-all text-xs font-bold"
                 >
                   <img src={ICON_MAP[g.id]} className="w-4 h-4 rounded" alt="" />
                   <span>{g.id}</span>
                 </button>
               ))}
            </div>

            <div className="space-y-12">
              {guides.map(guide => (
                <div key={guide.id} id={guide.id} className={`p-8 rounded-[2.5rem] border ${guide.color} relative overflow-hidden group`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center p-2">
                       <img src={ICON_MAP[guide.id]} className="w-full h-full object-cover rounded-lg" alt="" />
                    </div>
                    <h2 className="text-3xl font-display font-black">{guide.title}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {guide.eval && (
                      <div className="space-y-4">
                        <h3 className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Evaluation Tests (LT3 and below)
                        </h3>
                        <ul className="space-y-2">
                          {guide.eval.map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-gray-400 text-sm leading-relaxed">
                              <span className="text-brand-primary mt-1">●</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.high && (
                      <div className="space-y-4">
                        <h3 className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          High Tests (HT3 and above)
                        </h3>
                        <ul className="space-y-2">
                          {guide.high.map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-gray-400 text-sm leading-relaxed">
                              <span className="text-brand-primary mt-1">●</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.eval_kit && (
                      <div className="space-y-4">
                        <h3 className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Evaluation Kit</h3>
                         <ul className="space-y-2">
                          {guide.eval_kit.map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-gray-400 text-sm leading-relaxed">
                              <span className="text-brand-primary mt-1">●</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.kit && (
                      <div className="space-y-4 col-span-full">
                        <h3 className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center gap-2">
                           <Shield className="w-4 h-4" />
                           {guide.id} Kit
                        </h3>
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                           {guide.kit.map((item, i) => (
                             <div key={i} className="flex items-center gap-3 text-xs text-gray-400">
                               <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                               {item}
                             </div>
                           ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tutorial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
             <div className="p-10 rounded-[3rem] border border-purple-500/30 bg-purple-500/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-400" />
                   </div>
                   <h2 className="text-3xl font-display font-black">Getting Started</h2>
                </div>

                <div className="space-y-6">
                   {[
                     "Turn on \"Show All Channels\" by clicking [1.21+] Central Tierlist in the top left corner of the server",
                     "Scroll down and go to request_test",
                     "Click Register / Update Profile",
                     "Choose your gamemode to be added to the waitlist",
                     "Wait patiently until a tester is available and opens queue"
                   ].map((step, i) => (
                     <div key={i} className="flex items-center gap-6 group">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xs font-black group-hover:bg-purple-500 group-hover:text-black transition-all">
                           {i + 1}
                        </div>
                        <p className="text-gray-300 font-medium">{step}</p>
                     </div>
                   ))}
                </div>
             </div>

             <div className="p-10 rounded-[3rem] border border-brand-accent/30 bg-brand-accent/5">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-brand-accent" />
                   </div>
                   <h2 className="text-3xl font-display font-black text-brand-accent">Queue System</h2>
                </div>
                <div className="space-y-4">
                   {[
                     "Being in the waitlist means you will be tested at some point, not immediately. Please be patient.",
                     "Join the queue when a tester pings with a button; it is for players ready to log on now.",
                     "If no testers are available, there is no open queue message.",
                     "Queues close when no testers remain active. Your position is not saved.",
                     "Press leave if you no longer want to be tested."
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-4 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                        <p>{item}</p>
                     </div>
                   ))}
                </div>
             </div>

             <div className="p-10 rounded-[3rem] border border-brand-primary/30 bg-brand-primary/5">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                      <Info className="w-6 h-6 text-brand-primary" />
                   </div>
                   <h2 className="text-3xl font-display font-black text-brand-primary">Definitions & Terms</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                   {[
                     { label: 'Equal Ping', desc: 'Both players within 50 ms relative to each other' },
                     { label: 'HT', desc: 'High Tier (e.g., HT3)' },
                     { label: 'LT', desc: 'Low Tier (e.g., LT3)' },
                     { label: 'FT', desc: 'First to (e.g., FT10)' }
                   ].map((item, i) => (
                     <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 rounded-full bg-purple-500" />
                           <span className="font-display font-black text-white">{item.label}</span>
                        </div>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
