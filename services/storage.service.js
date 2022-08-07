import {homedir} from 'os';
import {join} from 'path';
import {promises} from 'fs';

const filePath = join(homedir(), 'weather-data.json')

const TOKEN_CONFIG = {
    token: 'token',
    city: 'city'
}

const saveKeyValue = async (key, value) => {
    let data = {};

    if (await isExistFile(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
}

const getKeyValue = async (key) => {
    if (await isExistFile(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined

}

const isExistFile = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (error) {
        return false;
    }
}

export {
    saveKeyValue,
    getKeyValue,
    TOKEN_CONFIG
};