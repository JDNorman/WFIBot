//imports
const { SlashCommandBuilder, Embed } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord.js');
const puppeteer = require('puppeteer');

module.exports = {
    //Command Builder
    data: (scoutSLASH = new SlashCommandBuilder()
        .setName('scout')
        .setDescription('Pulls data from ftcscout')
        .addStringOption(option => 
            option.setName('team')
            .setDescription('Input team number')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('year')
            .setDescription('Which year to search for')
            .addChoices(
                { name: '2023 Centerstage', value: '2023' },
                { name: '2022 Powerplay', value: '2022' },
                { name: '2021 Freigh Frenzy', value: '2021' },
                { name: '2020 Ultimate Goal', value: '2020' },
                { name: '2019 Skystone', value: '2019' },
            )
        )
    ),
    
    async execute(int) {

        let currentYear = new Date().getFullYear();
        const team = int.options.getString('team');
        const year = int.options.getString('year') | currentYear;
        
        const divclass = 'svelte-zb3av6 vis';
        const webURL = 'https://ftcscout.org/teams/' + team + '?season=' + year;
        const urlString = webURL.toString()
        console.log(urlString);

        const browser = await puppeteer.launch();
        const page = await browser.newPage(webURL);
        await page.goto(webURL, {waitUntil: 'networkidle2'});
    
        // const divContent = await scrapeData();


        int.reply(urlString);

    }
}