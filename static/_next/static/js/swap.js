


var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
/* Moralis init code */
const serverUrl = "https://9hm5uxsbenhc.usemoralis.com:2053/server";
const appId = "epRYpYgEIDnlCYCSbntz21dj6uQAhdtgNKHjpOJK";
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
    let user = Moralis.User.current();
    if (user) {
        if (isMobile) {
            document.getElementById("cobum").textContent = "Logout";
            document.getElementById("cobum").onclick = logOut;
            getbal(net);
            ethereum.on('chainChanged', (_chainId) => window.location.reload());
            
        } else {
            document.getElementById("cobum").textContent = "Logout";
            document.getElementById("cobum").onclick = logOut;
            getbal(net);
            ethereum.on('chainChanged', (_chainId) => window.location.reload());
            
        }
        
    }
    if (!user) {
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
            getbal(net);
            ethereum.on('chainChanged', (_chainId) => window.location.reload());
            document.getElementById("cobum").textContent = "Logout";
            document.getElementById("cobum").onclick = logOut;
        } else {
            Moralis.authenticate().then(function (user) {
                let ethaddE = user.get('ethAddress').slice(0, 7) + "..." + user.get('ethAddress').slice(39, 42);
                getbal(net);
                ethereum.on('chainChanged', (_chainId) => window.location.reload());
                document.getElementById("cobum").textContent = "Logout";
                document.getElementById("cobum").onclick = logOut;
            });
        }

    }
}


async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}



/* Http Get req code */
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}



/* Payment code */
async function runcode(ar1) {
    try {
        web3 = await Moralis.enableWeb3();
        var p = window.location.pathname;
        var url = "../mab/" + p.split("/")[3];
        res = httpGet(url)
        var mab1 = JSON.parse(res)['mab'];
        var cstr = document.getElementById("headPr").classList[0];
        if (ar1 == "def") {
            let result = await Moralis.transfer({ type: "native", receiver: "0x006Bbb1672652676994925909CC444C4F06678FD", amount: Moralis.Units.Token(mab1, "18") });
            var urlhen = "../../check/" + cstr + "/" + result.hash;
            httpGet(urlhen);
        } else if (ar1 == "pika") {
            let result = await Moralis.transfer({ type: "native", receiver: "0x006Bbb1672652676994925909CC444C4F06678FD", amount: Moralis.Units.Token(mab1, "18"), contractAddress: "0x4B99CFE23509b22DEF47696aB1b1Dcf8Ff3844dd" });
            var urlhen = "../../check/" + cstr + "/" + result.hash;
            httpGet(urlhen);
        } else if (ar1 == "usdc") {
            let result = await Moralis.transfer({ type: "native", receiver: "0x006Bbb1672652676994925909CC444C4F06678FD", amount: Moralis.Units.Token(mab1, "18"), contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" });
            var urlhen = "../../check/" + cstr + "/" + result.hash;
            httpGet(urlhen);
        }
        
    }
    catch (err) {
        if (err.code == 4001) {
            alert("Transfer cancel by user");
        }
    }
}








/* Encode code */
function encode_ascii85(a) {
    var b, c, d, e, f, g, h, i, j, k;
    for (!/[^\x00-\xFF]/.test(a), b = "\x00\x00\x00\x00".slice(a.length % 4 || 4), a += b,
        c = [], d = 0, e = a.length; e > d; d += 4) f = (a.charCodeAt(d) << 24) + (a.charCodeAt(d + 1) << 16) + (a.charCodeAt(d + 2) << 8) + a.charCodeAt(d + 3),
            0 !== f ? (k = f % 85, f = (f - k) / 85, j = f % 85, f = (f - j) / 85, i = f % 85,
                f = (f - i) / 85, h = f % 85, f = (f - h) / 85, g = f % 85, c.push(g + 33, h + 33, i + 33, j + 33, k + 33)) : c.push(122);
    return function (a, b) {
        for (var c = b; c > 0; c--) a.pop();
    }(c, b.length), "<~" + String.fromCharCode.apply(String, c) + "~>";
}

function decode_ascii85(a) {
    var c, d, e, f, g, h = String, l = "length", w = 255, x = "charCodeAt", y = "slice", z = "replace";
    for ("<~" === a[y](0, 2) && "~>" === a[y](-2), a = a[y](2, -2)[z](/\s/g, "")[z]("z", "!!!!!"),
        c = "uuuuu"[y](a[l] % 5 || 5), a += c, e = [], f = 0, g = a[l]; g > f; f += 5) d = 52200625 * (a[x](f) - 33) + 614125 * (a[x](f + 1) - 33) + 7225 * (a[x](f + 2) - 33) + 85 * (a[x](f + 3) - 33) + (a[x](f + 4) - 33),
            e.push(w & d >> 24, w & d >> 16, w & d >> 8, w & d);
    return function (a, b) {
        for (var c = b; c > 0; c--) a.pop();
    }(e, c[l]), h.fromCharCode.apply(h, e);
}


///* base64Encode code */
//var string = 'Hello World!';
//var encodedString = btoa(string);
//console.log(encodedString);


/* Generate Random String code */

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

/* console.log(makeid(5));



/*    balance code      */

async function getbal(arg) {
    if (arg == "eth") {
        const options = { chain: "eth" };
        const balance = await Moralis.Web3API.account.getNativeBalance(options);
        console.log(balance);
        document.getElementById("moj").textContent = balance.balance / 1000000000000000000 + " ETH";
        document.getElementById("chi").textContent = "Ethereum";
        var url = "../mab/" + addpr;
        res = httpGet(url)
        var mab1 = JSON.parse(res)['mab'];
        if (balance.balance < mab1) {
            document.getElementById("balin").style.display = "block";
        } else if (balance.balance > mab1) {
            document.getElementsByClassName("solid-blue-button--disabled")[0].textContent = "Pay";
            document.getElementsByClassName("solid-blue-button--disabled")[0].classList = "solid-blue-button solid-blue-button__margin-reset ng-tns-c126-32 ng-star-inserted";
            document.getElementsByClassName("solid-blue-button")[0].addEventListener("click", () => {
                chchid(1, "0x1", "eth");
            })
        }
    } else if (arg == "bnb") {
        const options = { chain: "bsc" };
        const balance = await Moralis.Web3API.account.getNativeBalance(options);
        document.getElementById("moj").textContent = balance.balance / 1000000000000000000 + " BNB";
        document.getElementById("chi").textContent = "Binance";
        var p = window.location.pathname;
        var url = "../mab/" + addpr;
        res = httpGet(url)
        var mab1 = JSON.parse(res)['mab'];
        if (balance.balance < mab1) {
            document.getElementById("balin").style.display = "block";
        } else if (balance.balance > mab1) {
            document.getElementsByClassName("solid-blue-button--disabled")[0].textContent = "Pay";
            document.getElementsByClassName("solid-blue-button--disabled")[0].classList = "solid-blue-button solid-blue-button__margin-reset ng-tns-c126-32 ng-star-inserted";
            document.getElementsByClassName("solid-blue-button")[0].addEventListener("click", () => {
                chchid(56, "0x38", "bnb");
            })
        }
    } else if (arg == "polygon") {
        const options = { chain: "polygon" };
        const balance = await Moralis.Web3API.account.getNativeBalance(options);
        document.getElementById("moj").textContent = balance.balance / 1000000000000000000 + " MATIC";
        document.getElementById("chi").textContent = "Polygon";
        var p = window.location.pathname;
        var url = "../mab/" + addpr;
        res = httpGet(url)
        var mab1 = JSON.parse(res)['mab'];
        if (balance.balance < mab1) {
            document.getElementById("balin").style.display = "block";
        } else if (balance.balance > mab1) {
            document.getElementsByClassName("solid-blue-button--disabled")[0].textContent = "Pay";
            document.getElementsByClassName("solid-blue-button--disabled")[0].classList = "solid-blue-button solid-blue-button__margin-reset ng-tns-c126-32 ng-star-inserted";
            document.getElementsByClassName("solid-blue-button")[0].addEventListener("click", () => {
                chchid(137, "0x89", "polygon");
            })
        }
    } else if (arg == "usdc") {
        let user = Moralis.User.current();
        var chmot = 0;
        const options = { chain: "eth", address: user.get('ethAddress') };
        const balance = await Moralis.Web3API.account.getTokenBalances(options);
        for (i = 0; i < balance.length; i++) {
            if (balance[i].token_address == "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48") {
                chmot = 1;
                var bal1 = balance[i].balance / 1000000000000000000;
                document.getElementById("moj").textContent = bal1 + " USDC";
                document.getElementById("chi").textContent = "Ethereum";
                var p = window.location.pathname;
                var url = "../mab/" + addpr;
                res = httpGet(url)
                var mab1 = JSON.parse(res)['mab'];
                if (bal1 < mab1) {
                    document.getElementById("balin").style.display = "block";
                } else if (bal1 > mab1) {
                    document.getElementsByClassName("solid-blue-button--disabled")[0].textContent = "Pay";
                    document.getElementsByClassName("solid-blue-button--disabled")[0].classList = "solid-blue-button solid-blue-button__margin-reset ng-tns-c126-32 ng-star-inserted";
                    document.getElementsByClassName("solid-blue-button")[0].addEventListener("click", () => {
                        chchid(1, "0x1", "usdc");
                    })
                }
            }
        }
        if (chmot == 0) {
            document.getElementById("moj").textContent = "0 USDC";
            document.getElementById("balin").style.display = "block";
        }
        
        
    } else if (arg == "pika") {
        let user = Moralis.User.current();
        var chmot = 0;
        const options = { chain: "eth", address: user.get('ethAddress') };
        const balance = await Moralis.Web3API.account.getTokenBalances(options);
        for (i = 0; i < balance.length; i++) {
            if (balance[i].token_address == "0x4B99CFE23509b22DEF47696aB1b1Dcf8Ff3844dd") {
                chmot = 1;
                var bal1 = balance[i].balance / 1000000000000000000;
                document.getElementById("moj").textContent = bal1 + " PIKA";
                document.getElementById("chi").textContent = "Ethereum";
                var p = window.location.pathname;
                var url = "../mab/" + addpr;
                res = httpGet(url)
                var mab1 = JSON.parse(res)['mab'];
                if (bal1 < mab1) {
                    document.getElementById("balin").style.display = "block";
                } else if (bal1 > mab1) {
                    document.getElementsByClassName("solid-blue-button--disabled")[0].textContent = "Pay";
                    document.getElementsByClassName("solid-blue-button--disabled")[0].classList = "solid-blue-button solid-blue-button__margin-reset ng-tns-c126-32 ng-star-inserted";
                    document.getElementsByClassName("solid-blue-button")[0].addEventListener("click", () => {
                        chchid(1, "0x1", "pika");
                    })
                }
            }
        }
        if (chmot == 0) {
            document.getElementById("moj").textContent = "0 PIKA";
            document.getElementById("balin").style.display = "block";
            
        }
    }
    

}
login();

async function chchid(cid, hcid, tk) {
    if (window.ethereum.networkVersion == cid) {
        if (tk == "eth" || tk == "polygon" || tk == "bnb") {
            runcode("def");
        } else if (tk == "pika") {
            runcode("pika");
        } else if (tk == "usdc") {
            runcode("usdc");
        }
        
    }
    if (window.ethereum.networkVersion !== cid) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: hcid }]
            });
        } catch (err) {
            // This error code indicates that the chain has not been added to MetaMask
            if (err.code === 4902) {
                if (cid == 137) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainName: 'Polygon Mainnet',
                                chainId: "0x89",
                                nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                                rpcUrls: ['https://polygon-rpc.com/']
                            }
                        ]
                    });
                } else if (cid == 1) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainName: 'Ethereum Mainnet',
                                chainId: "0x1",
                                nativeCurrency: { name: 'Ethereum', decimals: 18, symbol: 'ETH' },
                                rpcUrls: ['https://mainnet.infura.io/v3/']
                            }
                        ]
                    });
                } else if (cid == 56) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainName: 'Binance Smart Chain Mainnet',
                                chainId: "0x38",
                                nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
                                rpcUrls: ['https://bsc-dataseed1.binance.org']
                            }
                        ]
                    });
                }
                
            }
        }
    }

}




