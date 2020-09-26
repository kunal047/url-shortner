const controller = require('../controller/shortner');

module.exports = (fastify, opts, done) => {
    fastify.post('/shorten', {
        schema: {
            description: 'get shortned url',
            tags: ['shorturl'],            
            body: {
                type: 'object',
                properties: {
                    url: {
                        type: 'string',
                        pattern: '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'
                    },
                    shortcode: {
                        type: 'string',
                        pattern: '^[0-9a-zA-Z_]{6}$',
                    },
                },
                required: ['url']
            },
        },
        attachValidation: true,
    }, controller.create);
    
    fastify.get('/:shortcode', {
        schema: {
            description: 'get shortcode',
            tags: ['shorturl'],
            params: {
                type: 'object',
                required: ['shortcode'],
                properties: {
                    shortcode: {
                        type: 'string',
                        pattern: '^[0-9a-zA-Z_]{4,}$',
                    }
                },
            },
            required: true,
        },
        attachValidation: true
    }, controller.get);

    fastify.get('/:shortcode/stats', {
        schema: {
            description: 'get shortcode',
            tags: ['shorturl'],
            params: {
                type: 'object',
                required: ['shortcode'],
                properties: {
                    shortcode: {
                        type: 'string',
                        pattern: '^[0-9a-zA-Z_]{4,}$',
                    }
                },
            },
            required: true,
        },
        attachValidation: true
    }, controller.stats);
    done();
}