// External Imports
import axios from 'axios';

// Local Types Imports
import type { SeeClient } from '../../../client';

export class CommandClient {
	client: SeeClient;
	private clientID: string | undefined;
	private token: string | undefined;
	private apiURL: string;
	constructor(client: SeeClient) {
		this.client = client;
		this.apiURL = 'https://discord.com/api/v9';
	}

	public start() {
		this.clientID = this.client.discord.config.bot.id;
		this.token = this.client.discord.config.bot.token;
	}

	public async create(data: any) {
		const url = data.guildID
			? `${this.apiURL}/applications/${this.clientID}/guilds/${data.guildID}/commands`
			: `${this.apiURL}/applications/${this.clientID}/commands`;

		const res = await axios.post(url, data, {
			headers: { Authorization: `Bot ${this.token}` },
		});

		return res.data;
	}

	public async update(data: any, options: { commandID: string }) {
		const url = data.guildID
			? `${this.apiURL}/applications/${this.clientID}/guilds/${data.guildID}/commands/${options.commandID}`
			: `${this.apiURL}/applications/${this.clientID}/commands/${options.commandID}`;

		const res = await axios.patch(url, data, {
			headers: { Authorization: `Bot ${this.token}` },
		});

		return res.data;
	}

	public async get(options: { commandID: string; guildID?: string }) {
		const url = options.guildID
			? `${this.apiURL}/applications/${this.clientID}/guilds/${options.guildID}/commands/${options.commandID}`
			: `${this.apiURL}/applications/${this.clientID}/commands/${options.commandID}`;

		const res = await axios.get(url, {
			headers: { Authorization: `Bot ${this.token}` },
		});

		return res.data;
	}

	public async getAll(options: { guildID?: string }) {
		const url = options.guildID
			? `${this.apiURL}/applications/${this.clientID}/guilds/${options.guildID}/commands`
			: `${this.apiURL}/applications/${this.clientID}/commands`;

		const res = await axios.get(url, {
			headers: { Authorization: `Bot ${this.token}` },
		});

		return res.data;
	}

	public async delete(options: { commandID: string; guildID?: string }) {
		const url = options.guildID
			? `${this.apiURL}/applications/${this.clientID}/guilds/${options.guildID}/commands/${options.commandID}`
			: `${this.apiURL}/applications/${this.clientID}/commands/${options.commandID}`;

		const res = await axios.delete(url, {
			headers: { Authorization: `Bot ${this.token}` },
		});

		return res.data;
	}
}
