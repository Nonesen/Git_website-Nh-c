const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function fixAdmin() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('No MONGODB_URI found');
        return;
    }
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('users').updateOne(
            { username: 'admin' },
            { $set: { password: '123' } }
        );
        console.log('Fixed admin password:', result.modifiedCount > 0 ? 'Success' : 'Admin not found or already 123');
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

fixAdmin();
