import { motion } from 'motion/react';
import { ChevronDown, Trophy, Users, MessageSquare } from 'lucide-react';

interface HomeProps {
  onViewRankings: () => void;
}

export default function HomeView({ onViewRankings }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 pt-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8">
          <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-primary">Minecraft PvP Rankings</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight mb-6 flex flex-col items-center leading-none">
          <span className="text-white drop-shadow-2xl">Arise</span>
          <span className="text-brand-primary glow-gold italic">TierList</span>
        </h1>

        <p className="max-w-xl mx-auto text-gray-400 text-lg mb-12 leading-relaxed">
          The definitive ranking platform for Arise Testing Server. 
          Step into the arena, prove your skill, and claim your rightful place among legends.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onViewRankings}
            className="px-8 py-4 rounded-2xl bg-brand-primary text-black font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-primary/20"
          >
            <Trophy className="w-5 h-5" />
            <span>View Rankings</span>
          </button>
          <button
            onClick={() => window.open('https://discord.gg/BS6YYDpK6z', '_blank')}
            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center gap-3 hover:bg-white/10 active:scale-95 transition-all backdrop-blur-xl"
          >
            <Users className="w-5 h-5" />
            <span>Join Community</span>
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-[10px] font-bold tracking-widest uppercase">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>

      {/* Hero Sections from screenshot 2, 3, 4 */}
      <div className="mt-40 w-full max-w-5xl space-y-40 pb-40">
        <section className="text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl font-display font-bold mb-12 flex items-center justify-center gap-4"
          >
            <span className="text-brand-primary">⚔️</span>
            <span>What is Arise Tierlist?</span>
            <span className="text-brand-primary">⚔️</span>
          </motion.h2>
          <div className="p-10 rounded-3xl premium-blur text-left max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              In Minecraft PvP, skill is what counts. Knowing your place can really change things. Arise Tierlist 
              is a community that ranks players based on their combat skills through fair and competitive 1v1 matches.
            </p>
            <p className="text-gray-400">
              Whether you're a crack user or a premium player, we test everyone fairly to ensure a just ranking. 
              Our system is transparent, community-driven, and constantly evolving.
            </p>
          </div>
        </section>

        <section className="text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl font-display font-bold mb-4 flex items-center justify-center gap-4"
          >
            <span className="text-brand-primary">◎</span>
            <span>Tier System</span>
            <span className="text-brand-primary">◎</span>
          </motion.h2>
          <p className="text-gray-500 mb-12">5 tiers, each with High and Low sub-levels. Focused on 1v1 skill.</p>
          
          <div className="grid gap-4 max-w-2xl mx-auto">
            {[
              { id: 5, label: 'Tier 5', desc: 'Beginner level', color: 'border-gray-500 bg-gray-500/5' },
              { id: 4, label: 'Tier 4', desc: 'Developing skills', color: 'border-emerald-500 bg-emerald-500/5' },
              { id: 3, label: 'Tier 3', desc: 'Intermediate', color: 'border-blue-500 bg-blue-500/5' },
              { id: 2, label: 'Tier 2', desc: 'Advanced', color: 'border-purple-500 bg-purple-500/5' },
              { id: 1, label: 'Tier 1', desc: 'Elite players', color: 'border-brand-primary bg-brand-primary/5', crown: true },
            ].reverse().map((tier) => (
              <div key={tier.id} className={`flex items-center gap-6 p-6 rounded-2xl border ${tier.color} transition-all hover:scale-[1.02]`}>
                <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center font-display font-black text-xl">
                  {tier.id}
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`font-bold ${tier.color.split(' ')[0].replace('border-', 'text-')}`}>{tier.label}</h3>
                  <p className="text-sm text-gray-500">{tier.desc}</p>
                </div>
                {tier.crown && <Trophy className="w-5 h-5 text-brand-primary" />}
              </div>
            ))}
          </div>
        </section>

        <section className="text-center p-20 rounded-[4rem] bg-brand-primary/5 border border-brand-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px]" />
          <h2 className="text-5xl font-display font-black mb-6">Ready to Prove Yourself?</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto">
            Join the community, get tested, and claim your rightful tier among the best Minecraft PvP players.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.open('https://discord.gg/BS6YYDpK6z', '_blank')}
              className="px-6 py-4 sm:px-10 sm:py-5 rounded-2xl bg-brand-accent text-white font-bold flex items-center gap-3 shadow-lg shadow-brand-accent/20 transition-transform hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Join Discord</span>
            </button>
            <button 
              onClick={onViewRankings} 
              className="px-6 py-4 sm:px-10 sm:py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center gap-3 backdrop-blur-md hover:bg-white/10 transition-all active:scale-95"
            >
              <Trophy className="w-5 h-5" />
              <span>View Rankings</span>
            </button>
          </div>
        </section>
      </div>

      <footer className="w-full max-w-7xl mx-auto py-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-brand-primary" />
          <span className="font-display font-bold text-white">Arise Tierlist</span>
        </div>
        <p>© 2026 Arise Tierlist. All rights reserved.</p>
      </footer>
    </div>
  );
}
