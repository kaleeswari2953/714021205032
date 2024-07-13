const testServerUrl = "http://20.244.56.144/test/";
const qualifiedIds = {
    'p': 'primes',
    'f': 'fibo',
    'e': 'even',
    'r': 'rand'
};
const windowSize = 10;
let numbersWindow = [];

async function fetchNumbers(numberType) {
    const url = `${testServerUrl}${qualifiedIds[numberType]}`;
    try {
        const response = await fetch(url, { method: 'GET', timeout: 500 });
        if (response.ok) {
            const data = await response.json();
            return data.numbers || [];
        }
    } catch (error) {
        console.error(`Error fetching numbers: ${error}`);
    }
    return [];
}

function calculateAverage() {
    const numberType = document.getElementById('numberType').value;

    fetchNumbers(numberType).then(numbers => {
        const windowPrevState = [...numbersWindow];

        numbers.forEach(number => {
            if (!numbersWindow.includes(number)) {
                if (numbersWindow.length >= windowSize) {
                    numbersWindow.shift(); // Remove the oldest number if the window size is exceeded
                }
                numbersWindow.push(number);
            }
        });

        const windowCurrState = [...numbersWindow];
        const avg = numbersWindow.length ? (numbersWindow.reduce((a, b) => a + b, 0) / numbersWindow.length).toFixed(2) : 0;

        displayResult(windowPrevState, windowCurrState, numbers, avg);
    });
}

function displayResult(windowPrevState, windowCurrState, numbers, avg) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>windowPrevState: ${JSON.stringify(windowPrevState)}</p>
        <p>windowCurrState: ${JSON.stringify(windowCurrState)}</p>
        <p>numbers: ${JSON.stringify(numbers)}</p>
        <p>avg: ${avg}</p>
    `;
}
