// Local Imports
import { BaseCommand } from '../classes/BaseCommand';

// Local Types Imports
import type { CommandContext } from '../classes/CommandContext';

module.exports = new BaseCommand({
	id: '961918373757870141',
	guild_id: '957680517380178000',
	name: 'puti',
	description: 'putaso',
	run: async ({ interaction }: CommandContext): Promise<any> => {
		await interaction.reply({ content: 'pruva' });
	},
});
