const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data.sqlite',
    },
});

(async () => {

    const storageExists = await knex.schema.hasTable('storage')
    console.log('storageExists', storageExists)

    if (!storageExists) {
        await knex.schema.createTable('storage', table => {
            table.increments('id').primary()
            table.float('download')
            table.float('latency')
            table.float('upload')
            table.float('packetLoss')
            table.timestamp('date')
        })
    }

    knex.destroy()

})()