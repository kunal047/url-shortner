const storage = require('node-persist');
const moment = require('moment');

exports.create = async (request, reply) => {

    await storage.init({
        stringify: JSON.stringify,
        parse: JSON.parse,
    });

    const { url, shortcode } = request.body;
    
    if (request.validationError) {
        if (request.validationError.validation[0].dataPath.includes(".url"))
            return reply.code(400).send({
                
                msg: `The url ${request.validationError.validation[0].message}`,
            });
        if (request.validationError.validation[0].dataPath.includes(".shortcode"))
            return reply.code(422).send({
                
                msg: `The shortcode ${request.validationError.validation[0].message}`,
            });
    }
    console.log("shrotcode " , shortcode);

    const item = await storage.getItem(shortcode);
    if(item) {
        return reply.code(409).send({
            
            msg: `The the desired shortcode is already in use. Shortcodes are case-sensitive.`
        })
    }

    await storage.setItem(shortcode, { url, count: 0, startDate: moment().toISOString(), lastSeenDate: moment().toISOString() });

    return reply.code(201).send({
        shortcode,
    });
};

exports.get = async (request, reply) => {

    const { shortcode } = request.params; 
    if (request.validationError) {
        return reply.code(422).send({
            
            msg: `The shortcode ${request.validationError.validation[0].message}`,
        });
    }

    const item = await storage.getItem(shortcode);
    if (!item) {
        return reply.code(404).send({
            
            msg: 'The shortcode cannot be found in the system'
        })
    }
    return reply.code(302).send({
        location: item.url,
    });
}

exports.stats = async (request, reply) => {

    const { shortcode } = request.params;
    if (request.validationError) {
        return reply.code(422).send({
            
            msg: `The shortcode ${request.validationError.validation[0].message}`,
        });
    }

    const item = await storage.getItem(shortcode);
    if (!item) {
        return reply.code(404).send({
            
            msg: 'The shortcode cannot be found in the system'
        })
    }

    const lastSeenDate = moment().toISOString();
    const redirectCount = item.count + 1;
    await storage.setItem(shortcode, { url: item.url, count: redirectCount, startDate: item.startDate, lastSeenDate});

    return reply.send({   
        startDate: item.startDate,
        lastSeenDate,
        redirectCount,
    })
}
