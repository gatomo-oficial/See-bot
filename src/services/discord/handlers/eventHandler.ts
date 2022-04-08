// External Imports
import { readdirSync } from 'fs';
import { SeeClient } from '../../../client';

export class EventHandler {
	client: SeeClient;
	constructor(client: SeeClient) {
		this.client = client;
	}
	async start() {
		const eventsPath = '../events/';
		const startDate = new Date();

		const files = readdirSync(
			eventsPath.replace('../', './src/services/discord/')
		);

		for (const file of files) {
			const name = file.substring(0, file.length - 3);
			const content = require(`${eventsPath}${file}`);

			this.client.discord.on(name, content.bind(null, this.client));

			const loadDate = new Date();

			this.client.discord.log.info(
				`Event ${this.client.logColors.cyan(
					name
				)} loaded (${this.client.logColors.magenta(
					`${loadDate.getTime() - startDate.getTime()}`
				)} ms)`
			);

			delete require.cache[require.resolve(`${eventsPath}${file}`)];
		}
	}
}
