(function(){
function apply(){let name=location.pathname.split('/').pop()||'index.html';let imgs=[...document.querySelectorAll('img[data-page-image-slot]')];let all=[];try{all=JSON.parse(localStorage.getItem('lnn_pageImages')||'[]')}catch(e){};imgs.forEach((el,i)=>{let item=all.find(x=>x.key===name+':'+el.dataset.pageImageSlot);if(!item||!item.images||!item.images.length)return;el.src=item.images[0];if(item.images.length>1){let wrap=document.createElement('div');wrap.className='flex flex-wrap gap-2 mt-3';item.images.forEach((src,j)=>{let btn=document.createElement('button');btn.type='button';btn.setAttribute('aria-label','Xem ảnh '+(j+1));let img=document.createElement('img');img.src=src;img.alt='Ảnh '+(j+1);img.style.cssText='width:72px;height:60px;object-fit:cover;border-radius:9px;border:2px solid #34a853';btn.append(img);btn.onclick=()=>{el.src=src};wrap.append(btn)});el.insertAdjacentElement('afterend',wrap)}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();
/* Thư viện ảnh cho nội dung động: dịch vụ, bài viết, sản phẩm nổi bật và banner. */
(function () {
  function enhance() {
    const records = [];
    const names = ['lnn_services','lnn_posts','lnn_featured','lnn_banners'];
    for (const name of names) {
      try { const arr = JSON.parse(localStorage.getItem(name) || '[]'); if(Array.isArray(arr)) records.push(...arr); } catch (_) {}
    }
    document.querySelectorAll('img:not([data-page-image-slot]):not([data-gallery-ready])').forEach(el => {
      const src = el.getAttribute('src') || '';
      const entry = records.find(x => Array.isArray(x.images) && x.images.length > 1 && x.image && (src === x.image || src.endsWith(x.image)));
      if (!entry) return;
      el.dataset.galleryReady = '1';
      const strip = document.createElement('div');
      strip.className = 'flex flex-wrap gap-2 mt-2';
      entry.images.forEach((url, i) => {
        const btn = document.createElement('button'); btn.type = 'button'; btn.setAttribute('aria-label', 'Xem ảnh ' + (i+1));
        const thumb = document.createElement('img'); thumb.src = url; thumb.alt = 'Ảnh ' + (i+1);
        thumb.style.cssText = 'width:64px;height:54px;object-fit:cover;border-radius:8px;border:2px solid #34a853';
        btn.appendChild(thumb); btn.onclick = () => { el.src = url; }; strip.appendChild(btn);
      });
      if (el.parentElement && el.parentElement.tagName === 'A') el.parentElement.insertAdjacentElement('afterend', strip);
      else el.insertAdjacentElement('afterend', strip);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance); else enhance();
  window.addEventListener('load', enhance);
})();
