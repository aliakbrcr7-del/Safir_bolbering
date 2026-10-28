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
    {name:'نمای اصلی', svg: ICONS[p.cat]},
    {name:'برش مقطع', svg:`<svg viewBox="0 0 120 80" ${A}>${hatch}<path d="M12 10h96v14H12zM12 56h96v14H12z" fill="url(#h)"/><path d="M6 40h108" stroke-dasharray="10 3 2 3" stroke-width=".8"/><circle cx="32" cy="40" r="9"/><circle cx="60" cy="40" r="9"/><circle cx="88" cy="40" r="9"/></svg>`},
    {name:'ابعاد', svg:`<svg viewBox="0 0 120 80" ${A}><rect x="26" y="12" width="68" height="44" rx="2"/><circle cx="60" cy="34" r="12"/><circle cx="60" cy="34" r="4"/><path d="M26 68h68M26 64v8M94 64v8M104 12v44M100 12h8M100 56h8" stroke-width=".9"/><path d="M60 6v56M20 34h80" stroke-dasharray="8 3 2 3" stroke-width=".6"/></svg>`}
  ];
}
