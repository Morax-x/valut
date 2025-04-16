const predefinedWords = {
    дружба: " ∞ ",
    секс: " 100 $ в час ",
    негр: " 500 $ "
};

const bankRates = {
    bnm: {
        today: {
            EUR: 19.53,
            USD: 17.24,
            RUB: 0.20,
            MDL: 1
        },
        yesterday: {
            EUR: 19.50,
            USD: 17.10,
            RUB: 0.19,
            MDL: 1
        },
        lastWeek: {
            EUR: 19.60,
            USD: 17.30,
            RUB: 0.21,
            MDL: 1
        },
        lastMonth: {
            EUR: 19.55,
            USD: 17.20,
            RUB: 0.205,
            MDL: 1
        },
        lastYear: {
            EUR: 19.40,
            USD: 17.00,
            RUB: 0.18,
            MDL: 1
        }
    },
    maib: {
        today: {
            EUR: 19.60,
            USD: 17.30,
            RUB: 0.21,
            MDL: 1
        },
        yesterday: {
            EUR: 19.55,
            USD: 17.25,
            RUB: 0.20,
            MDL: 1
        },
        lastWeek: {
            EUR: 19.70,
            USD: 17.40,
            RUB: 0.22,
            MDL: 1
        },
        lastMonth: {
            EUR: 19.65,
            USD: 17.35,
            RUB: 0.215,
            MDL: 1
        },
        lastYear: {
            EUR: 19.50,
            USD: 17.15,
            RUB: 0.19,
            MDL: 1
        }
    },
    victoriabank: {
        today: {
            EUR: 19.70,
            USD: 17.40,
            RUB: 0.22,
            MDL: 1
        },
        yesterday: {
            EUR: 19.65,
            USD: 17.35,
            RUB: 0.21,
            MDL: 1
        },
        lastWeek: {
            EUR: 19.80,
            USD: 17.50,
            RUB: 0.23,
            MDL: 1
        },
        lastMonth: {
            EUR: 19.75,
            USD: 17.45,
            RUB: 0.225,
            MDL: 1
        },
        lastYear: {
            EUR: 19.60,
            USD: 17.20,
            RUB: 0.20,
            MDL: 1
        }
    },
    ecb: {
        today: {
            EUR: 19.55,
            USD: 17.25,
            RUB: 0.20,
            MDL: 1
        },
        yesterday: {
            EUR: 19.50,
            USD: 17.15,
            RUB: 0.19,
            MDL: 1
        },
        lastWeek: {
            EUR: 19.65,
            USD: 17.35,
            RUB: 0.21,
            MDL: 1
        },
        lastMonth: {
            EUR: 19.60,
            USD: 17.30,
            RUB: 0.205,
            MDL: 1
        },
        lastYear: {
            EUR: 19.45,
            USD: 17.05,
            RUB: 0.18,
            MDL: 1
        }
    }
};

let selectedBank = 'bnm';
let currentRates = bankRates[selectedBank].today;

function selectBank(bank) {
    selectedBank = bank;
    currentRates = bankRates[selectedBank].today;
    showCurrentRates();
}

function showCurrentRates() {
    const flags = {
        EUR: "https://flagcdn.com/eu.svg",
        USD: "https://flagcdn.com/us.svg",
        RUB: "https://flagcdn.com/ru.svg",
        MDL: "https://flagcdn.com/md.svg"
    };

    let html = `<h3>Cursuri pentru ${selectedBank.toUpperCase()}</h3>`;
    for (const currency in currentRates) {
        if (currency !== 'MDL') {
            html += `<div><img src="${flags[currency]}" style="width:24px; vertical-align:middle;"> ${currency}: ${currentRates[currency].toFixed(2)} </div>`;
        }
    }
    document.getElementById('currentRates').innerHTML = html;
}

function setRelativeDate(daysAgo) {
    const d = new Date();
    d.setDate(d.getDate() + daysAgo); 
    const formattedDate = d.toISOString().split('T')[0]; 
    document.getElementById("datePicker").value = formattedDate; 
    onDateChange(); 
}

function onDateChange() {
    const days = new Date(document.getElementById("datePicker").value).getDate() - new Date().getDate();
    
    switch (days) {
        case 0: 
            currentRates = bankRates[selectedBank].today;
            break;
        case -1: 
            currentRates = bankRates[selectedBank].yesterday;
            break;
        case -7: 
            currentRates = bankRates[selectedBank].lastWeek;
            break;
        case -30: 
            currentRates = bankRates[selectedBank].lastMonth;
            break;
        case -365: 
            currentRates = bankRates[selectedBank].lastYear;
            break;
    }
    showCurrentRates();
}

function convert() {
    let amountInput = document.getElementById('amount').value.trim().toLowerCase();
    
    if (predefinedWords[amountInput]) {
        document.getElementById('result').textContent = `${amountInput}: ${predefinedWords[amountInput]}`;
        return;
    }

    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const icon = document.getElementById('icon');

    const amount = parseFloat(amountInput);
    if (isNaN(amount)) {
        document.getElementById('result').textContent = 'Introduceți o sumă validă!';
        return;
    }

    const result = amount * (currentRates[from] / currentRates[to]);

    icon.classList.add('animate');
    setTimeout(() => icon.classList.remove('animate'), 500);

    document.getElementById('result').textContent =
        `${amount} ${from} = ${result.toFixed(2)} ${to}`;
}

window.onload = showCurrentRates;
