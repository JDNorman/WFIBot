const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    //Command Builder
    data: (statsSLASH = new SlashCommandBuilder()
    .setDMPermission(true)
    .setName('stats')
    .setDescription('Sends a summary of statistical data for the team.')
    .addStringOption(option =>
        option.setName('team')
        .setDescription('Team number of the team to search for.')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('season')
        .setDescription('Season to search from.')
        .addChoices(
            { name: '2019 Skystone', value: '2019' },
            { name: '2020 Ultimate Goal', value: '2020' },
            { name: '2021 Freight Frenzy', value: '2021' },
            { name: '2022 Power Play', value: '2022' },
            { name: '2023 Centerstage', value: '2023' },
        )
    )),

    async execute(int) {
        console.log(`Someone used a stats command!`);

        await int.deferReply({ ephemeral: true });

        const now = new Date();
        const month = now.getMonth();
        const monthsToDecrement = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const currentYear = monthsToDecrement.includes(month) ? now.getFullYear() - 1 : now.getFullYear();

        const channel = int.channel;
        const team = int.options.getString('team');
        const season = int.options.getString('season') || currentYear;

        teamOverview = 'https://api.ftcscout.org/rest/v1/teams/' + team + 'events/' + season;
        let teamStatOverview = await axios.getAdapter(teamOverview)
        .catch(error => {
            console.error(error);
            int.editReply('An error occured while fetching api data.');
        });

        console.log(teamData.data);

        








    },
};