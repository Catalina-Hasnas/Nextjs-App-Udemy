import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {

    async function addMeetupHandler(enteredMeetupData) {
        console.log(JSON.stringify(enteredMeetupData))
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }  
        });

        console.log(response)

        const data = await response.json()

        console.log(data);
    }
    
    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage