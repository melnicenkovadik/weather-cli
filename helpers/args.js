const getArgs = (args) => {
    const result = {};
    const [execute, file, ...rest] = args;
    args.forEach((value, index, array) => {
        if (value.charAt(0) == "-") {
            if (index == array.length - 1) {
                result[value.slice(1)] = true;
            } else if (array[index + 1] && array[index + 1].charAt(0) != "-") {
                result[value.slice(1)] = array[index + 1];
            } else {
                result[value.slice(1)] = true;
            }
        }
    });
    return result;
}

export {getArgs};