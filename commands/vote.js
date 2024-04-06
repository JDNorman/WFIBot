// Imports
const SlashCommandBuilder = require('discord.js');

module.exports = {
    //Command Builder
    data: (voteSLASH = new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Creates a vote in #poll!')
        .addStringOption(option =>
            option.setName('text')
            .setDescription('What do you wanna say?')
            .setRequired(true)
        )),

    async execute(int) {
        console.log(`Someone used a vote command!`);
        const channelId = '1110753644774707280';
        const Channel = client.channels.cache.get(channelId);
    
        const VoteMessage = int.options.getString('text');
        const Embed = {
          color: color,
          title: 'A poll was started!',
          description: VoteMessage,
          timestamp: int.createdAt
        }
        
        Channel.send({ embeds: [Embed] })
        .then(sentEmbed => {
          sentEmbed.react("👍");
          sentEmbed.react("👎");
          sentEmbed.startThread({
            name: VoteMessage,
            type: 'GUILD_PUBLIC_THREAD',
            autoArchiveDuration: 60
          });
        });    
        
        int.reply("Vote moved to #ideas!");
    },
};