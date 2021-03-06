const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fetch = require("node-fetch")

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env['TOKEN']
const GUILD_ID= process.env['GUILD_ID']
const CLIENT_ID = process.env['CLIENT_ID']


const sadWords = ["sad","depressed","unhappy","angry"]
const encouragements = [
  "Cheer up",
  "Hang in there.",
  "You are a great person!"
]

const commands = [{
  name: 'amogus',
  description: 'Replies with sus!'
},{
  name:'video',
  description:'Replies with sussy video'
}]; 

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();



function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + "-" + data[0]["a"]
    })
}



client.on("ready", () =>{
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg =>{
  if (msg.author.bot) return

  if (msg.conten == "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }

  if (sadWords.some(word => msg.content.includes(word))) {
    const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
    msg.reply(encouragement)
  }
  
  else if (msg.content === 'balls') {
    msg.reply("amogus") 
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'amogus') {
    await interaction.reply('sus')
  }else if (interaction.commandName === 'video') {
    await interaction.reply('https://www.youtube.com/watch?v=yyM2tJfOkkc')
  }
});

client.login(token)