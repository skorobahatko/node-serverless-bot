// const fs = require('fs');
const json = require('../../cityes.json');
// const jsonUA = require('../../ua.json');
const request = require('request');
const {endPoint} = require('./endPoint');

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
                     if (el.name.startsWith(data.slice(0,data.length - 3))) {
                        result[0] = el.name;
                    };
                });
            });
            return result;
        } 
        // if (type === 'cititess') {
        //     let errCityes = [];
        //     // json.forEach(element => {
        //             json[0].areas.map( async (el) => {
        //                 try {
        //                     const citys = await endPoint(el.name);
        //                         result.push(el.name);
                            
        //                 } catch (e) {
        //                     if (citys.cod === '404') {
        //                         console.log(el);
        //                        errCityes.push(el); 
        //                     } 
        // }
        //                     } 
        //                 }
        //                 console.log('bad');
        //                 console.log(errCityes);
        //         })
        //     // });

        //     // console.log('good');
        //     // console.log(result);
        // }
        const arrayOfRegions = [
            { name: 'Kharkivs’ka Oblast’', areas: [] },
            { name: 'Odes’ka Oblast’', areas: [] },
            { name: 'Dnipropetrovs’ka Oblast’', areas: [] },
            { name: 'Donets’ka Oblast’', areas: [] },
            { name: 'Zaporiz’ka Oblast’', areas: [] },
            { name: 'L’vivs’ka Oblast’', areas: [] },
            { name: 'Mykolayivs’ka Oblast’', areas: [] },
            { name: 'Luhans’ka Oblast’', areas: [] },
            { name: 'Vinnyts’ka Oblast’', areas: [] },
            { name: 'Poltavs’ka Oblast’', areas: [] },
            { name: 'Chernihivs’ka Oblast’', areas: [] },
            { name: 'Khersons’ka Oblast’', areas: [] },
            { name: 'Cherkas’ka Oblast’', areas: [] },
            { name: 'Khmel’nyts’ka Oblast’', areas: [] },
            { name: 'Zhytomyrs’ka Oblast’', areas: [] },
            { name: 'Chernivets’ka Oblast’', areas: [] },
            { name: 'Sums’ka Oblast’', areas: [] },
            { name: 'Rivnens’ka Oblast’', areas: [] },
            { name: 'Ivano-Frankivs’ka Oblast’', areas: [] },
            { name: 'Kirovohrads’ka Oblast’', areas: [] },
            { name: 'Ternopil’s’ka Oblast’', areas: [] },
            { name: 'Volyns’ka Oblast’', areas: [] },
            { name: 'Kyyivs’ka Oblast’', areas: [] },
            { name: 'Zakarpats’ka Oblast’', areas: [] }
        ];
        function byField(field) {
            return (a, b) => a[field] > b[field] ? 1 : -1;
          }
          
        
        // console.log(arrayOfRegions.length)
        function geCities (js) {
            arrayOfRegions.sort(byField('name'));
            let cityes = arrayOfRegions.map(el => {
                js.forEach(element => {
                    if (element.admin_name === el.name) {
                        console.log(element.admin_name)
                        el.areas = [...el.areas, {"name": element.city}]
                        el.areas.sort(byField('name'));
                    }
                });
                return el;
            })
            fs.writeFile('cityes.json', JSON.stringify(cityes), 'utf-8', (error) => {
                if (error) console.log(error);
            });
        }
        // geCities(jsonUA);
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
