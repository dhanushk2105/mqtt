import express from 'express'
import { getAllListing, getDetail, getListing } from '../services/mqtt'

const mqttRoutes = express.Router()

mqttRoutes.get("/", getAllListing)
mqttRoutes.get("/:id", getListing)
mqttRoutes.get("/detail/:id", getDetail)


export default mqttRoutes