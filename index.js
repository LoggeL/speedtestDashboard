const speedTest = require('speedtest-net');
// const fs = require('fs');
// const expres = require('express');

// Connect to the Database file
const db = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data.sqlite',
    },
    useNullAsDefault: true
});

const test = async () => {
    try {
        console.log('Start test')
        const result = await speedTest({ acceptLicense: true, acceptGdpr: true });

        const data = {
            date: result.timestamp,
            download: result.download.bandwidth,
            upload: result.upload.bandwidth,
            latency: result.ping.latency,
            packetLoss: result.packetLoss,
        };

        await db('storage').insert(data)
        console.log('data', data)

    } catch (err) {
        const data = {
            date: new Date(),
            download: 0,
            upload: 0,
            packetLoss: 0,
            latency: 0,
        };

        await db('storage').insert(data);
        console.log('error', err.message);
    }
}

setInterval(test, 30 * 60 * 1000);
test();