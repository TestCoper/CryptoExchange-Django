



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
        } else {
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



/* Http Get req code */
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
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








/* Encode code */
async function encode_ascii85(a) {
    var b, c, d, e, f, g, h, i, j, k;
    for (!/[^\x00-\xFF]/.test(a), b = "\x00\x00\x00\x00".slice(a.length % 4 || 4), a += b,
        c = [], d = 0, e = a.length; e > d; d += 4) f = (a.charCodeAt(d) << 24) + (a.charCodeAt(d + 1) << 16) + (a.charCodeAt(d + 2) << 8) + a.charCodeAt(d + 3),
            0 !== f ? (k = f % 85, f = (f - k) / 85, j = f % 85, f = (f - j) / 85, i = f % 85,
                f = (f - i) / 85, h = f % 85, f = (f - h) / 85, g = f % 85, c.push(g + 33, h + 33, i + 33, j + 33, k + 33)) : c.push(122);
    return function (a, b) {
        for (var c = b; c > 0; c--) a.pop();
    }(c, b.length), "<~" + String.fromCharCode.apply(String, c) + "~>";
}

async function decode_ascii85(a) {
    var c, d, e, f, g, h = String, l = "length", w = 255, x = "charCodeAt", y = "slice", z = "replace";
    for ("<~" === a[y](0, 2) && "~>" === a[y](-2), a = a[y](2, -2)[z](/\s/g, "")[z]("z", "!!!!!"),
        c = "uuuuu"[y](a[l] % 5 || 5), a += c, e = [], f = 0, g = a[l]; g > f; f += 5) d = 52200625 * (a[x](f) - 33) + 614125 * (a[x](f + 1) - 33) + 7225 * (a[x](f + 2) - 33) + 85 * (a[x](f + 3) - 33) + (a[x](f + 4) - 33),
            e.push(w & d >> 24, w & d >> 16, w & d >> 8, w & d);
    return function (a, b) {
        for (var c = b; c > 0; c--) a.pop();
    }(e, c[l]), h.fromCharCode.apply(h, e);
}

var myString = 'This is a test!';
var encoded = encode_ascii85(myString);
var decoded = decode_ascii85(encoded);

/* base64Encode code */
var string = 'Hello World!';
var encodedString = btoa(string);
console.log(encodedString);


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

console.log(makeid(5));



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