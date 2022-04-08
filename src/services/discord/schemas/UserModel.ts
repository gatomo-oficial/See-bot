export {};

// External Imports
import { Schema, model } from 'mongoose';

const schema = new Schema({
	guildID: { type: String, default: '' },
	userID: { type: String, default: '' },
});

export interface IUserModel {
	guildID: string;
	userID: string;
}

export const userModel = model('user', schema);
