$=require;
_=$('fs');

$('http').createServer(function (req, res) {
  w=req.url.split(/([a-zA-Z0-9]+)/)[1];if (!w) {w='i'}

  req.on('data',function(d) { _.writeFileSync(w,unescape((d+'').substr(2)).replace('+',' ')) })

  _.readFile(w, function (o, data) {
    res.writeHead(200, {'Content-Type':'text/html'});
    n = (""+data).replace(/</g, '&lt;').replace(/>/g, '&gt;')
    res.end(n.replace(/htt\S+|([A-Z]\w+){2,}/g,"<a href=$&>$&</a>").replace(/\n\r/g,'<p>')+"<hr><form method=POST><textarea cols=99 rows=25 name=d>"+n+"</textarea><br><input type=submit></form>");
  });
}).listen(80);
