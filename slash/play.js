const { SlashCOmmandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player") 

module.exports = {
    data: new SlashCOmmandBuilder()
        .setName("play")
        .setDescription("loads songs")
        .addSubcommand((subcommand) => 
            subcommand
                .setName("Song")
                .setDescription("Loads a single song from a url")
                .addStringOption((option)) => option.setName("url").setDescription("the song's url").setRequired(true)
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setname("playlist")
                .setDescription("Loads a playlist of songs from a url")
                .addStringOption(option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
}