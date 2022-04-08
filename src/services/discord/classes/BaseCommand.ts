// Local Types Imports
import type { CommandContext } from './CommandContext';

// External Types Imports
import type { Snowflake } from 'discord.js';

interface ICommandData {
	id: Snowflake | null;
	type?: number | 1;
	guild_id?: Snowflake;
	name: string;
	name_localizations?: Record<string, string>;
	description: string;
	description_localizations?: Record<string, string>;
	options?: ICommandOptions[];
	run: (ctx: CommandContext) => Promise<void>;
}

interface ICommandOptions {
	type: number;
	name: string;
	name_localizations?: Record<string, string>;
	description: string;
	description_localizations?: Record<string, string>;
	required?: boolean;
	choices?: ICommandChoise[];
	options?: ICommandOptions[];
	channel_types?: number[];
	minValue?: number;
	maxValue?: number;
	autocomplete?: boolean;
}

interface ICommandChoise {
	name: string;
	name_localizations?: Record<string, string>;
	value: string;
}

export class BaseCommand {
	id: Snowflake | null;
	type?: number | 1;
	guild_id?: Snowflake;
	name: string;
	name_localizations?: Record<string, string>;
	description: string;
	description_localizations?: Record<string, string>;
	options?: ICommandOptions[];
	run: (ctx: CommandContext) => Promise<void>;
	constructor(commandData: ICommandData) {
		this.id = commandData.id;
		this.type = commandData.type;
		this.guild_id = commandData.guild_id;
		this.name = commandData.name;
		this.name_localizations = commandData.name_localizations;
		this.description = commandData.description;
		this.description_localizations = commandData.description_localizations;
		this.options = commandData.options;

		this.run = commandData.run;
	}
}
