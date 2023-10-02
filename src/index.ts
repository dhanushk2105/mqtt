import express, {Express} from 'express'

const app: Express = express()

app.listen(4321, () => {
    console.log("Running on 4321")
})