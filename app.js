// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const fastify_cors = require('fastify-cors');

fastify.register(fastify_cors, {
    origin: true,
    credentials: true,
});
// Declare a route
fastify.get("/", async (request, reply) => {
    return { hello: "world" };
});
fastify.register(require('./routes/shortner'), { prefix: '/api/v1' });

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000);
        fastify.log.info(
            `server listening on ${fastify.server.address().port}`
        );
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
