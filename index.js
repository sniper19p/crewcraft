const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
} = require("discord.js");
const util = require('minecraft-server-util');

const client = new Client({
  intents: [Object.keys(GatewayIntentBits),  [GatewayIntentBits.Guilds]],
  partials: [Object.keys(Partials)],
});



const SERVER_IP = 'DutchDeveloper.Playit.gg';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    setInterval(updateEmbed, 30000);
});

async function updateEmbed() {
    try {
        const response = await util.status(SERVER_IP);
        const embed = new EmbedBuilder()
            .setTitle('Minecraft Server Ping and Status')
            .setDescription(`Latency to ${SERVER_IP}: ${response.roundTripLatency}ms`)
            .addFields(
                { name: 'Players Online', value: `${response.players.online}/${response.players.max}`, inline: true },
                { name: 'MOTD', value: `${response.motd.clean}`, inline: true },
                { name: 'Version', value: `${response.version.name}`, inline: true },
            )
            .setColor('Green');

        const channel = client.channels.cache.get('1069254533416484876');
        let message = await channel.messages.fetch({ limit: 1 }).then(messages => messages.first());
        if (message) {

            await message.delete();
        }
        await channel.send({ embeds: [embed] });
    } catch (error) {
        const embed = new EmbedBuilder()
            .setTitle('Error')
            .setDescription(`Failed to ping ${SERVER_IP}`)
            .setColor('Red');

        const channel = client.channels.cache.get('1069254533416484876');
        let message = await channel.messages.fetch({ limit: 1 }).then(messages => messages.first());
        if (message) {

            await message.delete();
        }

        await channel.send({ embeds: [embed] });
    }
}


client.login('MTAwMDA0NzgzNTAxMTYyOTExNg.GhyFrH.yyf6L9RQz_upmuvpAuVRtpCmBmAEQUj5K0pUP8');
