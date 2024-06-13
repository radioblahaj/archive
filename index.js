require('dotenv').config()
const { App } = require('@slack/bolt');
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    // port: 3008
});

let archiveList = [
    'C078K46G9NU'
]

app.message("archive", async ({ message, say, client, body }) => {

    const checkChannel = app.client.conversations.info({
        channel: "C078K46G9NU"
        })

    const inChannel = (await checkChannel).channel.is_member; // returns true or false
    await say(`${inChannel}`)
    try {
    switch (inChannel) {
        case true:
            app.client.chat.postMessage({
                channel: "C078K46G9NU",
                text: "Archiving this channel! If you want to contest, dm @arav"
            })     
            app.client.conversations.archive({
                token: process.env.SLACK_USER_TOKEN,
                channel: "C078K46G9NU"
            })
            
        break;
    case false:
        app.client.conversations.join({
            channel: "C078K46G9NU"
        })            
    } 
} catch(e) {
await say("There's an error" + e)
}


});

(async () => {
    // Start your app
    await app.start();
  
    console.log("⚡️ Bolt app is running!");
  })();
  