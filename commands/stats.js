const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const path = require('path');

const configPath = path.resolve(__dirname, '..', 'graphqlServer.js');
const { request }  = require(configPath);

module.exports = {
    //Command Builder
    data: (statsSLASH = new SlashCommandBuilder()
    .setDMPermission(true)
    .setName('stats')
    .setDescription('Sends a summary of statistical data of the team.')
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
        )
    ),

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

        const teamOverview = 'https://api.ftcscout.org/rest/v1/teams/' + team + '/events/' + season;
        const teamStatOverview = await axios.get(teamOverview)
        .catch(error => {
            console.error(error);
            int.editReply('An error occured while fetching api data.');
        });

        console.log(teamStatOverview.data);        

        let eventCodes = [];
        if (teamStatOverview && teamStatOverview.data) {
            eventCodes = teamStatOverview.data.map(item => item.eventCode);
            console.log(eventCodes);
        } else {
            console.error('No data received from the API');
        }

        // for every eventcode, get the event averages for data, and also send
        // info about the team's performance at every event (including graphs)

        // Create embed that has a graph of their opr per event (should go up, also show trendline)
        // Create embed per event that has every stat in a graph (error for max/min and graph shows average) -> total as text
        // Get opr per event and basic event stats

        for (i = 0; i < eventCodes.length; i++) {

            //get team opr
            const teamOprGET = 'https://api.ftcscout.org/rest/v1/events/' + season + '/' + eventCodes[i] + '/teams';
            const eventData = await axios.get(teamOprGET)
            .catch(error => {
                error.console(error);
                int.editReply('An error occured while fetching api data.');
            });

            const eventDataArray = Object.keys(eventData); 

            //get team stats for the event
            const teamScoreData = eventDataArray.find(obj => obj.teamNumber === team);
            console.log(teamScoreData);

            //from team stats get opr
            const totalPointsNp = teamScoreData['data']['stats']['opr']['totalPointsNp'];
            console.log(totalPointsNp);


            axios.post("https://api.ftcscout.org/graphql", {
                query: `
                {
                    teamByNumber(number:${team}){
                        quickStats(season:${season}, region:All) {
                            tot {
                                value
                            }
                        }
                    }
                }
            `
            }).then(response => {
                console.log(response.data.data.teamByNumber.quickStats.tot.value);
            });


    }

    },
};