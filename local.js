const app = require('express')();

app.get('/', (req, res) => {
    res.send({
        status: 'hello world!'
    });
});

app.listen(3000, () => {
    console.log('Server started.');
});
