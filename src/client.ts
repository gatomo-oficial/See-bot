export {};

// Local Imports
import { SeeClientConfig } from './config';
import { SeeClientLogger } from './logger';
import { DiscordClient } from './services/discord/client';
import { DatabaseClient } from './services/database/client';
import { SeeClientUtil } from './util';

// Local Types Imports
import type { SeeClientLoggerColors } from './logger';

// External Imports
import { Intents } from 'discord.js';

// Client
export class SeeClient {
	config: SeeClientConfig;
	util: SeeClientUtil;
	loggerClient: SeeClientLogger;
	logColors: SeeClientLoggerColors;
	log: {
		error: (message: string) => void;
		warn: (message: string) => void;
		info: (message: string) => void;
		debug: (message: string) => void;
	};
	colors: {
		main: string;
		error: string;
		success: string;
		mute: string;
		warn: string;
	};
	intColors: {
		main: number;
		error: number;
		success: number;
		mute: number;
		warn: number;
	};
	array: {
		addElement: (targetArray: any[], ...arrayArgs: any[]) => any[];
		removeIndex: (targetArray: any[], index: number) => any[];
		removeElement: (targetArray: any[], findFN: any) => false | any[];
		chunk: (targetArray: any[], chunkSize: number) => any[];
		seedShuffle: (targetArray: any[], seed?: number) => any[];
	};
	discord: DiscordClient;
	database: DatabaseClient;
	constructor() {
		// Logger
		this.loggerClient = new SeeClientLogger();
		this.log = this.loggerClient.logger;
		this.logColors = this.loggerClient.logColors;

		// Config
		this.config = new SeeClientConfig();

		// Services
		this.discord = new DiscordClient(this, {
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
		});
		this.database = new DatabaseClient(this);

		// Colors
		this.colors = this.config.colors;
		this.intColors = this.config.intColors;

		// Other
		this.util = new SeeClientUtil();

		// Array util
		this.array = {
			addElement: (targetArray: any[], ...arrayArgs): any[] => {
				targetArray.push(...arrayArgs);

				return targetArray;
			},
			removeIndex: (targetArray: any[], index: number): any[] => {
				targetArray.splice(index, 1);

				return targetArray;
			},
			removeElement: (targetArray: any[], findFN: any): any => {
				const index = targetArray.findIndex(findFN);

				if (index === -1) return false;

				targetArray.splice(index, 1);

				return targetArray;
			},
			chunk: (targetArray: any[], chunkSize: number): any[][] => {
				const result = [];
				const arrayLength = targetArray.length;

				for (let i = 0; i < arrayLength; i += chunkSize) {
					result.push(targetArray.slice(i, i + chunkSize));
				}

				return result;
			},
			seedShuffle: (targetArray: any[], seed = 1): any[] => {
				let currentIndex = targetArray.length;

				const random = () => {
					seed = seed + 1;
					const x = Math.sin(seed) * 10000;
					return x - Math.floor(x);
				};

				while (0 !== currentIndex) {
					const randomIndex = Math.floor(random() * currentIndex);

					currentIndex -= 1;

					const temporaryValue = targetArray[currentIndex];

					targetArray[currentIndex] = targetArray[randomIndex];
					targetArray[randomIndex] = temporaryValue;
				}

				return targetArray;
			},
		};
	}
	async start(): Promise<void> {
		const services = this.config.services;
		this.log.info(
			`Starting Services [ ${services
				.map((service: string): string =>
					this.logColors.cyan(service.toUpperCase())
				)
				.join(', ')} ]...`
		);
		for (const service of services) {
			await (this as any)[service].start();
		}
	}
}
