var sys = require('sys'),
    fs = require('fs'),
    http = require('http'),
    url = require('url');
 
 
http.createServer(function (req, res) {
    var u = url.parse(req.url,true), path = u.pathname, e = path.match('^\/([a-zA-Z0-9]+)\/e'), v = path.match('^\/([a-zA-Z0-9]+)');

    if (path == '/') { res.writeHead(302, {'Location': '/MiniWiki' }); res.end(); return; } else
    if (e) {
      if (u.query.d) {
          fs.writeFileSync(e[1],u.query.d);
          res.writeHead(302, {'Location': '/'+e[1] }); res.end(); 
          return
        } else {
          fs.readFile(e[1], function (err, data) {
            d("<form><textarea cols=100 rows=25 name='d'>"+data+"</textarea><br><input type='submit' /></form>");
          });
        }
    } else
    if (v) {
      fs.readFile(v[1], function (err, data) {
        if (err) { data = 'edit me'; fs.writeFileSync(v[1],data); };
        d(n(data)+"<hr><a href='/"+v[1]+"/e'>edit</a>");
      });
    }
    
    function d(x) { res.writeHead(200, {'Content-Type': 'text/html'}); res.end(x); }
    function n(x) { return String(x).replace(/(http:\/\/\S+)/g," <a href=$1>$1</a>").replace(/([A-Z][a-z]*){2,}/g," <a href=/$&>$&</a>").replace('\n','<br/>')}

}).listen(8000);
