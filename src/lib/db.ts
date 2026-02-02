import { Pool } from 'pg';

let pool: Pool;

declare global {
    var postgresPool: Pool | undefined;
}

if (!global.postgresPool) {
    global.postgresPool = new Pool({
        connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
}

pool = global.postgresPool;

export default pool;
