_require = require;
_fs = _require('fs');
_require('http').createServer(function (req, res) {
  u = _require('url').parse(req.url,true), p = u.pathname;
  if (!p.match(/\/([a-zA-Z0-9]+)/)) { p = 'i' } w = './'+p+'.w';
  if (u.query.d) {
    _fs.writeFileSync(w,u.query.d);
    res.writeHead(302,{'Location':p}); res.end();
  } else {
    _fs.readFile(w, function (o, data) {
      res.writeHead(200, {'Content-Type':'html'});
      _escaped_data = (""+x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') 
      res.end(_escaped_data.replace(/htt\S+|([A-Z]\w+){2,}/g,"<a href=$&>$&</a>").replace(/\n\r/g,'<p>')+"<hr><form><textarea cols=99 rows=25 name=d>"+_escaped_data+"</textarea><br><input type=submit ></form>");
    });
  }
}).listen(8000);
