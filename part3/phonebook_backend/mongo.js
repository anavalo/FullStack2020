const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

  const url = `mongodb+srv://anavalo:${password}@cluster0-na1da.mongodb.net/phonebook?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true })

  const personSchema = new mongoose.Schema({
      name: String,
      number: String,
  })

const Person = mongoose.model("Person", personSchema)

const person = new Person({
    name: `${name}`,
    number: `${number}`
})

person.save().then(response=>{
    console.log(`added ${name} number ${number} to phonebook`)
})

Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })