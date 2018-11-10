var Jimp = require('jimp');
const Discord = require("discord.js");
const client = new Discord.Client();
var DISCORD_TOKEN = process.env.TOKEN;
var request = require('request');
var lastImage = undefined
//greyscale, invert, blur, flip


client.on("message", message => {

  if (message.content.startsWith("ro.role")) {
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

});



client.login(DISCORD_TOKEN);
