/* Enable local WebAssembly threads on static hosts without custom HTTP headers.
 * This worker only handles same-origin GET requests; it never receives files.
 */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET' || new URL(request.url).origin!==self.location.origin) return;
  event.respondWith((async()=>{
    const response=await fetch(request);
    if(response.type==='opaque' || response.status===0) return response;
    const headers=new Headers(response.headers);
    headers.set('Cross-Origin-Opener-Policy','same-origin');
    headers.set('Cross-Origin-Embedder-Policy','require-corp');
    headers.set('Cross-Origin-Resource-Policy','same-origin');
    return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
  })());
});
