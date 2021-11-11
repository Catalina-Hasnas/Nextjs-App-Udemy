import { MongoClient } from 'mongodb';
import { username, pass } from '../../mongodbconfig';

const url = `mongodb+srv://${username}:${pass}@cluster0.gwhv7.mongodb.net/meetups?retryWrites=true&w=majority`;

const client = new MongoClient(url);

async function handler(req, res) {

  if (req.method === 'POST') {

    const data = req.body;

    try {
      await client.connect();
    } catch (err) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('meetups').insertOne(data);
      data.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }
  
    client.close();

    res
    .status(201)
    .json({ message: 'Successfully stored message!', message: data });
  }

    
}
  
export default handler;
  