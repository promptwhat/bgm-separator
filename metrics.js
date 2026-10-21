// BGM OFF: only aggregate usage events; media contents and filenames never leave the device.
(()=>{
 const ID='G-4HTTKCYMX1', PUB='ca-pub-7570655174876561', KEY='bgm-privacy-v1';
 window.dataLayer=window.dataLayer||[];
 window.gtag=function(){window.dataLayer.push(arguments);};
 gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 let active=false;
 const cleanURL=location.origin+location.pathname;
 const ref=(()=>{try{return new URL(document.referrer).origin;}catch{return '';}})();
 const event=(name,params={})=>{if(active)gtag('event',name,{...params,page_location:cleanURL,page_referrer:ref});};
 const load=(src)=>{const s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src=src;document.head.append(s);};
 const start=()=>{
  if(active)return;active=true;
  gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('js',new Date());
  gtag('config',ID,{page_location:cleanURL,page_referrer:ref,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_flags:'SameSite=Lax;Secure'});
  load('https://www.googletagmanager.com/gtag/js?id='+ID);
  load('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+PUB);
 };
 let choice;try{choice=localStorage.getItem(KEY);}catch{}
 if(choice==='allow')start();
 const show=()=>{
  if(document.getElementById('privacy-choice'))return;
  const box=document.createElement('section');box.id='privacy-choice';box.setAttribute('aria-label','통계와 광고 설정');
  box.style.cssText='position:fixed;bottom:16px;left:16px;right:16px;max-width:620px;margin:auto;z-index:9999;background:#fff;color:#252820;border:1px solid #bec2b2;border-radius:14px;padding:18px;box-shadow:0 8px 40px #0002;font:14px/1.6 system-ui';
  box.innerHTML='<strong>통계와 광고 설정</strong><p style="margin:8px 0">방문 통계와 광고에 Google 쿠키를 사용합니다. 영상과 파일명은 전송하지 않습니다. 거부해도 분리 기능은 그대로 사용할 수 있어요. <a href="/bgm-separator/privacy.html">자세히 보기</a></p><div style="display:flex;gap:12px;flex-wrap:wrap"><button type="button" data-choice="allow">허용</button><button type="button" data-choice="deny">필수만 사용</button></div>';
  box.querySelectorAll('button').forEach(b=>{b.style.cssText='font:inherit;padding:10px 18px;border:1px solid #687052;border-radius:8px;background:#f1f4e8;color:#252820;cursor:pointer';b.addEventListener('click',()=>{
   const value=b.dataset.choice;try{localStorage.setItem(KEY,value);}catch{}
   box.remove();
   if(value==='allow')start();else {gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});if(active)location.reload();}
  });});document.body.append(box);
 };
 const mount=()=>{
  const footer=document.querySelector('footer')||document.body;
  const settings=document.createElement('button');settings.type='button';settings.textContent='통계·광고 설정';settings.style.cssText='font:inherit;background:transparent;color:inherit;border:0;text-decoration:underline;cursor:pointer;padding:8px';settings.addEventListener('click',show);footer.append(settings);
  if(!choice)show();
  document.addEventListener('click',e=>{
   const button=e.target.closest?.('#process-button');
   if(button&&!button.disabled)event('separation_start',{mode:document.querySelector('input[name="separation-mode"]:checked')?.value||'unknown'});
   const a=e.target.closest?.('a');
   if(a&&['download-video','download-clean','download-music'].includes(a.id)&&a.hasAttribute('href'))event('result_download',{result_type:a.id.replace('download-','')});
  },{capture:true});
  const panel=document.getElementById('result-panel');
  if(panel)new MutationObserver(ms=>{if(ms.some(m=>m.attributeName==='hidden')&&!panel.hidden)event('separation_complete',{mode:document.querySelector('input[name="separation-mode"]:checked')?.value||'unknown'});}).observe(panel,{attributes:true,attributeFilter:['hidden']});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
