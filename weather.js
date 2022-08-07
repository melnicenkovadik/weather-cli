#!/usr/bin/env node
import {getArgs} from "./helpers/args.js";
import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_CONFIG} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";


const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_CONFIG.city);
        const weather = await getWeather(city);
        const icon = getIcon(weather.weather[0].icon);
        printWeather(weather,icon);
    } catch (error) {
        if (error?.response?.status === 401) {
            printError('Необходимо ввести токен, запустите команду -t [TOKEN]');
        } else if (error?.response?.status === 404) {
            printError('Город не найден');
        } else {
            printError(error.message);
        }

    }
}
const saveToken = async (token) => {
    if (!token.length) {
        printError('Необходимо ввести токен');
        return;
    }
    try {
        await saveKeyValue(TOKEN_CONFIG.token, token);
        printSuccess('Токен збережено');
    } catch (error) {
        printError(error);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Необходимо ввести город');
        return;
    }
    try {
        await saveKeyValue(TOKEN_CONFIG.city, city);
        printSuccess('Місто збережено');
    } catch (error) {
        printError(error);
    }
}
const initCli = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        // Сохранить город в локальном хранилище
          saveCity(args.s);
    }
    if (args.t) {
          saveToken(args.t);
    }
    if (args.showToken) {
        // Показать токен в локальном хранилище
        return getKeyValue(TOKEN_CONFIG.token);
    }
    // Выводим погоду по городу из локального хранилища
    getForecast();
}

initCli();