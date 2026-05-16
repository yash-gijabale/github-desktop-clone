import express from "express"
import { addRepo, getAllRepos } from "../controllers/localRepo-controller.js";

const localRepoRoutes = express.Router();

localRepoRoutes.get('/all', getAllRepos)
localRepoRoutes.get('/new', addRepo)

export default localRepoRoutes;