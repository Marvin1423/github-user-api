import { baseUrl } from '/src/scripts/variables.js'
const eventsQuantity = 10

async function getEvents(userName){
    const response = await fetch(`${baseUrl}/${userName}/events`)
    const events = await response.json()
    return events.filter((event) => event.type === 'PushEvent' || event.type === 'CreateEvent').slice(0, eventsQuantity)
}

export { getEvents }