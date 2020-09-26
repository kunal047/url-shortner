const controller = require('../controller/shortner');

module.exports = (fastify, opts, done) => {
    fastify.get('/', {

        schema: {
            description: 'get shortned url',
            tags: ['url shorter'],
        },
    }, controller.get);
    done();
}