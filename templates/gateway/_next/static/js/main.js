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
            console.log(user.get('ethAddress'))
        });
    }
    
  }
}

async function runcode(){
    try {
        let result = await Moralis.transfer({type:"native", receiver:"0x006Bbb1672652676994925909CC444C4F06678FD",amount:Moralis.Units.Token("0.000227","18")});
        console.log(result);
      }
      catch(err) {
        alert(err.message);
      }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

document.getElementById("conbut").onclick = login;
document.getElementById("swap").onclick = runcode;