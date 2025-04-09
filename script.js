const predefinedWords = {
    дружба: " ∞ ",  
    секс: " 100 $ в час ",  
    негр: " 500 $ "    
};

const rates = {
    EUR: 1,
    USD: 1.1,
    MDL: 19.5,
    RUB: 90
};

function convert() {
    const amountInput = document.getElementById('amount').value.trim();  
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const icon = document.getElementById('icon');

    
    if (predefinedWords[amountInput]) {
        if (predefinedWords[amountInput] === "∞") {
            document.getElementById('result').textContent = `${amountInput} ∞ ${to}`;
        } else {
            document.getElementById('result').textContent = `${amountInput} ${predefinedWords[amountInput]} ${to}`;
        }
        return;
    }

    
    const amount = parseFloat(amountInput);

    
    if (isNaN(amount)) {
        document.getElementById('result').textContent = 'Introduceți o sumă validă!';
        return;
    }

    
    icon.classList.add('animate');
    setTimeout(() => icon.classList.remove('animate'), 500);

    
    const result = (amount / rates[from]) * rates[to];
    document.getElementById('result').textContent =
        `${amount} ${from} = ${result.toFixed(2)} ${to}`;
}
