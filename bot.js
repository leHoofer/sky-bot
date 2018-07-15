const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');


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

})

client.login(process.env.BOT_TOKEN);
