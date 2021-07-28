const { exec } = require('child_process');

console.log('Starting directory: ' + process.cwd());
try {
    process.chdir('./secret-server-be');
    console.log('New directory: ' + process.cwd());
    exec('docker-compose up -d', () => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 5000)
        }).then(() => {
            exec('yarn test', (err, stdout, stderr) => {
                console.log(stdout)
            })

        })
    })
}
catch (err) {
    console.log('chdir: ' + err);
}