import { execFile } from "node:child_process"
export const executor = (command) => {
    if (!command) return null;
    // console.log(command)
    return new Promise((resolve, reject) => {
        execFile('git', command, {
            timeout: 5000,
            maxBuffer: 1024 * 1024
        }, (error, stdout, stderr) => {

            if (error) {
                console.error(error);
                return reject(error);
            }

            resolve({
                stdout: stdout.trim(),
                stderr: stderr.trim()
            });
        });
    })
}