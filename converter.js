// fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json').then(function (result) {
//   return result.json(); //Джсон перетворюємо в джс об"єкт
// }).then(function (data) {
//   console.log(data);
// })
//Масив обєктів з обєктами по валютам
let rates = {};
//Масив для фільтра по всім валютам
const currency = ['USD', 'EUR', 'GBP']
console.log(rates)

//Надходження суми, вибір валюти, результат конвертації
const input = document.querySelector('.inputFrom')
const select = document.querySelector('.selectFrom2')
const result = document.querySelector('.convertResult')

getCurrency();

//Виклик даних по АРІ, перетворення файлу джсон в обєкт джс, фільтр
async function getCurrency () {
  const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
  const result = await response.json();

  //Прочитати методи масивів
  result.map((element) => {
    if (currency.includes(element.cc)){
        rates[element.cc] = element;
    };
  });
}

let convertingResult = function () {
  result.value = (parseFloat(input.value) / rates[select.value].rate).toFixed(2);
  result.textContent = result.value;
}

input.oninput = convertingResult;
select.oninput = convertingResult;