const icons = {
  overall: "https://i.ibb.co/YThnm0DD/overall.jpg",
  sword: "https://i.ibb.co/4q5XZD1/sword.jpg",
  mace: "https://i.ibb.co/DHYd2KcH/mace.jpg",
  axe: "https://i.ibb.co/Vc73Q3sV/axe.jpg",
  uhc: "https://i.ibb.co/7tWt3CvQ/uhc.jpg",
  pot: "https://i.ibb.co/TqvdKKCg/pot.jpg",
  smp: "https://i.ibb.co/zhMLjTFK/smp.jpg",
  nethpot: "https://i.ibb.co/QRjqZ1d/nethpot.jpg",
  crystal: "https://i.ibb.co/Qj6Rzzjn/crystal.jpg"
};

const pointValues = { "HT1": 25, "LT1": 20, "HT2": 16, "LT2": 13, "HT3": 10, "LT3": 6, "HT4": 4, "LT4": 2, "HT5": 1, "LT5": 1 };

const players = [
  { ign: "Legend_008", region: "AS", role: "OWNER", tiers: { sword: "HT4", mace: "LT3", crystal: "HT5" } },
  { ign: "tgbeast_2", region: "AS/AU", role: "FIGHTER", tiers: { smp: "LT3" } },
  { ign: "XtremeGamerOP_", region: "AS/AU", role: "FIGHTER", tiers: { sword: "LT3" } },
  { ign: "Crotoov", region: "AS/AU", role: "FIGHTER", tiers: { sword: "LT3" } },
  { ign: "_realmiss", region: "EU", role: "FIGHTER", tiers: { sword: "LT3" } },
  { ign: "Not_Rohit_yt", region: "AS/AU", role: "FIGHTER", tiers: { sword: "LT3" } },
  { ign: "TECHTYAGI_", region: "AS/AU", role: "FIGHTER", tiers: { sword: "LT3" } },
  { ign: "Elden_Boss", region: "AS", role: "APPRENTICE", tiers: { nethpot: "LT4", mace: "LT4", crystal: "HT5" } },
  { ign: "Zenkai_Slice", region: "AS", role: "FIGHTER", tiers: { mace: "HT4" } },
  { ign: "Captain_levi", region: "AS", role: "APPRENTICE", tiers: { axe: "HT4" } },
  { ign: "Vlaan58996", region: "AS", role: "APPRENTICE", tiers: { nethpot: "HT5", mace: "LT4" } }
];

let currentMode = 'overall';

function render() {
  const body = document.getElementById('leaderboardBody');
  body.innerHTML = "";

  let list = players.map(p => {
    let score = 0;
    if (currentMode === 'overall') {
      Object.values(p.tiers).forEach(t => score += (pointValues[t] || 0));
    } else {
      score = pointValues[p.tiers[currentMode]] || 0;
    }
    return { ...p, score };
  })
  .filter(p => currentMode === 'overall' || p.tiers[currentMode])
  .sort((a, b) => b.score - a.score);

  list.forEach((p, i) => {
    const row = document.createElement('tr');
    row.className = `player-row rank-${i + 1}`;
    
    const stickersHtml = currentMode === 'overall' 
      ? Object.entries(p.tiers).map(([m, t]) => `<div class="sticker"><img src="${icons[m]}"><span>${t}</span></div>`).join('')
      : `<div class="sticker"><img src="${icons[currentMode]}"><span>${p.tiers[currentMode]}</span></div>`;

    row.innerHTML = `
      <td style="padding-left:30px; font-weight:900;">#${i + 1}</td>
      <td style="display:flex; align-items:center; gap:15px; padding:15px;">
        <img src="https://mc-heads.net/avatar/${p.ign}/42" style="border-radius:6px;">
        <div><div style="font-weight:800;">${p.ign}</div><div style="font-size:10px; color:#555;">${p.role}</div></div>
      </td>
      <td style="color:#ff4d4d; font-weight:800; font-size:11px;">${p.region}</td>
      <td><div class="sticker-list">${stickersHtml}</div></td>
      <td><span class="points-pill">${p.score} PTS</span></td>
    `;
    body.appendChild(row);
  });
}

function switchTab(mode) {
  currentMode = mode;
  document.querySelectorAll('.tab-btn').forEach(b => {
    const txt = b.querySelector('span').innerText.toLowerCase();
    b.classList.toggle('active', txt === mode.toLowerCase());
  });
  render();
}
window.onload = render;