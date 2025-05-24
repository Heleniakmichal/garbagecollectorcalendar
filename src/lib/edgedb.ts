import { createClient } from 'edgedb';

if (!process.env.GEL_INSTANCE || !process.env.GEL_SECRET_KEY) {
    throw new Error('GEL_INSTANCE and GEL_SECRET_KEY environment variables must be set');
}

const client = createClient({
    host: 'garbage--michel-garb.c-44.i.aws.edgedb.cloud',
    port: 5656,
    tlsSecurity: 'strict',
    waitUntilAvailable: 30000, // 30 seconds timeout
    secretKey: process.env.GEL_SECRET_KEY
});

export default client;