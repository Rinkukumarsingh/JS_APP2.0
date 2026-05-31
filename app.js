const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

  const BASE_URL2 = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const selectOption = document.querySelectorAll(".select-container");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const msg = document.querySelector("#result");

const btn = document.getElementById("convert-btn");

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
   
     let amount = document.querySelector(".input-area input");
     let amtVal = amount.value;
     if(amtVal === "" || amtVal <= 0 || amtVal == undefined || isNaN(amtVal)){
      amount.value = "1";
      amtVal = 1;
     }
   updateExchangeRate(amtVal);
});

 const updateExchangeRate = async (amtVal)=>{
    if(amtVal === "" || amtVal <= 0 || amtVal == undefined || isNaN(amtVal)){
      amount.value = "1";
      amtVal = 1;
     }
  let fromCurr = fromCurrency.value;
  let toCurr = toCurrency.value;
  let finalURL = `${BASE_URL}/${fromCurr.toLowerCase()}.json`;   
  let response = await fetch(finalURL);
  let data = await response.json();

  console.log(data);
  let exchangeRate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
  let finalValue = amtVal * exchangeRate;
  msg.innerText = `${amtVal} ${fromCurr} = ${finalValue.toFixed(2)} ${toCurr}`;

 }


const updateFlag = (ele)=>{
  let currCode = ele.value;
  let countryCode = countryList[currCode];
  let imgURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let imgTag = ele.parentElement.querySelector("img");
    imgTag.src = imgURL;

}

for(let select of dropdowns){
  for( code in countryList){
   let option = document.createElement("option");
   option.value = code;
   option.innerText = code;

   if(select.id == "from" && code == "USD"){
    option.selected = true;
   } else if(select.id == "to" && code == "INR"){
    option.selected = true;
   }
   select.appendChild(option);
  }

  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}


window.addEventListener("load", () => {
  updateExchangeRate();
});