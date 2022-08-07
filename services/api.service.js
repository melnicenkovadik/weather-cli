import {getKeyValue, TOKEN_CONFIG} from "./storage.service.js";
import axios from "axios";

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '⛅️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧';
        case '10':
            return '🌧';
        case '11':
            return '⛈';
        case '13':
            return '🌨';
        case '50':
            return '🌫';
    }
}

const getWeather = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_CONFIG.token) ?? '0c8bae2cb5e1ca6e194d832b40336390';
    if (!token) {
        throw new Error('Необходимо ввести токен, запустите команду -t [TOKEN]');
    }

    const url = 'https://api.openweathermap.org/data/2.5/weather'
    const {data} = await axios.get(url, {
        params: {
            q: city,
            appid: token,
            units: 'metric',
            lang: 'ua'
        }
    });
    return data;
}

export {getWeather,getIcon};