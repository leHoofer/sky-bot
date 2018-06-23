const discord = require('discord.js');
var fs = require('fs');
const client = new discord.Client();
var sleep = require('system-sleep');
var request = require('request');
var urlExists = require('url-exists');
var ytdl = require('ytdl-core');

client.on('ready', () => {
  client.user.setActivity("!?!help")
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

roasts = [
  "Coming Soon"
]

client.on('message', message => {
  if (message.content.startsWith("!?!help")) {
    const embed = new discord.RichEmbed()
    .setTitle(":scroll: Help and Commands :scroll:")
    .setColor(3447003)
    .addField("Prefix:", "!?!")
    .addField("Music Prefix:", "m!?!")
    .addField(":bookmark: Basic Commands :bookmark:", "!?!purge [#] | Deletes # messages.\n!?!region | Gives Server Region.\n!?!servericon | Gives you the server icon image.\n!?!members | Gives the ammount of members including bots.\n!?!owner | Gives the owner tag. (HAIL THE QUEEN!)\n!?!say [Message] | Says said message and deletes yours.\n!?!ping | Get the bots ping.")
    .addField(":tada: Fun Commands :tada:", "!?!createemoji [url] [emoji-name] | Creates an emoji for your server\n!?!quote | Gives you a famous quote.\n!?!joke | Tells you a funny joke.\n!?!roast | Roasts you hardcore.")
    .addField(":musical_note: Music Commands :musical_note:", "m!?!play [Youtube URL] [volume] | Plays audio in voice channels.\nm!?!stop | Stops the music.")
  message.channel.send({embed})
}});



client.on('message', message => {
  if(message.content == "!?!ping") {
    message.channel.send('Pong! Your ping is `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
  }
})

client.on('message', message => {
  if(message.content == "!?!quote") {
    var rand = quotes[Math.floor(Math.random() * quotes.length)];
    message.channel.send(rand)
  }
})

client.on('message', message => {
  if(message.content == "!?!joke") {
    var rand = jokes[Math.floor(Math.random() * jokes.length)];
    message.channel.send(rand)
  }
})

client.on('message', message => {
  if(message.content == "!?!roast") {
    var rand = roasts[Math.floor(Math.random() * roasts.length)];
    message.channel.send(rand)
  }
})

client.on('message', message => {
  if (message.content.startsWith("!?!serverinfo")) {
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

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'general');
  if (!channel) return;
  channel.send(`Well look who it is! It's ${member}!`);
});



client.on('message', message => {
  if (message.content.startsWith("!?!createemoji")) {
    let a = message.content.split(" ")
    let b = a[1]
    let c = a[2]
    if(b == undefined) {
    message.channel.send("Invalid Syntax !?!createemoji [url] [emoji-name]")
    } else {
    message.guild.createEmoji(b,c)
    .then(emoji => message.channel.send(`Created Emoji: ${emoji}`))
    }
  }});

client.on('message', message => {
  if (message.content.startsWith("!?!region")) {
    let a = message.content.split(" ")
    let b = a[1]
    let members = message.guild.fetchMember(b)
    message.channel.send(members)
  }});

  client.on('message', message => {
    if (message.content.startsWith("!?!say")) {
      let a = message.content.split(" ")
      let b = a.slice(1)
      let members = b.join(" ")
      message.delete()
      message.channel.send(members)
    }});

    client.on('message', message => {
      if (message.content.startsWith("!?!embed")) {
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
    if (message.content.startsWith("!?!purge")) {
      message.delete();
      var bbb = message.content.split(" ")
      var ammount = bbb[1]
      let messagecount = parseInt(ammount);
message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
      const embed = new discord.RichEmbed()
      .setColor(3447003)
      .setTitle("Messages Pruned.")
      .setDescription("Deleted: " + ammount + " Messages.")
    message.channel.send({embed})
    sleep(10000)
  }});

client.on('message', message => {
  if (message.content.startsWith("<@459885159856996353> prefix")) {
    const embed = new discord.RichEmbed()
    .setTitle("Current Prefix")
    .setColor(3447003)
    .setDescription("Prefix is !?!")
  message.channel.send({embed})
}});


client.on('message', message => {
  if (message.content.startsWith("!?!servericon")) {
    const embed = new discord.RichEmbed()
    .setColor(3447003)
    .setTitle("Server Icon")
    .setImage(message.guild.iconURL)
  message.channel.send({embed})
}});

client.on('message', message => {
  if (message.content.startsWith("!?!members")) {
  let mem = "[**"
  mem += message.guild.memberCount
  mem += "**] Total Members"
  message.channel.send({embed: {
    color: 3447003,
    title: ":clipboard: Members",
    description: mem
  }})
}});
	
client.on('message', message => {
  if (message.content.startsWith("!?!owner")) {
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

  if (message.content.startsWith('m!?!play')) {
    let a = message.content.split(" ")
    let b = a[1]
    let c = a[2]
    if (b == undefined) {
      message.channel.send("You did not input a Youtube URL.")
    } else {
    if (c == undefined) {
        c = 1
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

  if (message.content === 'm!?!stop') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave()
          message.reply('I have successfully left the the channel!');
}}});


//client.guilds.get("449702205876994049").memberCount)
client.login(process.env.BOT_TOKEN);
