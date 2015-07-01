import knex   from 'knex';
import config from '../config/db';

let db = null;
if (!db) db = knex(config);

export default db;
