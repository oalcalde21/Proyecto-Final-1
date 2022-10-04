let btc = document.getElementById("bitcoin");
let ltc = document.getElementById("litecoin");
let eth = document.getElementById("ethereum");
let doge = document.getElementById("dogecoin");


fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Clitecoin%2Cethereum%2Cdogecoin&vs_currencies=usd")
    .then((response) => response.json())
    .then((json) => {
        btc.innerHTML = json.bitcoin.usd;
        ltc.innerHTML = json.litecoin.usd;
        eth.innerHTML = json.ethereum.usd;
        doge.innerHTML = json.dogecoin.usd;
    });

