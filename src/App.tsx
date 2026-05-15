import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { Player, Staff } from './types';
import Navbar from './components/Navbar';
import HomeView from './components/Home';
import RankingsView from './components/Rankings';
import TestersView from './components/Testers';
import GuideView from './components/Guide';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [players, setPlayers] = useState<Player[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: playersData, error: playersError } = await supabase
          .from('players')
          .select('*');

        const { data: staffData, error: staffError } = await supabase
          .from('staff')
          .select('*');

        if (playersError) throw playersError;
        if (staffError) throw staffError;

        setPlayers(playersData || []);

        // Fetch real Discord info for staff
        const API_BASE = "https://arise-proxy.fixoraq008.workers.dev/user";
        const enrichedStaffPromises = (staffData || []).map(async (s: any) => {
          let info: Staff = {
            ...s,
            username: s.role, // Fallback to role
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${s.discord_id}`,
            status: 'Offline'
          };

          try {
            const res = await fetch(`${API_BASE}/${s.discord_id}`).then(r => r.json());
            if (res.success && res.data) {
              const u = res.data.discord_user;
              info.username = u.global_name || u.username;
              if (u.avatar) {
                info.avatar = `https://cdn.discordapp.com/avatars/${s.discord_id}/${u.avatar}.png`;
              }
              const st = res.data.discord_status;
              if (st === 'online') info.status = 'Online';
              else if (st === 'idle') info.status = 'Idle';
              else if (st === 'dnd') info.status = 'Do Not Disturb';
            }
          } catch (e) {
            console.error(`Error fetching discord info for ${s.discord_id}:`, e);
          }
          return info;
        });

        const resolvedStaff = await Promise.all(enrichedStaffPromises);
        setStaff(resolvedStaff);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
          <span className="font-display font-bold text-brand-primary tracking-widest animate-pulse">LOADING ARISE...</span>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeView onViewRankings={() => setActiveSection('rankings')} />;
      case 'rankings':
        return <RankingsView players={players} />;
      case 'testers':
        return <TestersView staff={staff} />;
      case 'guide':
        return <GuideView />;
      default:
        return <HomeView onViewRankings={() => setActiveSection('rankings')} />;
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-brand-primary selection:text-black">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
}
