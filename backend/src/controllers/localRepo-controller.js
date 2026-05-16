import database from "../db/connetDB.js";
import { localRepos } from "../db/index.js"
import { v4 as uuidv4 } from "uuid";
import fs from "node:fs"
import path from "node:path";

export const getAllRepos = (req, res) => {
    // let newRepo = addRepo();
    const repos = localRepos.getAllRepos();
    res.status(200).json({ data: repos, status: 'OK' })
}

export const addRepo = (req, res) => {
    const id = new Date().getTime();
    let dirPath = req.query;
    let validate = isGitRepo(dirPath.path);
    if (!validate.isGitRepo) {
        res.status(400).json({ status: 'BAD_REQUEST', data: { message: 'This is not git repository' } })
    }

    //Check for exists
    let isExistRepo = findRepo(validate.dirName, dirPath.path);
    if (isExistRepo) {
        res.status(409).json({ status: 'CONFLICT', data: { message: 'Repo already exist!', isExistRepo } });
        return;
    }

    let newRepo = insertNewRepo({ name: validate.dirName, path: dirPath.path });
    res.status(200).json({ data: { messgae: 'Repo added to workspace', data: newRepo }, status: 'OK' })

}

function insertNewRepo(repo) {
    let id = new Date().getTime();
    const query = database.prepare(`INSERT INTO local_repos values (${id}, '${repo.name}', '${repo.path}')`);
    return query.run();
}

function isGitRepo(dirPath) {
    let isGitRepo = fs.existsSync(path.join(dirPath, '.git'))
    return { isGitRepo, dirName: path.basename(dirPath)};
}

function findRepo(repoName, repoPath = null) {
    let sql = `
        SELECT *
        FROM local_repos
        WHERE repo_name = ?
    `;

    if (repoPath) {
        sql += ` AND repo_path = ?`;
    }

    const query = database.prepare(sql);

    return repoPath
        ? query.get(repoName, repoPath)
        : query.get(repoName);
}