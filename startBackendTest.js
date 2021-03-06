const { exec, spawn } = require('child_process');

try {
    console.log('First kill the docker containiers initialized from docker-compose file in this diectory')
    exec('docker-compose down', (error) => {
        if (error) throw error
        process.chdir('./secret-server-be')
        console.log('Start with initialize db for test with docker-compose...');
        exec('docker-compose up -d', (error) => {
            if (error) throw error
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

                testProcess.stderr.on('error', error => {
                    console.log(error.toString())
                })

                testProcess.on('close', () => {
                    console.log('Tests ran, kill the docker container...')
                    exec('docker-compose down')
                })

            }).catch(error => {
                throw error
            })
        })
    })
}
catch (err) {
    console.log(err);
}