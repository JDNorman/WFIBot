const { EmbedBuilder } = require('discord.js');

function eventBuilder(title, description, opr) {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description);

    fields.forEach(field => {
        embed.addField(field.name, field.value, field.inline);
    });

    return embed;
}

module.exports = eventBuilder;