// Imports
// const eventBuilder = require('./embeds/eventEmbed.js');
// const functions = require('./functions/functions.js');

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const path = require('path');

const functionPath = path.resolve(__dirname, '..', 'functions/functions.js');
const rounding = require(functionPath);

const eventEmbedPath = path.resolve(__dirname, '..', 'embeds/eventEmbed.js');
const eventEmbed = require(eventEmbedPath);

module.exports = {
    //Command Builder
    data: (scoutSLASH = new SlashCommandBuilder()
    .setDMPermission(true)
    .setName('scout')
    .setDescription('Scouting data for a team')
    .addStringOption(option => 
        option.setName('team')
        .setDescription('Team number of the team to search for.')
        .setRequired(true))
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
    ),

    async execute(int) {
        console.log(`Someone used a scout command!`);

        await int.deferReply({ ephemeral: true });

        const now = new Date();
        const month = now.getMonth();
        const monthsToDecrement = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const currentYear = monthsToDecrement.includes(month) ? now.getFullYear() - 1 : now.getFullYear();
        
        const channel = int.channel;
        const team = int.options.getString('team');
        const season = int.options.getString('season') || currentYear;
        
        teamHome = "https://api.ftcscout.org/rest/v1/teams/" + team;
        let teamData = await axios.get(teamHome)
            .catch(error => {
                console.error(error);
                int.editReply('An error occured while fetching team data.');
            });

        console.log(teamData.data);
            
        const teamNumber = teamData.data.number;
        const numberStr = String(teamNumber) || null;

        const teamName = teamData.data.name;
        const nameStr = String(teamName) || null;

        const teamSchoolName = teamData.data.schoolName;
        const schoolStr = String(teamSchoolName) || null;

        let teamSponsors = [];
        teamSponsors.push(...teamData.data.sponsors);
        let sponsorStr = teamSponsors.map(spo => String(spo));

        //Region Data
        const teamCountry = teamData.data.country;
        const countryStr = String(teamCountry) || null;
                
        const teamState = teamData.data.state;
        const stateStr = String(teamState) || null;
                
        const teamCity = teamData.data.city;
        const cityStr = String(teamCity) || null;
                
        const teamRookieYr = teamData.data.rookieYear;
        const rookieStr = String(teamRookieYr) || null;
                
        const teamWebsite = teamData.data.website;
        const websiteStr = String(teamWebsite) || null;

        //Create the embed!
        const homePage = new EmbedBuilder()
            .setColor('f57724') //Embed color
            .setTitle('***' + nameStr + '***') // Team name
            .setDescription('**' + numberStr + '**'); //Team #
            
        if (schoolStr != 'null') homePage.addFields({ name: '*School:*', value: '`' + schoolStr + '`' });
        if (sponsorStr.length > 0) {
            sponsorStr.forEach(spo => {
                homePage.addFields({ name: '*Sponsor:*', value: '`' + spo + '`' });
        })};
        if (countryStr != 'null') homePage.addFields({ name: '*Region:*', value: '`' + countryStr + '`' });
        if (stateStr != 'null') homePage.addFields({ name: '*State/Province:*', value: '`' + stateStr + '`' });
        if (cityStr != 'null') homePage.addFields({ name: '*City:*', value: '`' + cityStr + '`' });
        if (rookieStr != 'null') homePage.addFields({ name: '*Rookie Year:*', value: '`' + rookieStr + '`' });
        if (websiteStr != 'null') homePage.addFields({ name: '*Website:*', value: '`' + websiteStr + '`' });
                
        await int.editReply('Embeds constructed!');   

        teamSeason = "https://api.ftcscout.org/rest/v1/teams/" + team + "/quick-stats?season=" + season;
        let seasonData = await axios.get(teamSeason)
            .catch(error => {
                console.error(error);
                int.editReply('An error occured while fetching season data.');
            });

        console.log(seasonData.data);

        const teamseason = seasonData.data.season;
        const seasonStr = String(parseFloat(teamseason, 10)) || null;

        const totval = seasonData.data.tot.value;
        const totvalStr = String(rounding(parseFloat(totval, 10))) || null;

        const totrank = seasonData.data.tot.rank;
        const totrankStr = String(parseFloat(totrank, 10)) || null;

        const avgautoval = seasonData.data.auto.value;
        const avgautovalStr = String(rounding(parseFloat(avgautoval, 10))) || null;

        const avgautorank = seasonData.data.auto.rank;
        const avgautorankStr = String(parseFloat(avgautorank, 10)) || null;

        const avgdcval = seasonData.data.dc.value;
        const avgdcvalStr = String(rounding(parseFloat(avgdcval, 10))) || null;

        const avgdcrank = seasonData.data.dc.rank;
        const avgdcrankStr = String(parseFloat(avgdcrank, 10)) || null;

        const avgegval = seasonData.data.eg.value;
        const avgegvalStr = String(rounding(parseFloat(avgegval, 10))) || null;

        const avgegrank = seasonData.data.eg.rank;
        const avgegrankStr = String(parseFloat(avgegrank, 10)) || null;


        //Create Embed!
        const totSeason = new EmbedBuilder()
            .setColor('f57724')
            .setTitle('***Total Season Overview***')
            .setDescription('**' + seasonStr + ' season**');

        
        if (totvalStr != 'null') totSeason.addFields({ name: '*Average points scored per game:*', value: '`' + totvalStr + '`' });
        if (totrankStr != 'null') totSeason.addFields({ name: '*Season ranking by points:*', value: '`' + totrankStr + '`' });
        if (avgautovalStr != 'null') totSeason.addFields({ name: '*Average points scored in auto:*', value: '`' + avgautovalStr + '`' });
        if (avgautorankStr != 'null') totSeason.addFields({ name: '*Season ranking by points in auto:*', value: '`' + avgautorankStr + '`' });
        if (avgdcvalStr != 'null') totSeason.addFields({ name: '*Average points scored in driver control:*', value: '`' + avgdcvalStr + '`' });
        if (avgdcrankStr != 'null') totSeason.addFields({ name: '*Season ranking by points in driver control:*', value: '`' + avgdcrankStr + '`' });
        if (avgegvalStr != 'null') totSeason.addFields({ name: '*Average points scored in end game:*', value: '`' + avgegvalStr + '`' });
        if (avgegrankStr != 'null') totSeason.addFields({ name: '*Season ranking by points in end game:*', value: '`' + avgegrankStr + '`' });
            

        //Get every event code into a list
        //Use endpoint https://api.ftcscout.org/rest/v1/teams/8651/events/2022
        //After getting the code, use the query for ftcscout to find event avg and median for stats as well as how well the team performed, put performance into a graph (opr change over time)

        //Get list
        const eventCodesQuery = "https://api.ftcscout.org/rest/v1/teams/" + team +"/events/" + season;
        let eventCodeResponse = await axios.get(eventCodesQuery)
            .catch(error => {
                console.error(error);
                int.editReply('An error occured while fetching event data.');
            });

        //Add every eventCode to a list.
        const eventCodes = eventCodeResponse.data.map(item => item.eventCode);
        console.log(eventCodes);
        const filteredCodes = eventCodes.filter(str => str.charAt(str.length - 1) !== 'S');
    
        //Loop through every event code and do these things in this order:
        //1. Get event median and average and team opr, add opr to an external list teamOPR
        
        //Constants I need for the query go here:
        let totalPoints = [];
        let idsWithTeamNum = [];

        //Loop begin here for each event
        for (i = 0; i < filteredCodes.length; i++) {
            const matchesRequest = `https://api.ftcscout.org/rest/v1/events/${season}/${filteredCodes[i]}/matches`;
            let matchesResponse = await axios.get(matchesRequest)
            .catch(error => {
                console.error(error);
                int.editReply("An error occured while fetching match data.");
            });

            const { data } = matchesResponse;

            totalPoints = data
                .map(match => [match.scores.red, match.scores.blue])
                .flat()
                .map(score => score.totalPoints);

            console.log(totalPoints);
            
        }
        //2. Do the math and display it at the top
        //3. Show which matches the team played in and their data
        //4. Loop back to the top
        let teamOPR = [];
        //foreach (code in eventCodes)

        









        //await int.followUp({ embeds: [homePage, totSeason] });



    },
};