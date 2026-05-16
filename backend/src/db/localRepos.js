import db from "./connetDB.js";
const getAllRepos = () => {
    try {
        const query = db.prepare(`SELECT * FROM local_repos`);
        return query.all();
    } catch (e) {
        console.log(e.message)
    }
}

export { getAllRepos }