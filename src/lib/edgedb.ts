import { createClient } from 'edgedb';

const client = createClient({
  dsn: process.env.EDGEDB_DSN,
  tlsSecurity: 'insecure',
});

export default client; 