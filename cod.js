const rates = {
    EUR: 1,
    USD: 1.1,
    MDL: 19.5,
    RUB: 90
};

function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const icon = document.getElementById('icon');

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
