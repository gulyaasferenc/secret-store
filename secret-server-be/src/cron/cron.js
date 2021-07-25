const CronJob = require('cron').CronJob;

module.exports = ({ mongo, logIt }) => {
    const Hash = mongo.models.Hash

    let cronInProgress = false

    const deleteExpiredSecrets = async () => {
        if (!cronInProgress) {
            try {
                cronInProgress = true

                const { deletedCount } = await Hash.deleteMany(
                    { expiresAt: { $ne: null, $lte: new Date().toISOString() } }
                )

                deletedCount > 0 && logIt.success(`expired secrets deleted... count: ${deletedCount}`)

                cronInProgress = false
            } catch (error) {
                logIt.error('Last Cron task took too long... Skip one and continue')
            }

        } else {
            logIt.error('Last Cron task took too long... Skip one and continue')
        }

    }
    const job = new CronJob('* * * * *', deleteExpiredSecrets, null, true);
    job.start();
    logIt.success('Expired secret delete cron started')
}
