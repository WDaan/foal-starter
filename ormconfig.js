const { Config } = require('@foal/core')

module.exports = {
    type: 'mysql',

    host: Config.get('database.host'),
    port: Config.get('database.port'),
    username: Config.get('database.username'),
    password: Config.get('database.password'),
    database: Config.get('database.database'),

    dropSchema: Config.get('database.dropSchema', false),
    synchronize: Config.get('database.synchronize', false),

    entities: ['build/app/**/*.entity.js'],
    migrations: ['build/migrations/*.js'],
    cli: {
        migrationsDir: 'src/migrations'
    }
}
