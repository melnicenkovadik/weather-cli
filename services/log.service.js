import chalk from "chalk";

const printError = (error) => {
    console.log(chalk.bgRed('Error :'), error);
}
const printSuccess = (message) => {
    console.log(chalk.bgGreen('Success :'), message);
}

const printHelp = () => {
    const spacer = (length) => {
        return new Array(length).fill(' ').join('');
    }
    console.log(
        `${chalk.bgCyan('Help :')}
    Без параметрів ${spacer(20)}- показати погоду
    -h ${spacer(32)}- показати допомогу
    -s [SITY] ${spacer(25)}- зберегти місто в локальному хранилищі
    -t [TOKEN] ${spacer(24)}- зберегти токен в локальному хранилищі
    -showToken ${spacer(24)}- показати токен в локальному хранилищі
    `
    );
}

const printWeather = (weather, icon) => {
    console.log(`
    ${chalk.bgBlue('Погода :')} 
    ${chalk.bgMagenta(`В місті ${weather.name} : ${chalk.blue(weather.main.temp)}°C`)}
    ${chalk.bgMagenta(`${icon} ${chalk.blue(weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.slice(1))}`)}
    ${chalk.bgMagenta(`Температура охолодження ${chalk.blue(weather.main.temp_min)}°C (відчувається як ${chalk.blue(weather.main.feels_like)}°C)`)}
    ${chalk.bgMagenta(`Вологість ${chalk.blue(weather.main.humidity)}%`)}
    ${chalk.bgMagenta(`Швидкість вітру ${chalk.blue(weather.wind.speed)}м/c`)}
    
    `);
}
export {printError, printSuccess, printHelp, printWeather};