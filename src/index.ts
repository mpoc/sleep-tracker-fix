import { convert } from './convert';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../secret/.env' });

convert();
