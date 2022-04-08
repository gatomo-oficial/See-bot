export {};

// Local Imports
import { DiscordClientUtil } from './util';
import { DiscordClientConfig } from './config';
import { EventHandler } from './handlers/eventHandler';
import { CommandHandler } from './handlers/commandHandler';
import { CommandManager } from './extensions/commandManager';
import { CommandClient } from './classes/CommandClient';

// Local Types Imports
import type { SeeClient } from '../../client';

// External Imports
import { Client } from 'discord.js';

// External Types Imports
import type { ClientOptions } from 'discord.js';

// Client
export class DiscordClient extends Client {
	client: SeeClient;
	util: DiscordClientUtil;
	config: DiscordClientConfig;
	eventHandler: EventHandler;
	commandHandler: CommandHandler;
	commands: CommandClient;
	extensions: { commandManager: CommandManager };
	log: {
		error: (message: string) => void;
		warn: (message: string) => void;
		info: (message: string) => void;
		debug: (message: string) => void;
	};
	constructor(client: SeeClient, options: ClientOptions) {
		super(options);

		// Client
		this.client = client;

		// Config
		this.config = new DiscordClientConfig(this.client);
		this.util = new DiscordClientUtil(this.client);

		// Handlers
		this.commandHandler = new CommandHandler(client);
		this.eventHandler = new EventHandler(client);

		// Commands
		this.commands = new CommandClient(client);

		// Extensions
		this.extensions = {
			commandManager: new CommandManager(),
		};

		// Logs
		this.log = {
			error: (message: string): void =>
				this.client.log.error(
					`[ ${this.client.logColors.magenta('DISCORD')} ] ${message}`
				),
			warn: (message: string): void =>
				this.client.log.warn(
					`[ ${this.client.logColors.magenta('DISCORD')} ] ${message}`
				),
			info: (message: string): void =>
				this.client.log.info(
					`[ ${this.client.logColors.magenta('DISCORD')} ] ${message}`
				),
			debug: (message: string): void =>
				this.client.log.debug(
					`[ ${this.client.logColors.magenta('DISCORD')} ] ${message}`
				),
		};
	}

	async start(): Promise<void> {
		this.log.info(
			`Starting ${this.client.logColors.cyan('Discord Client')}...`
		);
		await this.eventHandler.start();
		await this.login(this.config.bot.token);
		await this.commandHandler.start();
	}
}
