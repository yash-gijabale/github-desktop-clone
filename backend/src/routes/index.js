import express from "express";
import localRepoRoutes from "./localRepo-routes.js";
import engineRutes from "./gitEngine-routes.js";


const routes = express.Router();

routes.use('/repo', localRepoRoutes);
routes.use('/exec', engineRutes);

export default routes;