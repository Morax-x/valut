const predefinedWords = {
    дружба: " ∞ ",  
    секс: " 100 $ в час ",  
    негр: " 500 $ "    
};
let selectedBank = 'bnm';

const exchangeRates = {
    bnm: {
        EUR: 19.53,
        USD: 17.24,
        RUB: 0.20,
        MDL: 1
    },
    maib: {
        EUR: 19.60,
        USD: 17.30,
        RUB: 0.21,
        MDL: 1
    },
    victoriabank: {
        EUR: 19.50,
        USD: 17.10,
        RUB: 0.19,
        MDL: 1
    },
    ecb: {
        EUR: 19.55,
        USD: 17.20,
        RUB: 0.205,
        MDL: 1
    }
};

function selectBank(bank) {
    selectedBank = bank;
    showCurrentRates();
}

function showCurrentRates() {
    const rates = exchangeRates[selectedBank];
    let html = '';
    for (const currency in rates) {
        if (currency !== 'MDL') {
            html += `<div>MDL ${rates[currency].toFixed(2)} ${currency}</div>`;
        }
    }
    document.getElementById('currentRates').innerHTML = html;
}

function convert() {
    const amountInput = document.getElementById('amount').value.trim();
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const icon = document.getElementById('icon');

    const amount = parseFloat(amountInput);
    if (isNaN(amount)) {
        document.getElementById('result').textContent = 'Introduceți o sumă validă!';
        return;
    }

    const rates = exchangeRates[selectedBank];
    const result = amount * (rates[from] / rates[to]);

    icon.classList.add('animate');
    setTimeout(() => icon.classList.remove('animate'), 500);

    document.getElementById('result').textContent =
        `${amount} ${from} = ${result.toFixed(2)} ${to}`;
}

window.onload = showCurrentRates;
