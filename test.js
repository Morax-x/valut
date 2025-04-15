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

async function selectBank(bank, date) {
    window.currentBank = bank;
    const rates = await getHistoricalRates(bank, date);
    window.currentRates = rates;
    showCurrentRates();
}
async function getHistoricalRates(bank, date) {
        try {
            const url =  `https://api.exchangerate.host/${date}?base=MDL&symbols=EUR,USD,RUB`;
            const response = await fetch(url);
            const data = await response.json();
            return {
            EUR:data.rates.EUR,
            USD:data.rates.USD,
            RUB:data.rates.RUB,
            MDL: 1
            };
        }catch (e){
            console.error("Eriare la API", e);
            return exchangeRates[bank];
        }
    }
    window.onload = () => {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById("datePicker").value = today;
        window.currentBank = 'bnm';
        selectBank('bnm', today);
    };
    function onDateChange() {
        const date = document.getElementById("datePicker").value;
        if (window.currentBank && date) {
            selectBank(window.currentBank, date);
        }
    }
    function setRelativeDate(daysAgo) {
        const d = new Date();
        d.setDate(d.getDate() + daysAgo);
        const formattedDate = d.toISOString().split('T')[0];
        document.getElementById("datePicker").value = formattedDate;
        onDateChange();
    }

function showCurrentRates() {
    const rates = window.currentRates || exchangeRates[selectedBank];
    const flags = {
            EUR: "https://flagcdn.com/eu.svg",
            USD: "https://flagcdn.com/us.svg",
            RUB: "https://flagcdn.com/ru.svg",
            MDL: "https://flagcdn.com/md.svg"
        };
        let html = '';
        for (const currency in rates){
        if (currency !== 'MDL') {
            html += `<div><img src="${flags[currency]}" style="width:24px; vertical-aling:middle;">${rates[currency].toFixed(2)} </div>`;
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

    const rates = window.currentRates || exchangeRates[selectedBank];
    const result = amount * (rates[from] / rates[to]);

    icon.classList.add('animate');
    setTimeout(() => icon.classList.remove('animate'), 500);

    document.getElementById('result').textContent =
        `${amount} ${from} = ${result.toFixed(2)} ${to}`;
}

window.onload = showCurrentRates;
