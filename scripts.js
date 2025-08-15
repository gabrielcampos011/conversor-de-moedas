const form = document.getElementById('currencyForm');
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const resultContainer = document.getElementById('result');
const loading = document.querySelector('.spinner'); 
const errorMessage = document.getElementById('errorMessage');
const API_URL = 'https://api.exchangerate-api.com/v4/latest/';
const resultContainerParent = document.querySelector('.result-container');


const currencyInfo = {
    'USD': { name: 'Dólar Americano', symbol: '$' },
    'EUR': { name: 'Euro', symbol: '€' },
    'BRL': { name: 'Real Brasileiro', symbol: 'R$' },
    'GBP': { name: 'Libra Esterlina', symbol: '£' },
    'JPY': { name: 'Iene Japonês', symbol: '¥' },
    'CAD': { name: 'Dólar Canadense', symbol: 'C$' },
    'AUD': { name: 'Dólar Australiano', symbol: 'A$' },
    'CHF': { name: 'Franco Suíço', symbol: 'CHF' },
    'CNY': { name: 'Yuan Chinês', symbol: '¥' },
    'ARS': { name: 'Peso Argentino', symbol: 'AR$' }
};



resultContainerParent.style.display = 'none';

async function convertMoney(amount, fromCurrency, toCurrency) {
    loading.style.display = 'block'; 
    resultContainerParent.style.display = 'none';
    
    try {
        const response = await fetch(`${API_URL}${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const result = amount * rate;
        console.log(result);
        

        const fromCurrencyInfo = currencyInfo[fromCurrency];
        const toCurrencyInfo = currencyInfo[toCurrency];

        
        
   
        resultContainer.innerHTML = `
        <span class="currency-symbol">${fromCurrencyInfo.symbol}</span>
        <span class="currency-amount">${amount}</span>
        <span class="equals">=</span>
        <span class="currency-symbol">${toCurrencyInfo.symbol}</span>
        <span class="currency-amount">${result.toFixed(2)}</span>
    `;
        
        loading.style.display = 'none'; 
        resultContainerParent.style.display = 'block';
    }
    catch (error) {
        console.error('Erro ao converter moeda:', error);
        errorMessage.textContent = 'Erro ao converter moeda. Por favor, tente novamente.';
        loading.style.display = 'none'; 
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    convertMoney(amount, fromCurrency, toCurrency);
});