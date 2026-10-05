const CACHE='baire-commercial-20261005-prospeccao-v3';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('baire-commercial-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  // Apenas o aplicativo público. Nenhuma chamada de autenticação, API ou e-mail é armazenada.
  if(event.request.method!=='GET'||url.origin!==self.location.origin||url.search||url.pathname.includes('/vendor/')||url.pathname.endsWith('outlook-retorno.html'))return;
  if(event.request.mode==='navigate')event.respondWith(fetch(event.request).then(response=>{if(response.ok){const clone=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',clone));}return response;}).catch(()=>caches.match('./index.html')));
  else if(ASSETS.some(p=>new URL(p,self.registration.scope).pathname===url.pathname))event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
