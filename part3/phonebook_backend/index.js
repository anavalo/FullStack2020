const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('tiny'))

    let persons = [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]

app.get('/api/persons',(request, response) =>{
    response.json(persons)
})

app.get('/info', (request, response)=>{
    const num = data.persons.length
    response.send("<div>Phonebook has info for "+num+" people</div><div>"+Date()+"</div>")
})

app.get('/api/persons/:id', (req, resp)=>{
    const id = Number(req.params.id)    
    const person = persons.find(p => p.id === id) 
    if (person){
        resp.json(person)
    }else{
        resp.send("<p>not found</p>").status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response)=>{
  const generateId = () =>{
    const Id = persons.length > 0? Math.floor(Math.random() * 10000) + 1 : 0
    return Id
  }
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  if (!body) {
      return response.status(400).json({ error: 'content missing' })
  } else {
    if ((persons.map(a=> a.name)).some(d=>d===body.name)) {
      return response.status(400).json({ error: 'name must be unique' })
  } else {
    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'name or number is missing!' })
      }
    }
  }
  persons = persons.concat(person)
  response.json(person)

})

const PORT = 3001
app.listen(PORT)