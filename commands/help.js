//imports
const SlashCommandBuilder = require('discord.js');
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
                    name: '/avatar',
                    value: 'Displays member avatar.'
                },
                {
                    name: '/help', 
                    value: 'Displays the help menu.'
                },
                {
                    name: '/member',
                    value: 'Displays member information.'
                },
                {
                    name: '/ping',
                    value: 'Pings someone and finds latency'
                },
                {
                    name: '/reverse',
                    value: 'Sends your text... in reverse!!!'
                },
                {
                    name: '/vote',
                    value: 'Sends a poll to the poll channel.'
                },
                {
                    name: '/scout',
                    value: 'Sends overall team season data in an embed.'
                }
            ]
        }
        
        int.reply({ embeds: [Embed]});
    },
};