import express from 'express'
import chalk from 'chalk'
const app = express()

app.get('/', (req, res) => {
  console.log(chalk.green('Received a request to the root route'))
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
