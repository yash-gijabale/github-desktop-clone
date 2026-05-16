import { getBranches, getGitLogs, getGitStatus } from "../gitEngine/engine.js";

export const getReposBranch = async (req, res) => {
    let repo = req.query.repo;
    let branches = await getBranches(repo);
    let original=branches;
    branches = branches.split('\n').map(branch => branch.trim()).filter(Boolean)
        .map(branch => {
            let isCurrent = branch.startsWith("*");
            let [createdOn, name] =  branch.split(" ");
            return {
                name:name.replace("*","").trim(),
                createdOn,
                isCurrent
            }
        });
    let current = branches.find(branch => branch.isCurrent);
    return res.status(200).json({ status: 'OK', data: {branches, current, count: branches.length, repo } })
}


export const gitStatus = async (req, res) =>{
    let repo = req.query.repo;
    let result = await getGitStatus(repo);
    let original = result
    result = result.split('\n')
    .map(file => {
        let [fileStatas, filePath] = file.trim().split(" ");
        if(!filePath || !fileStatas) return  null;
        return {
            status:fileStatas,
            path:filePath
        }
    }).filter(Boolean);
    return res.status(200).json({ status: 'OK', data: {result, original,repo } })
}

export const gitLogs = async (req, res) =>{
    let repo = req.query.repo;
    let result = await getGitLogs(repo);
    let original = result
    result = result.split('__COMMIT__')
    .map(commit => {
        let [hash, auther, date, message, body] = commit.trim().split("\n");
        if(!hash) return  null;
        return {
            hash, auther, date, message, body
        }
    }).filter(Boolean);
    return res.status(200).json({ status: 'OK', data: {result, count:result.length,repo } })
}