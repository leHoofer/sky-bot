const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const request = require('request');
const money = require('discord-money');
client.on('ready', () => {
    client.user.setActivity(`IMPORTANT | -help`)
  })
  

client.on('message', message =>{

    let sender = message.author;
    let msg = message.content.toLowerCase();
    let prefix = '-'






    if (msg === prefix + 'help') {
        if (message.author.bot) {return;}
        message.channel.send('SkyBot is being rewritten from the ground up, stay tuned.')
    }
    if (msg === prefix + "bal" || msg === prefix + 'balance') {
        if (message.author.bot) {return;}
        money.fetchBal(message.author.id).then((i) => { 
        message.channel.send(`${sender.username}'s Balance: ${i.money} Skybucks`)
    })
        
    }
    if (msg.startsWith(prefix + "addmoney")) {
        if (message.author.bot) {return}
        console.log(message.member.displayName)
        if (member.hasPermission('MANAGE_CHANNELS')) { 
        console.log("okay setting master")
        a = msg.split(" ")
        b = parseInt(a[1])
        if (b === undefined) {
            message.channel.send("You did not enter a valid amount!")
        }
        money.updateBal(message.author.id,b).then((m) => {
            money.fetchBal(message.author.id).then((i) => { 
                message.channel.send(`${sender.username}'s New Balance: ${i.money} Skybucks`)
            })
        })
        } else {
        message.channel.send("You sir, have no permissions!")
        return
        }


    }

})

client.login(process.env.BOT_TOKEN);
