import express from "express";
import { getReposBranch, gitLogs, gitStatus } from "../controllers/gitEngine-controller.js";

const engineRutes = express.Router();

engineRutes.get('/repo/branches', getReposBranch);
engineRutes.get('/repo/status', gitStatus);
engineRutes.get('/repo/log', gitLogs);

export default engineRutes;

