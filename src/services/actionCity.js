const json = require('../../cityes.json');
const request = require('request');

async function actionCity (settings) {
    try {
        // // let js = JSON.parse(json);
        let options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'accept-encoding': 'application/gzip',
                'x-rapidapi-key': process.env.rapidapi_key,
                'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                useQueryString: true
            },
            form: {q: '', source: 'ru', target: 'uk'}
        };
        const {type, data} = settings;
        let result = [];

        if (type === 'regions') {
            for (let i = 0; i < json.length; i++) {
                result[i] = json[i].name;
            }
            return result;
        } else if (type === 'cityes') {
            json.forEach(element => {
                if (element.name.startsWith(data.slice(0,5))) {
                    element.areas.forEach(el => {
                        result.push(el.name);
                    })
                };
            });
            return result;
        } else if (type === 'oneRegion') {
            json.forEach(element => {
                if (element.name.startsWith(data.slice(0,5))) {
                    console.log(element.name)
                    result[0] = element.name;
                };
            })
            return result;
        } else if (type === 'oneCity') {
            json.forEach(element => {
                element.areas.forEach(el => {
                     if (el.name.startsWith(data.slice(0,5))) {
                        result[0] = el.name;
                    };
                });
            });
            return result;
        }

        // for (let i = 0; i < json.length; i++) {
        //     result[i] = [];
        //     for (let j = 0; j < json[i].areas.length; j++) {
        //         result[i][j] = json[i].areas[j].name;
        //     }
        // }
        // console.log(result);
        // for (let i = 0; i < 1; i++) {
        //     let str = '';
        //     str = result[i].join('. ');

        //     // console.log(str);
        //     options.form.q = str;
        //     request(options, function (error, response, body) {
        //         if (error) throw new Error(error);
        //         console.log(body);
        //     });
        // }

    

    } catch (e) {
        console.log(`Error: ${e}`);
    }    
}
// actionCity({type: '', data: ''})
module.exports = {actionCity};
