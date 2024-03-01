//imports
const { SlashCommandBuilder } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord.js');
const puppeteer = require('puppeteer');
const webURL = 'https://ftcscout.org';

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

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(webURL);

        const team = int.option.team;
        const year = int.option.year;

        //Put in text into a text box and wait for a response
        document.getElementById('searchbar').value = team;

        //Select year
        $("select[name='season'] option").filter(function() {
            return $(this).text().indexOf(year) > -1;
        }).prop('selected', true);

        //Extract every div and add information to embeds
        //Put every element with that class into a list
        //Take that list and put every item from the lists into embeds

    }
}