//CONSTANTS AND SETUP -------------------------------------------------\\

//Discord Intents
const ActivityType = require('discord.js');
const Client = require('discord.js');
const Collection = require('discord.js');
const Events = require('discord.js');
const IntentsBitField = require('discord.js');

//config requires
const { token } = require('./config.json');

//other setup
const fs = require('node:fs');
const path = require('node:path');

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
      await client.application.commands.set([pingSLASH, reverseSLASH, memberSLASH, avatarSLASH, voteSLASH, helpSLASH, scoutSLASH, statsSLASH]);
      console.log('Slash commands registered!');
    } catch (error) {
      console.error(error);
    }
    console.log(`Logged in as ${client.user.tag}!`);
    
    //Activity type
    client.user.setActivity('/help', { type: ActivityType.Listening });
    
  });

//APPLICATION COMMANDS SETUP ------------------------------------------//
//
//
//
//INTERACTION COMMAND HANDLER SETUP ----------------------------------------\\

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

//INTERACTION COMMAND HANDLER SETUP ----------------------------------------//
//
//
//
//PROGRAM END ----------------------------------------------------------\\

//Token
client.login(token);

//Exports
module.exports = { client };

//PROGRAM END ----------------------------------------------------------//