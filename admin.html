<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel | Arise Network</title>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        
        :root {
            --bg: #050505; --panel: #0d0e12; --border: #1f2026; --gold: #ffb400;
            --text-dim: #929292; --danger: #ff4d4d;
        }

        body { background: var(--bg); color: #fff; font-family: 'Inter', sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 900px; margin: 0 auto; display: none; }
        
        /* --- LOGIN --- */
        #login-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: var(--bg); display: flex; justify-content: center; align-items: center; z-index: 9999;
        }
        .login-box { background: var(--panel); padding: 40px; border-radius: 20px; border: 1px solid var(--border); width: 350px; text-align: center; }

        h1 { font-weight: 900; color: var(--gold); margin-bottom: 30px; }
        .tabs { display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
        .tab-btn { background: none; border: none; color: var(--text-dim); font-weight: 800; cursor: pointer; padding: 10px 20px; }
        .tab-btn.active { color: var(--gold); border-bottom: 2px solid var(--gold); }

        .admin-card { background: var(--panel); border: 1px solid var(--border); padding: 25px; border-radius: 20px; margin-bottom: 20px; }
        .section { display: none; }
        .section.active { display: block; }

        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 15px; }
        label { display: block; font-size: 10px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 5px; font-weight: 800; }
        
        input, select, textarea { 
            width: 100%; background: #16171d; border: 1px solid var(--border); color: #fff; 
            padding: 12px; border-radius: 10px; font-size: 14px; box-sizing: border-box;
        }

        button { 
            background: var(--gold); color: #000; border: none; padding: 12px 20px; 
            border-radius: 10px; font-weight: 800; cursor: pointer; transition: 0.2s; width: 100%;
        }
        .btn-del { background: none; border: 1px solid var(--danger); color: var(--danger); font-size: 11px; padding: 5px 10px; width: auto; cursor: pointer; }

        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th { text-align: left; color: var(--text-dim); font-size: 11px; padding: 12px; border-bottom: 1px solid var(--border); }
        td { padding: 12px; border-bottom: 1px solid var(--border); font-size: 13px; }
    </style>
</head>
<body>

<div id="login-overlay">
    <div class="login-box">
        <h2 style="margin-top:0">Staff Portal</h2>
        <input type="text" id="adminId" placeholder="Admin ID" style="margin-bottom:10px">
        <input type="password" id="adminPass" placeholder="Password" style="margin-bottom:20px">
        <button onclick="checkLogin()">Access Panel</button>
    </div>
</div>

<div class="container" id="adminContent">
    <h1>ADMIN <span style="color:white">PANEL</span></h1>

    <div class="tabs">
        <button class="tab-btn active" onclick="switchTab('players-sec', this)">Players</button>
        <button class="tab-btn" onclick="switchTab('testers-sec', this)">Staff / Testers</button>
        <button class="tab-btn" onclick="switchTab('ann-sec', this)">Announcements</button>
    </div>

    <div id="players-sec" class="section active">
        <div class="admin-card">
            <h3>Update Player Rank</h3>
            <div class="form-grid">
                <div><label>Player IGN</label><input type="text" id="ign"></div>
                <div><label>Region</label><select id="region"><option value="AS">Asia</option><option value="EU">Europe</option><option value="NA">NA</option></select></div>
            </div>
            
            <div class="form-grid" style="background: #111; padding: 15px; border-radius: 10px;">
                <div>
                    <label>Gamemode</label>
                    <select id="single-gm">
                        <option>Crystal</option><option>Mace</option><option>Sword</option><option>Nethpot</option>
                        <option>Axe</option><option>SMP</option><option>Potion</option><option>UHC</option>
                    </select>
                </div>
                <div>
                    <label>Tier</label>
                    <select id="single-tier">
                        <option value="RET">RET (0 pts)</option>
                        <option value="LT5">LT5 (1 pt)</option><option value="HT5">HT5 (2 pts)</option>
                        <option value="LT4">LT4 (4 pts)</option><option value="HT4">HT4 (8 pts)</option>
                        <option value="LT3">LT3 (12 pts)</option><option value="HT3">HT3 (16 pts)</option>
                        <option value="LT2">LT2 (20 pts)</option><option value="HT2">HT2 (24 pts)</option>
                        <option value="LT1">LT1 (32 pts)</option><option value="HT1">HT1 (40 pts)</option>
                    </select>
                </div>
            </div>
            <button onclick="savePlayer()">Update Player</button>
        </div>
        <div class="admin-card"><table id="playerTable"><thead><tr><th>IGN</th><th>Points</th><th>Action</th></tr></thead><tbody></tbody></table></div>
    </div>

    <div id="testers-sec" class="section">
        <div class="admin-card">
            <h3>Add Staff</h3>
            <div class="form-grid">
                <input type="text" id="t_discord" placeholder="Discord User">
                <input type="text" id="t_role" placeholder="Role (e.g. Senior Tester)">
            </div>
            <button onclick="saveTester()">Add to Staff</button>
        </div>
        <div class="admin-card"><table id="testerTable"><thead><tr><th>Discord</th><th>Role</th><th>Action</th></tr></thead><tbody></tbody></table></div>
    </div>

    <div id="ann-sec" class="section">
        <div class="admin-card">
            <h3>Post Announcement</h3>
            <input type="text" id="ann_title" placeholder="Title" style="margin-bottom:10px">
            <textarea id="ann_body" placeholder="Message..." rows="3" style="margin-bottom:15px"></textarea>
            <button onclick="saveAnn()">Post</button>
        </div>
        <div class="admin-card"><table id="annTable"><thead><tr><th>Title</th><th>Action</th></tr></thead><tbody></tbody></table></div>
    </div>
</div>

<script>
    const SB_URL = "https://zsdtlcyzhcfgcwqucdjd.supabase.co";
    const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZHRsY3l6aGNmZ2N3cXVjZGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDY2MDYsImV4cCI6MjA5MDEyMjYwNn0.IgjMXn3NbVw5nt8CvrJksD4NTEr26nLGwdytUgWFLe0";
    const supabaseClient = supabase.createClient(SB_URL, SB_KEY);
    
    // Points updated per your request
    const tierPoints = { "HT1": 40, "LT1": 32, "HT2": 24, "LT2": 20, "HT3": 16, "LT3": 12, "HT4": 8, "LT4": 4, "HT5": 2, "LT5": 1, "RET": 0 };

    function checkLogin() {
        if(document.getElementById('adminId').value === "Legend_008" && document.getElementById('adminPass').value === "VISHAL@2008") {
            document.getElementById('login-overlay').style.display = 'none';
            document.getElementById('adminContent').style.display = 'block';
            loadPlayers(); loadTesters(); loadAnns();
        } else { alert("Access Denied"); }
    }

    function switchTab(id, btn) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        btn.classList.add('active');
    }

    // --- PLAYERS ---
    async function savePlayer() {
        const ign = document.getElementById('ign').value.trim();
        const region = document.getElementById('region').value;
        const gm = document.getElementById('single-gm').value;
        const tier = document.getElementById('single-tier').value;
        if(!ign) return alert("Enter IGN");

        let { data: existing } = await supabaseClient.from('players').select('*').eq('ign', ign).maybeSingle();
        let pTiers = existing ? existing.tiers : {};
        pTiers[gm] = tier;

        let total = 0;
        Object.values(pTiers).forEach(t => { total += (tierPoints[t] || 0); });

        // Fixes the "Duplicate Key" error
        const { error } = await supabaseClient.from('players').upsert(
            { ign, region, tiers: pTiers, points: total }, 
            { onConflict: 'ign' }
        );

        if(error) alert(error.message);
        else { alert("Saved!"); loadPlayers(); }
    }

    async function loadPlayers() {
        const { data } = await supabaseClient.from('players').select('*').order('points', {ascending: false});
        document.querySelector('#playerTable tbody').innerHTML = (data || []).map(p => `<tr><td>${p.ign}</td><td>${p.points}</td><td><button class="btn-del" onclick="delData('players','ign','${p.ign}',loadPlayers)">Del</button></td></tr>`).join('');
    }

    // --- STAFF (Targeting table 'staff') ---
    async function saveTester() {
        await supabaseClient.from('staff').insert({ discord_id: document.getElementById('t_discord').value, role: document.getElementById('t_role').value });
        loadTesters();
    }

    async function loadTesters() {
        const { data } = await supabaseClient.from('staff').select('*');
        document.querySelector('#testerTable tbody').innerHTML = (data || []).map(t => `<tr><td>${t.discord_id}</td><td>${t.role}</td><td><button class="btn-del" onclick="delData('staff','discord_id','${t.discord_id}',loadTesters)">Del</button></td></tr>`).join('');
    }

    // --- ANNOUNCEMENTS ---
    async function saveAnn() {
        await supabaseClient.from('announcements').insert({ title: document.getElementById('ann_title').value, body: document.getElementById('ann_body').value });
        loadAnns();
    }
    async function loadAnns() {
        const { data } = await supabaseClient.from('announcements').select('*').order('created_at', {ascending: false});
        document.querySelector('#annTable tbody').innerHTML = (data || []).map(a => `<tr><td>${a.title}</td><td><button class="btn-del" onclick="delData('announcements','id','${a.id}',loadAnns)">Del</button></td></tr>`).join('');
    }

    async function delData(table, col, val, cb) {
        if(confirm("Confirm Delete?")) { await supabaseClient.from(table).delete().eq(col, val); cb(); }
    }
</script>
</body>
</html>
