const development = {
    name: 'development',
    asset_path: '/assets',
    db: "habitTracker",
}

const production = {
    name: 'production',
    asset_path: process.env.ASSET_PATH,
    db: process.env.HABITTRACKER_DB
}

module.exports = production;