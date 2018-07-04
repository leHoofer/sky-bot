const discord = require('discord.js');
var fs = require('fs');
const client = new discord.Client();
var sleep = require('system-sleep');
var request = require('request');
var ytdl = require('ytdl-core');

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
  "look at your profile picture, *HEEZE* i can't hold it in HAHHAAHAHA",
  ""
]

client.on('message', message => {
  if (message.content.startsWith("-help")) {
    const embed = new discord.RichEmbed()
    .setTitle(":scroll: Help and Commands :scroll:")
    .setColor(3447003)
    .addField("Prefix:", "-")
    .addField("Music Prefix:", "m-")
    .addField(":bookmark: Basic Commands :bookmark:", "-botinfo | Get info about the bot\n-purge [#] | Deletes # messages.\n-region | Gives Server Region.\n-servericon | Gives you the server icon image.\n-members | Gives the ammount of members including bots.\n-owner | Gives the owner tag. (HAIL THE QUEEN!)\n-say [Message] | Says said message and deletes yours.\n-ping | Get the bots ping.")
    .addField(":tada: Fun Commands :tada:", "-createemoji [url] [emoji-name] | Creates an emoji for your server\n-quote | Gives you a famous quote.\n-joke | Tells you a funny joke.\n-roast | Roasts you hardcore.\n-inftyping | Annoy the heck out of someone.")
    .addField(":musical_note: Music Commands :musical_note:", "m-play [Youtube URL] [volume] | Plays audio in voice channels.\nm-stop | Stops the music.")
    .addField(":game_die: Miscellaneous :game_die:", "-dreamlog [paragraph] | Log all of your dreams in a new way.")
  message.channel.send({embed})
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
	.addField(":desktop: Version", "1.2.4")
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
  if (message.content.startsWith("-region")) {
    let a = message.content.split(" ")
    let b = a[1]
    let members = message.guild.fetchMember(b)
    message.channel.send(members)
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
      let a = message.content.split(" ")
      let b = a.slice(1)
      let members = b.join(" ")
	  
      message.delete()
      if (~members.indexOf("@everyone") == -1) {
      message.channel.send(members)
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
    if (message.content.startsWith("-purge") ) {
      message.delete();
      var bbb = message.content.split(" ")
      var ammount = bbb[1]
      let messagecount = parseInt(ammount);
message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
      const embed = new discord.RichEmbed()
      .setColor(3447003)
      .setTitle("Messages Purged.")
      .setDescription("Deleted: " + ammount + " Messages.")
    message.channel.send({embed})
    sleep(10000)
  }else { 
  if (message.content.startsWith("-prune")) { 
    message.channel.send("Incorrect Syntax, Use -purge [#]") }
  }
  });

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
