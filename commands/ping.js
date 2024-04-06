// Imports
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  //Write command build in here
  data: (pingSLASH = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("The most complicated ping embed command ever")
  .addStringOption((option) =>
    option
      .setName("text")
      .setDescription("The text to echo back")
      .setRequired(false),
  )
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("The user to echo back")
      .setRequired(false),
  )), 

  async execute(int) {
    console.log(`Someone used a ping command!`);

    const user = int.options.getUser("target");
    const msg = int.options.getString("text");
    const channel = int.channel;
    const username = user.username;
    const member = int.member;
    const membername = member.user.username;
    const ephemeralMSG = "Pong!";
    const visibleMSG = `${username}, ${membername} wanted to let you know that ${msg}!`;

    int.reply({ epemeral: true, content: ephemeralMSG });
    channel.send({ epemeral: false, content: visibleMSG });
  },
};