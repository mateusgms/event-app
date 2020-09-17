const proxy = [
    {
        context: '/',
        target: 'https://event-app3.herokuapp.com',
        pathRewrite: { '^/':'' }
    }
];

module.exports = proxy;
