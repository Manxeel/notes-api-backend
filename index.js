
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'Tengo que estudiar',
    date: '2019-05-30',
    important: true
  },
  {
    id: 2,
    content: 'Tengo que estudiar de nuevo',
    date: '2019-05-30',
    important: true
  },
  {
    id: 3,
    content: 'Probando node-js',
    date: '2019-05-30',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('Hello world')
})
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})
app.post('/api/notes', (request, response) => {
  const note = request.body
  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note content missing'
    })
  }
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes = [...notes, newNote]
  response.json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not Found'
  })
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
