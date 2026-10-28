/* صفحهٔ محصول: product.html?id=3 */
let cart = {};
try { cart = JSON.parse(localStorage.getItem('safir-cart')) || {}; } catch(e) {}
const save = () => { try{ localStorage.setItem('safir-cart', JSON.stringify(cart)); }catch(e){} };
const count = () => Object.values(cart).reduce((a,b)=>a+b,0);
const showCount = () => { $('cartCount').textContent = fa(count()); };

function toast(msg){
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(()=>t.classList.remove('show'), 2200);
}
async function copyText(t){
  try{ await navigator.clipboard.writeText(t); return true; }
  catch(e){ const a=document.createElement('textarea'); a.value=t; document.body.appendChild(a); a.select();
    let ok=false; try{ ok=document.execCommand('copy'); }catch(_){} a.remove(); return ok; }
}

const id = +new URLSearchParams(location.search).get('id');
const p = PRODUCTS.find(x => x.id === id);
$('fEitaa').textContent = '@' + EITAA; $('fEitaa').href = 'https://eitaa.com/' + EITAA;
$('fTg').textContent = '@' + TELEGRAM; $('fTg').href = 'https://t.me/' + TELEGRAM;
showCount();

if(!p){
  document.title = 'محصول پیدا نشد | سفیر بلبرینگ';
  $('page').innerHTML = `<div class="cart-empty"><p>این محصول پیدا نشد.</p><a class="btn" href="index.html#products">بازگشت به محصولات</a></div>`;
} else {
  document.title = `${p.name} | ${p.brand} | سفیر بلبرینگ`;
  $('metaDesc').content = `${p.name} برند ${p.brand}، ${p.spec}. قیمت و موجودی در فروشگاه سفیر بلبرینگ.`;

  const ld = document.createElement('script'); ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({'@context':'https://schema.org','@type':'Product',name:p.name,sku:code(p),category:p.cat,
    brand:{'@type':'Brand',name:p.brand},description:DESC[p.cat],
    offers:{'@type':'Offer',priceCurrency:'IRR',price:p.price*10,availability:p.stock>0?'https://schema.org/InStock':'https://schema.org/OutOfStock'}});
  document.head.appendChild(ld);

  const V = views(p);
  const related = [...PRODUCTS.filter(x=>x.cat===p.cat && x.id!==p.id), ...PRODUCTS.filter(x=>x.cat!==p.cat)].slice(0,4);
  let qty = 1;

  $('page').innerHTML = `
    <nav class="crumbs"><a href="index.html">خانه</a> / <a href="index.html#products">محصولات</a> / <span>${p.cat}</span></nav>
    <div class="pdp">
      <div class="gal">
        <div class="gal-main" id="galMain">${V[0].svg}</div>
        <div class="thumbs">${V.map((v,i)=>`<button class="th ${i?'':'on'}" data-i="${i}" aria-label="${v.name}">${v.svg}<span>${v.name}</span></button>`).join('')}</div>
        <p class="gal-note">تصاویر شماتیک هستند. برای دریافت عکس واقعی قطعه از پشتیبانی بخواهید.</p>
      </div>
      <div class="pinfo">
        <small class="kicker">${p.cat} | ${p.brand}</small>
        <h1>${p.name}</h1>
        <p class="pcode">کد محصول: <span dir="ltr">${code(p)}</span></p>
        <p class="desc">${DESC[p.cat]}</p>
        <div class="pprice">${fa(p.price)} <span>تومان / عدد</span></div>
        <p class="stock ${p.stock<5?'low':''}">${p.stock<5?'فقط '+fa(p.stock)+' عدد باقی مانده':'موجود در انبار'}</p>
        <div class="buyrow">
          <div class="qty"><button id="qm" aria-label="کاهش">−</button><b id="qv">۱</b><button id="qp" aria-label="افزایش">+</button></div>
          <button class="btn primary" id="addBtn">افزودن به سبد خرید</button>
        </div>
        <button class="btn full ask" id="askBtn">استعلام قیمت و موجودی در ایتا</button>
        <table class="specs">
          <tr><td>کد محصول</td><td dir="ltr" style="text-align:right">${code(p)}</td></tr>
          <tr><td>دسته</td><td>${p.cat}</td></tr>
          <tr><td>برند</td><td>${p.brand}</td></tr>
          <tr><td>مشخصات</td><td>${p.spec}</td></tr>
          <tr><td>موجودی</td><td>${fa(p.stock)} عدد</td></tr>
        </table>
      </div>
    </div>
    <h2 class="rel-title">محصولات مرتبط</h2>
    <div class="grid">${related.map(r=>`
      <a class="card" href="product.html?id=${r.id}">
        <div class="pic"><span class="brand-tag">${r.brand}</span>${ICONS[r.cat]}</div>
        <div class="info"><small>${r.cat} | ${r.brand}</small><h3>${r.name}</h3><span class="spec">${r.spec}</span>
        <div class="buy"><span class="price">${fa(r.price)} <span>تومان</span></span></div></div>
      </a>`).join('')}</div>`;

  $('galMain').parentElement.querySelector('.thumbs').onclick = e => {
    const b = e.target.closest('.th'); if(!b) return;
    document.querySelectorAll('.th').forEach(x => x.classList.toggle('on', x===b));
    $('galMain').innerHTML = V[+b.dataset.i].svg;
  };
  $('qm').onclick = () => { qty = Math.max(1, qty-1); $('qv').textContent = fa(qty); };
  $('qp').onclick = () => { if(qty < p.stock) qty++; else toast('بیش از موجودی انبار نمی‌توانید سفارش دهید'); $('qv').textContent = fa(qty); };
  $('addBtn').onclick = () => {
    const next = (cart[p.id]||0) + qty;
    if(next > p.stock){ toast('بیش از موجودی انبار نمی‌توانید سفارش دهید'); return; }
    cart[p.id] = next; save(); showCount(); toast('به سبد خرید اضافه شد');
  };
  $('askBtn').onclick = async () => {
    const ok = await copyText(`سلام، استعلام قیمت و موجودی:\n${p.name} (${p.brand}) | ${p.spec}\nکد محصول: ${code(p)}\nتعداد: ${fa(qty)}`);
    toast(ok ? 'متن استعلام کپی شد؛ در چت پیست کنید' : 'پیام را به‌صورت دستی بنویسید');
    setTimeout(() => window.open('https://eitaa.com/' + EITAA, '_blank', 'noopener'), 700);
  };
}

/* نوار پیشرفت و هدر */
addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - innerHeight, y = scrollY;
  $('progress').style.transform = `scaleX(${h>0 ? y/h : 0})`;
  $('top').classList.toggle('shrunk', y>40);
}, {passive:true});
