require('dotenv').config();
const controllers = require('./src/controllers');

module.exports.shortBot = async event => {
    try {
      let { body } = event;
      body = JSON.parse(body);
      
      console.log(body);
      console.log(`stage: ${process.env.stage}`);
      await controllers.webhook(body);

    } catch (error) {
      console.log(`ERROR in handler: ${error}`);
    }

  return { statusCode: 200 };
};
