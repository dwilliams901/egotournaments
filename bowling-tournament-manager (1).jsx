import { useState, useEffect, useRef } from "react";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Bebas+Neue&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --red:#D0021B;--red-dk:#a50115;--red-lt:#ff1a33;
  --black:#0f0f0f;--black2:#1c1c1c;--black3:#2a2a2a;
  --gray-dk:#444;--gray:#777;--gray-lt:#aaa;
  --border:#e5e5e5;--border-dk:rgba(0,0,0,0.08);
  --surface:#f8f8f8;--surface2:#f0f0f0;
  --white:#fff;--text:#111;--text2:#666;
  --font-d:'Bebas Neue',sans-serif;
  --font-b:'Inter',sans-serif;
  --r:4px;--r2:8px;
}
body{background:var(--surface);color:var(--text);font-family:var(--font-b);font-size:14px;line-height:1.5}
.app{min-height:100vh;display:flex;flex-direction:column}

/* HEADER */
.hdr{background:var(--black);height:56px;padding:0 1.5rem;display:flex;align-items:center;gap:1rem;position:sticky;top:0;z-index:100;border-bottom:3px solid var(--red)}
.logo{font-family:var(--font-d);font-size:24px;letter-spacing:3px;color:white;cursor:pointer;display:flex;align-items:center;gap:10px}
.logo-pip{width:8px;height:8px;background:var(--red);border-radius:50%;flex-shrink:0}
.logo em{color:var(--red);font-style:normal}
.hdr-nav{margin-left:auto;display:flex;gap:4px}
.hnav{font-family:var(--font-d);font-size:15px;letter-spacing:1px;padding:5px 14px;border:none;border-radius:var(--r);cursor:pointer;transition:all .12s;background:transparent;color:rgba(255,255,255,.45)}
.hnav:hover{color:white;background:rgba(255,255,255,.07)}
.hnav.on{background:var(--red);color:white}

/* MAIN */
.main{flex:1;padding:1.5rem;max-width:1160px;margin:0 auto;width:100%}

/* CARD */
.card{background:white;border:1px solid var(--border);border-radius:var(--r2);padding:1.25rem;margin-bottom:1rem}
.sec-head{font-family:var(--font-d);font-size:17px;letter-spacing:1px;color:var(--black);margin-bottom:1rem;padding-bottom:.625rem;border-bottom:2px solid var(--red);display:flex;align-items:center;justify-content:space-between}

/* GRID */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.75rem}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem}

/* FORM */
.fl{font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--text2);display:block;margin-bottom:4px}
input[type=text],input[type=number],input[type=date],select,textarea{width:100%;height:36px;padding:0 10px;border:1px solid var(--border);border-radius:var(--r);font-family:var(--font-b);font-size:13px;background:white;color:var(--text);outline:none;transition:border-color .12s,box-shadow .12s}
textarea{height:auto;padding:8px 10px;resize:vertical}
input:focus,select:focus,textarea:focus{border-color:var(--red);box-shadow:0 0 0 2px rgba(208,2,27,.1)}
input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
input[type=number]{-moz-appearance:textfield;appearance:textfield}
input[type=checkbox]{width:16px;height:16px;accent-color:var(--red);cursor:pointer;flex-shrink:0}
.fg{display:flex;flex-direction:column;gap:4px;margin-bottom:.875rem}

/* BUTTONS */
.btn{font-family:var(--font-d);font-size:14px;letter-spacing:.8px;padding:8px 18px;border:none;border-radius:var(--r);cursor:pointer;transition:all .12s;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;flex-shrink:0}
.btn-red{background:var(--red);color:white}
.btn-red:hover{background:var(--red-dk)}
.btn-blk{background:var(--black);color:white}
.btn-blk:hover{background:var(--black2)}
.btn-out{background:white;border:1px solid var(--border);color:var(--text2)}
.btn-out:hover{border-color:var(--red);color:var(--red)}
.btn-ghost{background:transparent;color:var(--text2)}
.btn-ghost:hover{background:var(--surface2)}
.btn-sm{padding:5px 12px;font-size:13px}
.btn-xs{padding:3px 8px;font-size:11px}
.btn:disabled{opacity:.35;cursor:not-allowed}

/* BADGES */
.badge{font-size:10px;font-weight:700;padding:2px 7px;border-radius:2px;text-transform:uppercase;letter-spacing:.4px;flex-shrink:0}
.b-red{background:#ffe0e3;color:var(--red)}
.b-blk{background:var(--black);color:white}
.b-gray{background:var(--surface2);color:var(--text2)}
.b-green{background:#e0f5e9;color:#1a7a4a}
.b-blue{background:#dbeafe;color:#1d4ed8}
.b-amber{background:#fef3c7;color:#92400e}

/* TOGGLE */
.toggle{display:flex;border:1px solid var(--border);border-radius:var(--r);overflow:hidden}
.tbtn{flex:1;padding:7px 12px;font-family:var(--font-d);font-size:15px;letter-spacing:.5px;background:white;border:none;cursor:pointer;color:var(--text2);transition:all .1s}
.tbtn.on{background:var(--black);color:white}
.tbtn:not(:last-child){border-right:1px solid var(--border)}

/* TABS */
.tabs{display:flex;border-bottom:1px solid var(--border);margin-bottom:1.25rem}
.tab{font-family:var(--font-d);font-size:15px;letter-spacing:.5px;padding:10px 18px;border:none;background:transparent;cursor:pointer;color:var(--gray);border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .12s}
.tab:hover{color:var(--black)}
.tab.on{color:var(--red);border-bottom-color:var(--red)}

/* STATS */
.stat{background:var(--black);border-radius:var(--r2);padding:1rem;text-align:center}
.stat-v{font-family:var(--font-d);font-size:30px;letter-spacing:1px;color:white;line-height:1}
.stat-l{font-size:10px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:4px}

/* TABLE */
.tbl{width:100%;border-collapse:collapse;font-size:13px}
.tbl th{font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--text2);padding:8px 10px;background:var(--surface);border-bottom:1px solid var(--border);text-align:left}
.tbl td{padding:9px 10px;border-bottom:1px solid #f5f5f5;vertical-align:middle}
.tbl tr:last-child td{border-bottom:none}
.tbl tbody tr:hover td{background:#fafafa}
.tbl .rank{font-family:var(--font-d);font-size:18px;letter-spacing:.5px;color:var(--gray)}
.tbl .rank.p1{color:var(--red)}
.tbl .bname{font-weight:600;color:var(--black)}

/* SCORE ENTRY */
.se-wrap{overflow-x:auto}
.se-grid{width:100%;border-collapse:collapse}
.se-grid th{font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--text2);padding:7px 8px;background:var(--surface);border-bottom:2px solid var(--border);text-align:center;white-space:nowrap}
.se-grid th.left{text-align:left}
.se-grid td{border-bottom:1px solid #f5f5f5;padding:3px 4px;vertical-align:middle}
.se-grid tr:last-child td{border-bottom:none}
.se-grid tr:hover td{background:#fafafa}
.se-name{font-weight:600;font-size:13px;padding:0 8px;white-space:nowrap}
.se-lane{font-size:11px;color:var(--gray);padding:0 6px;text-align:center}
.sc-inp{height:34px;width:100%;min-width:44px;border:1px solid transparent;border-radius:var(--r);background:transparent;font-family:var(--font-b);font-size:14px;font-weight:700;text-align:center;color:var(--black);outline:none;padding:0 2px;transition:all .1s}
.sc-inp:focus{border-color:var(--red);background:white;box-shadow:0 0 0 2px rgba(208,2,27,.1);position:relative;z-index:1}
.sc-inp::placeholder{color:#ccc;font-weight:400;font-size:11px}
.sc-total{font-family:var(--font-d);font-size:16px;letter-spacing:.5px;text-align:right;padding:0 10px;color:var(--black);white-space:nowrap}
.sc-hdcp{font-size:11px;color:var(--red);text-align:right;padding:0 8px;white-space:nowrap}
.se-grid tr.scored td{background:#fefcfc}

/* BRACKET */
.br-wrap{overflow-x:auto;padding-bottom:1rem}
.br-inner{display:flex;gap:16px;padding:4px 2px}
.br-col{display:flex;flex-direction:column;min-width:160px}
.br-col-hd{font-family:var(--font-d);font-size:12px;letter-spacing:.5px;color:var(--text2);text-align:center;padding:6px 0 10px;text-transform:uppercase}
.br-match{background:white;border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px;overflow:hidden}
.bb{display:flex;align-items:center;justify-content:space-between;padding:7px 10px;gap:8px;border-bottom:1px solid #f5f5f5}
.bb:last-child{border-bottom:none}
.bb.bye{opacity:.3}
.bb.win{background:#fff0f1}
.bb-name{font-size:12px;font-weight:600;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bb-seed{font-size:10px;color:var(--gray);font-weight:700;margin-right:3px;flex-shrink:0}
.bb-score{font-family:var(--font-d);font-size:15px;letter-spacing:.5px;min-width:34px;text-align:right;color:var(--black);flex-shrink:0}
.bb-score.hi{color:var(--red);font-size:17px}

/* PAYOUT TABLE */
.po-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f5f5f5}
.po-row:last-child{border-bottom:none}
.po-place{font-family:var(--font-d);font-size:20px;letter-spacing:.5px;width:36px;color:var(--text2)}
.po-place.p1{color:var(--red)}
.po-pct{flex:1;height:6px;background:var(--surface2);border-radius:3px;overflow:hidden}
.po-fill{height:100%;background:var(--red);border-radius:3px;transition:width .3s}
.po-amt{font-family:var(--font-d);font-size:18px;letter-spacing:.5px;width:80px;text-align:right}

/* BANNER */
.banner{background:var(--black);border-radius:var(--r2);padding:1.25rem 1.5rem;margin-bottom:1.25rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;border-left:4px solid var(--red)}
.banner-name{font-family:var(--font-d);font-size:28px;letter-spacing:2px;color:white}
.banner-sub{font-size:12px;color:rgba(255,255,255,.4);margin-top:2px}
.banner-r{display:flex;gap:6px;flex-wrap:wrap;align-items:center}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:200;padding:1rem}
.modal{background:white;border-radius:var(--r2);padding:1.5rem;width:100%;max-width:580px;max-height:90vh;overflow-y:auto}
.modal-title{font-family:var(--font-d);font-size:22px;letter-spacing:1px;color:var(--black);margin-bottom:1.25rem;padding-bottom:.75rem;border-bottom:2px solid var(--red);display:flex;align-items:center;justify-content:space-between}

/* ALERT */
.alert{padding:10px 14px;border-radius:var(--r);font-size:12px;margin-bottom:1rem;border-left:3px solid}
.al-info{background:#dbeafe;border-color:#3b82f6;color:#1e40af}
.al-warn{background:#fff7cd;border-color:#d97706;color:#7c5e10}
.al-red{background:#ffe0e3;border-color:var(--red);color:var(--red-dk)}
.al-green{background:#e0f5e9;border-color:#1a7a4a;color:#1a7a4a}

/* MISC */
.row{display:flex;align-items:center;gap:.75rem}
.sp{flex:1}
.dvd{height:1px;background:#f0f0f0;margin:.75rem 0}
.empty{text-align:center;padding:3rem 1rem;color:var(--gray)}
.empty-h{font-family:var(--font-d);font-size:20px;letter-spacing:1px}
.empty-s{font-size:13px;margin-top:4px}
`;

// ── UTILS ──────────────────────────────────────────────
const genId = () => Math.random().toString(36).slice(2,9);
const sum = arr => (arr||[]).reduce((a,b) => a+(Number(b)||0), 0);
const calcHdcp = (avg, base=220, factor=0.9) => Math.max(0, Math.round((base-avg)*factor));
const shuffleArr = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const sortName = arr => [...arr].sort((a,b) => a.name.localeCompare(b.name));

// ── STANDINGS HELPER ────────────────────────────────────
function buildStandings(bowlers, t, thruRound) {
  const rounds = thruRound || (t.format==="fixed" ? 1 : (t.numBlocks||1));
  return (bowlers||[]).map(b => {
    const hdcpPG = t.type==="handicap" ? calcHdcp(b.avg, t.handicapBase, t.handicapFactor/100) : 0;
    let scratch=0, games=0;
    for(let r=1;r<=rounds;r++){ const rs=b.scores?.[r]||[]; scratch+=sum(rs); games+=rs.length; }
    const withHdcp = scratch + hdcpPG*games;
    const display = t.type==="handicap" ? withHdcp : scratch;
    return { ...b, scratch, withHdcp, display, games, hdcpPG };
  }).sort((a,b) => b.display-a.display);
}

// ── WHO SURVIVED CUT? ───────────────────────────────────
// Returns Set of bowler IDs that are still active going into `round`
function survivedCuts(bowlers, t, round) {
  if(t.format==="fixed" || !t.cutRounds?.length) return new Set(bowlers.map(b=>b.id));
  // Find the most recent cut that applies before this round
  const applicableCuts = (t.cutRounds||[])
    .filter(c => c.afterBlock < round)
    .sort((a,b) => b.afterBlock - a.afterBlock);
  if(!applicableCuts.length) return new Set(bowlers.map(b=>b.id));
  const cut = applicableCuts[0];
  const standings = buildStandings(bowlers, t, cut.afterBlock);
  const keep = cut.keepTopHalf ? Math.ceil(standings.length/2) : cut.keepTop;
  return new Set(standings.slice(0, keep).map(b=>b.id));
}

// ══════════════════════════════════════════════════════
// PAYOUT CALCULATOR — standalone tab
// ══════════════════════════════════════════════════════
// Standard payout structures by field size
const PAYOUT_STRUCTURES = {
  // [places, pct of pool each]
  small:  [ [1,0.50],[2,0.30],[3,0.20] ],
  medium: [ [1,0.40],[2,0.25],[3,0.18],[4,0.12],[5,0.05] ],
  large:  [ [1,0.35],[2,0.22],[3,0.16],[4,0.12],[5,0.08],[6,0.05],[7,0.02] ],
};

function getStructure(n) {
  if(n <= 8) return PAYOUT_STRUCTURES.small;
  if(n <= 24) return PAYOUT_STRUCTURES.medium;
  return PAYOUT_STRUCTURES.large;
}

function PayoutView({ tournament }) {
  const bowlers = tournament.bowlers || [];
  const entryFee = tournament.entryFee || 0;
  const bracketFee = tournament.bracketFee || 0;
  const bracketEntries = bowlers.filter(b=>b.inBracket).length;

  const paidEntries = bowlers.filter(b=>b.paid).length;
  const totalEntries = bowlers.length;
  const tourneyPool = paidEntries * entryFee;
  const bracketPool = bracketEntries * bracketFee;

  // Configurable split: % of pool going to prizes (rest = expenses/house)
  const [prizePct, setPrizePct] = useState(100);
  const [bracketPrizePct, setBracketPrizePct] = useState(100);
  const [customPlaces, setCustomPlaces] = useState(null); // null = auto

  const prizePool = Math.floor(tourneyPool * prizePct / 100);
  const bracketPrize = Math.floor(bracketPool * bracketPrizePct / 100);

  const struct = getStructure(customPlaces ?? paidEntries);
  const payouts = struct.map(([place, pct]) => ({
    place,
    amount: Math.floor(prizePool * pct),
    pct: pct * 100,
  }));
  const bracketPayouts = tournament.hasBrackets ? [
    { place:1, amount: Math.floor(bracketPrize*0.60), pct:60 },
    { place:2, amount: Math.floor(bracketPrize*0.30), pct:30 },
    { place:3, amount: Math.floor(bracketPrize*0.10), pct:10 },
  ] : [];

  const standings = buildStandings(bowlers, tournament);

  return (
    <div>
      {/* Config row */}
      <div className="g2" style={{marginBottom:"1rem"}}>
        <div className="card card-sm">
          <div className="sec-head" style={{fontSize:14,marginBottom:".75rem"}}>Tournament Pool</div>
          <div className="g2" style={{marginBottom:8}}>
            <div>
              <div className="fl" style={{marginBottom:2}}>Entry Fee ($)</div>
              <div style={{fontFamily:"var(--font-d)",fontSize:24,letterSpacing:.5}}>${entryFee}</div>
              <div style={{fontSize:11,color:"var(--text2)"}}>Set in tournament setup</div>
            </div>
            <div>
              <div className="fl" style={{marginBottom:2}}>Entries Paid</div>
              <div style={{fontFamily:"var(--font-d)",fontSize:24,letterSpacing:.5}}>{paidEntries} <span style={{fontSize:14,color:"var(--text2)"}}>/ {totalEntries}</span></div>
            </div>
          </div>
          <div style={{background:"var(--surface)",borderRadius:"var(--r)",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,fontWeight:600}}>Total Collected</span>
            <span style={{fontFamily:"var(--font-d)",fontSize:20,color:"var(--red)",letterSpacing:.5}}>${tourneyPool.toLocaleString()}</span>
          </div>
          <div className="fg" style={{marginTop:10,marginBottom:0}}>
            <label className="fl">Prize Pool % (rest = expenses)</label>
            <div className="row" style={{gap:8}}>
              <input type="number" value={prizePct} onChange={e=>setPrizePct(Math.min(100,Math.max(0,Number(e.target.value))))} min={0} max={100} style={{width:70}} />
              <span style={{fontSize:12,color:"var(--text2)"}}>→ <strong>${prizePool.toLocaleString()}</strong> prize pool</span>
            </div>
          </div>
        </div>

        {tournament.hasBrackets && (
          <div className="card card-sm">
            <div className="sec-head" style={{fontSize:14,marginBottom:".75rem"}}>Bracket Pool</div>
            <div className="g2" style={{marginBottom:8}}>
              <div>
                <div className="fl" style={{marginBottom:2}}>Bracket Fee ($)</div>
                <div style={{fontFamily:"var(--font-d)",fontSize:24,letterSpacing:.5}}>${bracketFee}</div>
              </div>
              <div>
                <div className="fl" style={{marginBottom:2}}>Bracket Entries</div>
                <div style={{fontFamily:"var(--font-d)",fontSize:24,letterSpacing:.5}}>{bracketEntries}</div>
              </div>
            </div>
            <div style={{background:"var(--surface)",borderRadius:"var(--r)",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,fontWeight:600}}>Bracket Pool</span>
              <span style={{fontFamily:"var(--font-d)",fontSize:20,color:"var(--red)",letterSpacing:.5}}>${bracketPool.toLocaleString()}</span>
            </div>
            <div className="fg" style={{marginTop:10,marginBottom:0}}>
              <label className="fl">Prize Pool %</label>
              <div className="row" style={{gap:8}}>
                <input type="number" value={bracketPrizePct} onChange={e=>setBracketPrizePct(Math.min(100,Math.max(0,Number(e.target.value))))} min={0} max={100} style={{width:70}} />
                <span style={{fontSize:12,color:"var(--text2)"}}>→ <strong>${bracketPrize.toLocaleString()}</strong> to winners</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={tournament.hasBrackets ? "g2" : ""}>
        {/* Tournament payouts */}
        <div className="card">
          <div className="sec-head">
            Tournament Payouts
            <div className="row" style={{gap:6}}>
              <span style={{fontSize:11,color:"var(--text2)"}}>Places:</span>
              <input type="number" value={customPlaces ?? struct.length} onChange={e=>setCustomPlaces(Math.max(1,Math.min(20,Number(e.target.value))))} min={1} max={20} style={{width:56,height:28,fontSize:12}} />
            </div>
          </div>
          {prizePool===0 && <div className="alert al-warn">Set an entry fee in tournament setup to see payouts.</div>}
          {payouts.map(({place,amount,pct},i)=>{
            const winner = standings[i];
            return (
              <div key={place} className="po-row">
                <div className={`po-place${place===1?" p1":""}`}>{place}</div>
                <div className="po-pct"><div className="po-fill" style={{width:`${pct}%`}}/></div>
                <div style={{fontSize:11,color:"var(--text2)",minWidth:36,textAlign:"right"}}>{pct.toFixed(0)}%</div>
                <div className="po-amt">${amount.toLocaleString()}</div>
                {winner && <div style={{fontSize:12,color:"var(--text2)",minWidth:100}}>{winner.name}</div>}
              </div>
            );
          })}
          <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",fontSize:12}}>
            <span style={{fontWeight:600}}>Total paid out</span>
            <span style={{fontFamily:"var(--font-d)",fontSize:16,letterSpacing:.5}}>${payouts.reduce((a,p)=>a+p.amount,0).toLocaleString()}</span>
          </div>
        </div>

        {/* Bracket payouts */}
        {tournament.hasBrackets && (
          <div className="card">
            <div className="sec-head">Bracket Payouts</div>
            {bracketPrize===0 && <div className="alert al-warn">No bracket pool to distribute.</div>}
            {bracketPayouts.map(({place,amount,pct})=>(
              <div key={place} className="po-row">
                <div className={`po-place${place===1?" p1":""}`}>{place}</div>
                <div className="po-pct"><div className="po-fill" style={{width:`${pct}%`}}/></div>
                <div style={{fontSize:11,color:"var(--text2)",minWidth:36,textAlign:"right"}}>{pct}%</div>
                <div className="po-amt">${amount.toLocaleString()}</div>
              </div>
            ))}
            <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",fontSize:12}}>
              <span style={{fontWeight:600}}>Total paid out</span>
              <span style={{fontFamily:"var(--font-d)",fontSize:16,letterSpacing:.5}}>${bracketPayouts.reduce((a,p)=>a+p.amount,0).toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// TOURNAMENT SETUP MODAL
// ══════════════════════════════════════════════════════
function TournamentModal({ existing, onSave, onClose }) {
  const blank = {
    name:"", location:"", date:new Date().toISOString().slice(0,10),
    type:"scratch", format:"fixed",
    gamesPerBlock:6, numBlocks:1,
    cutRounds:[{afterBlock:1,keepTop:5,keepTopHalf:false,games:3}],
    stepladderSpots:5, stepladderSeed:"high",
    handicapBase:220, handicapFactor:90,
    entryFee:0,
    hasBrackets:false, bracketFee:5, bracketGames:3,
  };
  const [f, sf] = useState(existing ? {...blank,...existing} : blank);
  const s = (k,v) => sf(p=>({...p,[k]:v}));
  const uc = (i,k,v) => { const c=[...f.cutRounds]; c[i]={...c[i],[k]: typeof v==="boolean"?v:Number(v)}; s("cutRounds",c); };
  const addCut = () => s("cutRounds",[...f.cutRounds,{afterBlock:f.numBlocks,keepTop:5,keepTopHalf:false,games:3}]);
  const rmCut = i => s("cutRounds",f.cutRounds.filter((_,j)=>j!==i));
  const isMulti = f.format!=="fixed";
  const save = () => {
    if(!f.name.trim()) return alert("Tournament name required");
    onSave({...f, id:existing?.id||genId(), bowlers:existing?.bowlers||[], bracketOrder:existing?.bracketOrder||null});
    onClose();
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-title">
          {existing?"Edit Tournament":"New Tournament"}
          <button className="btn btn-ghost btn-xs" onClick={onClose} style={{fontSize:18,padding:"2px 8px"}}>✕</button>
        </div>

        <div className="g2">
          <div className="fg"><label className="fl">Tournament Name</label><input value={f.name} onChange={e=>s("name",e.target.value)} placeholder="e.g. Spring Classic" autoFocus /></div>
          <div className="fg"><label className="fl">Bowling Center</label><input value={f.location} onChange={e=>s("location",e.target.value)} placeholder="e.g. Strikers Bowl" /></div>
        </div>
        <div className="g2">
          <div className="fg"><label className="fl">Date</label><input type="date" value={f.date} onChange={e=>s("date",e.target.value)} /></div>
          <div className="fg"><label className="fl">Entry Fee ($)</label><input type="number" value={f.entryFee} onChange={e=>s("entryFee",Number(e.target.value))} min={0} placeholder="0" /></div>
        </div>

        <div className="fg">
          <label className="fl">Tournament Type</label>
          <div className="toggle">
            <button className={`tbtn${f.type==="scratch"?" on":""}`} onClick={()=>s("type","scratch")}>Scratch</button>
            <button className={`tbtn${f.type==="handicap"?" on":""}`} onClick={()=>s("type","handicap")}>Handicap</button>
          </div>
        </div>

        {f.type==="handicap" && (
          <div className="g2" style={{background:"#fafafa",padding:".75rem",borderRadius:"var(--r)",border:"1px solid #eee",marginBottom:".875rem"}}>
            <div className="fg" style={{margin:0}}><label className="fl">Handicap Factor (%)</label><input type="number" value={f.handicapFactor} onChange={e=>s("handicapFactor",Number(e.target.value))} min={50} max={100} /><span style={{fontSize:11,color:"var(--text2)",marginTop:2}}>Typically 90%</span></div>
            <div className="fg" style={{margin:0}}><label className="fl">Handicap Base</label><input type="number" value={f.handicapBase} onChange={e=>s("handicapBase",Number(e.target.value))} min={100} max={300} /></div>
          </div>
        )}

        <div className="fg"><label className="fl">Format</label>
          <select value={f.format} onChange={e=>s("format",e.target.value)}>
            <option value="fixed">Fixed Games — bowl and done</option>
            <option value="qualifying">Multi-Round Qualifying with Cuts</option>
            <option value="stepladder">Full PBA Style — Qualifying → Cuts → Stepladder</option>
          </select>
        </div>

        <div className="g2">
          <div className="fg"><label className="fl">Primary Round Games</label><input type="number" value={f.gamesPerBlock} onChange={e=>s("gamesPerBlock",Number(e.target.value))} min={1} max={12} /></div>
          {isMulti && <div className="fg"><label className="fl">Number of Rounds</label><input type="number" value={f.numBlocks} onChange={e=>s("numBlocks",Number(e.target.value))} min={1} max={10} /></div>}
        </div>

        {isMulti && (
          <div className="fg">
            <div className="row" style={{marginBottom:8}}>
              <label className="fl" style={{margin:0}}>Cut Rounds</label>
              <div className="sp"/>
              <button className="btn btn-out btn-xs" onClick={addCut}>+ Add Cut</button>
            </div>
            {f.cutRounds.map((cut,i) => (
              <div key={i} style={{background:"#fafafa",border:"1px solid #eee",borderRadius:"var(--r)",padding:".75rem",marginBottom:8}}>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-end"}}>
                  <div className="fg" style={{flex:"1 1 70px",margin:0}}>
                    <label className="fl">After Round</label>
                    <select value={cut.afterBlock} onChange={e=>uc(i,"afterBlock",e.target.value)}>
                      {Array.from({length:f.numBlocks},(_,j)=><option key={j} value={j+1}>Round {j+1}</option>)}
                    </select>
                  </div>
                  <div className="fg" style={{flex:"1 1 70px",margin:0}}>
                    <label className="fl">Games to Bowl</label>
                    <input type="number" value={cut.games} onChange={e=>uc(i,"games",e.target.value)} min={1} max={12} />
                  </div>
                  <div className="fg" style={{flex:"1 1 70px",margin:0}}>
                    <label className="fl">Keep Top</label>
                    <input type="number" value={cut.keepTop} onChange={e=>uc(i,"keepTop",e.target.value)} min={2} max={200} disabled={cut.keepTopHalf} style={{opacity:cut.keepTopHalf?.4:1}} />
                  </div>
                  <div className="fg" style={{margin:0}}>
                    <label className="fl">Top Half?</label>
                    <div className="row" style={{height:36,gap:6}}>
                      <input type="checkbox" checked={!!cut.keepTopHalf} onChange={e=>uc(i,"keepTopHalf",e.target.checked)} />
                      <span style={{fontSize:11,color:"var(--text2)"}}>Auto 50%</span>
                    </div>
                  </div>
                  {f.cutRounds.length>1 && <button className="btn btn-ghost btn-xs" style={{marginBottom:2}} onClick={()=>rmCut(i)}>✕</button>}
                </div>
                <div style={{fontSize:11,color:"var(--text2)",marginTop:6}}>
                  {cut.keepTopHalf?"Top 50% advance":`Top ${cut.keepTop} advance`} · {cut.games} game{cut.games!==1?"s":""} bowled this cut
                </div>
              </div>
            ))}
          </div>
        )}

        {f.format==="stepladder" && (
          <div style={{background:"#fff5f5",border:"1px solid #ffd0d5",borderRadius:"var(--r)",padding:".75rem",marginBottom:".875rem"}}>
            <label className="fl" style={{marginBottom:8}}>Stepladder Finals</label>
            <div className="g2">
              <div className="fg" style={{margin:0}}><label className="fl">Bowlers in Finals</label>
                <select value={f.stepladderSpots} onChange={e=>s("stepladderSpots",Number(e.target.value))}>
                  <option value={3}>3 Bowlers</option><option value={4}>4 Bowlers</option><option value={5}>5 Bowlers (PBA Standard)</option>
                </select>
              </div>
              <div className="fg" style={{margin:0}}><label className="fl">Tie Breaker</label>
                <select value={f.stepladderSeed} onChange={e=>s("stepladderSeed",e.target.value)}>
                  <option value="high">Higher seed advances</option><option value="low">Lower seed advances</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="dvd"/>
        <div className="fg">
          <div className="row">
            <label className="fl" style={{margin:0}}>Enable Brackets</label>
            <span style={{fontSize:11,color:"var(--text2)"}}>Optional — separate entry fee</span>
            <div className="sp"/>
            <input type="checkbox" checked={f.hasBrackets} onChange={e=>s("hasBrackets",e.target.checked)} />
          </div>
        </div>
        {f.hasBrackets && (
          <div className="g2">
            <div className="fg"><label className="fl">Bracket Entry Fee ($)</label><input type="number" value={f.bracketFee} onChange={e=>s("bracketFee",Number(e.target.value))} min={1} /></div>
            <div className="fg"><label className="fl">Games Per Bracket</label><input type="number" value={f.bracketGames} onChange={e=>s("bracketGames",Number(e.target.value))} min={1} max={12} /></div>
          </div>
        )}

        <div className="row" style={{justifyContent:"flex-end",marginTop:".5rem"}}>
          <button className="btn btn-out" onClick={onClose}>Cancel</button>
          <button className="btn btn-red" onClick={save}>{existing?"Save Changes":"Create Tournament"}</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// BULK UPLOAD MODAL
// Accepts CSV or plain text: one bowler per line
// Formats: "Name", "Name,avg", "Name,avg,lane", "Name,avg,lane,paid,bracket"
// ══════════════════════════════════════════════════════
function BulkUploadModal({ tournament, onSave, onClose }) {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState("");

  const parse = (raw) => {
    const lines = raw.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
    const results = [];
    const errs = [];
    lines.forEach((line, i) => {
      const parts = line.split(/,|\t/).map(p=>p.trim());
      const name = parts[0];
      if(!name){ errs.push(`Line ${i+1}: missing name`); return; }
      const avg = parts[1] ? Math.min(300,Math.max(0,Number(parts[1])||180)) : 180;
      const lane = parts[2] || "";
      const paid = parts[3] ? ["1","true","yes","paid"].includes(parts[3].toLowerCase()) : false;
      const inBracket = parts[4] ? ["1","true","yes","bracket"].includes(parts[4].toLowerCase()) : false;
      results.push({ id:genId(), name, avg, laneAssignment:lane, paid, inBracket, scores:{} });
    });
    return { results, errs };
  };

  const handleText = (val) => {
    setText(val);
    const { results, errs } = parse(val);
    setPreview(results);
    setError(errs.join("\n"));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => handleText(ev.target.result);
    reader.readAsText(file);
  };

  const save = () => {
    if(!preview.length) return;
    const existing = tournament.bowlers||[];
    const merged = [...existing, ...preview.filter(p => !existing.find(e=>e.name.toLowerCase()===p.name.toLowerCase()))];
    onSave({...tournament, bowlers:merged});
    onClose();
  };

  return (
    <div className="overlay">
      <div className="modal" style={{maxWidth:620}}>
        <div className="modal-title">
          Bulk Add Bowlers
          <button className="btn btn-ghost btn-xs" onClick={onClose} style={{fontSize:18,padding:"2px 8px"}}>✕</button>
        </div>

        <div className="alert al-info">
          One bowler per line. Columns: <strong>Name, Average, Lane, Paid (yes/no), Bracket (yes/no)</strong><br/>
          Only Name is required. Example: <code>John Smith, 195, 5-6, yes, yes</code>
        </div>

        <div className="fg">
          <label className="fl">Upload CSV or Text File</label>
          <input type="file" accept=".csv,.txt" onChange={handleFile} style={{height:"auto",padding:"6px 10px"}} />
        </div>

        <div className="fg">
          <label className="fl">Or paste names directly</label>
          <textarea
            value={text}
            onChange={e=>handleText(e.target.value)}
            placeholder={"John Smith, 195, 5-6, yes\nJane Doe, 178, 7-8\nBob Johnson, 210"}
            style={{height:140,fontSize:13}}
          />
        </div>

        {error && <div className="alert al-warn" style={{whiteSpace:"pre-line"}}>{error}</div>}

        {preview.length>0 && (
          <div className="card" style={{padding:0,overflow:"hidden",marginBottom:0}}>
            <div style={{padding:"8px 12px",background:"var(--surface)",borderBottom:"1px solid var(--border)",fontSize:11,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:.5}}>
              {preview.length} bowler{preview.length!==1?"s":""} ready to import
            </div>
            <div style={{maxHeight:200,overflowY:"auto"}}>
              <table className="tbl">
                <thead><tr><th>Name</th><th>Avg</th><th>Lane</th><th>Paid</th>{tournament.hasBrackets&&<th>Bracket</th>}</tr></thead>
                <tbody>
                  {preview.map(b=>(
                    <tr key={b.id}>
                      <td className="bname">{b.name}</td>
                      <td>{b.avg}</td>
                      <td style={{color:"var(--text2)",fontSize:12}}>{b.laneAssignment||"—"}</td>
                      <td><span className={`badge ${b.paid?"b-green":"b-gray"}`}>{b.paid?"Yes":"No"}</span></td>
                      {tournament.hasBrackets&&<td><span className={`badge ${b.inBracket?"b-red":"b-gray"}`}>{b.inBracket?"Yes":"No"}</span></td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="row" style={{justifyContent:"flex-end",marginTop:"1rem"}}>
          <button className="btn btn-out" onClick={onClose}>Cancel</button>
          <button className="btn btn-red" onClick={save} disabled={preview.length===0}>
            Import {preview.length>0?`${preview.length} Bowlers`:""}
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// BOWLER MODAL
// ══════════════════════════════════════════════════════
function BowlerModal({ existing, tournament, onSave, onClose }) {
  const [f, sf] = useState(existing || {name:"",avg:180,laneAssignment:"",paid:false,inBracket:false});
  const s = (k,v) => sf(p=>({...p,[k]:v}));
  const hdcp = calcHdcp(Number(f.avg), tournament.handicapBase, tournament.handicapFactor/100);
  const save = () => {
    if(!f.name.trim()) return alert("Name required");
    onSave({...f, id:existing?.id||genId(), avg:Number(f.avg), scores:existing?.scores||{}});
    onClose();
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-title">
          {existing?"Edit Bowler":"Add Bowler"}
          <button className="btn btn-ghost btn-xs" onClick={onClose} style={{fontSize:18,padding:"2px 8px"}}>✕</button>
        </div>
        <div className="g2">
          <div className="fg"><label className="fl">Full Name</label><input value={f.name} onChange={e=>s("name",e.target.value)} placeholder="Name" autoFocus /></div>
          <div className="fg"><label className="fl">Average</label><input type="number" value={f.avg} onChange={e=>s("avg",Number(e.target.value))} min={0} max={300} /></div>
        </div>
        <div className="fg"><label className="fl">Lane Assignment</label><input value={f.laneAssignment} onChange={e=>s("laneAssignment",e.target.value)} placeholder="e.g. 5-6" /></div>
        {tournament.type==="handicap" && (
          <div className="alert al-info" style={{marginBottom:"1rem"}}>Handicap: <strong>+{hdcp} pins/game</strong> ({tournament.handicapFactor}% of ({tournament.handicapBase} − {f.avg}))</div>
        )}
        <div className="dvd"/>
        <div style={{display:"flex",gap:"1.5rem",marginBottom:".875rem",flexWrap:"wrap"}}>
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
            <input type="checkbox" checked={f.paid} onChange={e=>s("paid",e.target.checked)} />
            <span className="fl" style={{margin:0}}>Entry paid</span>
          </label>
          {tournament.hasBrackets && (
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
              <input type="checkbox" checked={f.inBracket} onChange={e=>s("inBracket",e.target.checked)} />
              <span className="fl" style={{margin:0}}>In bracket (${tournament.bracketFee})</span>
            </label>
          )}
        </div>
        <div className="row" style={{justifyContent:"flex-end"}}>
          <button className="btn btn-out" onClick={onClose}>Cancel</button>
          <button className="btn btn-red" onClick={save}>{existing?"Update":"Add Bowler"}</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// HOME VIEW
// ══════════════════════════════════════════════════════
function HomeView({ tournaments, onNew, onOpen, onDelete }) {
  return (
    <div>
      <div className="row" style={{marginBottom:"1.25rem"}}>
        <div>
          <h1 style={{fontFamily:"var(--font-d)",fontSize:34,letterSpacing:2}}>TOURNAMENTS</h1>
          <p style={{fontSize:13,color:"var(--text2)",marginTop:2}}>{tournaments.length} total</p>
        </div>
        <div className="sp"/>
        <button className="btn btn-red" onClick={onNew}>+ New Tournament</button>
      </div>
      {tournaments.length===0 ? (
        <div className="empty"><div style={{fontSize:40,opacity:.15,marginBottom:".75rem"}}>🎳</div><div className="empty-h">No Tournaments Yet</div><div className="empty-s">Create your first tournament to get started</div></div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {tournaments.map(t => {
            const sorted = buildStandings(t.bowlers||[], t);
            return (
              <div key={t.id} className="card" style={{cursor:"pointer",borderLeft:"3px solid var(--red)"}} onClick={()=>onOpen(t.id)}>
                <div className="row">
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"var(--font-d)",fontSize:22,letterSpacing:1}}>{t.name}</div>
                    <div style={{fontSize:12,color:"var(--text2)",marginTop:2}}>{[t.location,t.date].filter(Boolean).join(" · ")}</div>
                  </div>
                  <div className="row" style={{gap:6}}>
                    <span className={`badge ${t.type==="handicap"?"b-blue":"b-blk"}`}>{t.type}</span>
                    <span className="badge b-gray">{t.format==="fixed"?`${t.gamesPerBlock}G`:t.format}</span>
                    {t.hasBrackets && <span className="badge b-red">Brackets</span>}
                  </div>
                  <div style={{textAlign:"center",minWidth:52}}>
                    <div style={{fontFamily:"var(--font-d)",fontSize:24}}>{t.bowlers?.length||0}</div>
                    <div style={{fontSize:10,color:"var(--text2)",fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>Bowlers</div>
                  </div>
                  <button className="btn btn-ghost btn-xs" onClick={e=>{e.stopPropagation();if(confirm("Delete this tournament?"))onDelete(t.id);}} style={{color:"var(--gray-lt)"}}>✕</button>
                </div>
                {sorted.length>0 && (
                  <div className="row" style={{marginTop:10,paddingTop:10,borderTop:"1px solid #f5f5f5",gap:16,flexWrap:"wrap"}}>
                    {sorted.slice(0,3).map((b,i)=>(
                      <div key={b.id} style={{fontSize:12,display:"flex",alignItems:"center",gap:5}}>
                        <span style={{fontFamily:"var(--font-d)",fontSize:15,color:i===0?"var(--red)":"var(--gray)"}}>{i+1}</span>
                        <span style={{fontWeight:600}}>{b.name}</span>
                        <span style={{color:"var(--text2)"}}>{b.display}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// SCORE ENTRY — sorted A-Z, hides cut bowlers
// ══════════════════════════════════════════════════════
function ScoreEntry({ tournament, onUpdate }) {
  const totalRounds = tournament.format==="fixed" ? 1 : (tournament.numBlocks||1);
  const [round, setRound] = useState(1);
  const games = tournament.gamesPerBlock || 3;
  const refs = useRef({});

  // Only show bowlers who survived into this round
  const activeBowlerIds = survivedCuts(tournament.bowlers||[], tournament, round);
  const allBowlers = sortName((tournament.bowlers||[]).filter(b => activeBowlerIds.has(b.id)));

  const getVal = (b, gi) => {
    const v = b.scores?.[round]?.[gi];
    return (v===undefined||v===null||v===0) ? "" : String(v);
  };

  const setScore = (bowler, gi, raw) => {
    const val = raw===""?0:Math.min(300,Math.max(0,Number(raw)||0));
    const arr = Array.from({length:games},(_,k)=>bowler.scores?.[round]?.[k]??0);
    arr[gi] = val;
    const updated = {...bowler, scores:{...(bowler.scores||{}), [round]:arr}};
    onUpdate({...tournament, bowlers:tournament.bowlers.map(b=>b.id===bowler.id?updated:b)});
  };

  const focus = (bi, gi) => {
    const el = refs.current[`${bi}-${gi}`];
    if(el){el.focus();el.select();}
  };

  const handleKey = (e, bi, gi) => {
    if(e.key==="Enter"||e.key==="Tab"){
      e.preventDefault();
      let nbi=bi+1, ngi=gi;
      if(nbi>=allBowlers.length){nbi=0;ngi=gi+1;}
      if(ngi<games) focus(nbi,ngi);
    }
  };

  const cutInfo = round>1 ? (() => {
    const applicableCuts = (tournament.cutRounds||[]).filter(c=>c.afterBlock<round).sort((a,b)=>b.afterBlock-a.afterBlock);
    if(!applicableCuts.length) return null;
    const cut = applicableCuts[0];
    const total = (tournament.bowlers||[]).length;
    return { kept: allBowlers.length, cut: total - allBowlers.length };
  })() : null;

  return (
    <div>
      {totalRounds>1 && (
        <div className="row" style={{marginBottom:12}}>
          <span style={{fontSize:12,fontWeight:600,color:"var(--text2)",textTransform:"uppercase",letterSpacing:.5}}>Round:</span>
          {Array.from({length:totalRounds},(_,i)=>(
            <button key={i} className={`btn btn-sm ${round===i+1?"btn-blk":"btn-out"}`} onClick={()=>setRound(i+1)}>Round {i+1}</button>
          ))}
        </div>
      )}

      {cutInfo && cutInfo.cut>0 && (
        <div className="alert al-info" style={{marginBottom:12}}>
          Showing {cutInfo.kept} bowlers who made the cut · {cutInfo.cut} eliminated
        </div>
      )}

      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div className="se-wrap">
          <table className="se-grid">
            <thead>
              <tr>
                <th className="left" style={{paddingLeft:12}}>Bowler</th>
                <th>Lane</th>
                {Array.from({length:games},(_,i)=><th key={i}>Game {i+1}</th>)}
                <th style={{textAlign:"right",paddingRight:10}}>Total</th>
                {tournament.type==="handicap" && <th style={{textAlign:"right",paddingRight:10}}>+Hdcp</th>}
              </tr>
            </thead>
            <tbody>
              {allBowlers.length===0 && (
                <tr><td colSpan={99} style={{textAlign:"center",padding:"2rem",color:"var(--gray)"}}>No bowlers yet — add them in the Bowlers tab</td></tr>
              )}
              {allBowlers.map((b,bi) => {
                const rs = b.scores?.[round] || [];
                const sc = sum(rs);
                const hdcp = calcHdcp(b.avg, tournament.handicapBase, tournament.handicapFactor/100);
                const scored = rs.some(v=>Number(v)>0);
                return (
                  <tr key={b.id} className={scored?"scored":""}>
                    <td style={{paddingLeft:12}}><span className="se-name">{b.name}</span></td>
                    <td className="se-lane">{b.laneAssignment||"—"}</td>
                    {Array.from({length:games},(_,gi)=>(
                      <td key={gi} style={{padding:"3px 2px",minWidth:52}}>
                        <input
                          className="sc-inp"
                          type="number" min={0} max={300}
                          placeholder="—"
                          value={getVal(b,gi)}
                          onChange={e=>setScore(b,gi,e.target.value)}
                          onKeyDown={e=>handleKey(e,bi,gi)}
                          onFocus={e=>e.target.select()}
                          ref={el=>{refs.current[`${bi}-${gi}`]=el}}
                        />
                      </td>
                    ))}
                    <td className="sc-total">{scored?sc:<span style={{color:"#ccc"}}>—</span>}</td>
                    {tournament.type==="handicap" && (
                      <td className="sc-hdcp">{scored?`${sc+(hdcp*games)}`:<span style={{color:"#ccc"}}>—</span>}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{fontSize:11,color:"var(--text2)",marginTop:6}}>
        Press <kbd style={{background:"#f0f0f0",padding:"1px 5px",borderRadius:3,fontSize:10}}>Enter</kbd> or <kbd style={{background:"#f0f0f0",padding:"1px 5px",borderRadius:3,fontSize:10}}>Tab</kbd> to move down the column · Scores save automatically
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// STANDINGS VIEW
// ══════════════════════════════════════════════════════
function StandingsView({ tournament }) {
  const totalRounds = tournament.format==="fixed" ? 1 : (tournament.numBlocks||1);
  const [thru, setThru] = useState(totalRounds);
  const standings = buildStandings(tournament.bowlers||[], tournament, thru);

  const cuts = (tournament.format!=="fixed" ? tournament.cutRounds||[] : [])
    .filter(c=>c.afterBlock<=thru).sort((a,b)=>b.afterBlock-a.afterBlock);
  const activeCut = cuts[0];
  const cutPos = activeCut ? (activeCut.keepTopHalf?Math.ceil(standings.length/2):activeCut.keepTop) : null;

  if(standings.length===0) return <div className="empty"><div style={{fontSize:36,opacity:.15,marginBottom:8}}>🎳</div><div className="empty-h">No bowlers yet</div><div className="empty-s">Add bowlers in the Bowlers tab</div></div>;

  return (
    <div>
      {totalRounds>1 && (
        <div className="row" style={{marginBottom:12}}>
          <span style={{fontSize:12,fontWeight:600,color:"var(--text2)",textTransform:"uppercase",letterSpacing:.5}}>Through:</span>
          {Array.from({length:totalRounds},(_,i)=>(
            <button key={i} className={`btn btn-sm ${thru===i+1?"btn-blk":"btn-out"}`} onClick={()=>setThru(i+1)}>Round {i+1}</button>
          ))}
        </div>
      )}
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{width:44}}>Pos</th>
              <th>Bowler</th>
              <th>Avg</th>
              {tournament.type==="handicap" && <th>Hdcp/G</th>}
              {Array.from({length:thru},(_,i)=><th key={i}>R{i+1}</th>)}
              <th>Scratch</th>
              {tournament.type==="handicap" && <th>Total</th>}
            </tr>
          </thead>
          <tbody>
            {standings.map((b,i)=>{
              const belowCut = cutPos&&i>=cutPos;
              const isCutLine = cutPos&&i===cutPos-1;
              return (
                <>
                  <tr key={b.id} style={{opacity:belowCut?.5:1}}>
                    <td><span className={`rank${i===0?" p1":""}`}>{i+1}</span></td>
                    <td>
                      <div className="bname">{b.name}</div>
                      {b.laneAssignment&&<div style={{fontSize:10,color:"var(--text2)"}}>Lane {b.laneAssignment}</div>}
                    </td>
                    <td>{b.curAvg||b.avg}</td>
                    {tournament.type==="handicap"&&<td style={{color:"var(--red)"}}>+{b.hdcpPG}</td>}
                    {Array.from({length:thru},(_,ri)=>{
                      const t=sum(b.scores?.[ri+1]||[]);
                      return <td key={ri}>{t>0?t:<span style={{color:"#ccc"}}>—</span>}</td>;
                    })}
                    <td style={{fontWeight:700}}>{b.scratch>0?b.scratch:<span style={{color:"#ccc"}}>—</span>}</td>
                    {tournament.type==="handicap"&&<td style={{fontWeight:700,color:"var(--red)"}}>{b.withHdcp>0?b.withHdcp:<span style={{color:"#ccc"}}>—</span>}</td>}
                  </tr>
                  {isCutLine&&(
                    <tr key={`cut-${i}`}><td colSpan={99} style={{padding:0}}>
                      <div style={{background:"#fff0f1",padding:"3px 12px",fontSize:10,fontWeight:700,color:"var(--red)",textTransform:"uppercase",letterSpacing:.5,borderTop:"2px solid var(--red)",borderBottom:"2px solid var(--red)"}}>
                        ✂ CUT — Top {cutPos} advance
                      </div>
                    </td></tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// BOWLERS VIEW
// ══════════════════════════════════════════════════════
function BowlersView({ tournament, onUpdate }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [editing, setEditing] = useState(null);
  const bowlers = tournament.bowlers||[];
  const add = b => onUpdate({...tournament,bowlers:[...bowlers,b]});
  const upd = b => onUpdate({...tournament,bowlers:bowlers.map(x=>x.id===b.id?b:x)});
  const del = id => {if(confirm("Remove this bowler?"))onUpdate({...tournament,bowlers:bowlers.filter(b=>b.id!==id)});};
  const sorted = sortName(bowlers);
  return (
    <div>
      <div className="row" style={{marginBottom:12}}>
        <span style={{fontSize:13,color:"var(--text2)"}}>{bowlers.length} bowler{bowlers.length!==1?"s":""}</span>
        <div className="sp"/>
        <button className="btn btn-out btn-sm" onClick={()=>setShowBulk(true)}>⬆ Bulk Import</button>
        <button className="btn btn-red" onClick={()=>setShowAdd(true)}>+ Add Bowler</button>
      </div>
      {bowlers.length===0 ? (
        <div className="empty"><div style={{fontSize:36,opacity:.15,marginBottom:8}}>🎳</div><div className="empty-h">No bowlers yet</div><div className="empty-s">Add individually or use Bulk Import</div></div>
      ) : (
        <div className="card" style={{padding:0,overflow:"hidden"}}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Name</th><th>Avg</th>
                {tournament.type==="handicap"&&<th>Hdcp/G</th>}
                <th>Lane</th><th>Entry</th>
                {tournament.hasBrackets&&<th>Bracket</th>}
                <th/>
              </tr>
            </thead>
            <tbody>
              {sorted.map(b=>(
                <tr key={b.id}>
                  <td className="bname">{b.name}</td>
                  <td>{b.avg}</td>
                  {tournament.type==="handicap"&&<td style={{color:"var(--red)"}}>+{calcHdcp(b.avg,tournament.handicapBase,tournament.handicapFactor/100)}</td>}
                  <td style={{color:"var(--text2)",fontSize:12}}>{b.laneAssignment||"—"}</td>
                  <td><span className={`badge ${b.paid?"b-green":"b-gray"}`}>{b.paid?"Paid":"Unpaid"}</span></td>
                  {tournament.hasBrackets&&<td><span className={`badge ${b.inBracket?"b-red":"b-gray"}`}>{b.inBracket?"Yes":"No"}</span></td>}
                  <td><div className="row" style={{gap:4}}>
                    <button className="btn btn-out btn-xs" onClick={()=>setEditing(b)}>Edit</button>
                    <button className="btn btn-ghost btn-xs" onClick={()=>del(b.id)} style={{color:"var(--gray-lt)"}}>✕</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showAdd&&<BowlerModal tournament={tournament} onSave={add} onClose={()=>setShowAdd(false)}/>}
      {showBulk&&<BulkUploadModal tournament={tournament} onSave={t=>onUpdate(t)} onClose={()=>setShowBulk(false)}/>}
      {editing&&<BowlerModal tournament={tournament} existing={editing} onSave={upd} onClose={()=>setEditing(null)}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// BRACKET VIEW — auto-fills from scores, randomize only
// ══════════════════════════════════════════════════════
function BracketView({ tournament, onUpdate }) {
  const allBracket = (tournament.bowlers||[]).filter(b=>b.inBracket);
  const bracketOrder = tournament.bracketOrder;
  const bracketGames = tournament.bracketGames||3;

  const standings = buildStandings(allBracket, tournament);
  const ordered = bracketOrder
    ? bracketOrder.map(id=>allBracket.find(b=>b.id===id)).filter(Boolean)
    : standings;

  const n = ordered.length;
  if(n<2) return (
    <div className="empty">
      <div style={{fontSize:36,opacity:.15,marginBottom:8}}>🎯</div>
      <div className="empty-h">{allBracket.length===0?"No bowlers in bracket":"Need at least 2 entries"}</div>
      <div className="empty-s">Check "In bracket" when adding or editing bowlers</div>
    </div>
  );

  const size = Math.pow(2, Math.ceil(Math.log2(n)));
  const seeded = [...ordered, ...Array(size-n).fill(null)];

  const getScore = b => b ? sum((b.scores?.[1]||[]).slice(0,bracketGames)) : 0;

  function buildRounds(seeds) {
    const rounds = [];
    let cur = seeds.map((b,i)=>({b, seed:b?i+1:null}));
    while(cur.length>1) {
      const matches = [];
      for(let i=0;i<cur.length;i+=2) {
        const a=cur[i], bx=cur[i+1];
        const sa=getScore(a.b), sb=getScore(bx.b);
        let winner=null;
        if(a.b&&!bx.b) winner=a;
        else if(!a.b&&bx.b) winner=bx;
        else if(a.b&&bx.b&&sa>0&&sb>0) winner=sa>=sb?a:bx;
        matches.push({a,b:bx,winner,sa,sb});
      }
      rounds.push(matches);
      cur = matches.map(m=>m.winner||{b:null,seed:null});
    }
    return rounds;
  }

  const rounds = buildRounds(seeded);
  const champion = rounds[rounds.length-1]?.[0]?.winner?.b;

  const randomize = () => {
    onUpdate({...tournament, bracketOrder:shuffleArr(allBracket).map(b=>b.id)});
  };

  const rndName = (total,ri) => {
    if(ri===total-1) return "Championship";
    if(ri===total-2) return "Semifinals";
    if(ri===total-3) return "Quarterfinals";
    return `Round ${ri+1}`;
  };

  return (
    <div>
      <div className="row" style={{marginBottom:12,flexWrap:"wrap"}}>
        <div style={{fontSize:13,color:"var(--text2)"}}>
          {n} entries · {bracketGames}G · ${tournament.bracketFee}/entry
        </div>
        <div className="sp"/>
        <button className="btn btn-out btn-sm" onClick={randomize}>🔀 Randomize Seeding</button>
      </div>

      <div className="alert al-info" style={{marginBottom:12}}>
        Scores auto-fill from Round 1 ({bracketGames} games). Winners advance automatically as scores are entered.
      </div>

      {champion&&(
        <div style={{background:"var(--black)",color:"white",borderRadius:"var(--r2)",padding:".875rem 1.25rem",marginBottom:12,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:24}}>🏆</span>
          <div>
            <div style={{fontFamily:"var(--font-d)",fontSize:22,letterSpacing:1}}>{champion.name}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Champion · {getScore(champion)} pins ({bracketGames} games)</div>
          </div>
        </div>
      )}

      <div className="br-wrap">
        <div className="br-inner">
          {rounds.map((matches,ri)=>(
            <div key={ri} className="br-col" style={{justifyContent:"space-around"}}>
              <div className="br-col-hd">{rndName(rounds.length,ri)}</div>
              {matches.map((m,mi)=>{
                const aW = m.winner?.b?.id===m.a.b?.id&&!!m.a.b;
                const bW = m.winner?.b?.id===m.b.b?.id&&!!m.b.b;
                return (
                  <div key={mi} className="br-match" style={{marginBottom:12}}>
                    {[{slot:m.a,score:m.sa,wins:aW},{slot:m.b,score:m.sb,wins:bW}].map(({slot,score,wins},si)=>(
                      <div key={si} className={`bb${!slot.b?" bye":wins?" win":""}`}>
                        <span className="bb-seed">{slot.seed||""}</span>
                        <span className="bb-name">{slot.b?slot.b.name:"BYE"}</span>
                        {slot.b&&score>0&&<span className={`bb-score${wins?" hi":""}`}>{score}</span>}
                        {wins&&<span style={{fontSize:10,color:"var(--red)",marginLeft:2,flexShrink:0}}>▲</span>}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// STEPLADDER VIEW
// ══════════════════════════════════════════════════════
function StepladderView({ tournament }) {
  const standings = buildStandings(tournament.bowlers||[], tournament);
  const spots = tournament.stepladderSpots||5;
  const seeds = standings.slice(0,spots);
  const matches = [];
  if(spots>=5){ matches.push({r:"Match 1",s1:5,s2:4}); matches.push({r:"Match 2",s1:"M1 Winner",s2:3}); matches.push({r:"Match 3",s1:"M2 Winner",s2:2}); matches.push({r:"Championship",s1:"M3 Winner",s2:1}); }
  else if(spots===4){ matches.push({r:"Match 1",s1:4,s2:3}); matches.push({r:"Match 2",s1:"M1 Winner",s2:2}); matches.push({r:"Championship",s1:"M2 Winner",s2:1}); }
  else { matches.push({r:"Match 1",s1:3,s2:2}); matches.push({r:"Championship",s1:"M1 Winner",s2:1}); }

  if(seeds.length<2) return <div className="empty"><div className="empty-h">Not enough bowlers</div></div>;

  return (
    <div>
      <div className="alert al-red">Top {spots} from qualifying advance. Higher seed has lane choice and advances on a tie.</div>
      <div className="g2">
        <div className="card">
          <div className="sec-head">Qualified Seeds</div>
          {seeds.map((b,i)=>(
            <div key={b.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<seeds.length-1?"1px solid #f5f5f5":"none"}}>
              <div style={{fontFamily:"var(--font-d)",fontSize:24,width:32,color:i===0?"var(--red)":"var(--text2)",letterSpacing:.5}}>{i+1}</div>
              <div style={{flex:1}}><div style={{fontWeight:600}}>{b.name}</div><div style={{fontSize:11,color:"var(--text2)"}}>{b.display} pins</div></div>
              {i===0&&<span className="badge b-red">Bye to Finals</span>}
              {i>0&&i<spots-1&&<span className="badge b-gray">Earns Bye</span>}
            </div>
          ))}
        </div>
        <div className="card">
          <div className="sec-head">Match Order</div>
          {matches.map((m,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<matches.length-1?"1px solid #f5f5f5":"none"}}>
              <div style={{minWidth:110,fontFamily:"var(--font-d)",fontSize:13,letterSpacing:.5,color:"var(--text2)"}}>{m.r}</div>
              <div style={{flex:1,fontSize:13}}>
                <span style={{fontWeight:600}}>{typeof m.s1==="number"?`#${m.s1} ${seeds[m.s1-1]?.name||"TBD"}`:m.s1}</span>
                <span style={{color:"var(--text2)",margin:"0 8px"}}>vs</span>
                <span style={{fontWeight:600}}>{typeof m.s2==="number"?`#${m.s2} ${seeds[m.s2-1]?.name||"TBD"}`:m.s2}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// TOURNAMENT VIEW
// ══════════════════════════════════════════════════════
function TournamentView({ tournament, onUpdate, onBack }) {
  const [tab, setTab] = useState("standings");
  const [editOpen, setEditOpen] = useState(false);
  const bowlers = tournament.bowlers||[];
  const paidCount = bowlers.filter(b=>b.paid).length;
  const bracketCount = bowlers.filter(b=>b.inBracket).length;

  const TABS = [
    {id:"standings",label:"Standings"},
    {id:"scores",label:"Score Entry"},
    {id:"bowlers",label:"Bowlers"},
    ...(tournament.format==="stepladder"?[{id:"stepladder",label:"Stepladder"}]:[]),
    ...(tournament.hasBrackets?[{id:"brackets",label:"Brackets"}]:[]),
    {id:"payouts",label:"Payouts"},
  ];

  return (
    <div>
      <div className="banner">
        <div>
          <div className="banner-name">{tournament.name}</div>
          <div className="banner-sub">{[tournament.location,tournament.date].filter(Boolean).join(" · ")}</div>
        </div>
        <div className="banner-r">
          <span className={`badge ${tournament.type==="handicap"?"b-blue":"b-blk"}`}>{tournament.type}</span>
          <span className="badge b-gray">{tournament.format==="fixed"?`${tournament.gamesPerBlock}G`:tournament.format}</span>
          {tournament.entryFee>0&&<span className="badge b-amber">${tournament.entryFee} entry</span>}
          {tournament.hasBrackets&&<span className="badge b-red">${tournament.bracketFee} Brackets</span>}
          <button className="btn btn-out btn-sm" onClick={()=>setEditOpen(true)}>Edit</button>
          <button className="btn btn-ghost btn-sm" onClick={onBack} style={{color:"rgba(255,255,255,.5)"}}>← Back</button>
        </div>
      </div>

      {/* Stats row — 3 boxes: Bowlers, Entries Paid, In Brackets */}
      <div className="g3" style={{marginBottom:"1.25rem"}}>
        <div className="stat"><div className="stat-v">{bowlers.length}</div><div className="stat-l">Bowlers</div></div>
        <div className="stat"><div className="stat-v">{paidCount}</div><div className="stat-l">Entries Paid</div></div>
        <div className="stat"><div className="stat-v">{tournament.hasBrackets?bracketCount:"—"}</div><div className="stat-l">{tournament.hasBrackets?"In Brackets":"Brackets Off"}</div></div>
      </div>

      <div className="tabs">
        {TABS.map(t=><button key={t.id} className={`tab${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}
      </div>

      {tab==="standings"&&<StandingsView tournament={tournament}/>}
      {tab==="scores"&&<ScoreEntry tournament={tournament} onUpdate={onUpdate}/>}
      {tab==="bowlers"&&<BowlersView tournament={tournament} onUpdate={onUpdate}/>}
      {tab==="stepladder"&&tournament.format==="stepladder"&&<StepladderView tournament={tournament}/>}
      {tab==="brackets"&&tournament.hasBrackets&&<BracketView tournament={tournament} onUpdate={onUpdate}/>}
      {tab==="payouts"&&<PayoutView tournament={tournament}/>}

      {editOpen&&<TournamentModal existing={tournament} onSave={t=>{onUpdate(t);setEditOpen(false);}} onClose={()=>setEditOpen(false)}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════
const INIT = {tournaments:[], activeTournamentId:null};

export default function App() {
  const [state, ss] = useState(()=>{
    try{const s=localStorage.getItem("ego_v3");return s?JSON.parse(s):INIT;}catch{return INIT;}
  });
  const [newOpen, setNew] = useState(false);

  useEffect(()=>{try{localStorage.setItem("ego_v3",JSON.stringify(state));}catch{}},[state]);

  const active = state.tournaments.find(t=>t.id===state.activeTournamentId);
  const create = t => ss(s=>({...s,tournaments:[t,...s.tournaments],activeTournamentId:t.id}));
  const update = t => ss(s=>({...s,tournaments:s.tournaments.map(x=>x.id===t.id?t:x)}));
  const open = id => ss(s=>({...s,activeTournamentId:id}));
  const home = () => ss(s=>({...s,activeTournamentId:null}));
  const del = id => ss(s=>({tournaments:s.tournaments.filter(t=>t.id!==id),activeTournamentId:s.activeTournamentId===id?null:s.activeTournamentId}));

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">
        <header className="hdr">
          <div className="logo" onClick={home}><div className="logo-pip"/><span>EGO <em>BOWLING</em></span></div>
          <div className="hdr-nav">
            <button className={`hnav${!active?" on":""}`} onClick={home}>Tournaments</button>
            {active&&<button className="hnav on" style={{maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{active.name}</button>}
          </div>
        </header>
        <main className="main">
          {!active
            ? <HomeView tournaments={state.tournaments} onNew={()=>setNew(true)} onOpen={open} onDelete={del}/>
            : <TournamentView tournament={active} onUpdate={update} onBack={home}/>
          }
        </main>
      </div>
      {newOpen&&<TournamentModal onSave={t=>{create(t);setNew(false);}} onClose={()=>setNew(false)}/>}
    </>
  );
}
