import { createClient } from 'edgedb';

if (!process.env.GEL_INSTANCE || !process.env.GEL_SECRET_KEY) {
    throw new Error('GEL_INSTANCE and GEL_SECRET_KEY environment variables must be set');
}

const client = createClient({
    dsn: `edgedb://${process.env.GEL_INSTANCE}`,
    tlsSecurity: 'insecure',
    waitUntilAvailable: 30000, // 30 seconds timeout
    secretKey: process.env.GEL_SECRET_KEY
});

export default client;