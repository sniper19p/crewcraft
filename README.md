# Minecraft Server Status Discord Bot

This is a Discord bot that displays the status of a Minecraft server. It uses the `discord.js` library to interact with the Discord API and the `minecraft-server-util` library to retrieve information about the Minecraft server.

## Installation

1. Clone this repository: `git clone https://github.com/your-username/minecraft-server-discord-bot.git`
2. Install the dependencies: `npm install`
3. Set up a new Discord bot and obtain its token. You can follow [these instructions](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to create a new bot and [these instructions](https://discordjs.guide/token/) to obtain its token.
4. Set the bot token as an environment variable: `export DISCORD_TOKEN=your-bot-token`
5. Modify the `SERVER_IP` and `UPDATE_INTERVAL` variables in `index.js` to suit your needs.

## Usage

Run `npm start` to start the bot. The bot will automatically update the status of the Minecraft server every `UPDATE_INTERVAL` milliseconds and post the information in a Discord channel.

## License

This project is licensed under the MIT License.
