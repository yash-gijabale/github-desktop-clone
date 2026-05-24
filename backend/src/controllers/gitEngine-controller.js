import { getBranches, getGitLogs, getGitStatus, gitCheckout } from "../gitEngine/engine.js";
import gitEngineService from "../services/gitEngine-service.js";
import moment from 'moment'

export const getReposBranch = async (req, res) => {
    let repo = req.query.repo;
    let branches = await getBranches(repo);

    let original = branches.stdout;

    let defaultBranch = original.defaultBranch;

    branches = original.otherbranches
        .split('\n')
        .map(branch => branch.trim())
        .filter(Boolean)
        .map(branch => {

            let isCurrent = branch.startsWith("*");

            let cleaned = branch.replace("* ", "");

            let [createdOn, ...nameParts] = cleaned.split(" ");

            let name = nameParts.join(" ").trim();

            return {
                name,
                createdOn,
                displayTime: moment(createdOn, "YYYYMMDD").fromNow(),
                isCurrent,
                isRemote: name.startsWith("origin/")
            };
        })
        // local first, remote after
        .sort((a, b) => {
            if (a.isRemote === b.isRemote) return 0;
            return a.isRemote ? 1 : -1;
        });
    let current = branches.find(branch => branch.isCurrent);
    return res.status(200).json({ status: 'OK', data: { branches, current, defaultBranch, count: branches.length, repo } })
}


export const gitStatus = async (req, res) => {
    let repo = req.query.repo;
    let data = await gitEngineService.getStatus(repo);
    return res.status(200).json({ status: 'OK', result: { data, repo } })
}

export const gitLogs = async (req, res) => {
    let { repo, branch } = req.query;
    let result = await getGitLogs(repo, branch);
    let original = result.stdout
    result = original.split('__COMMIT__')
        .map(commit => {
            let [hash, auther, date, message, body] = commit.trim().split("\n");
            if (!hash) return null;
            return {
                hash, auther, date, message, body
            }
        }).filter(Boolean);
    return res.status(200).json({ status: 'OK', data: { result, count: result.length, repo } })
}

export const getCheckout = async (req, res) => {
    // console.log(req.query)
    let { repo, branch, isStash, preBranch } = req.query;
    // let changedFiles = await gitEngineService.getStatus(repo);
    // if(changedFiles.length){
    //     return res.status(200).json({ status: 'NEED_STASH', result: { data: changedFiles, message:"Stash changed file before checkout" } })
    // }
    let result = await gitCheckout(repo, branch, isStash, preBranch);

    return res.status(200).json({ status: 'OK', result: { data: result.stdout, message: "Branch checkout!" } })
}

export const gitStashChnages = async (req, res) => {

}