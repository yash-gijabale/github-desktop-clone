import { executor } from './exector.js';
import { getBrancheCommand } from './git-commands.js';

import { exec, execFile } from 'child_process';

export const getBranches = async (repo) => {
    let command = ['-C', repo, 'branch', '--sort=-committerdate', '--format=%(HEAD) %(committerdate:short) %(refname:short)', '-a']
    let defaultBranchCommand = ['-C', repo, 'symbolic-ref', '--short', 'refs/remotes/origin/HEAD'];

    let defaultBranch = await executor(defaultBranchCommand);
    let otherbranches = await executor(command);

    return {
        stdout: {
            defaultBranch: defaultBranch.stdout,
            otherbranches: otherbranches.stdout
        }
    }

}

export const getGitStatus = async (repo) => {
    let command = ['-C', repo, 'status', '--porcelain'];
    return await executor(command);
}

export const getGitLogs = async (repo, branch) => {
    let command = ['-C', repo, 'log', branch, `--pretty=format:__COMMIT__%H%n%an%n%ad%n%s%n%b`];
    return await executor(command);
}
export const gitCheckout = async (repo, branchName, isStash, preBranch) => {
    console.log('log:', isStash)
    if (isStash == 'STASH') {

        // Get stash list
        const stashList = await executor([
            '-C',
            repo,
            'stash',
            'list'
        ]);

        console.log(stashList);
        if (stashList) {

            // Find app-created stash
            const autoStash = stashList.stdout
                .split('\n')
                .find(line => line.includes('AUTO_BRANCH_SWITCH_STASH'));

            // Remove previous auto stash
            if (autoStash) {

                const stashRef = autoStash.split(':')[0].trim();

                await executor([
                    '-C',
                    repo,
                    'stash',
                    'drop',
                    stashRef
                ]);
            }
        }

        // Create new stash
        console.log('log:Running in stash')
        await executor([
            '-C',
            repo,
            'stash',
            'push',
            '-u',
            '-m',
            `!!GitHub_Desktop<${preBranch}>`
        ]);
    }

    // Checkout branch
    return await executor([
        '-C',
        repo,
        'checkout',
        branchName
    ]);
}