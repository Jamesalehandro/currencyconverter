const dropList = document.querySelectorAll("select");
fromCurrency = document.getElementById("selectedFrom");
toCurrency = document.getElementById("selectedTo");
const getButton = document.getElementById("getBtn");
const exchangeBtn = document.getElementById("exchangeBtn");
const inputBtn = document.getElementById("inputBtn");
const exchangeRateTxt = document.getElementById("exchangeRateTxt");


let check = dropList.classList
console.log(check);



for (let i = 0; i < dropList.length; i++) {
  for (let currencyCode in country_list) {

    let selected =
      i == 0
        ? currencyCode == "USD"
            ? "selected"
            : "" :
             currencyCode == "NGN"
            ? "selected"
        : "";




    let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
    dropList[i].insertAdjacentHTML('afterbegin',optionTag)
  }

  dropList[i].addEventListener('change', (e) => {
      loadFlag(e.target)
  })
};


loadFlag = (e) => {
    for(code in country_list){
        if (code == e.value) {
            // if currency code of country list is equal to option value
        //   Below is also good for getting a particular element in html when you want to manipulate more than one element.
        // console.log(e.parentElement);
        let imgTag = e.parentElement.querySelector('img');
        
        imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
};


getExchangeRate = (e) => {
    let amountVal = inputBtn.value
   
    if (amountVal == "" || amountVal == 0) {
        inputBtn.value = "1";
        amountVal = 1
    }

    exchangeRateTxt.innerText = 'Getting exchange rate...';

    let url = ` https://v6.exchangerate-api.com/v6/5fbee43dfe19589640a66d88/latest/${fromCurrency.value}`;
    
    fetch(url).then(reply => reply.json()).then(res => {
       let exchangeRate = res.conversion_rates[toCurrency.value];
       let finalXchange = (amountVal * exchangeRate).toFixed(3);
       exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} is ${finalXchange} ${toCurrency.value}`
       inputBtn.blur();

    }).catch(() =>{
        exchangeRateTxt.innerText = `Something is seriously wrong with you`
    })
   
}





exchangeBtn.addEventListener('click', () => {
    
    [fromCurrency.value,toCurrency.value] = [toCurrency.value,fromCurrency.value]

    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();

})



getButton.addEventListener('click', (e)=> {
    e.preventDefault();
    getButton.innerText = `Please Wait....`;
    setTimeout(() => {
    getExchangeRate()
    getButton.innerText = `Get Exchange Rate`;
    }, 3000);

});



window.addEventListener('load', () => {
    getExchangeRate();
})


// inputBtn.addEventListener('mouseout', () => {
//     getExchangeRate();
//   inputBtn.blur();
// });