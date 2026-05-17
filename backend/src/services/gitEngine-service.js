import { getGitStatus } from "../gitEngine/engine.js";

const getStatus = async (repo) => {
    let original = await getGitStatus(repo);
    let result = original.stdout.split('\n')
    .map(file => {
        let [fileStatas, filePath] = file.trim().split(" ");
        if (!filePath || !fileStatas) return null;
        return {
            status: fileStatas,
            path: filePath
        }
    }).filter(Boolean);
    console.log(result)
    return result;
}

export default {getStatus}

