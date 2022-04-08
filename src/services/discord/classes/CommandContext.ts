// Local Types Imports
import type { SeeClient } from '../../../client';

// External Types Imports
import type { CommandInteraction } from 'discord.js';

interface ICommandContext {
	client: SeeClient;
	interaction: CommandInteraction;
	args: (string | number | boolean | undefined)[];
}

export class CommandContext {
	client: SeeClient;
	interaction: CommandInteraction;
	args: (string | number | boolean | undefined)[];
	constructor(commandContext: ICommandContext) {
		this.client = commandContext.client;
		this.interaction = commandContext.interaction;
		this.args = commandContext.args;
	}
}
