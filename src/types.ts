export interface Player {
  id: string;
  ign: string;
  region: string;
  tiers: Record<string, string>;
  points: number;
  created_at: string;
}

export interface Staff {
  discord_id: string;
  role: string;
  created_at: string;
  display_order: number;
  username?: string;
  avatar?: string;
  status: 'Online' | 'Idle' | 'Do Not Disturb' | 'Offline';
}

export type Gamemode = 'Crystal' | 'Mace' | 'Sword' | 'Nethpot' | 'Axe' | 'SMP' | 'Potion' | 'UHC';

export interface TierInfo {
  points: number;
  label: string;
  color: string;
}
