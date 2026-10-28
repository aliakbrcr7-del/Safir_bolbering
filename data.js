/* ---------- تنظیمات ---------- */
const EITAA = 'Mr_530';     // آیدی ایتا (بدون @)
const TELEGRAM = 'Mr_530';  // آیدی تلگرام (بدون @) ؛ در صورت تفاوت اینجا عوض کنید

const CATS = ['همه','بلبرینگ','تسمه','زنجیر','دنده','یاتاقان','فولی','رولیک','پلی‌اتیلن','پلی‌آمید','شیلنگ فشارقوی'];

/* محصولات آزمایشی؛ قیمت‌ها به تومان */
const PRODUCTS = [
  {id:1, cat:'بلبرینگ', name:'بلبرینگ شیار عمیق 6205-2RS', brand:'SKF', spec:'۲۵×۵۲×۱۵ میلی‌متر', price:285000, stock:120},
  {id:2, cat:'بلبرینگ', name:'بلبرینگ شیار عمیق 6308-ZZ', brand:'NSK', spec:'۴۰×۹۰×۲۳ میلی‌متر', price:640000, stock:45},
  {id:3, cat:'بلبرینگ', name:'بلبرینگ مخروطی 30210', brand:'FAG', spec:'۵۰×۹۰×۲۱٫۷۵ میلی‌متر', price:1150000, stock:12},
  {id:4, cat:'تسمه', name:'تسمه تایمینگ HTD 8M-1200', brand:'Gates', spec:'پهنا ۲۰ میلی‌متر', price:720000, stock:30},
  {id:5, cat:'تسمه', name:'تسمه V شکل مقطع B-62', brand:'Optibelt', spec:'طول ۱۶۰۰ میلی‌متر', price:340000, stock:80},
  {id:6, cat:'زنجیر', name:'زنجیر غلتکی ۰۸B-1 (۵ متر)', brand:'Tsubaki', spec:'گام ۱۲٫۷ میلی‌متر', price:1980000, stock:18},
  {id:7, cat:'زنجیر', name:'زنجیر نقاله ۴۰ تک‌ردیف', brand:'Renold', spec:'گام ۱۲٫۷ میلی‌متر', price:1450000, stock:3},
  {id:8, cat:'دنده', name:'چرخ‌دنده ساده فولادی ۲۰ دندانه', brand:'KHK', spec:'مدول ۲، قطر داخل ۲۰', price:890000, stock:22},
  {id:9, cat:'دنده', name:'چرخ‌دنده ظرفیتی برنزی (ورم)', brand:'Misumi', spec:'نسبت ۱:۲۰', price:2300000, stock:8},
  {id:10, cat:'یاتاقان', name:'یاتاقان پایه‌دار UCP208', brand:'NTN', spec:'شفت ۴۰ میلی‌متر', price:560000, stock:40},
  {id:11, cat:'یاتاقان', name:'یاتاقان فلنجی UCF205', brand:'SKF', spec:'شفت ۲۵ میلی‌متر', price:330000, stock:55},
  {id:12, cat:'فولی', name:'فولی دو‌شیار آلومینیومی B', brand:'Sadid', spec:'قطر ۱۵۰ میلی‌متر', price:410000, stock:26},
  {id:13, cat:'رولیک', name:'رولیک پلی‌یورتان نقاله', brand:'Safir', spec:'قطر ۶۰، طول ۳۰۰', price:520000, stock:34},
  {id:14, cat:'پلی‌اتیلن', name:'ورق پلی‌اتیلن سنگین UHMW', brand:'Safir', spec:'ضخامت ۱۰ میلی‌متر، ۱×۲ متر', price:6800000, stock:9},
  {id:15, cat:'پلی‌آمید', name:'شمش پلی‌آمید PA6 (نایلون)', brand:'Safir', spec:'قطر ۸۰ میلی‌متر، طول ۱ متر', price:3200000, stock:14},
  {id:16, cat:'شیلنگ فشارقوی', name:'شیلنگ هیدرولیک ۲SN با سرپرس', brand:'Manuli', spec:'۱/۲ اینچ، ۱ متر', price:780000, stock:60},
  {id:17, cat:'شیلنگ فشارقوی', name:'پرس سرشیلنگ و ساخت شیلنگ سفارشی', brand:'Safir', spec:'تا ۳۵۰ بار', price:250000, stock:99}
];

/* آیکون هر دسته (SVG ساده) */
const S = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  'بلبرینگ':`<svg viewBox="0 0 64 64" ${S}><circle cx="32" cy="32" r="28"/><circle cx="32" cy="32" r="11"/><circle cx="32" cy="14" r="3"/><circle cx="32" cy="50" r="3"/><circle cx="14" cy="32" r="3"/><circle cx="50" cy="32" r="3"/></svg>`,
  'تسمه':`<svg viewBox="0 0 64 64" ${S}><circle cx="18" cy="32" r="12"/><circle cx="48" cy="32" r="8"/><path d="M18 20 48 24M18 44 48 40"/></svg>`,
  'زنجیر':`<svg viewBox="0 0 64 64" ${S}><rect x="4" y="22" width="26" height="20" rx="10"/><rect x="34" y="22" width="26" height="20" rx="10"/><path d="M24 32h16"/></svg>`,
  'دنده':`<svg viewBox="0 0 64 64" ${S}><circle cx="32" cy="32" r="18"/><circle cx="32" cy="32" r="6"/><path d="M32 6v8M32 50v8M6 32h8M50 32h8M14 14l6 6M44 44l6 6M14 50l6-6M44 20l6-6"/></svg>`,
  'یاتاقان':`<svg viewBox="0 0 64 64" ${S}><path d="M6 52h52M12 52V40a20 20 0 0 1 40 0v12"/><circle cx="32" cy="36" r="8"/></svg>`,
  'فولی':`<svg viewBox="0 0 64 64" ${S}><circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="18"/><circle cx="32" cy="32" r="4"/></svg>`,
  'رولیک':`<svg viewBox="0 0 64 64" ${S}><ellipse cx="14" cy="32" rx="7" ry="16"/><path d="M14 16h36a7 16 0 0 1 0 32H14"/><path d="M4 32H0M60 32h4"/></svg>`,
  'پلی‌اتیلن':`<svg viewBox="0 0 64 64" ${S}><path d="M6 24 32 12l26 12-26 12z"/><path d="M6 24v10l26 12 26-12V24"/></svg>`,
  'پلی‌آمید':`<svg viewBox="0 0 64 64" ${S}><ellipse cx="14" cy="32" rx="8" ry="14"/><path d="M14 18h36a8 14 0 0 1 0 28H14"/><ellipse cx="50" cy="32" rx="8" ry="14"/></svg>`,
  'شیلنگ فشارقوی':`<svg viewBox="0 0 64 64" ${S}><path d="M4 44c10 0 10-24 20-24s10 24 20 24 8-14 16-14"/><rect x="2" y="38" width="6" height="12"/><rect x="56" y="24" width="6" height="12"/></svg>`
};

/* ---------- ابزارهای مشترک ---------- */
const $ = id => document.getElementById(id);
const fa = n => Number(n).toLocaleString('fa-IR');
const money = n => fa(n) + ' تومان';
const code = p => 'SB-' + String(p.id).padStart(3,'0');

const DESC = {
  'بلبرینگ':'کاهش اصطکاک و تحمل بار در شفت‌ها، الکتروموتورها، گیربکس‌ها و خطوط تولید.',
  'تسمه':'انتقال قدرت بین فولی‌ها در دستگاه‌ها و ماشین‌آلات صنعتی، با عملکرد آرام و بدون نیاز به روانکاری.',
  'زنجیر':'انتقال قدرت و حرکت در نقاله‌ها، موتورسیکلت‌ها و ماشین‌آلات سنگین با تحمل بار بالا.',
  'دنده':'انتقال گشتاور و تغییر دور و جهت حرکت در گیربکس‌ها و سیستم‌های مکانیکی.',
  'یاتاقان':'نگه‌داشتن و هدایت شفت‌های دوار؛ مناسب نصب روی بدنه، فریم و دستگاه‌های خط تولید.',
  'فولی':'انتقال حرکت دورانی با تسمه بین الکتروموتور و دستگاه، در اندازه‌ها و شیارهای مختلف.',
  'رولیک':'هدایت و حمل مواد در نقاله‌ها و خطوط بسته‌بندی با سطح مقاوم در برابر سایش.',
  'پلی‌اتیلن':'ورق و قطعهٔ مهندسی با اصطکاک کم و مقاومت بالا در برابر سایش و ضربه.',
  'پلی‌آمید':'شمش و قطعهٔ ماشین‌کاری برای ساخت بوش، چرخ‌دنده و قطعات مقاوم در برابر سایش.',
  'شیلنگ فشارقوی':'انتقال سیال هیدرولیک در فشار بالا برای پرس، جرثقیل، بیل مکانیکی و ماشین‌آلات صنعتی.'
};

/* سه نمای شماتیک برای هر محصول: نمای اصلی، برش مقطع، نقشهٔ ابعاد */
function views(p){
  const hatch = '<defs><pattern id="h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0v6" stroke-width="1"/></pattern></defs>';
  const A = 'fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"';
  return [
    {name:'نمای اصلی', svg: art(p)},
    {name:'برش مقطع', svg:`<svg viewBox="0 0 120 80" ${A}>${hatch}<path d="M12 10h96v14H12zM12 56h96v14H12z" fill="url(#h)"/><path d="M6 40h108" stroke-dasharray="10 3 2 3" stroke-width=".8"/><circle cx="32" cy="40" r="9"/><circle cx="60" cy="40" r="9"/><circle cx="88" cy="40" r="9"/></svg>`},
    {name:'ابعاد', svg:`<svg viewBox="0 0 120 80" ${A}><rect x="26" y="12" width="68" height="44" rx="2"/><circle cx="60" cy="34" r="12"/><circle cx="60" cy="34" r="4"/><path d="M26 68h68M26 64v8M94 64v8M104 12v44M100 12h8M100 56h8" stroke-width=".9"/><path d="M60 6v56M20 34h80" stroke-dasharray="8 3 2 3" stroke-width=".6"/></svg>`}
  ];
}

/* ---------- تصویرسازی برداری محصولات (فلز، لاستیک، پلیمر) ---------- */
const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="gSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6f8fa"/><stop offset=".45" stop-color="#9aa5b1"/><stop offset=".62" stop-color="#e3e7eb"/><stop offset="1" stop-color="#6c7783"/></linearGradient>
<linearGradient id="gSteelV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0f3f6"/><stop offset=".5" stop-color="#97a2ae"/><stop offset="1" stop-color="#cfd6dd"/></linearGradient>
<radialGradient id="gDark" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#4b5764"/><stop offset="1" stop-color="#151b22"/></radialGradient>
<radialGradient id="gBall" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#aeb7c1"/><stop offset="1" stop-color="#58626d"/></radialGradient>
<linearGradient id="gCast" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a7683"/><stop offset="1" stop-color="#262e37"/></linearGradient>
<linearGradient id="gRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e5656a"/><stop offset=".5" stop-color="#b02a30"/><stop offset="1" stop-color="#6e171c"/></linearGradient>
<linearGradient id="gRedL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f08a8e"/><stop offset="1" stop-color="#b02a30"/></linearGradient>
<linearGradient id="gNy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf5e4"/><stop offset=".55" stop-color="#d8c9a0"/><stop offset="1" stop-color="#efe4c3"/></linearGradient>
<linearGradient id="gNyL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffdf6"/><stop offset="1" stop-color="#e2d4aa"/></linearGradient>
<linearGradient id="gBronze" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3cf94"/><stop offset=".45" stop-color="#a8742d"/><stop offset=".65" stop-color="#dba762"/><stop offset="1" stop-color="#7a4f1f"/></linearGradient>
<linearGradient id="gPEt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe5eb"/></linearGradient>
<linearGradient id="gPEf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8edf2"/><stop offset="1" stop-color="#c8d0d9"/></linearGradient>
<linearGradient id="gPEs" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c3ccd6"/><stop offset="1" stop-color="#a3adb9"/></linearGradient>
</defs></svg>`;
document.body.insertAdjacentHTML('beforeend', DEFS);

const _sh = '<ellipse cx="100" cy="140" rx="66" ry="6" fill="rgba(31,41,51,.18)"/>';
const _pt = (cx,cy,r,a) => [cx + r*Math.cos(a), cy + r*Math.sin(a)];
const _svg = body => `<svg class="art" viewBox="0 0 200 150" aria-hidden="true">${body}</svg>`;

const ART = {
'بلبرینگ': p => {
  const balls = Array.from({length:9}, (_,i) => { const [x,y] = _pt(100,72,38,i*2*Math.PI/9); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="url(#gBall)" stroke="#4a5560" stroke-width=".5"/>`; }).join('');
  return _svg(`${_sh}<circle cx="100" cy="72" r="62" fill="url(#gSteel)" stroke="#6c7783" stroke-width=".8"/><circle cx="100" cy="72" r="51" fill="url(#gDark)"/>${balls}<circle cx="100" cy="72" r="30" fill="url(#gSteel)" stroke="#6c7783" stroke-width=".8"/><circle cx="100" cy="72" r="19" fill="url(#gDark)"/><circle cx="100" cy="72" r="12" fill="#0f141a"/><path d="M58 40a62 62 0 0 1 36-22" stroke="#fff" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/>`);
},
'تسمه': p => {
  const timing = /تایمینگ/.test(p.name);
  const path = 'M62 38H138A36 36 0 0 1 138 110H62A36 36 0 0 1 62 38Z';
  return _svg(`${_sh}<path d="${path}" fill="none" stroke="#1d242b" stroke-width="18"/>${timing ? `<path d="${path}" fill="none" stroke="#56616d" stroke-width="12" stroke-dasharray="3 4.5"/>` : `<path d="${path}" fill="none" stroke="#5a6572" stroke-width="2.5" transform="translate(0 -2)"/>`}<circle cx="62" cy="74" r="27" fill="url(#gSteel)" stroke="#6c7783" stroke-width=".8"/><circle cx="62" cy="74" r="10" fill="url(#gDark)"/><circle cx="138" cy="74" r="27" fill="url(#gSteel)" stroke="#6c7783" stroke-width=".8"/><circle cx="138" cy="74" r="10" fill="url(#gDark)"/>`);
},
'زنجیر': p => {
  const links = Array.from({length:5}, (_,i) => {
    const x = 20 + i*31, inner = i%2;
    return `<rect x="${x}" y="${inner?59:55}" width="44" height="${inner?24:32}" rx="${inner?12:16}" fill="url(#${inner?'gSteelV':'gSteel'})" stroke="#5f6a76" stroke-width=".9"/><circle cx="${x+12}" cy="71" r="6" fill="url(#gDark)"/><circle cx="${x+32}" cy="71" r="6" fill="url(#gDark)"/>`;
  }).join('');
  return _svg(`${_sh}<g transform="rotate(-10 100 72)">${links}</g>`);
},
'دنده': p => {
  const bronze = /برنزی|ظرفیتی/.test(p.name), N = 14, st = 2*Math.PI/N;
  let d = '';
  for(let i=0;i<N;i++){ const a=i*st; [[48,a],[60,a+.12*st],[60,a+.38*st],[48,a+.5*st]].forEach(([r,t],k) => { const [x,y] = _pt(100,72,r,t); d += (i+k===0?'M':'L') + x.toFixed(1)+' '+y.toFixed(1); }); }
  const holes = Array.from({length:5}, (_,i) => { const [x,y] = _pt(100,72,30,i*2*Math.PI/5-Math.PI/2); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.5" fill="url(#gDark)"/>`; }).join('');
  return _svg(`${_sh}<path d="${d}Z" fill="url(#${bronze?'gBronze':'gSteel'})" stroke="${bronze?'#7a4f1f':'#6c7783'}" stroke-width=".9"/><circle cx="100" cy="72" r="41" fill="none" stroke="rgba(0,0,0,.14)" stroke-width="1"/>${holes}<circle cx="100" cy="72" r="15" fill="url(#gDark)"/><circle cx="100" cy="72" r="8" fill="#0f141a"/><rect x="97" y="62" width="6" height="4" fill="#0f141a"/>`);
},
'یاتاقان': p => {
  if(/فلنجی/.test(p.name)){
    return _svg(`${_sh}<rect x="46" y="12" width="108" height="116" rx="16" fill="url(#gCast)"/>${[[62,28],[138,28],[62,112],[138,112]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6.5" fill="#0f141a"/>`).join('')}<circle cx="100" cy="70" r="36" fill="url(#gSteel)" stroke="#6c7783" stroke-width=".8"/><circle cx="100" cy="70" r="22" fill="url(#gDark)"/><circle cx="100" cy="70" r="12" fill="#0f141a"/><path d="M56 26a60 60 0 0 1 36-12" stroke="#fff" stroke-width="2" opacity=".35" fill="none"/>`);
  }
  return _svg(`${_sh}<rect x="30" y="104" width="140" height="26" rx="7" fill="url(#gCast)"/><ellipse cx="48" cy="117" rx="9" ry="4.5" fill="#0f141a"/><ellipse cx="152" cy="117" rx="9" ry="4.5" fill="#0f141a"/><path d="M50 106A50 50 0 0 1 150 106Z" fill="url(#gCast)"/><circle cx="100" cy="82" r="31" fill="url(#gSteel)" stroke="#6c7783" stroke-width=".8"/><circle cx="100" cy="82" r="19" fill="url(#gDark)"/><circle cx="100" cy="82" r="10" fill="#0f141a"/><rect x="96" y="44" width="8" height="14" rx="2" fill="url(#gSteelV)"/><circle cx="100" cy="42" r="5" fill="url(#gSteel)" stroke="#6c7783" stroke-width=".6"/>`);
},
'فولی': p => _svg(`${_sh}<circle cx="100" cy="72" r="62" fill="url(#gSteel)" stroke="#6c7783" stroke-width=".8"/><circle cx="100" cy="72" r="53" fill="none" stroke="#242b33" stroke-width="9"/><circle cx="100" cy="72" r="45" fill="url(#gSteelV)"/>${Array.from({length:4},(_,i)=>{const [x,y]=_pt(100,72,29,i*Math.PI/2+Math.PI/4);return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="url(#gDark)"/>`}).join('')}<circle cx="100" cy="72" r="17" fill="url(#gSteel)" stroke="#6c7783" stroke-width=".8"/><circle cx="100" cy="72" r="8" fill="#0f141a"/><rect x="97" y="62" width="6" height="4" fill="#0f141a"/>`),
'رولیک': p => _svg(`${_sh}<rect x="10" y="66" width="30" height="16" rx="3" fill="url(#gSteelV)"/><rect x="160" y="66" width="30" height="16" rx="3" fill="url(#gSteelV)"/><ellipse cx="38" cy="74" rx="14" ry="40" fill="#7f1a1f"/><rect x="38" y="34" width="124" height="80" fill="url(#gRed)"/><path d="M70 34v80M100 34v80M130 34v80" stroke="rgba(0,0,0,.15)" stroke-width="1"/><ellipse cx="162" cy="74" rx="14" ry="40" fill="url(#gRedL)" stroke="#8e1f25" stroke-width=".8"/><ellipse cx="162" cy="74" rx="6" ry="14" fill="url(#gSteel)"/><rect x="38" y="42" width="124" height="5" fill="#fff" opacity=".22"/>`),
'پلی‌اتیلن': p => _svg(`<ellipse cx="100" cy="136" rx="70" ry="6" fill="rgba(31,41,51,.16)"/><polygon points="34,62 118,38 172,60 90,86" fill="url(#gPEt)" stroke="#b6bfca" stroke-width=".8"/><polygon points="34,62 90,86 90,110 34,86" fill="url(#gPEf)" stroke="#b6bfca" stroke-width=".8"/><polygon points="90,86 172,60 172,84 90,110" fill="url(#gPEs)" stroke="#b6bfca" stroke-width=".8"/><path d="M40 63l50 20" stroke="#fff" stroke-width="1.6" opacity=".8"/>`),
'پلی‌آمید': p => _svg(`${_sh}<ellipse cx="36" cy="76" rx="13" ry="32" fill="#cdbd8c"/><rect x="36" y="44" width="128" height="64" fill="url(#gNy)"/><ellipse cx="164" cy="76" rx="13" ry="32" fill="url(#gNyL)" stroke="#c4b384" stroke-width=".9"/><ellipse cx="164" cy="76" rx="7" ry="17" fill="none" stroke="#d6c999" stroke-width=".8"/><rect x="36" y="50" width="128" height="5" fill="#fff" opacity=".45"/>`),
'شیلنگ فشارقوی': p => {
  const d = 'M34 112C62 28 112 132 166 42';
  return _svg(`<ellipse cx="100" cy="140" rx="66" ry="5" fill="rgba(31,41,51,.14)"/><path d="${d}" fill="none" stroke="#1b2128" stroke-width="19" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#46525f" stroke-width="13" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="3" transform="translate(-3 -3)"/><g transform="translate(34 112) rotate(-69)"><rect x="-14" y="-15" width="26" height="30" rx="4" fill="url(#gSteelV)" stroke="#6c7783" stroke-width=".8"/><path d="M-6 -15v30M2 -15v30" stroke="#6c7783" stroke-width=".8"/></g><g transform="translate(166 42) rotate(-56)"><rect x="-12" y="-15" width="26" height="30" rx="4" fill="url(#gSteelV)" stroke="#6c7783" stroke-width=".8"/><path d="M-4 -15v30M4 -15v30" stroke="#6c7783" stroke-width=".8"/></g>`);
}
};
const art = p => (ART[p.cat] || (() => ICONS[p.cat]))(p);

/* منوی موبایل */
(() => {
  const bg = document.getElementById('burger'); if(!bg) return;
  bg.onclick = () => { const o = document.body.classList.toggle('menu'); bg.setAttribute('aria-expanded', o); };
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => { document.body.classList.remove('menu'); bg.setAttribute('aria-expanded', false); }));
})();

/* متن کوتاه‌تر برای کادر جستجو در موبایل */
(() => {
  const q = document.getElementById('search');
  if(q && matchMedia('(max-width:820px)').matches) q.placeholder = 'جستجوی محصول یا مدل';
})();
