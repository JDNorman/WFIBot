//CONSTANTS AND SETUP -------------------------------------------------\\

//discord requires
const { ActionRowBuilder } = require('discord.js');
const { ActivityType } = require('discord.js');
const { ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');
const { Client } = require('discord.js');
const { Collection } = require('discord.js');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { Events } = require('discord.js');
const { Intents } = require('discord.js');
const { IntentsBitField } = require('discord.js');
const { MessageActionRow } = require('discord.js');
const { MessageAttachment } = require('discord.js');
const { MessageButton } = require('discord.js');
const { MessageCollector } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { MessageMentions } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder  } = require('discord.js');

//config requires
const { password } = require('./config.json');
const { token } = require('./config.json');

//other setup
const fs = require('node:fs');
const path = require('node:path');
const readline = require('readline');
const { DateTime } = require('luxon');

//embed color (hex value)
const color = '800000'

//CONSTANTS AND SETUP -------------------------------------------------//
//
//
//
//INTENTS SETUP -------------------------------------------------------\\

const myIntents = new IntentsBitField();

myIntents.add(
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.DirectMessages,   
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildInvites,  
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages, 
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildScheduledEvents,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildWebhooks, 
    IntentsBitField.Flags.MessageContent,
)

const client = new Client({ 
    intents: myIntents,
});

//INTENTS SETUP -------------------------------------------------------//
//
//
//
//APPLICATION FILEPATH SETUP ------------------------------------------\\

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
// Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } 
  else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

//APPLICATION FILEPATH SETUP ------------------------------------------//
//
//
//
//APPLICATION COMMANDS SETUP ------------------------------------------\\

client.on("ready", async () => {
    try {
      await client.application.commands.set([pingSLASH, reverseSLASH, /*PUT THE REST OF THE COMMAND NAMES HERE*/]);
      console.log('Slash commands registered!');
    } catch (error) {
      console.error(error);
    }
    console.log(`Logged in as ${client.user.tag}!`);
    
    //Activity type
    client.user.setActivity('/ping!', { type: ActivityType.Listening });
    
  });

//APPLICATION COMMANDS SETUP ------------------------------------------//
//
//
//
//PREFIX COMMAND HANDLER SETUP ----------------------------------------\\

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) {
      return;
    }
  
    const command = interaction.client.commands.get(interaction.commandName);
  
    if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);
  
      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }
  
      try {
        await command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  
  });

//PREFIX COMMAND HANDLER SETUP ----------------------------------------//
//
//
//
//MISC PROGRAMS SETUP --------------------------------------------------\\

//console password setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let logger = false;
  
  rl.on('line', (input) => {
    //your selected password (must be set up in "Secrets" .env file) will unlock the logger (currently 'aabbcc')
    if (input == password && !logger) {
      logger = true;
      console.clear();
      console.log('Password Accepted!\nLogger Online!');
    } 
    //'clear' clears console
    else if (input == 'clear') {
      console.clear();
    } 
    //'lock' locks console
    else if (input == 'lock' && logger) {
      console.clear();
      console.log('Console cleared')
      logger = false;
      console.log('Logger shut down :(\nEnter password to reactivate');
    }
  });

//MISC PROGRAMS SETUP --------------------------------------------------//
//
//
//
//PROGRAM END ----------------------------------------------------------\\

//Token
client.login(token);

//Exports
module.exports = { client };

//PROGRAM END ----------------------------------------------------------//