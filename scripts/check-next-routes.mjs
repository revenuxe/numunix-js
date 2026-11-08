const origin = process.argv[2] || 'http://127.0.0.1:4173';
const failures = [];
const redirects = [
  ['/features','/services'], ['/features/web-development','/services'],
  ['/repairs/mobile-repair','/electronic/repairs/mobile-repair'],
  ['/approach','/repair-assessment'], ['/process','/repair-process'],
  ['/technology','/repair-diagnostics'], ['/support','/repair-aftercare'],
  ['/security','/repair-safety'], ['/articles','/repair-guides'],
  ['/admin','/admin/dashboard'],
];
for (const [path,target] of redirects) {
  const res=await fetch(new URL(path,origin),{redirect:'manual'});
  const expected=path==='/admin'?307:308;
  const location=res.headers.get('location');
  if(res.status!==expected || !location || new URL(location,origin).pathname!==target) failures.push({path,status:res.status,location});
}
for (const path of ['/missing-page','/electronic/repairs/washing-machine-repair','/appliances/repairs/mobile-repair','/appliances/repairs/washing-machine-repair/unknown-brand','/repair-guides/unknown-guide','/who-we-serve/unknown-audience']) {
  const res=await fetch(new URL(path,origin));
  if(res.status!==404) failures.push({path,status:res.status,expected:404});
}
for(const path of ['/admin/login','/admin/dashboard','/thank-you?booking=invalid']) {
  const res=await fetch(new URL(path,origin));const html=await res.text();
  if(res.status!==200 || !/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html)) failures.push({path,status:res.status,error:'Private/transactional page lacks noindex'});
  if(!res.headers.get('x-robots-tag')?.includes('noindex')) failures.push({path,error:'Private/transactional HTTP noindex missing'});
  if(path.startsWith('/thank-you')&&html.includes('BOOKING REFERENCE')) failures.push({path,error:'Invalid receipt accepted'});
}
const keepalive=await fetch(new URL('/api/public/keepalive',origin));
if(![401,500].includes(keepalive.status)) failures.push({path:'/api/public/keepalive',status:keepalive.status,error:'Unauthenticated endpoint was accepted'});
console.log(JSON.stringify({redirectsChecked:redirects.length,invalidPagesChecked:6,privatePagesChecked:3,failures},null,2));
process.exitCode=failures.length?1:0;
