require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))


const errorHnadler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: 'Name has to be unique'})
  }

  next(error)
}

app.get('/api/persons',(request, response) =>{
  Person.find({}).then(people => {
    response.json(people.map(p=>p.toJSON()))
  })
})


app.get('/api/persons/:id', (req, resp, next)=>{
  Person.findById(req.params.id).then(p=>{
    if (p) {
      resp.json(p.toJSON())
    } else {
      resp.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) =>{
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next)=>{
  const body = request.body
  const person = new Person ({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedNote=>response.json(savedNote.toJSON()))
    .then(savedAndFormattedNote=>{
      response.json(savedAndFormattedNote)
    })
    .catch(error=>next(error))
})


app.use(errorHnadler)

const PORT = process.env.PORT || 3001
app.listen(PORT)