const express = require('express') // Import the Express.js library
const app = express() // Create an instance of Express application
// const cors = require('cors') // Import cors

// app.use(express.json()) // Enable the use of JSON data in the request body

// app.use(cors()) // Use cors to allow requests from other origins
app.use(express.static('dist'))

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

app.get('/', (request, response) => { 
    response.send('<h1>Hello World!</h1>') // Send a response to the client
})

app.get('/api/notes', (request, response) => {
    response.json(notes) // Send the notes array as a JSON response
})

app.get('/api/notes/:id', (request, response) => { 
    const id = Number(request.params.id ) // Extract the id parameter from the request
    const note = notes.find(note => note.id === id) // Find the note with the corresponding id
    
    if (note) {
        response.json(note)        
    }else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => { 
    const id = Number(request.params.id) // Extract the id parameter from the request
    notes = notes.filter(note => note.id !== id) // Create a new array that does not contain the note with the specified id

    response.status(204).end() // Send a 204 No Content status code
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content){ // If the content field is missing, 
        return response.status(400).json({
            error: 'content missing'
        })
    } 

    const note = {
        id: generateId(),
        content: body.content,
        important: Boolean(body.important) || false,
    }

    notes = notes.concat(note)
    console.log(notes)
    response.json(note)
})




const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})