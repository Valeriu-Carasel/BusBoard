import fetch from 'node-fetch'


async function askForStopCode(): Promise<string> {
    const reader = require("readline");
    const inquirer = reader.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const questionInit = (questionText: string) =>
        new Promise<string>(resolve => inquirer.question(questionText, resolve));
    let code: string = await questionInit("Please enter a stop code: ");
    console.log(code);
    inquirer.close();
    return code;
}

async function main(): Promise<void> {
    let code: string = await askForStopCode();
}

main()