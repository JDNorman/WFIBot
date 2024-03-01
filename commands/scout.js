//imports
const { SlashCommandBuilder, Embed } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord.js');
const puppeteer = require('puppeteer');

async function scrapeData() {

    //Title div
    const divContent = await page.evaluate(() => {
        const divs = Array.from(document.querySelectorAll('div'));
        const targetDiv = divs[0];
        return targetDiv ? targetDiv.outerHTML : '';
    });

}

module.exports = {
    //Command Builder
    data: (scoutSLASH = new SlashCommandBuilder()
        .setName('scout')
        .setDescription('Pulls data from ftcscout')
        .addStringOption(option => 
            option.setName('team')
            .setDescription('Input team number'
            .setRequired(true)))
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
            .setAutocomplete(true)
            .setRequired(true))
        ),
    
    async execute(int) {

        const team = int.option.team;
        const year = int.option.year;
        
        const divclass = 'svelte-zb3av6 vis';
        const webURL = 'https://ftcscout.org/teams/' + team + '?season=' + year;
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage(webURL);
        await page.goto(webURL, {waitUntil: 'networkidle2'});
    
        // const divContent = await scrapeData();


        // int.reply()

    }
}