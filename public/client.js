
var ws = new WebSocket("ws://localhost:8000/");

ws.onopen = function()
{
   ws.send("Message to send");
   console.log("Message is sent...");
};

ws.onmessage = function (evt) 
{ 
   var received_msg = evt.data;
   console.log("Message is received...");
};

ws.onclose = function()
{ 
   // websocket is closed.
    console.log("Connection is closed..."); 
};