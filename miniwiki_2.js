f=require('fs'),t=require('url');
require('http').createServer(function (req, res) {
  u = t.parse(req.url,true), p = u.pathname;
  if (!p.match(/\/([a-zA-Z0-9]+)/)) { p = 'i' } w = './'+p+'.w';
  if (u.query.d) {
    f.writeFileSync(w,u.query.d);
    res.writeHead(302,{'Location':p}); res.end();
  } else {
    f.readFile(w, function (o, data) {
      res.writeHead(200, {'Content-Type': 'text/html'}); 
      res.end(e(data).replace(/htt\S+|([A-Z]\w+){2,}/g,"<a href=$&>$&</a>").replace(/\n\r/g,'<p>')+"<hr><form><textarea cols=99 rows=25 name=d>"+e(data)+"</textarea><br><input type=submit /></form>");
    });
  }
  function e(x) { return String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') }
}).listen(8000);
