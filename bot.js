const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const request = require('request');
const get = require('simple-get')
request("http://www.robloxdataa.tk/skybot/userdata.json", { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  let userData = body;
});
client.on('ready', () => {
    client.user.setActivity(`IMPORTANT | -help`)
  })
  

client.on('message', message =>{

    let sender = message.author;
    let msg = message.content.toLowerCase();
    let prefix = '-'



    if (!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
    if (!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 100;

    request(`http://www.robloxdataa.tk/skybot/post.php?content=${userData}`), (err) => {
        if (err) console.log("POST ERROR | " + err)
    }



    if (msg === prefix + 'help') {
        message.channel.send('SkyBot is being rewritten from the ground up, stay tuned.')
    }

    if (msg === prefix + "bal" || msg === prefix + 'balance') {
        message.channel.send(`${sender.username}'s Balance: ${userData[sender.id + message.guild.id].money}`)
    }

})
