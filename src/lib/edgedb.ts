import { createClient } from 'edgedb';

if (!process.env.EDGEDB_DSN) {
  throw new Error('EDGEDB_DSN environment variable is not set');
}

const client = createClient({
  dsn: process.env.EDGEDB_DSN,
  tlsSecurity: 'insecure',
});

export default client; 