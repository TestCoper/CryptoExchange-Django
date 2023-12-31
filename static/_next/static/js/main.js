
/* Vars code */
var ThBody = document.getElementById("mainhtml");
var tokList = document.getElementById("tokList");
var tokList2 = document.getElementById("tokList2");
var ftok = document.getElementById("ftok");
var ttok = document.getElementById("ttok");
var chti = 0;
var chti2 = 0;

/* Moralis init code */
const serverUrl = "https://9hm5uxsbenhc.usemoralis.com:2053/server";
const appId = "epRYpYgEIDnlCYCSbntz21dj6uQAhdtgNKHjpOJK";
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
      let user = Moralis.User.current();
      if (!user) {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            const user = await Moralis.authenticate({ 
                provider: "walletconnect",
                chainId: 1, 
                mobileLinks: [
                  "metamask",
                  "argent",
                  "trust",
                ]
            });
            let ethaddE = user.get('ethAddress').slice(0, 7) + "..." + user.get('ethAddress').slice(39, 42);
            document.getElementById("conbut").textContent = ethaddE;
        }else{
            Moralis.authenticate().then(function (user) {
                let ethaddE = user.get('ethAddress').slice(0, 7) + "..." + user.get('ethAddress').slice(39, 42);
                document.getElementById("conbut").textContent = ethaddE;
            });
        }
    
      }
}


async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}




/* Show Wallet Add of User code */
async function startpage() {
    let user = Moralis.User.current();
    if (user) {
        let ethaddE = user.get('ethAddress').slice(0, 7) + "..." + user.get('ethAddress').slice(39, 42);
        document.getElementById("conbut").textContent = ethaddE;
    }
}

/* Change Them of User code */
async function chaTheme() {
    var cerTh = ThBody.classList;
    if (cerTh[0] == "light") {
        ThBody.classList = "dark";
        ThBody.style = "color-scheme: dark; --color-brand:147 112 219;";
        setCookie("theme", "dark", 365);
    } else if (cerTh[0] == "dark") {
        ThBody.classList = "light";
        ThBody.style = "color-scheme: light; --color-brand:50 55 67;";
        setCookie("theme", "light", 365);
    }

}

function isInt(n) {
    return n % 1 === 0;
}


function swapsend() {
    var psh1 = document.getElementById("varTokSe").value;
    if (isInt(psh1) == true) {
        psh1 = parseFloat(psh1).toFixed(2);
    }
    var psh2 = document.getElementById("ftok").textContent;
    var psh3 = document.getElementById("ftok2").textContent;
    document.getElementById("inp1").value = psh1;
    document.getElementById("inp2").value = psh2;
    document.getElementById("inp3").value = psh3;
} 



/* Cookie section code */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* Cookie section code */
function checkCookie() {
    let th = getCookie("theme");
    if (th != "") {
        ThBody.classList = th;
        if (th == "dark") {
            ThBody.style = "color-scheme: dark; --color-brand:147 112 219;";
        }
    } else {
    }
}



/* Select token section code */
function selpage(arg) {
    if (arg == 1) {
        tokList.style.display = "block";
    } else if (arg == 2) {
        tokList2.style.display = "block";
    }
    
}

function deAcv() {
    document.getElementsByClassName("acvTok")[0].style.display = "none";
    document.getElementsByClassName("acvTok")[0].classList = "";
}

function deAcv2() {
    document.getElementsByClassName("acvTok2")[0].style.display = "none";
    document.getElementsByClassName("acvTok2")[0].classList = "";
}


function AcSelTok() {
    try {
        document.getElementsByClassName("selTok")[0].style.display = "flex";
        document.getElementsByClassName("selTok")[0].classList = "flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";

    }
    catch (err) {
        // pass
    }
}

function AcSelTok2() {
    try {
        document.getElementsByClassName("selTok2")[0].style.display = "flex";
        document.getElementsByClassName("selTok2")[0].classList = "flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";

    }
    catch (err) {
        // pass
    }
}

function setat(arg) {
    chti = 0;
    chti2 = 0;
    if (arg == "eth") {
        deAcv();
        document.getElementById("ftok").textContent = "ETH";
        document.getElementById("iceth").style.display = "block";
        document.getElementById("iceth").classList = "acvTok";
        tokList.style.display = "none";
        AcSelTok();
        document.getElementById("eth").style.display = "none";
        document.getElementById("eth").classList = "selTok flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";
        if (document.getElementById("ftok2").textContent == "ETH") {
            deAcv2();
            document.getElementById("ftok2").textContent = "PIKAU";
            document.getElementById("icpika2").style.display = "block";
            document.getElementById("icpika2").classList = "acvTok2";
        }
    } else if (arg == "pika") {
        deAcv();
        document.getElementById("ftok").textContent = "PIKAU";
        document.getElementById("icpika").style.display = "block";
        document.getElementById("icpika").classList = "acvTok";
        tokList.style.display = "none";
        AcSelTok();
        document.getElementById("pika").style.display = "none";
        document.getElementById("pika").classList = "selTok flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";
        if (document.getElementById("ftok2").textContent == "PIKAU") {
            deAcv2();
            document.getElementById("ftok2").textContent = "Polygon";
            document.getElementById("icpoly2").style.display = "block";
            document.getElementById("icpoly2").classList = "acvTok2";
        }
    } else if (arg == "poly") {
        deAcv();
        document.getElementById("ftok").textContent = "Polygon";
        document.getElementById("icpoly").style.display = "block";
        document.getElementById("icpoly").classList = "acvTok";
        tokList.style.display = "none";
        AcSelTok();
        document.getElementById("poly").style.display = "none";
        document.getElementById("poly").classList = "selTok flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";
        if (document.getElementById("ftok2").textContent == "Polygon") {
            deAcv2();
            document.getElementById("ftok2").textContent = "BNB";
            document.getElementById("icbnb2").style.display = "block";
            document.getElementById("icbnb2").classList = "acvTok2";
        }
    } else if (arg == "bnb") {
        deAcv();
        document.getElementById("ftok").textContent = "BNB";
        document.getElementById("icbnb").style.display = "block";
        document.getElementById("icbnb").classList = "acvTok";
        tokList.style.display = "none";
        AcSelTok();
        document.getElementById("bnb").style.display = "none";
        document.getElementById("bnb").classList = "selTok flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";
        if (document.getElementById("ftok2").textContent == "BNB") {
            deAcv2();
            document.getElementById("ftok2").textContent = "USDC";
            document.getElementById("icus2").style.display = "block";
            document.getElementById("icus2").classList = "acvTok2";
        }
    } else if (arg == "usdc") {
        deAcv();
        document.getElementById("ftok").textContent = "USDC";
        document.getElementById("icus").style.display = "block";
        document.getElementById("icus").classList = "acvTok";
        tokList.style.display = "none";
        AcSelTok();
        document.getElementById("usdc").style.display = "none";
        document.getElementById("usdc").classList = "selTok flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";
        if (document.getElementById("ftok2").textContent == "USDC") {
            deAcv2();
            document.getElementById("ftok2").textContent = "ETH";
            document.getElementById("iceth2").style.display = "block";
            document.getElementById("iceth2").classList = "acvTok2";
        }
    }
}

function setat2(arg) {
    chti = 0;
    chti2 = 0;
    if (arg == "eth") {
        deAcv2();
        document.getElementById("ftok2").textContent = "ETH";
        document.getElementById("iceth2").style.display = "block";
        document.getElementById("iceth2").classList = "acvTok2";
        tokList2.style.display = "none";
        AcSelTok2();
        document.getElementById("eth2").style.display = "none";
        document.getElementById("eth2").classList = "selTok2 flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";
        if (document.getElementById("ftok").textContent == "ETH") {
            deAcv();
            document.getElementById("ftok").textContent = "PIKAU";
            document.getElementById("icpika").style.display = "block";
            document.getElementById("icpika").classList = "acvTok";
        }
    } else if (arg == "pika") {
        deAcv2();
        document.getElementById("ftok2").textContent = "PIKAU";
        document.getElementById("icpika2").style.display = "block";
        document.getElementById("icpika2").classList = "acvTok2";
        tokList2.style.display = "none";
        AcSelTok2();
        document.getElementById("pika2").style.display = "none";
        document.getElementById("pika2").classList = "selTok2 flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";
        if (document.getElementById("ftok").textContent == "PIKAU") {
            deAcv();
            document.getElementById("ftok").textContent = "Polygon";
            document.getElementById("icpoly").style.display = "block";
            document.getElementById("icpoly").classList = "acvTok";
        }
    } else if (arg == "poly") {
        deAcv2();
        document.getElementById("ftok2").textContent = "Polygon";
        document.getElementById("icpoly2").style.display = "block";
        document.getElementById("icpoly2").classList = "acvTok2";
        tokList2.style.display = "none";
        AcSelTok2();
        document.getElementById("poly2").style.display = "none";
        document.getElementById("poly2").classList = "selTok2 flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";
        if (document.getElementById("ftok").textContent == "Polygon") {
            deAcv();
            document.getElementById("ftok").textContent = "BNB";
            document.getElementById("icbnb").style.display = "block";
            document.getElementById("icbnb").classList = "acvTok";
        }
    } else if (arg == "bnb") {
        deAcv2();
        document.getElementById("ftok2").textContent = "BNB";
        document.getElementById("icbnb2").style.display = "block";
        document.getElementById("icbnb2").classList = "acvTok2";
        tokList2.style.display = "none";
        AcSelTok2();
        document.getElementById("bnb2").style.display = "none";
        document.getElementById("bnb2").classList = "selTok2 flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";
        if (document.getElementById("ftok").textContent == "BNB") {
            deAcv();
            document.getElementById("ftok").textContent = "USDC";
            document.getElementById("icus").style.display = "block";
            document.getElementById("icus").classList = "acvTok";
        }
    } else if (arg == "usdc") {
        deAcv2();
        document.getElementById("ftok2").textContent = "USDC";
        document.getElementById("icus2").style.display = "block";
        document.getElementById("icus2").classList = "acvTok2";
        tokList2.style.display = "none";
        AcSelTok2();
        document.getElementById("usdc2").style.display = "none";
        document.getElementById("usdc2").classList = "selTok2 flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900";
        if (document.getElementById("ftok").textContent == "USDC") {
            deAcv();
            document.getElementById("ftok").textContent = "ETH";
            document.getElementById("iceth").style.display = "block";
            document.getElementById("iceth").classList = "acvTok";
        }
    }
}





/* Get Price of token section code */

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}


var resp;
var resp2;
var resp3;
var time1;
var time2;
var performance = window.performance, round = Math.round;
var timeNow;
timeNow = performance.now();
time1 = round(timeNow / 1000);
function TokToUsd() {
    var usTokvar = document.getElementById("varTokSe").value;
    var usTok = document.getElementById("ftok").textContent;
    var usTok2 = document.getElementById("ftok2").textContent;
    var timetest = performance.now();
    time2 = round(timetest / 1000);
    var ekhtime = time2 - time1
    if (ekhtime > 30) {
        chti = 0;
        console.log("send shode");
        timeNow = performance.now();
        time1 = round(timeNow / 1000);
    }
    if (chti == 0) {
        chti = 1;
        var url = "../price/" + usTok + "/";
        var url2 = "../price/" + usTok + "/" + usTok2 + "/";
        var url3 = "../price/" + usTok2 + "/";
        resp = httpGet(url);
        resp2 = httpGet(url2);
        resp3 = httpGet(url3);
    }
    var data = JSON.parse(resp);
    var data2 = JSON.parse(resp2);
    var data3 = JSON.parse(resp3);
    var usd = data['price'] * usTokvar
    var usd2 = data2['price'] * usTokvar
    var usd3 = data3['price'] * usd2;
    var minr = (usd2 * 99.5) / 100
    document.getElementById("rate").textContent = (Math.round(data['price'] * 100) / 100).toFixed(2);;
    document.getElementById("usdf").textContent = "= $" + (Math.round(usd * 100) / 100).toFixed(2);
    document.getElementById("usdf2").textContent = "= $" + (Math.round(usd3 * 100) / 100).toFixed(2);
    document.getElementById("varTokSe2").value = (Math.round(usd2 * 100) / 100).toFixed(2);
    document.getElementById("minr").textContent = (Math.round(minr * 100) / 100).toFixed(2);
}


var resp4;
var resp5;
var resp6;
var time3;
var time4;
var timeNow2;
timeNow2 = performance.now();
time3 = round(timeNow / 1000);

function TokToUsd2() {
    var usTokvar = document.getElementById("varTokSe2").value;
    var usTok = document.getElementById("ftok2").textContent;
    var usTok2 = document.getElementById("ftok").textContent;
    var timetest2 = performance.now();
    time4 = round(timetest2 / 1000);
    var ekhtime2 = time4 - time3
    if (ekhtime2 > 30) {
        chti2 = 0;
        console.log("send shode");
        timeNow2 = performance.now();
        time3 = round(timeNow2 / 1000);
    }
    if (chti2 == 0) {
        chti2 = 1;
        var url = "../price/" + usTok + "/";
        var url2 = "../price/" + usTok + "/" + usTok2 + "/";
        var url3 = "../price/" + usTok2 + "/";
        resp4 = httpGet(url);
        resp5 = httpGet(url2);
        resp6 = httpGet(url3);
    }
    var data = JSON.parse(resp4);
    var data2 = JSON.parse(resp5);
    var data3 = JSON.parse(resp6);
    var usd = data['price'] * usTokvar
    var usd2 = data2['price'] * usTokvar
    var usd3 = data3['price'] * usd2;
    var minr = (usTokvar * 99.5) / 100
    document.getElementById("rate").textContent = (Math.round(data3['price'] * 100) / 100).toFixed(2);;
    document.getElementById("usdf2").textContent = "= $" + (Math.round(usd * 100) / 100).toFixed(2);
    document.getElementById("usdf").textContent = "= $" + (Math.round(usd3 * 100) / 100).toFixed(2);
    document.getElementById("varTokSe").value = (Math.round(usd2 * 100) / 100).toFixed(2);
    document.getElementById("minr").textContent = (Math.round(minr * 100) / 100).toFixed(2);
}


function al() {
    alert("mmd");
}

/* Listner code */
document.getElementById("conbut").onclick = login;
document.getElementById("swap").onclick = swapsend;
document.getElementById("selcthe").onclick = chaTheme;
document.getElementById("varTokSe").onkeyup = TokToUsd;
document.getElementById("varTokSe2").onkeyup = TokToUsd2;
startpage();
checkCookie();




