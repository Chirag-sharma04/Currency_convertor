const base_url=
              "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".drop select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currcode in countryList ) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value=currcode;
        if(select.name === "from" && currcode === "USD") {
            newoption.selected="selected";
        }else if(select.name === "to" && currcode === "INR") {
            newoption.selected="selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
};
const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newflag = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newflag;
};

const updaterate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === ""||amtval < 1){
        amtval = 1;
        amount.value = "1";
    }
    //console.log(fromcurr.value,tocurr.value);
    const URL = `${base_url}/${fromcurr.value.toLowerCase()}.json`;
    
        let res = await fetch(URL);
        let data = await res.json();
        let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
        let finalamt = amtval * rate;
        msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
};
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updaterate();
});
window.addEventListener("load",()=>{
    updaterate();
});