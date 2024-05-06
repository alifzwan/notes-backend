const mongoose = require('mongoose')

if(process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.on1wn8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is Easy',
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})