/* ---------- ابزارها ---------- */
const norm = s => s.toLowerCase().replace(/[ي]/g,'ی').replace(/[ك]/g,'ک').replace(/‌/g,' ');

let state = { cat:'همه', q:'', sort:'def' };
let cart = {};
try { cart = JSON.parse(localStorage.getItem('safir-cart')) || {}; } catch(e) { cart = {}; }

/* ---------- دسته‌ها و محصولات ---------- */
function renderChips(){
  $('chips').innerHTML = CATS.map(c =>
    `<button class="chip ${c===state.cat?'on':''}" data-cat="${c}">${c}<i>${fa(c==='همه'?PRODUCTS.length:PRODUCTS.filter(p=>p.cat===c).length)}</i></button>`).join('');
}

function renderGrid(){
  let list = PRODUCTS.filter(p =>
    (state.cat==='همه' || p.cat===state.cat) &&
    norm(p.name+' '+p.brand+' '+p.spec+' '+p.cat).includes(norm(state.q.trim())));
  if(state.sort==='asc') list.sort((a,b)=>a.price-b.price);
  if(state.sort==='desc') list.sort((a,b)=>b.price-a.price);

  $('found').textContent = fa(list.length) + ' محصول پیدا شد';
  $('grid').innerHTML = list.length ? list.map(p => `
    <article class="card rv" data-id="${p.id}">
      <div class="pic">
        <span class="brand-tag">${p.brand}</span>
        ${p.stock<5?'<span class="badge">کم‌موجود</span>':''}
        ${art(p)}
        <span class="incart"></span>
      </div>
      <div class="info">
        <small>${p.cat}</small>
        <h3>${p.name}</h3>
        <span class="spec">${p.spec}</span>
        <div class="buy">
          <div class="pr"><span class="price">${fa(p.price)}</span><span class="cur">تومان</span></div>
          <button class="add" data-id="${p.id}" aria-label="افزودن به سبد"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
        </div>
      </div>
    </article>`).join('')
    : `<p class="empty">محصولی با این مشخصات پیدا نشد. عبارت جستجو را کوتاه‌تر کنید یا دسته «همه» را انتخاب کنید.</p>`;
  watch(); syncBadges();
}

/* ---------- سبد خرید ---------- */
function syncBadges(){
  document.querySelectorAll('.card[data-id]').forEach(c => {
    const q = cart[c.dataset.id], el = c.querySelector('.incart');
    if(el) el.textContent = q ? 'در سبد: ' + fa(q) : '';
  });
}
document.addEventListener('mousemove', e => {
  const c = e.target.closest && e.target.closest('.card'); if(!c) return;
  const r = c.getBoundingClientRect();
  c.style.setProperty('--mx', (e.clientX-r.left)+'px'); c.style.setProperty('--my', (e.clientY-r.top)+'px');
});
function save(){ try{ localStorage.setItem('safir-cart', JSON.stringify(cart)); }catch(e){} }

let fresh = null;
function setStep(n){ $('drawer').dataset.step = n; }
function animateTotal(to){
  const el = $('total'), from = +el.dataset.v || 0, t0 = performance.now();
  el.dataset.v = to;
  (function tick(t){
    const k = Math.min((t-t0)/450,1), v = Math.round(from + (to-from)*(1-Math.pow(1-k,3)));
    el.innerHTML = fa(v) + ' <small>تومان</small>'; if(k<1) requestAnimationFrame(tick);
  })(t0);
}
function renderCart(){
  const ids = Object.keys(cart).filter(id => PRODUCTS.some(p=>p.id==id));
  let total = 0, count = 0;
  $('items').innerHTML = ids.length ? ids.map(id => {
    const p = PRODUCTS.find(x=>x.id==id), q = cart[id];
    total += p.price*q; count += q;
    return `<div class="ci ${id==fresh?'fresh':''}">
      <div class="ci-pic">${art(p)}</div>
      <div class="ci-body">
        <b>${p.name}</b>
        <small>${p.brand} · ${fa(q)} × ${fa(p.price)}</small>
        <div class="qty">
          <button data-act="dec" data-id="${id}" aria-label="کاهش">−</button>
          <b>${fa(q)}</b>
          <button data-act="inc" data-id="${id}" aria-label="افزایش">+</button>
        </div>
      </div>
      <div class="ci-side">
        <button class="ci-rm" data-act="rm" data-id="${id}" aria-label="حذف">✕</button>
        <b class="ci-sum">${fa(p.price*q)}<small>تومان</small></b>
      </div>
    </div>`;
  }).join('') : `<div class="cart-empty"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 10h8l7 30h30l6-22H17"/><circle cx="26" cy="52" r="4"/><circle cx="46" cy="52" r="4"/></svg><h3>سبد خرید خالی است</h3><p>قطعهٔ مورد نیازتان را از لیست محصولات اضافه کنید.</p><button class="btn" id="goShop">مشاهدهٔ محصولات</button></div>`;
  fresh = null;
  animateTotal(total);
  $('cartCount').textContent = fa(count);
  $('headCount').textContent = count ? fa(count) : '';
  $('rev').textContent = fa(count) + ' قلم کالا در سبد';
  const has = ids.length > 0;
  $('drawer').classList.toggle('has', has);
  if(!has) setStep(1);
  const b = $('cartCount'); b.classList.remove('bump'); void b.offsetWidth; if(count) b.classList.add('bump');
  syncBadges();
}

function toast(msg){
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(()=>t.classList.remove('show'), 1800);
}

function setCart(id, delta){
  const p = PRODUCTS.find(x=>x.id==id);
  const next = (cart[id]||0) + delta;
  if(delta>0 && !cart[id]) fresh = id;
  if(next <= 0) delete cart[id];
  else if(next > p.stock){ toast('بیش از موجودی انبار نمی‌توانید سفارش دهید'); return; }
  else cart[id] = next;
  save(); renderCart();
}

/* ---------- رویدادها ---------- */
$('chips').onclick = e => {
  const b = e.target.closest('.chip'); if(!b) return;
  state.cat = b.dataset.cat; renderChips(); renderGrid();
};
$('search').oninput = e => { state.q = e.target.value; renderGrid(); };
$('sort').onchange = e => { state.sort = e.target.value; renderGrid(); };

$('grid').onclick = e => {
  const b = e.target.closest('.add');
  if(b){ setCart(b.dataset.id, 1); toast('به سبد خرید اضافه شد'); return; }
  const c = e.target.closest('.card'); if(c) location.href = 'product.html?id=' + c.dataset.id;
};

function openModal(id){
  const p = PRODUCTS.find(x=>x.id==id);
  $('modalBody').innerHTML = `<div class="m-grid">
    <div class="m-pic">${ICONS[p.cat]}</div>
    <div class="m-info"><h2>${p.name}</h2>
      <table>
        <tr><td>دسته</td><td>${p.cat}</td></tr>
        <tr><td>برند</td><td>${p.brand}</td></tr>
        <tr><td>مشخصات</td><td>${p.spec}</td></tr>
        <tr><td>موجودی</td><td>${fa(p.stock)} عدد</td></tr>
        <tr><td>قیمت</td><td><b>${money(p.price)}</b></td></tr>
      </table>
      <button class="btn primary full" id="modalAdd">افزودن به سبد خرید</button>
    </div></div>`;
  $('modalAdd').onclick = () => { setCart(p.id,1); toast('به سبد خرید اضافه شد'); closeAll(); };
  document.body.classList.add('pop');
}
function closeAll(){ document.body.classList.remove('pop','open'); }

$('items').onclick = e => {
  const b = e.target.closest('button'); if(!b) return;
  const {act,id} = b.dataset;
  if(act==='inc') setCart(id,1);
  if(act==='dec') setCart(id,-1);
  if(act==='rm'){
    const row = b.closest('.ci'); if(row) row.classList.add('out');
    setTimeout(() => { delete cart[id]; save(); renderCart(); }, 260);
  }
};

const toggle = open => { document.body.classList.toggle('open', open); };
$('openCart').onclick = () => toggle(true);
$('closeCart').onclick = $('overlay').onclick = $('closeModal').onclick = closeAll;
document.addEventListener('keydown', e => { if(e.key==='Escape') closeAll(); });
$('clear').onclick = () => { cart = {}; save(); renderCart(); };

/* ---------- ثبت سفارش ---------- */
['cName','cPhone','cNote'].forEach(k => {
  try{ $(k).value = localStorage.getItem('safir-'+k) || ''; }catch(e){}
  $(k).addEventListener('input', () => { try{ localStorage.setItem('safir-'+k, $(k).value); }catch(e){} });
});

function buildMsg(){
  let total = 0;
  const lines = Object.keys(cart).map((id,i) => {
    const p = PRODUCTS.find(x=>x.id==id); total += p.price*cart[id];
    return `${fa(i+1)}. ${p.name} (${p.brand}) | ${p.spec}\n   تعداد: ${fa(cart[id])} × ${money(p.price)} = ${money(p.price*cart[id])}`;
  });
  const n = $('cName').value.trim(), ph = $('cPhone').value.trim(), nt = $('cNote').value.trim();
  return `سلام، سفارش جدید از سایت سفیر بلبرینگ\n\n${lines.join('\n')}\n\nجمع کل: ${money(total)}`
    + (n ? `\nنام: ${n}` : '') + `\nتلفن تماس: ${ph}` + (nt ? `\nتوضیحات: ${nt}` : '');
}

async function copyText(t){
  try{ await navigator.clipboard.writeText(t); return true; }
  catch(e){
    const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select();
    let ok = false; try{ ok = document.execCommand('copy'); }catch(_){} a.remove(); return ok;
  }
}
function ready(){
  if(!Object.keys(cart).length) return false;
  if($('cPhone').value.trim().length < 7){
    setStep(2); $('cPhone').focus();
    toast('لطفاً شمارهٔ تماس را وارد کنید'); return false;
  }
  return true;
}
async function send(url){
  if(!ready()) return;
  const ok = await copyText(buildMsg());
  toast(ok ? 'متن سفارش کپی شد؛ در چت پیام را پیست کنید' : 'پیام را به‌صورت دستی بنویسید');
  setTimeout(() => window.open(url, '_blank', 'noopener'), 700);
}
$('nextBtn').onclick = () => setStep(2);
$('backBtn').onclick = () => setStep(1);
$('sendEitaa').onclick = () => send('https://eitaa.com/' + EITAA);
$('sendTg').onclick = () => send('https://t.me/' + TELEGRAM);
$('copyOrder').onclick = async () => { if(ready()) toast((await copyText(buildMsg())) ? 'متن سفارش کپی شد' : 'کپی انجام نشد'); };
$('items').addEventListener('click', e => { if(e.target.id==='goShop'){ closeAll(); location.hash = '#products'; } });
$('fEitaa').textContent = '@' + EITAA; $('fEitaa').href = 'https://eitaa.com/' + EITAA;
$('fTg').textContent = '@' + TELEGRAM; $('fTg').href = 'https://t.me/' + TELEGRAM;

/* ---------- افکت‌های اسکرول ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if(!e.isIntersecting) return;
  e.target.classList.add('in'); io.unobserve(e.target);
}), {threshold:.12});
function watch(){
  document.querySelectorAll('.rv:not(.in)').forEach((el,i) => {
    el.style.transitionDelay = (i%4)*80 + 'ms'; io.observe(el);
  });
}
const cio = new IntersectionObserver(es => es.forEach(e => {
  if(!e.isIntersecting) return;
  cio.unobserve(e.target);
  const el = e.target, end = +el.dataset.count, pre = el.dataset.pre||'', t0 = performance.now();
  (function tick(t){
    const k = Math.min((t-t0)/1400,1), v = Math.round(end*(1-Math.pow(1-k,3)));
    el.textContent = pre + fa(v); if(k<1) requestAnimationFrame(tick);
  })(t0);
}), {threshold:.6});
document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

const bearing = document.querySelector('.bearing'), topbar = $('top');
let ticking = false;
function onScroll(){
  const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
  $('progress').style.transform = `scaleX(${h>0 ? y/h : 0})`;
  topbar.classList.toggle('shrunk', y>40);
  $('totop').classList.toggle('show', y>700);
  if(y < 900){ bearing.style.setProperty('--rot', y*0.12+'deg'); bearing.style.setProperty('--py', y*0.08+'px'); }
  ticking = false;
}
addEventListener('scroll', () => { if(!ticking){ ticking = true; requestAnimationFrame(onScroll); } }, {passive:true});
$('totop').onclick = () => scrollTo({top:0, behavior:'smooth'});

/* شروع */
renderChips(); renderGrid(); renderCart(); watch(); onScroll();
if(new URLSearchParams(location.search).get('cart')) toggle(true);
