import express from 'express'
import { getAllListing } from '../services/mqtt'

const mqttRoutes = express.Router()

mqttRoutes.get("/", getAllListing)

export default mqttRoutes