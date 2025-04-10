const fn = require("socket.io")



function initialiseSocket(server)
{
    return fn(server) // returns io fn
}



module.exports = {
    initialiseSocket
}