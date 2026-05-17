import express from "express";
import { getCheckout, getReposBranch, gitLogs, gitStatus } from "../controllers/gitEngine-controller.js";

const engineRutes = express.Router();

engineRutes.get('/repo/branches', getReposBranch);
engineRutes.get('/repo/status', gitStatus);
engineRutes.get('/repo/log', gitLogs);
engineRutes.get('/repo/checkout', getCheckout);
// engineRutes.get('/repo/stash', stashChanges);

export default engineRutes;

