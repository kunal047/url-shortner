exports.get = async (request, reply) => {
    return reply.send({
        hello: "world",
    })
}