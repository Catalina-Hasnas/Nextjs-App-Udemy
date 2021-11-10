import MeetupList from '../components/meetups/MeetupList';

const HomePage = () => {

    const DUMMY_MEETUPS = [
        {
            id: 'm1',
            title: 'A first Meetup',
            image: 'https://via.placeholder.com/880x600',
            address: 'Some address, 123456, City',
            description: 'This is a first meetup!'
        }
    ]
    
    return <MeetupList meetups={DUMMY_MEETUPS} />
}

export default HomePage