export const getBrancheCommand = (repo) =>{
    return `git -C ${repo} branch -a`;
}