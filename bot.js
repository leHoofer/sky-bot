const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const request = require('request');
const money = require('discord-money');
client.on('ready', () => {
    client.user.setActivity(`IMPORTANT | -help`)
  })
  

  function clean(text) {
    if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

client.on('message', message =>{

    let sender = message.author;
    let msg = message.content.toLowerCase();
    let prefix = '-'


            //*
            //* EVAL
            //*
        if (message.content.startsWith("-eval")) {
          if (message.author.id !== "207323008526843904") return;
          try {
            let a = message.content.split(" ")
            let b = a.slice(1)
            let code = b.join(" ")
            var evaled = eval(code);
      
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
      
          
          } catch(err) {
            message.channel.send(`Error 404: ${clean(err)}`)
          }
      }

            //*
            //* HELP
            //*

    if (msg === prefix + 'help') {
        if (message.author.bot) {return;}
        message.channel.send('-wallet | View how much cash u have on you\n-bank | View how much cash you have in the bank.\n-deposit [n] | Deposit [n] money to bank.\n-withdraw | Withdraw [n] money from bank.')
    }

            //*
            //* WALLET
            //*

    if (msg === prefix + "wallet" || msg === prefix + 'wallet') {
        if (message.author.bot) {return;}
        if (message.guild === null) {return};
        money.fetchBal(message.author.id).then((i) => { 
        message.channel.send(`${sender.username}'s Wallet Balance: ${i.money} Skybucks`)
    })
}

            //*
            //* BANK
            //*

    if (msg === prefix + "bank" || msg === prefix + 'bank') {
        if (message.author.bot) {return;}
        if (message.guild === null) {return};
        money.fetchBal("Bank-" + message.author.id).then((i) => { 
        message.channel.send(`${sender.username}'s Bank Balance: ${i.money} Skybucks`)
    })
}

            //*
            //* ADD MONEY
            //*

    if (msg.startsWith(prefix + "addmoney")) {
        if (message.author.bot) {return};
        if (message.guild === null) {return};
        if (message.author.id === "207323008526843904") {
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
        message.channel.send("This command is decapreated")
        return
        }


    }



            //*
            //* DEPOSIT
            //*

if (msg.startsWith(prefix + "deposit")) {
    a = msg.split(" ")
    b = a[1]
    money.fetchBal(message.author.id).then((i) => { 
        if (parseInt(i) >= parseInt(b)) {
            money.updateBal("Bank-" + message.author.id,b)
            money.updateBal(message.author.id, parseInt(b * -1))
        }
    })
}














})

client.login(process.env.BOT_TOKEN);
