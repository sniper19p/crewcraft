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
  
  const SERVER_IP = 'Minecraft ip';
  const UPDATE_INTERVAL = 60000;
  
  let lastUpdateTimestamp = null;
  
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  
    setInterval(updateEmbed, UPDATE_INTERVAL);
  });
  
  async function updateEmbed() {
    try {
      const response = await util.status(SERVER_IP);
      const nowTimestamp = Math.floor(Date.now() / 1000);
  
      const lastUpdateStr = lastUpdateTimestamp ? `<t:${lastUpdateTimestamp}:R>` : 'never';
      
let playerList = response.players.sample ? response.players.sample.map(player => player.name).join(', ') : 'none';
console.log(playerList);
      const embed = new EmbedBuilder()
        .setTitle('Minecraft Server Ping and Status')
        .setDescription(`Latency to ${SERVER_IP}: ${response.roundTripLatency}ms`)
        .addFields(
          { name: 'Players Online', value: `${response.players.online}/${response.players.max}`, inline: true },
          { name: 'MOTD', value: `${response.motd.clean}`, inline: true },
          { name: 'Version', value: `${response.version.name}`, inline: true },
          { name: 'Last Update', value: `${lastUpdateStr}`, inline: true },
          { name: 'Players', value: `${playerList}`, inline: true },
        )
        .setColor('Green');
  
      const channel = client.channels.cache.get('channel id');
      let message = await channel.messages.fetch({ limit: 1 }).then(messages => messages.first());
      if (message && message.author.id === client.user.id) {
        await message.edit({ embeds: [embed] });
      } else {
        await channel.send({ embeds: [embed] });
      }
  
      lastUpdateTimestamp = nowTimestamp;
    } catch (error) {
      const nowTimestamp = Math.floor(Date.now() / 1000);
  
      const lastUpdateStr = lastUpdateTimestamp ? `<t:${lastUpdateTimestamp}:R>` : 'never';
  
      const embed = new EmbedBuilder()
        .setTitle('Error')
        .setDescription(`Failed to ping ${SERVER_IP}`)
        .addFields(
          { name: 'Last Update', value: `${lastUpdateStr}`, inline: true },
        )
        .setColor('Red');
  
      const channel = client.channels.cache.get('channel id');
      let message = await channel.messages.fetch({ limit: 1 }).then(messages => messages.first());
      if (message && message.author.id === client.user.id) {
        await message.edit({ embeds: [embed] });
      } else {
        await channel.send({ embeds: [embed] });
      }
  
      lastUpdateTimestamp = nowTimestamp;
    }
  }
  
  client.login('Your token');
  
