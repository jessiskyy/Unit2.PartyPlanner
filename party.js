const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api';
const SEGMENT = '2311-FTB-MT-WEB-PT';
const RESOURCE = 'events';
const API_URL = `${BASE_URL}/${SEGMENT}/${RESOURCE}`;

async function getEvents () {
    try {  
        const response = await fetch(API_URL);
        const data = await response.json ();
        console.log(data);
    
   
//getEvents();

        if (result.success === false) {
                throw new Error('Error in fetching Events');
        }

        state.events = result.data;
    } catch (error) {
            console.error(error);
    }
}