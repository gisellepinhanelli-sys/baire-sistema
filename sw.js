// BAIRE: páginas atualizadas pela rede; última versão disponível quando offline.
const CACHE='baire-manutencao-20261010-v3';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.add(new Request('./index.html',{cache:'reload'}))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||e.request.mode!=='navigate')return;e.respondWith(fetch(e.request).then(async r=>{if(r.ok){const c=await caches.open(CACHE);await c.put('./index.html',r.clone());}return r;}).catch(()=>caches.match(new URL('./index.html',self.registration.scope).href,{cacheName:CACHE})));});
