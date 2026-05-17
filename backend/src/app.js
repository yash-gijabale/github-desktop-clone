import express from "express"
import { localRepos } from "./db/index.js";
import routes from "./routes/index.js";

const app = express();

function allowCors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCors);


app.use(routes);


app.listen(3000, () => {
    console.log('log: Server is running...')
})