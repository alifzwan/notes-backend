require('dotenv').config() // The dotenv package is used to read environment variables from a .env file.

const express = require('express')
const cors = require('cors') 
const Note = require('./models/note') 
const app = express()


app.use(express.static('dist')) // The express.static middleware is used to serve static files from the dist directory.
app.use(express.json()) // The express.json middleware is used to parse JSON payloads in the request body.
app.use(cors()) // The cors middleware is used to allow requests from all origins.

// requestLogger middleware
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger) // The requestLogger middleware is used to log information about the requests that are made to the server.


// GET
app.get('/', (request, response) => { 
    response.send('<h1>Hello World!</h1>') // Send a response to the client
})

// GET
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

// GET
app.get('/api/notes/:id', (request, response, next) => { 
    Note.findById(request.params.id)
        .then(note => {
            if(note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// DELETE
app.delete('/api/notes/:id', (request, response, next) => { 
    Note.findByIdAndDelete(request.params.id)
        .then(
            response.status(204).end()
        )
        .catch(error => next(error))
})

// PUT
app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body

    Note.findByIdAndUpdate(
        request.params.id, 
        { content, important }, 
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})


// POST
app.post('/api/notes', (request, response, next) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
    })
  
    note.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => next(error))
})






// unknownEndpoint middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ 
        error: 'unknown endpoint' 
    })
}

// errorHandler middleware
const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if( error.name === 'CastError') {
        return response.status(400)
            .send({ 
                error: 'malformatted id' 
            })
    } else if (error.name === 'ValidationError'){
        return response.status(400)
            .json({ 
                error: error.message 
            })
    }
    next(error)
}

app.use(unknownEndpoint) // The unknownEndpoint middleware is used to catch requests made to unknown routes.
app.use(errorHandler) // The errorHandler middleware is used to catch errors in request handling.



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})