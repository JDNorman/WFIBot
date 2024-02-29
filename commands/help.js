//imports
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    //Command Builder
    data: (helpSLASH = new SlashCommandBuilder()
        .setName('help')
        .setDescription('Sends what commands this bot can run!')
    ),

    async execute(int) {
        console.log(`${int.author.username} used a help command!`);
    
        const Embed = {
            color: color,
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
            ]
        }

        int.reply({ embeds: [Embed]});
    },
};