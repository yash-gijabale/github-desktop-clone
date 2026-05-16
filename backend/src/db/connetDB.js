import { DatabaseSync } from "node:sqlite"
const database = new DatabaseSync(':memory:');

const createLocalRepoTable = () => {
  let table = database.exec(`
  CREATE TABLE IF NOT EXISTS local_repos(
    id INTEGER PRIMARY KEY,
    repo_name TEXT,
    repo_path TEXT
  ) STRICT
`);
}

createLocalRepoTable()

export default database