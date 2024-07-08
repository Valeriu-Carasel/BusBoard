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

    try {
        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${code}/Arrivals`);
        const data = await response.json();
        // deal with JSON response
        console.log(data);
    } catch (error: any) {
        console.error(error)
    }
}

main()