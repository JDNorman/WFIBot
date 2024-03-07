//imports
const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const configPath = path.resolve(__dirname, '..', 'config.json');
const { color } = require(configPath);
const decimalColor = parseInt(color, 16);

module.exports = {
    //Command Builder
    data: (helpSLASH = new SlashCommandBuilder()
        .setName('help')
        .setDescription('Sends what commands this bot can run!')
    ),

    async execute(int) {
        console.log(`Someone used a help command!`);
    
        const Embed = {
            color: decimalColor,
            title: 'Command List:',
            fields: [  
                {
                    name: 'Avatar',
                    value: 'Displays member avatar.'
                },
                {
                    name: 'Help', 
                    value: 'Displays the help menu.'
                },
                {
                    name: 'Member',
                    value: 'Displays member information.'
                },
                {
                    name: 'Ping',
                    value: 'Pings someone and finds latency'
                },
                {
                    name: 'Reverse',
                    value: 'Sends your text... in reverse!!!'
                },
                {
                    name: 'Vote',
                    value: 'Sends a poll to the poll channel.'
                },
                {
                    name: 'Scout',
                    value: 'Sends overall team season data in an embed.'
                }
            ]
        }
        
        int.reply({ embeds: [Embed]});
    },
};