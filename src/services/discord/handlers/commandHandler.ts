import { SeeClient } from '../../../client';

export class CommandHandler {
	client: SeeClient;
	constructor(client: SeeClient) {
		this.client = client;
	}
	async start() {
		this.client.discord.commands.start();
		if (this.client.discord.config.commands.update) {
			const commands =
				this.client.discord.extensions.commandManager.getCommands();

			for (const command of commands) {
				if (command.id) {
					await this.client.discord.commands
						.update(JSON.parse(JSON.stringify(command)), {
							commandID: command.id,
						})
						.then((resCommand: any): void =>
							this.client.discord.log.info(
								`Command ${this.client.logColors.cyan(
									command.name
								)} updated successfully (${this.client.logColors.magenta(
									resCommand.id
								)})`
							)
						)
						.catch((error: any): void => {
							if (error.response) {
								this.client.discord.log.error(
									JSON.stringify(error.response.data, null, 2)
								);
							}
							this.client.discord.log.error(
								JSON.stringify(error, null, 2)
							);
						});
				} else {
					await this.client.discord.commands
						.create(JSON.parse(JSON.stringify(command)))
						.then((resCommand: any): void =>
							this.client.discord.log.info(
								`Command ${this.client.logColors.cyan(
									command.name
								)} created successfully (${this.client.logColors.magenta(
									resCommand.id
								)})`
							)
						)
						.catch((error: any): void => {
							if (error.response) {
								this.client.discord.log.error(
									JSON.stringify(error.response.data, null, 2)
								);
							}
							this.client.discord.log.error(
								JSON.stringify(error, null, 2)
							);
						});
				}
				await this.client.util.wait(
					this.client.discord.config.commands.delay
				);
			}
		}
	}
}
