import { motion } from 'motion/react';
import { Trophy, MessageSquare, Home, ListOrdered, ShieldCheck, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rankings', label: 'Rankings', icon: ListOrdered },
    { id: 'testers', label: 'Testers', icon: ShieldCheck },
    { id: 'guide', label: 'Guide', icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 pointer-events-auto">
        <div className="px-3 py-1 flex items-center gap-2 mr-4 border-r border-white/10">
          <Trophy className="w-5 h-5 text-brand-primary fill-brand-primary/20" />
          <span className="font-display font-bold text-sm tracking-tight hidden sm:block">ARISE</span>
        </div>
        
        <div className="flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}
              `}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={`w-4 h-4 transition-colors ${activeSection === item.id ? 'text-brand-primary' : ''}`} />
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="ml-4 pl-4 border-l border-white/10 hidden sm:block">
          <a 
            href="https://discord.gg/BS6YYDpK6z" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-brand-accent/20 transition-all group"
          >
            <MessageSquare className="w-4 h-4 group-hover:text-brand-accent" />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
