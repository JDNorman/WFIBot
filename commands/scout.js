//imports
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    //Command Builder
    data: (scoutSLASH = new SlashCommandBuilder()
        .setName('scout')
        .setDescription('Pulls data from ftcscout')
        .addStringOption(option => 
            option.setName)
        
        )
}