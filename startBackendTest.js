const { exec, spawn } = require('child_process');

try {
    console.log('Start with initialize db for test with docker-compose...');
    exec('docker-compose up -d', () => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 5000)
        }).then(() => {
            console.log('DB is probably up, trying to start the tests...')
            const testProcess = spawn('yarn', ['test'])

            testProcess.stdout.on('data', chunk => {
                console.log(chunk.toString())
            })

            testProcess.on('close', () => {
                console.log('Tests ran, kill the docker container...')
                exec('docker-compose down')
            })

        })
    })
}
catch (err) {
    console.log('chdir: ' + err);
}