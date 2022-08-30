
/* Vars code */
var ThBody = document.getElementById("mainhtml");
var tokList = document.getElementById("tokList");
var tokList2 = document.getElementById("tokList2");
var ftok = document.getElementById("ftok");
var ttok = document.getElementById("ttok");

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


/* Payment code */
async function runcode() {
    try {
        web3 = await Moralis.enableWeb3();
        let result = await Moralis.transfer({ type: "native", receiver: "0x006Bbb1672652676994925909CC444C4F06678FD", amount: Moralis.Units.Token("0.000227", "18") });
        console.log(result);
    }
    catch (err) {
        if (err.code == 4001) {
            alert("Transfer cancel by user");
        }
    }
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



/* Listner code */
document.getElementById("conbut").onclick = login;
document.getElementById("swap").onclick = swapsend;
document.getElementById("selcthe").onclick = chaTheme;
startpage();
checkCookie();


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







//const chainId = 137 // Polygon Mainnet

//if (window.ethereum.networkVersion !== chainId) {
//    try {
//        await window.ethereum.request({
//            method: 'wallet_switchEthereumChain',
//            params: [{ chainId: "0x89" }]
//        });
//    } catch (err) {
//        // This error code indicates that the chain has not been added to MetaMask
//        if (err.code === 4902) {
//            await window.ethereum.request({
//                method: 'wallet_addEthereumChain',
//                params: [
//                    {
//                        chainName: 'Polygon Mainnet',
//                        chainId: "0x89",
//                        nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
//                        rpcUrls: ['https://polygon-rpc.com/']
//                    }
//                ]
//            });
//        }
//    }
//}