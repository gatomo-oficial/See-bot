// Local Types Imports
import type { SeeClient } from '../../client';

export class DiscordClientConfig {
	bot: { readonly token: string; id: string };
	commands: { update: boolean; delay: number };
	settings: { rateLimit: boolean; debug: boolean };
	links: { invite: string };
	constructor(client: SeeClient) {
		const discordBotToken = process.env[
			`${client.config.info.channel.toUpperCase()}_DISCORD_TOKEN`
		] as string;

		const discordBotID = process.env[
			`${client.config.info.channel.toUpperCase()}_DISCORD_ID`
		] as string;

		this.bot = {
			get token() {
				return discordBotToken;
			},
			id: discordBotID,
		};

		this.commands = {
			update: true,
			delay: 5000,
		};

		this.settings = {
			rateLimit: true,
			debug: false,
		};

		this.links = {
			invite: `https://discord.com/oauth2/authorize?client_id=${discordBotID}&permissions=8&scope=bot%20applications.commands`,
		};
	}
}
