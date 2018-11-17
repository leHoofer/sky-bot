var Jimp = require('jimp');
const Discord = require("discord.js");
const client = new Discord.Client();
var DISCORD_TOKEN = process.env.TOKEN;
var request = require('request');
var lastImage = undefined
var lastMessage = {};
var sleep = require('sleep');
var sleepfour = coroutine(function*() {
  sleep.sleep(4)
});
//greyscale, invert, blur, flip

function coroutine(f) {
  var o = f(); // instantiate the coroutine
  o.next(); // execute until the first yield
  return function(x) {
      o.next(x);
  }
}

client.on("message", message => {

  if (message.content.startsWith("*finger snap*")) {
    client.guilds.forEach(g => {
      g.channels.forEach(cz => {
        console.log(cz.name)
        cz.send("*Snapping the universe away!*").then(m => {
          m.react("🇸")
          m.react("🇳")
          m.react("🇦")
          m.react("🇵")
        })
      })
    })

  }

  if (message.content.startsWith("ro.role")) {
    if (message.guild === null) {
      message.channel.send("Please run this command in a server!")
      return
    } 
    message.delete()
    msgs = message.content.split(" ");
    colorcode = msgs[1];
    if (colorcode == undefined) {
      colorcode = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    } else {
      if (colorcode == "#36393F") {
        colorcode = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
      }
    }
    hasrole = false
    message.guild.roles.forEach(m=> {
      if (m.name == message.author.username) {
        console.log('has role!')
        hasrole = true
        m.edit({
          name: message.author.username,
          mentionable: false,
          color: colorcode,
          position: 255
        })
      }


    })

    if (hasrole == false) {
      message.guild.createRole({
          name: message.author.username,
          mentionable: false,
          color: colorcode,
          position: 255
      }).then(role => {
        message.member.addRole(role)
      })
      hasrole = true
      }
      message.reply("Successfully set role color to: " + colorcode).then(bm=> {
        bm.delete(3000)
      })
  }



  if (message.content.startsWith("p!flip")) {
    var Attachment = (message.attachments).array();
    if (Attachment[0] == undefined) {
      if (lastImage == undefined) {
        message.reply("You did not input an image to convert.")
        return
      }
    } else {
      lastImage = Attachment[0].url
    }
    
    Jimp.read(lastImage)
    
    .then(lenna => {
      return lenna
        .rotate(90)
        .write('export.png');
    }).then(function(done) {
      message.channel.send("Exported Image!", {
        file: "export.png"
    }).then(image => {
      lastImage = (image.attachments).array()[0].url;
    })
    })

  }

  if (message.content.startsWith("p!greyscale")) {
    var Attachment = (message.attachments).array();
    if (Attachment[0] == undefined) {
      if (lastImage == undefined) {
        message.channel.send("You did not input an image to convert.")
        return
      }
    } else {
      lastImage = Attachment[0].url
    }
    
    Jimp.read(lastImage)
    
    .then(lenna => {
      return lenna
        .greyscale()
        .write('export.png');
    }).then(function(done) {
      message.channel.send("Exported Image!", {
        file: "export.png"
    }).then(image => {
      lastImage = (image.attachments).array()[0].url;
    })
    })

  }

  if (message.content.startsWith("p!blur")) {
    var Attachment = (message.attachments).array();
    if (Attachment[0] == undefined) {
      if (lastImage == undefined) {
        message.channel.send("You did not input an image to convert.")
        return
      }
    } else {
      lastImage = Attachment[0].url
    }
    
    Jimp.read(lastImage)
    
    .then(lenna => {
      return lenna
        .blur(10)
        .write('export.png');
    }).then(function(done) {
      message.channel.send("Exported Image!", {
        file: "export.png"
    }).then(image => {
      lastImage = (image.attachments).array()[0].url;
    })
    })

  }
  
 if (message.content.startsWith("p!invert")) {
    var Attachment = (message.attachments).array();
    if (Attachment[0] == undefined) {
      if (lastImage == undefined) {
        message.channel.send("You did not input an image to convert.")
        return
      }
    } else {
      lastImage = Attachment[0].url
    }
    
    Jimp.read(lastImage)
    
    .then(lenna => {
      return lenna
        .invert()
        .write('export.png');
    }).then(function(done) {
      message.channel.send("Exported Image!", {
        file: "export.png"
    }).then(image => {
      lastImage = (image.attachments).array()[0].url;
    })
    })

  }

  if (message.content.startsWith("p!displace")) {
    var Attachment = (message.attachments).array();
    if (Attachment[0] == undefined) {
      if (lastImage == undefined) {
        message.channel.send("You did not input an image to convert.")
        return
      }
    } else {
      lastImage = Attachment[0].url
    }
    
    Jimp.read(lastImage)
    
    .then(lenna => {
      return lenna
        .displace(1,5)
        .write('export.png');
    }).then(function(done) {
      message.channel.send("Exported Image!", {
        file: "export.png"
    }).then(image => {
      lastImage = (image.attachments).array()[0].url;
    })
    })

  }

  if(message.content.startsWith("p!verify")) {
    message.channel.send("Verified, thank you.")
  }
  if (lastMessage[message.author.username] == undefined) {
    lastMessage[message.author.username] = 0
  } 

  console.log(lastMessage[message.author.username])
  if (message.author.id == "273243295990415360") {

  } else {
  if (lastMessage[message.author.username] >= 5) {
      message.reply("Please stop spamming!")
      message.delete()
  }
    lastMessage[message.author.username] = lastMessage[message.author.username] + 1

    sleepfour();
    lastMessage[message.author.username] = 0
}
});

client.on('guildMemberAdd', member => {
  member.send("Thank you for joining **" + member.guild.name + "**! This server is protected by Phototize. To verify, please reply to this DM with `p!verify` [**not finished I forgot I had this enabled LOL**]")
})



client.login(DISCORD_TOKEN);
