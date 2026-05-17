import { executor } from './exector.js';
import { getBrancheCommand } from './git-commands.js';

import { exec, execFile } from 'child_process';

export const getBranches = async (repo) => {
    let command = ['-C', repo, 'branch', '--sort=-committerdate', '--format=%(HEAD) %(committerdate:short) %(refname:short)', '-a']
    // const localBranches = await executor([
    //     '-C',
    //     repo,
    //     'for-each-ref',
    //     '--format=%(refname:short)',
    //     'refs/heads'
    // ]);

    // const remoteBranches = await executor([
    //     '-C',
    //     repo,
    //     'for-each-ref',
    //     '--format=%(refname:short)',
    //     'refs/remotes'
    // ]);

    // const localSet = new Set(
    //     localBranches.stdout.split('\n').map(b => b.trim())
    // );

    // const filteredRemote = remoteBranches.stdout
    //     .split('\n')
    //     .map(b => b.replace('origin/', '').trim())
    //     .filter(b => b && !localSet.has(b));

    // return filteredRemote;
    return await executor(command);

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