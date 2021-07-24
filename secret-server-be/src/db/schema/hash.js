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

    return hash

}