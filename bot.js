const Discord = require("discord.js");
const client = new Discord.Client();
var DISCORD_TOKEN = process.env.TOKEN;
var request = require('request');
var lastShout = "";
request("http://ro-api.000webhostapp.com/ro-api/lastShout.txt", function (error, response, body) {
    lastShout = body
    });
function wait(milleseconds) {
    return new Promise(resolve => setTimeout(resolve, milleseconds))
  }





client.on("ready", a => {
function logEvery2Seconds(i) {
    setTimeout(() => {
        logEvery2Seconds(++i);
    }, 1500)
}
logEvery2Seconds(0);
let i = 0;
setInterval(() => {
    request("http://ro-api.000webhostapp.com/ro-api/lastShout.txt", function (error, response, body) {
        lastShout = body
        });

    if (lastShout == undefined) {
    console.log('Error 404 | Shout undefined')
    } else {
    request("https://groups.rprxy.xyz/v1/groups/4511209", function (error, response, body) {
        if (body == undefined) {
            console.log('Error 404 | Proxy returned blank')
        } else {
        body = JSON.parse(body)
        console.log(lastShout)
        console.log(body["shout"]["body"])
        if (lastShout == body["shout"]["body"]) {
        } else {
             url = ("http://ro-api.000webhostapp.com/ro-api/setShout.php?contents="+body["shout"]["body"]);
        request(url, function (error, response, body) {
        });
        client.guilds.get('509104083681148939').channels.get('509868150276358155').send("@here " + body["shout"]["body"] + " | https://www.roblox.com/My/Groups.aspx?gid=4511209")
        }
    }
        });

    }


}, 2000)

})
client.login(DISCORD_TOKEN);
