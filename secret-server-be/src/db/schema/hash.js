module.exports = ({ mongoose }) => {
    const hash = new mongoose.Schema({
        hash: { type: String, unique: true },
        expireAfterViews: { type: Number },
        expiresAt: { type: Date },
        remainingViews: { type: Number }
    },
        {
            timestamps: true
        }
    )

    hash.index({ 'expiresAt': 1 }, { expireAfterSeconds: 1 })

    return hash

}