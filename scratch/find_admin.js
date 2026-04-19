const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function findAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');
  const users = await mongoose.connection.collection('users').find({ role: 'admin' }).toArray();
  console.log(users);
  process.exit(0);
}

findAdmin();
