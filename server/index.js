const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', client => {
    console.log(client.id);

    let d = new Array(1000);
    d.fill('a');

    let oldDate = Date.now();

    client.on('start', data => {
        setInterval(() => {
            client.emit('started', [Date.now() - oldDate, d]);

            oldDate = Date.now();
        }, 500);
    });

    client.on('disconnect', () => {
        console.log('disconnect');
    });
});
server.listen(3000);

console.info('Server started');
