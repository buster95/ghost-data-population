import axios from 'axios';
import generator from 'generate-password';
import Persona from 'persona-generator';
import FormData from 'form-data';

const generateUsername = () => {
    const person = new Persona().generate();
    return person.usernames[0];
};

const generatePassword = () => {
    return generator.generate({
        length: 20,
        numbers: true,
        uppercase: true,
        strict: true
    });
};

const platforms = {
    bac: 1,
    bdf: 2,
    ficohsa: 3,
    lafise: 4,
    avanz: 7,
    atlantida: 8,
    otro: 9,
    banpro: 10
};
const generatePlatform = () => {
    const keys = Object.keys(platforms);
    const platform = keys[Math.floor(Math.random() * keys.length)];
    return platforms[platform];
}

const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36 Edg/93.0.961.38";
const http = axios.create({
    baseURL: 'http://157.245.139.62/index.php/LoginUser',
    timeout: 1000,
    headers: {
        'User-Agent': userAgent,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
});

let counter = 0;
const maxRequest = 1000;
const sendRequest = async () => {
    try {
        if (counter >= maxRequest) {
            console.log('Max request reached');
            process.exit(0);
        }
        const formData = new FormData();
        formData.append('JqUsername', generateUsername());
        formData.append('JqPass', generatePassword());
        formData.append('JqNomb', generatePlatform());

        const { data } = await http.post('/SaveData', formData);
        console.log(data);
        counter++;
    } catch (error) {
        console.warn(error.response ? error.response.data : error.message);
    }
};

setInterval(sendRequest, 250);

// for (let index = 0; index < 100; index++) {
//     sendRequest();
// }


// console.log(generatePlatform());
// console.log(generateUsername());
// console.log(generatePassword());
