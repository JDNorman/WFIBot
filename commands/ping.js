//Any other imports go here
const { SlashCommandBuilder } = require("discord.js");

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
    )), //put the comma at the end of the line to signify the end of the command build and the start of the command execute

  //Write command execute in here
  async execute(int /*int short for interaction*/) {
    console.log(`A ping command was used!`);

    //pull information from the command builder
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