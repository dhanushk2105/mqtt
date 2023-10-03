import { Request, Response } from "express"

export const getAllListing = (req: Request, res: Response) => {
    res.send("MQTT server is Active")
}
