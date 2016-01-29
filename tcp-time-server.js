var net = require('net')  
var date = new Date(); 
var server = net.createServer(function (socket) {
	socket.end(date.getFullYear()+ "-" + date.getMonth()+1 + "-" + date.getDate() + " " + pad(date.getHours()) + ":" + date.getMinutes() + "\n");
})  
server.listen(process.argv[2])

function pad(value){
	if (value < 10){ 
		return "0" + value; 
	} 
}