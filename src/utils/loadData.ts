import * as fs from 'fs';
import { parse } from 'csv-parse';

async function loadData() {
    return new Promise((resolve, reject) => {
        const data: any = [];

        fs.createReadStream("data/meter_values_dump_10k.csv")
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", (row) => {
                data.push({charge_point_id: row[0], payload: JSON.parse(row[1])});
            })
            .on("end", () => {
                console.log("End of CSV");
                resolve(data);
            })
            .on("error", (error) => {
                console.error(error);
                reject(error);
            });
    });
}

export default loadData;
