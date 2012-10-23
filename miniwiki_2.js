$=require;
_=$('fs');

$('http').createServer(function (req, res) {
  i=req.url.match(/([a-zA-Z0-9]+)/g)
  if (!i) {i=[];i[0] = 'i';} w = './'+i[0]+'.w';
  
  req.on('data',function(d) { _.writeFileSync(w,unescape((d+'').substr(2)).replace('+',' ')) })
  
  _.readFile(w, function (o, data) {
    res.writeHead(200, {'Content-Type':'text/html'});
    _escaped_data = (""+data).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') 
    res.end(_escaped_data.replace(/htt\S+|([A-Z]\w+){2,}/g,"<a href=$&>$&</a>").replace(/\n\r/g,'<p>')+"<hr><form method=POST><textarea cols=99 rows=25 name=d>"+_escaped_data+"</textarea><br><input type=submit ></form>");
  });
}).listen(8000);
