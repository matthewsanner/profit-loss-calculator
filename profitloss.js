//tracks profit/loss on wins and losses in a stock/options trading system

function profitFunc(initial, target, stoploss, winrate, trades, slippage, fees) {
    const profitPer= initial*(target/100);
    const lossPer= initial*(stoploss/100);
    const slippagePer= initial*(slippage/100);
    const feesPer= initial*(fees/100);
    const winrateDecimal= (winrate/100)
    const wins= Math.round(trades*winrateDecimal)
    const losses= trades-wins;
    return (Number(profitPer*wins)- Number(lossPer*losses)- Number(slippagePer*losses)- Number(feesPer*(trades))).toFixed(2);
};

const form= document.querySelector('#form');
const initial= document.querySelector('#initial');
const target= document.querySelector('#target');
const stoploss= document.querySelector('#stoploss');
const winrate= document.querySelector('#winrate');
const trades= document.querySelector('#trades');
const periods= document.querySelector('#periods');
const slippage= document.querySelector("#slippage")
const fees= document.querySelector('#fees');
const profit= document.querySelector('#profit');
const total= document.querySelector('#total');


form.addEventListener('submit', function(e){
    e.preventDefault();
    let initialTemp= Number(initial.value);
    let profitTemp= Number(0);
    let totalTemp= Number(0);
    for (let i=1; i<=periods.value; i++){
        profitTemp+= Number(profitFunc(initialTemp, target.value, stoploss.value, winrate.value, trades.value, slippage.value, fees.value));
        totalTemp= Number(initialTemp)+Number(profitFunc(initialTemp, target.value, stoploss.value, winrate.value, trades.value, slippage.value,fees.value));
        initialTemp= Number(totalTemp);
    }
    profit.innerText = profitTemp.toLocaleString("en-US");
    total.innerText = totalTemp.toLocaleString("en-US");
});