const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api';
const SEGMENT = '2311-FTB-MT-WEB-PT';
const RESOURCE = 'events';
const API_URL = `${BASE_URL}/${SEGMENT}/${RESOURCE}`;

async function getEvents () {

    const response = await fetch(API_URL);
    const info = await response.json ();
    console.log(info);

    state.events = info.data;
}

getEvents()


const state = {
    events: []
};


const eventsList = document.querySelector('#eventsTable');
const addEventsForm = document.querySelector('#addEvent');
const button = document.querySelector('button');
const textInput = document.querySelector('input[name="textContent"]');


function renderEvents() {
    const eventElements = state.events.map(events => {

	        const eventsRow = document.createElement('tr');
		    eventsRow.classList.add('events');
            const nameCell = document.createElement('td');
            nameCell.innerText = events.name;
            const descriptionCell = document.createElement('td');
            descriptionCell.innerText = events.description;

            eventsRow.appendChild(nameCell);
            eventsRow.appendChild(descriptionCell);
            //eventElements.appendChild(eventsRow);
		
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Event';
            eventsRow.append(deleteButton);

            deleteButton.addEventListener('click', () => deleteEvent(events.id));
            

            return eventsRow;
});
    eventsList.replaceChildren(...eventElements);
    console.log(eventElements);
    console.log(...eventElements);
}

async function render() {
        await getEvents();
        console.log("events", state.events);
        renderEvents();
}

render();



addEventsForm.addEventListener('submit', addEvent);

button.addEventListener('click', function (event) {
    console.log('Button clicked');
});

async function addEvent(event) {
    event.preventDefault();
    const _date = new Date(addEventsForm.date.value).toISOString();

    await createEvent(
        addEventsForm.name.value,
        _date,
        addEventsForm.location.value,
        addEventsForm.description.value
    );
}

async function createEvent(name, date, location, description) { 
    try {
        const response  = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, date, location, description}),

        });
        const json = await response.json();
		console.log({ json });

        if (json.error) {
                throw new Error(json.message);
        }
        render();
    }   catch (error) {
        console.log(error);   
    }
}

async function deleteEvent(id) {
    try {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'DELETE'
		});
        if (!response.ok) {
			throw new Error('Recipe could not be deleted.');
		}

		render();
	} catch (error) {
		console.log(error);
	}
    render();
}


