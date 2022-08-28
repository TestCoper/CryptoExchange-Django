
/* Vars code */
var ThBody = document.getElementById("mainhtml");
var tokList = document.getElementById("tokList");

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
        alert(user);
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

/* Listner code */
document.getElementById("conbut").onclick = login;
document.getElementById("swap").onclick = runcode;
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


function selpage() {
    tokList.style.display = "block";
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