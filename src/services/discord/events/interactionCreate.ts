// Local Imports
import { CommandContext } from '../classes/CommandContext';

// Local Types Imports
import type { BaseCommand } from '../classes/BaseCommand';
import type { SeeClient } from '../../../client';

// External Types Imports
import type { CommandInteraction } from 'discord.js';

module.exports = async (
	client: SeeClient,
	interaction: CommandInteraction
): Promise<void> => {
	if (!interaction.isCommand()) return;

	const command = client.discord.extensions.commandManager.getCommand(
		(cmd: BaseCommand) => cmd.id === interaction.commandId
	);

	if (command) {
		const args = interaction.options.data
			.map((option) => option.value)
			.filter((value) => value !== undefined);

		const ctx = new CommandContext({
			client: client,
			interaction: interaction,
			args: args,
		});

		await command
			.run(ctx)
			.catch((error: Error): void =>
				client.discord.log.error(JSON.stringify(error, null, 2))
			);
	}
};
