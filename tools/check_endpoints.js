const http = require('http');

function check(url){
  return new Promise((resolve)=>{
    http.get(url, (res)=>{
      let data='';
      res.on('data', c=>data+=c);
      res.on('end', ()=>resolve({url, ok: true, statusCode: res.statusCode, body: data.slice(0,200)}));
    }).on('error', ()=>resolve({url, ok:false}));
  });
}

(async ()=>{
  const urls=['http://localhost:10000/','http://localhost:5173/'];
  for(const u of urls){
    const r = await check(u);
    if(r.ok){
      console.log(`${u} -> ${r.statusCode}\n${r.body}\n`);
    } else {
      console.log(`${u} -> not responding`);
    }
  }
})();
