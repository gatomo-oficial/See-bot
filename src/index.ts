export {};

// External Imports
import 'dotenv/config';

// Local Imports
import { SeeClient } from './client';

// Client
const client = new SeeClient();

client.start();
