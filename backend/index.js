import express from 'express'
import cors from 'cors'
import { PORT, mongoDBUrl } from './config.js'
import mongoose from 'mongoose'
import booksRoute from './routes/booksRoute.js'

const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))

app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send('Welcome to MERN project')
})

app.use('/books', booksRoute)

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
      console.log(`Server runniing on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
