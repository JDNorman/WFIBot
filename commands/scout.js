//imports
const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const configPath = path.resolve(__dirname, '..', 'config.json');
const { color } = require(configPath);
const decimalColor = parseInt(color, 16);
const axios = require('axios');
const readline = require('readline');

module.exports = {
    //Command Builder
    data: (scoutSLASH = new SlashCommandBuilder()
    .setDMPermission(true)
    .setName('scout')
    .setDescription('Scouting data for a team')
    .addStringOption(option => 
        option.setName('season')
            .setDescription('Which year do you want to search from?')
            .addChoices(
                { name: '2019 Skystone', value: '2019' },
                { name: '2020 Ultimate Goal', value: '2020' },
                { name: '2021 Freight Frenzy', value: '2021' },
                { name: '2022 Power Play', value: '2022' },
                { name: '2023 Centerstage', value: '2023' },
            )
        )
    .addStringOption(option => 
        option.setName('team')
        .setDescription('Team number of the team to search for.')
        .setRequired(true))
    
    ),

    async execute(int) {
        console.log(`Someone used a scout command!`);

        const thisYear = currentTime.getFullYear();

        const team = int.options.getString('team');
        const season = int.options.getString('season') || thisYear;
        
        axiosGET = "https://api.ftcscout.org/rest/v1/teams" + team + "/quick-stats?season=" + season + "&region=All"
        axios.get(axiosGET)
            .then(response => {
                console.log(response.data["tot"]["value"]);
            })  
    },
};