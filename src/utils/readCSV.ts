import * as fs from 'fs'
import { parse } from 'csv-parse'

function readCSV(file_path: string) {
    fs.createReadStream(file_path)
    .pipe(parse({delimiter: ",", from_line: 2}))
    .on("data", (row) => console.log(row))
    .on("end", () => console.log("End of CSV"))
    .on("error", (error) => console.log(error))
}

export default readCSV