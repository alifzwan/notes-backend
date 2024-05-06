const mongoose = require('mongoose')

if(process.argv.length < 3) { // if the password is not provided as an argument, the program will exit.
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2] // the password is taken from the command line argument.

const url = `mongodb+srv://fullstack:${password}@cluster0.on1wn8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false) // This is to avoid the deprecation warning.

mongoose.connect(url)

const noteSchema = new mongoose.Schema({ // The schema is defined for the Note model.
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema) // The Note model is created based on the schema.

const note = new Note({ // A new note object is created based on the model.
    content: 'HTML is Easy',
    important: true,
})

note.save().then(result => { // The note object is saved to the database.
    console.log('note saved!')
    mongoose.connection.close()
})