import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import { username, pass } from '../mongodbconfig';

const HomePage = (props) => {
    
    return <MeetupList meetups={props.meetups} />
}

export async function getStaticProps(){
    const client = await MongoClient.connect(`mongodb+srv://${username}:${pass}@cluster0.gwhv7.mongodb.net/meetups?retryWrites=true&w=majority`)
    const db = client.db();
    const meetupCollection = await db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
                id: meetup._id.toString(),

            }))
        },
        revalidate: 1
    }
}

export default HomePage