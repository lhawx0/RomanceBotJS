const { Client, Intents } = require('discord.js');

const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.GUILD.GUILD_VOICE_STATES
  ] });

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = requrie("fs")
const {Player} = require("discord-player")

const token = process.env['TOKEN']
const GUILD_ID= process.env['GUILD_ID']
const CLIENT_ID = process.env['CLIENT_ID']

const LOAD_SLASH = process.argv[2] == "load"

client.slashcommands = new Discord.Collection()
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashFiles) {
  const slashcmd = require(`./slash/${file}`)
  client.slashcommands.set(slashcmd.data.name, slashcmd)
  if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
  const rest = new REST({ version: '9'}).setToken(token)
  console.log("Deploying slash commands")
  rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
    .then(() => {
      console.log("Successfully loaded")
      process.exit(0)
    })
    .catch((err) => { 
      if (err) {
        console.log(err)
        process.exit(1)
      }
    })
}
else {
  client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`)
  })
  client.on("interactionCreate", (interaction) => {
    async function handleCommand() {
      if (!interaction.isCommand()) return 
      const slashcmd = client.slashcommands.get(interaction.commandName)
      if (!slashcmd) interaction.reply("Not a valid slash command")

      await interaction.deferReply()
      await slashcmd.run({client, interaction})
    }
    handleCommand()
  })
  client.login(token)
}

// const commands = [{
//   name: 'amogus',
//   description: 'Replies with sus!'
// },{
//   name:'video',
//   description:'Replies with sussy video'
// }]; 

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



client.on("ready", () =>{
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on("message", msg =>{
  if (msg.content === 'balls') {
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