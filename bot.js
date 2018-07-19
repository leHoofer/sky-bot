var request = require('request');
const Discord = require("discord.js");
const client = new Discord.Client();
/*
var invite = "ewwJr7";
var channel = "451432205839761419";
var id = "298188468817887242";
var proxy = "";
*/
var tokens = [
"NDY4NjEyMDEzOTU5MTUxNjE2.Di7shg.flxYuSritE7EvRnp2r0IMhjwe2A",
"NDY4NjI1Njg0MzAyOTIxNzQ4.Di75LQ.Ec5ExAMH8Bwie799lNWC966jgqk",
"NDY4NjI1ODQ5MDM4NTM2NzE1.Di75VQ.UFaXYBDZsv9i8xsM4hAr3LwUYPA",
"NDY4NjI2NDIyOTMyNTcwMTEy.Di753Q.FLcIQ1M2ADBBHmuaqfREBccxuW8",
"NDY4NjI2NjgwMDkzNjA1OTA5.Di76Gw.BrwDKwYFcvWV8MaLdAlwlSWcH-w",
"NDY4NjI2ODY5NTI5MzQ2MDQ4.Di76SA.R7mSsgrpZ_GOXJOZRMdT6OWx9hk",
"NDY4NjI3MTQ5NzI1ODkyNjE5.Di76iw.71LbToUVfLpKmJu1NDgaQyd3aKg",
"NDY4ODk0NTM4MTM2NTUxNDI2.Di_zog.tfbz39B9tw8Sz81XQm0yRuk2XkQ",
"NDY4ODk0NzgzMTAwNjgyMjQx.Di_zzA.e8J2Ims1t_qKOMIfD5x_piagrEQ",
"NDY4ODk1MDA5MTAyNjI2ODM2.Di_0AQ.gsU4Y-n-iPMFjOTf7VQtzdyETcI",
"NDY4ODk1MTU0MDYxNzA1MjE4.Di_0JA.BewlNMx7Gjk9ULfJi5-N7JlrPPw",
"NDY4ODk1MzExNTIwMzMzODI2.Di_0Sg.fSqEK--CiBMweVEMgnfZsEq_hic",
"NDY4ODk1NDc2NTc0MzIyNzA4.Di_0cQ.CpGswvvkrv4OkSzlzz1QCswS27U",
"NDY4ODk1NjM4MjEwMzQ3MDA4.Di_0lw.Vc1F63KL4bu3PiLCF989PW_f374"
];


function reqreset(eemail, method, url, form) {
    return new Promise((resolve, reject) => {
        request({
            method: method,
            url: url,
            headers: {
                email: eemail
            },
            form: form
        }, (error, response, body) => {
            if (error) return reject(error);
            resolve(body);
        });
    });
}

function req(token, method, url, form) {
    return new Promise((resolve, reject) => {
        request({
            method: method,
            url: url,
            headers: {
                authorization: token
            },
            form: form
        }, (error, response, body) => {
            if (error) return reject(error);
            resolve(body);
        });
    });
}
function attack(tkn, inv, chnl, srver){
    console.log('Sent Join Request.')
    req(tkn, "POST", "https://discordapp.com/api/v6/invite/" + inv).then(body => {
        let parsed = JSON.parse(body);
        console.log(inv,chnl,srver)
    });
    req(tkn, "POST", "https://discordapp.com/api/v6/channels/" + chnl + "/messages", {content: "the earth is round"}).then(body => {
        req(tkn, "GET", "https://discordapp.com/api/v6/users/@me").then(body => {
            let parsed = JSON.parse(body);
            let sid = parsed["id"]
            req(tkn, "DELETE", "https://discordapp.com/api/v6/users/@me/guilds/" + srver).then(body => {
                console.log("Sent Leave Request.")
            });
    });
});


}


function send(invite,channel,server){

console.log("")
    
    tokens.forEach(function(death) {
        attack(death, invite, channel, server);
    });

    

}








client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
    if (message.content.startsWith("reset-acc")) {
        a = message.content.split(" ")
        b = a[1]
        reqreset(b, "POST", "https://discordapp.com/api/v6/auth/forgot")
        message.channel.send("Request sent to: " + b + "\nPlease check your email.")
    }
})


client.on("message", (message) => {
  if (message.content.startsWith("attack")) {
      a = message.content.split(" ")
      b = a[1]
      c = a[2]
      d = a[3]
      message.channel.send("Sent Bots to invite: " + b + " to the server ID of: " + c + " and the Channel ID of: " + d)
    send(b,d,c)
  }
});
client.login("NDYxOTgyODIyNDYzMTc2NzI0.DjFRng.Vz2JY73qywctus5DlySAZJ40zdQ");


































/*

Sorry, you can no have it yet ;(

*/








