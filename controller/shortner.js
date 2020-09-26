
const moment = require('moment');
const get = require('../factory/shortcode');
const storage = require('node-persist');

exports.create = async (request, reply) => {

    await storage.init({
        stringify: JSON.stringify,
        parse: JSON.parse,
    });
    
    let { url, shortcode } = request.body;
   
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

    if (shortcode) {
        const item = await storage.getItem(shortcode);
        if(item) {
            return reply.code(409).send({
                
                msg: `The the desired shortcode is already in use. Shortcodes are case-sensitive.`
            })
        }
    } else {
        shortcode = get.shortCode(); 
    }

    await storage.setItem(shortcode, { url, count: 0, startDate: moment().toISOString(), lastSeenDate: moment().toISOString() });

    return reply.code(201).send({
        shortcode,
    });
};

exports.get = async (request, reply) => {

    await storage.init({
        stringify: JSON.stringify,
        parse: JSON.parse,
    });

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

    return reply.code(302).send({
        location: item.url,
    });
}

exports.stats = async (request, reply) => {

    await storage.init({
        stringify: JSON.stringify,
        parse: JSON.parse,
    });

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

    return reply.send({   
        startDate: item.startDate,
        lastSeenDate: item.lastSeenDate,
        redirectCount: item.count,
    })
}
