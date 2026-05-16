import { executor } from './exector.js';
import { getBrancheCommand } from './git-commands.js';

import { exec, execFile } from 'child_process';

export const getBranches = async (repo) => {
    let command = ['-C', repo, 'branch', '--sort=-committerdate', '--format=%(committerdate:short) %(refname:short)', '-a']
    return await executor(command);
}

export const getGitStatus = async (repo) => {
    let command = ['-C', repo, 'status', '--porcelain'];
    return await executor(command);
}

export const getGitLogs = async (repo) => {
     let command = ['-C', repo, 'log', `--pretty=format:__COMMIT__%H%n%an%n%ad%n%s%n%b`];
    return await executor(command);
}