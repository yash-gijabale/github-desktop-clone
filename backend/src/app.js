import express from "express"
import { localRepos } from "./db/index.js";
import routes from "./routes/index.js";

const app = express();

app.use(routes)

app.listen(3000, () => {
    console.log('log: Server is running...')
})