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
        message.channel.send('SkyBot is being rewritten from the ground up, stay tuned.')
    }

    if (msg === prefix + "bal" || msg === prefix + 'balance') {
        var bal = "Error"
        money.fetchBal(message.author.id).then((i) => {bal = i.money});
        message.channel.send(`${sender.username}'s Balance: ${bal}`)
    }

    if (msg === prefix + "testupd" || msg === prefix + 'tu') {
        money.updateBal(message.author.id,500);
        var bal = "Error"
        money.fetchBal(message.author.id).then((i) => {bal = i.money});
        message.channel.send(`${sender.username}'s New Balance: ${bal}`)
    }

})

client.login(process.env.BOT_TOKEN);
