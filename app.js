//Importing server configuration
var app = require("./config/server.js");

//Set the available port or 3000
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Set the available host
var server_host = process.env.YOUR_HOST || '0.0.0.0';


var server = app.listen(server_port, server_host, function () {
    console.log("Server online.");
});

//Socket listening on the same port
var io = require("socket.io").listen(server);

//Set io as global variable
app.set("io", io);

//Listening for connections events
io.on("connection", function (socket) {
    console.log("New User connected.");
    socket.on("disconnect", function () {
        console.log("User disconnected.")
    });
    //Gets messages from clients
    socket.on("newMessageToServer", function (data) {
        //Dialog
        //To this user
        socket.emit("newMessageToClient", { name: data.name, message: data.message });

        //To all other users
        socket.broadcast.emit("newMessageToClient", { name: data.name, message: data.message });

        if (parseInt(data.userUpdated) == 0) {
            //Users online
            //To this user
            socket.emit("usersOnlineToClient", { name: data.name });

            //To all other users
            socket.broadcast.emit("usersOnlineToClient", { name: data.name });
        }

    });
});