import { TierInfo } from './types';

export const GAMEMODES = [
  'Crystal', 'Mace', 'Sword', 'Nethpot', 'Axe', 'SMP', 'Potion', 'UHC'
] as const;

export const ICON_MAP: Record<string, string> = {
  Crystal: "https://i.ibb.co/Qj6Rzzjn/crystal.jpg",
  Mace: "https://i.ibb.co/DHYd2KcH/mace.jpg",
  Sword: "https://i.ibb.co/4q5XZD1/sword.jpg",
  Nethpot: "https://i.ibb.co/QRjqZ1d/nethpot.jpg",
  Axe: "https://i.ibb.co/Vc73Q3sV/axe.jpg",
  SMP: "https://i.ibb.co/zhMLjTFK/smp.jpg",
  Potion: "https://i.ibb.co/TqvdKKCg/pot.jpg",
  UHC: "https://i.ibb.co/7tWt3CvQ/uhc.jpg"
};

export const TIER_POINTS: Record<string, number> = {
  "HT1": 40, "LT1": 32, 
  "HT2": 24, "LT2": 20, 
  "HT3": 16, "LT3": 12, 
  "HT4": 8, "LT4": 4, 
  "HT5": 2, "LT5": 1, 
  "RET": 0
};

export const TIER_CONFIG: Record<string, TierInfo> = {
  "HT1": { points: 40, label: "HT1", color: "text-tier-ht1" },
  "LT1": { points: 32, label: "LT1", color: "text-tier-lt1" },
  "HT2": { points: 24, label: "HT2", color: "text-tier-ht2" },
  "LT2": { points: 20, label: "LT2", color: "text-tier-lt2" },
  "HT3": { points: 16, label: "HT3", color: "text-tier-ht3" },
  "LT3": { points: 12, label: "LT3", color: "text-tier-lt3" },
  "HT4": { points: 8, label: "HT4", color: "text-tier-ht4" },
  "LT4": { points: 4, label: "LT4", color: "text-tier-lt4" },
  "HT5": { points: 2, label: "HT5", color: "text-tier-ht5" },
  "LT5": { points: 1, label: "LT5", color: "text-tier-lt5" },
  "RET": { points: 0, label: "RET", color: "text-gray-500" },
};

export const TITLES = [
  { name: "Combat Grandmaster", min: 400, color: "text-red-500", icon: "👑" },
  { name: "Combat Master", min: 250, color: "text-yellow-500", icon: "⭐" },
  { name: "Combat Ace", min: 100, color: "text-yellow-400", icon: "✦" },
  { name: "Combat Specialist", min: 50, color: "text-purple-400", icon: "✦" },
  { name: "Combat Cadet", min: 20, color: "text-blue-400", icon: "✧" },
  { name: "Combat Novice", min: 10, color: "text-emerald-400", icon: "✧" },
  { name: "Rookie", min: 0, color: "text-gray-400", icon: "○" },
];

export const STAFF_ROLES = {
  "Founder": { priority: 1, color: "text-red-500", frame: "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-red-500/5" },
  "Network Owner": { priority: 2, color: "text-orange-500", frame: "border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)] bg-orange-500/5" },
  "Manager": { priority: 3, color: "text-purple-500", frame: "border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] bg-purple-500/5" },
  "Developer": { priority: 4, color: "text-blue-500", frame: "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] bg-blue-500/5" },
  "Discord mod": { priority: 5, color: "text-indigo-400", frame: "border-indigo-400/50 bg-indigo-400/5" },
  "Screensharer": { priority: 6, color: "text-emerald-400", frame: "border-emerald-400/50 bg-emerald-400/5" },
  "Sr Tester": { priority: 7, color: "text-yellow-400", frame: "border-yellow-400/50 bg-yellow-400/5" },
  "Verified Tester": { priority: 8, color: "text-pink-400", frame: "border-pink-400/50 bg-pink-400/5" },
  "Helper": { priority: 9, color: "text-gray-400", frame: "border-gray-400/50 bg-gray-400/5" }
} as const;
