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
    }, 2000)
}
logEvery2Seconds(0);
let i = 0;
setInterval(() => {
    console.log('Waiting...')
    request("http://ro-api.000webhostapp.com/ro-api/lastShout.txt", function (error, response, body) {
        lastShout = body
        });


    request("https://groups.rprxy.xyz/v1/groups/4511209", function (error, response, body) {
        body = JSON.parse(body)


        if (lastShout == body["shout"]["body"]) {
        console.log('Already last shout!')
        } else {
        console.log('Sending group shout message!')
        client.guilds.get('509104083681148939').channels.get('509868150276358155').send("@here " + body["shout"]["body"] + " | https://www.roblox.com/My/Groups.aspx?gid=4511209")
        url = ("http://ro-api.000webhostapp.com/ro-api/setShout.php?contents="+body["shout"]["body"]);
        request(url, function (error, response, body) {
        });


        }
        });




}, 2000)

})
client.login(DISCORD_TOKEN);
