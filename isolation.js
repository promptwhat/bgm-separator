// No content is uploaded or cached. One reload enables CPU threads when supported.
if(!window.crossOriginIsolated && 'serviceWorker' in navigator && window.isSecureContext){
  const flag='bgm-isolation-attempt';
  navigator.serviceWorker.register(new URL('./isolation-worker.js',document.currentScript.src)).then(async()=>{
    await navigator.serviceWorker.ready;
    const reload=()=>{
      if(!sessionStorage.getItem(flag)){sessionStorage.setItem(flag,'1');location.reload();}
    };
    if(navigator.serviceWorker.controller)reload();
    else navigator.serviceWorker.addEventListener('controllerchange',reload,{once:true});
  }).catch(()=>{});
}
