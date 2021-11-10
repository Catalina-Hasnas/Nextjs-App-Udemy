import { Fragment } from 'react';
import MeetupItem from '../../components/meetups/MeetupItem';
import { MongoClient, ObjectId } from 'mongodb';

const MeetupDetails = (props) => {

    console.log(props);

    return (
        <MeetupItem
            image={props.meetupData.image}
            address={props.meetupData.address}
            description={props.meetupData.description}
            title={props.meetupData.title}
        />
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://catalinaHasnas:j00nfnzDSPeU0Hlo@cluster0.gwhv7.mongodb.net/meetups?retryWrites=true&w=majority'
    )
    const db = client.db();
    const meetupCollection = await db.collection('meetups');
    const meetups = await meetupCollection.find({}, {_id: 1}).toArray();

    client.close();

    return {
        fallback: true,
        paths: meetups.map((meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        })))   
    }
}

export async function getStaticProps(context){

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://catalinaHasnas:j00nfnzDSPeU0Hlo@cluster0.gwhv7.mongodb.net/meetups?retryWrites=true&w=majority'
    )
    const db = client.db();
    const meetupCollection = await db.collection('meetups');    
    const selectedMeetup = await meetupCollection.findOne({_id: ObjectId(meetupId)});

    const data = {}

    for (const key in selectedMeetup) {
        
        data.title = selectedMeetup.title,
        data.image = selectedMeetup.image,
        data.description = selectedMeetup.description,
        data.address = selectedMeetup.address,
        data.id = selectedMeetup._id.toString();
    }

    client.close();

    return {
        props: {
            meetupData: data
        },
        revalidate: 1
    }
    
}

export default MeetupDetails