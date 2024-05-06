const mongoose = require('mongoose')

if(process.argv.length < 3) { // if the password is not provided as an argument, the program will exit.
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2] // the password is taken from the command line argument.
const content = process.argv[3] // the content of the note is taken from the command line argument.
const important = process.argv[4] // the importance of the note is taken from the command line argument.

const url = 
`mongodb+srv://fullstack:${password}@cluster0.on1wn8q.mongodb.net/?
retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false) // This is to avoid the deprecation warning.

mongoose.connect(url)

//? Schema - The schema is defined for the Note model.
const noteSchema = new mongoose.Schema({ // The schema is defined for the Note model.
    content: String,
    important: Boolean,
})

//? Model - The Note model is created based on the schema.
const Note = mongoose.model('Note', noteSchema) // The Note model is created based on the schema.

//? Object - A new note object is created based on the model.
const note = new Note({ // A new note object is created based on the model.
    content: content,
    important: important,
})

//! Fetching objects(note) from the database
// Note.find({}).then(result => { // The notes in the database are fetched.
//     if (result.length > 0) { // Check if there are notes found
//         result.forEach(note => { // The notes are logged to the console.
//             console.log(note)
//         })
//     } else {
//         console.log('No notes found!')
//     }
//     mongoose.connection.close() // The database connection is closed.
// })


//! The note object is saved to the database.
note.save().then(result => { // The note object is saved to the database.
    console.log(result, 'note saved!')
    mongoose.connection.close()
})