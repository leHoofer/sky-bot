const discord = require('discord.js');
var fs = require('fs');
const client = new discord.Client();
var sleep = require('system-sleep');
var request = require('request');
var ytdl = require('ytdl-core');
var economy = require('discord-eco');
client.on('ready', () => {
  client.user.setActivity(`-help | ${client.guilds.size} servers.`)
})

quotes = [
  "“Don't cry because it's over, smile because it happened.” ― Dr.Seuss",
  "“Be yourself; everyone else is already taken.” ― Oscar Wilde",
  "“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.” ― Albert Einstein",
  "“So many books, so little time.” ― Frank Zappa",
  "“Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.” ― Bernard M. Baruch",
  "“You only live once, but if you do it right, once is enough.” ― Mae West",
  "“If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.” ― J.K. Rowling, Harry Potter and the Goblet of Fire",
]

jokes = [
  "What is the biggest lie in the entire universe? 'I have read and agreed to the Terms & Conditions.'",
  "What should you do after your Nintendo game ends in a tie? Ask for a Wii-Match",
  "Why did the computer show up at work late? It had a hard drive.",
  "Why are Italians so good at making coffee? Because they know how to espresso themselves.",
  "Where do birds go for coffee? To the NESTcafe",
  "What kind of dog chases anything red? A bulldog.",
  "What do you call a cold dog? A Chilli Dog.",
  "What did the skeleton say to the puppy? Bonappetite."
]

randomm = [
"3.14",
"hi there",
"im bill.",
"call me chuck",
"nemo made me",
"just keep swimming",
"only you can prevent wild fires.",
"superman saves the day again.",
"what's that? oh it's nothing nevermind.",
"honestly, people are really stupid.",
"bot's shall take over the world.",
"go away",
"i like apple pie",
"is apple pie even a thing?",
"blueberries."
]

roasts = [
  "you're fat",
  "Move out of your mom's basement...",
  "we don't have enough roasts!",
  "you spend your life here? of all things",
  "you're the one interacting with a bot, anon.",
  "why are you in this trash hole",
  "look at your profile picture, *HEEZE* i can't hold it in HAHHAAHAHA"
]

ball = [
  ":8ball: Yes.",
  ":8ball: No.",
  ":8ball: Maybe.",
  ":8ball: Ask me again.",
  ":8ball: Unable to determin.",
  ":8ball: Possibly.",
  ":8ball: Most Certainly."
]

client.on('message', message => {
  if (message.content.startsWith("-help")) {
    const embed = new discord.RichEmbed()
    .setTitle(":scroll: Help and Commands :scroll:")
    .setColor(3447003)
    .addField("Prefix:", "-")
    .addField("Music Prefix:", "m-")
    .addField(":bookmark: Basic Commands :bookmark:", "-botinfo | Get info about the bot\n-servericon | Gives you the server icon image.\n-members | Gives the ammount of members including bots.\n-owner | Gives the owner tag. (HAIL THE QUEEN!)\n-say [Message] | Says said message and deletes yours.\n-ping | Get the bots ping.")
    .addField(":tada: Fun Commands :tada:", "-createemoji [url] [emoji-name] | Creates an emoji for your server\n-quote | Gives you a famous quote.\n-joke | Tells you a funny joke.\n-roast | Roasts you hardcore.\n-inftyping | Annoy the heck out of someone.")
    .addField(":musical_note: Music Commands :musical_note:", "m-play [Youtube URL] [volume] | Plays audio in voice channels.\nm-stop | Stops the music.")
    .addField(":game_die: Miscellaneous :game_die:", "-dreamlog [paragraph] | Log all of your dreams in a new way.\n-8ball [Question] | Get your fortune..")
    .addField(":moneybag: Economy :moneybag:", "-bal | Check your balance\n-pay [mention] [amount] | Pay someone.\n-setmoney [mention] [amount] | Admin only command.")
  message.channel.send({embed})
  return;
}});



client.on('message', message => {
  if(message.content == "-ping") {
    message.channel.send('Pong! Your ping is `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
  }
})

client.on('message', message => {
  if (message.content.startsWith("-dreamlog")) {
    let a = message.content.split(" ")
    let b = a.slice(1)
    let test = b.join(" ")
    let author = message.author.username
    message.delete()
    const embed = new discord.RichEmbed()
    .setTitle(`${author}#${message.author.discriminator}'s Dream Log`)
    .setDescription(test)
    .setColor(3447003)
    .setTimestamp()
    message.channel.send({embed})
  }});

client.on('message', message => {
  if(message.content == "-quote") {
    var rand = quotes[Math.floor(Math.random() * quotes.length)];
    message.channel.send(rand)
  }
})

client.on('message', message => {
  if(message.content.startsWith("-8ball")) {
    var rand = ball[Math.floor(Math.random() * ball.length)];
    message.channel.send(rand)
  }
})



client.on('message', message => {
  if(message.content == "-giveaway") {
    message.channel.send("React with :confetti_ball: to enter\nEnding in 15 seconds").then((msg)=>{
      msg.react("🎊").then((emogi)=> {
        sleep(15000)
        message.channel.send("Giveaway ended. A total of " + `${emogi.count - 1}` + " people have entered.")
        sleep(500)
        message.channel.send("And the winner is...")
        sleep(500)
        message.channel.send(emogi.users);
      })
    })
  }
})

client.on('message', message => {
  if(message.content == "-inftyping") {
    message.channel.startTyping(999999)
  }
})

client.on('message', message => {
  if(message.content == "-joke") {
    var rand = jokes[Math.floor(Math.random() * jokes.length)];
    message.channel.send(rand)
  }
})

client.on('message', message => {
  if(message.content == "-random") {
    var rand = randomm[Math.floor(Math.random() * randomm.length)];
    message.channel.send(rand)
  }
})

client.on('message', message => {
  if(message.content == "-roast") {
    var rand = roasts[Math.floor(Math.random() * roasts.length)];
    message.channel.send(rand)
  }
})

client.on('message', message => {
  if (message.content.startsWith("-call")) {
    let a = message.content.split(" ")
    let b = a[1]
    let c = a.slice(2)
    let msg = c.join(" ")
    console.log(b)
    console.log(client.guilds.get(c).id)
    if (client.guilds.get(c) == undefined) {
      message.channel.send("Phone Number not Found.")
    } else {
      message.channel.send(`**${message.guild.id}** | **${message.guild.author}** | ${msg}`)
      client.guilds.get(c).channels.find("username", "general").send(`**${message.guild.id}** | **${message.guild.author}** | ${msg}`)
    }


    
    
  }});

client.on('message', message => {
  if (message.content.startsWith("-serverinfo")) {
    const embed = new discord.RichEmbed()
    .setTitle("Server Info:")
    .setColor(3447003)
    .addField(":paperclip: Server Name", "Name: " + message.guild.name)
    .addField(":earth_africa: Creation Date", "Made on: " + message.guild.createdAt)
    .addField(":family_wwgb: Members", "Member Count: " + message.guild.memberCount)
    .addField(":crown: Owner", "Server Owner: <@" + message.guild.ownerID + ">")
    .addField(":envelope: Invite", "Invite Link: " + "Coming Soon:tm:")
    .addField(":flag_white: Server Region", "Region: " + message.guild.region)
  message.channel.send({embed})
}});

client.on('message', message => {
  if (message.content.startsWith("-botinfo")) {
    const embed = new discord.RichEmbed()
    .setTitle("Bot Info:")
    .setColor(3447003)
    .addField(":crown: Bot Creator", "Nemo#4298")
	.addField(":envelope_with_arrow: Add me", "https://discordapp.com/api/oauth2/authorize?client_id=459885159856996353&permissions=8&scope=bot")
	.addField(":desktop: Version", "1.3.0")
  message.channel.send({embed})
}});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'general');
  if (!channel) return;
  const embed = new discord.RichEmbed()
  .setTitle('**NEW MEMBER!**')
  .addField("Well look who it is!",`It's ${member}!`)
  channel.send({embed});
});



client.on('message', message => {
  if (message.content.startsWith("-createemoji")) {
    if(message.author.bot) return;
    let a = message.content.split(" ")
    let b = a[1]
    let c = a[2]
    if(b == undefined) {
    message.channel.send("Invalid Syntax -createemoji [url] [emoji-name]")
    } else {
    message.guild.createEmoji(b,c)
    .then(emoji => message.channel.send(`Created Emoji: ${emoji}`))
    }
  }});

  client.on('message', message => {
    if (message.content.startsWith("-bal")) {
      if(message.author.bot) return;
      var money = 0;
      economy.fetchBalance(message.author.id).then((i) => {
        money = i.money;
      });
      const embed = new discord.RichEmbed()
      .addField(`**${message.author.username}'s Balance**`,`${money} Skybucks`)
      .setColor(3447003)
      message.channel.send({embed});
      return;
    }});

    client.on('message', message => {
      if (message.content.startsWith("-setmoney")) {
        if(message.author.bot) return;
        let a = message.content.split(" ")
        let b = a[1]
        let c = a[2]
        var person = message.mentions[1];
        console.log(message.mentions);
        var bal = 0;
        economy.fetchBalance(person.id).then((i) => {
          bal = i.money;
          economy.updateBalance(person.id, c - bal).then((i) => {
            message.channel.send(`**Set Cash To ${c}**`)
          });
      });
    }});
    
    client.on('message', message => {
      if (message.content.startsWith("-pay")) {
        if(message.author.bot) return;
        let a = message.content.split(" ")
        let b = a[1]
        let c = a[2]
        var person = message.mentions[1];
        var bal = 0;
        economy.fetchBalance(message.author.id).then((i) => {
          bal = i.money;
      });








        if (person === undefined) {
          const embed = new discord.RichEmbed()
          .addField(`HEY!`, `That's the invalid sytax, are you in the right mood?`)
          .setColor(3447003)
          message.channel.send({embed});
          return;
        }










        if (person.id === message.author.id) {
          const embed = new discord.RichEmbed()
          .addField(`HEY!`, `You cannot send money to yourself, are you in the right mood?`)
          .setColor(3447003)
          message.channel.send({embed});
          return;
        } else {
        if (c <= 0) {
          const embed = new discord.RichEmbed()
          .addField(`HEY!`, `You cannot send money less than 0, are you in the right mood?`)
          .setColor(3447003)
          message.channel.send({embed}); 
          return;
        } else {


          if(bal < c) {
            const embed = new discord.RichEmbed()
            .addField(`HEY!`, `You do not have enough money!`)
            .setColor(3447003)
            message.channel.send({embed}); 
            return;
          } else {
            economy.updateBalance(person.id, c).then((i) => {
              economy.updateBalance(message.author.id, -Math.abs(c)).then((i) => {
                
              });
            });
          }
        }
        
        }
      }});

  client.on('message', message => {
    if (message.content.startsWith("-status")) {
      if (message.author.id == "207323008526843904") {
      let a = message.content.split(" ")
      let b = a.slice(1)
      let members = b.join(" ")
      message.delete()
      client.user.setActivity(members);
    }
    }});

    client.on('message', message => {
      if (message.content.startsWith("-math")) {
        let a = message.content.split(" ")
        let b = a.slice(1)
        let result = b.join(" ")
        message.delete()
        message.channel.send(Number(result))
      }});
  

  client.on('message', message => {
    if (message.content.startsWith("-say")) {
      if(message.author.bot) return;
      let a = message.content.split(" ")
      let b = a.slice(1)
      let members = b.join(" ")
	  
      message.delete()
      console.log(members.indexOf("@everyone"))
      if (members.indexOf("@everyone") == -1) {
        if (members.indexOf("@here") == -1) {
      message.channel.send(members)
        } else {
          message.channel.send('You cannot mention everyone!')
        }
      } else {
        message.channel.send('You cannot mention everyone!')
      }
    }});

    client.on('message', message => {
      if (message.content.startsWith("-embed")) {
        let a = message.content.split(" ")
        let b = a.slice(1)
        let test = b.join(" ")
        
        message.delete()
        const embed = new discord.RichEmbed()
        .setDescription(test)
        .setColor(3447003)
        message.channel.send({embed})
      }});


client.on('message', message => {
  if (message.content.startsWith("<@459885159856996353> prefix")) {
    const embed = new discord.RichEmbed()
    .setTitle("Current Prefix")
    .setColor(3447003)
    .setDescription("Prefix is -")
  message.channel.send({embed})
}});

client.on('message', message => {
  if (message.content.startsWith("-setup-dreamlog")) {
    if (message.guild.channels.find("name","Dream Logs")) {
      var a = message.guild.channels.find("name","Dream Logs")
    } else {
      var a = message.guild.createChannel("Dream Logs", "category")
    }
    var b = message.guild.createChannel(`${message.author.username}`,"text",{parent: a})
    
}});

client.on('message', message => {
  if (message.content.startsWith("-servericon")) {
    const embed = new discord.RichEmbed()
    .setColor(3447003)
    .setTitle("Server Icon")
    .setImage(message.guild.iconURL)
  message.channel.send({embed})
}});

client.on('message', message => {
  if (message.content.startsWith("-hi")) {
  if (message.guild.id == "447988213114732545") {
    message.channel.send("hello fellow members am ur queen hail the queen")
  }
}});

client.on('message', message => {
  if (message.content.startsWith("-members")) {
  let mem = "[**"
  mem += message.guild.memberCount
  mem += "**] Total Members"
  message.channel.send({embed: {
    color: 3447003,
    title: ":clipboard: Members",
    description: mem
  }})
}});


function clean(text) {
  if (typeof(text) === "string")
  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on('message', message => {
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
}})

client.on('message', message => {
  if (message.content === "-restart") {
    if (message.author.id !== "207323008526843904") {
      message.channel.send("Not enough authorization.")
    } else {
      client.destroy()
      client.login(process.env.BOT_TOKEN)
    }
  }
})


client.on('message', message => {
  if (message.content.startsWith("-owner")) {
  var owner = "Your king/queen is: "
  owner += "<@"
  owner += message.guild.ownerID
  owner += ">"
  message.channel.send({embed: {
    color: 3447003,
    title: ":crown: Hail the queen/king",
    description: owner
  }})
}});
	
client.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content.startsWith('m-play')) {
    let a = message.content.split(" ")
    let b = a[1]
    let c = a[2]
    if (b == undefined) {
      message.channel.send("You did not input a Youtube URL.")
    } else {
    if (c == undefined) {
        c = 1
        if (message.member.voiceChannel) {
          message.channel.send("Joining Voice Channel.")
          message.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection
              message.channel.send('I have successfully connected to the channel!');
              const audio = connection.playStream(ytdl(b));
              audio.setVolume(c); // Set the volume back to 100%
            })
            .catch(console.log);
        } else {
          message.reply('You need to join a voice channel first!');
        }

    } else {
    
    if (message.member.voiceChannel) {
      message.channel.send("Joining Voice Channel.")
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.channel.send('I have successfully connected to the channel!');
          const audio = connection.playStream(ytdl(b));
          audio.setVolume(c); // Set the volume back to 100%
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }}
  }}
});



client.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === 'm-stop') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave()
          message.reply('I have successfully left the the channel!');
}}});



//client.guilds.get("449702205876994049").memberCount)
client.login(process.env.BOT_TOKEN);
