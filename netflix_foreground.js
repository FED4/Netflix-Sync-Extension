console.log("from foreground");

var nfplayer = document.getElementsByClassName("button-nfplayerPlay")[0];
var nfplayerPlay;
var nfplayerPause;
//center-controls
//<button class="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay" tabindex="0" role="button" aria-label="再生"><svg class="svg-icon svg-icon-nfplayerPlay" focusable="false"><use filter="" xlink:href="#nfplayerPlay"></use></svg></button>
// if(document.getElementsByClassName("button-nfplayerPlay")){
//    nfplayerPlay = document.getElementsByClassName("button-nfplayerPlay")[0];
// }
//<button class="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPause" tabindex="0" role="button" aria-label="一時停止"><svg class="svg-icon svg-icon-nfplayerPause" focusable="false"><use filter="" xlink:href="#nfplayerPause"></use></svg></button>
// if(document.getElementsByClassName("button-nfplayerPause")){
//   nfplayerPause = document.getElementsByClassName("button-nfplayerPause")[0];
// }

if(document.getElementsByClassName("center-controls")[0]){
  document.getElementsByClassName("center-controls")[0].addEventListener('click', () => {
    nfplayerPlay = document.getElementsByClassName("button-nfplayerPlay")[0];
    nfplayerPause = document.getElementsByClassName("button-nfplayerPause")[0];
    if(nfplayerPlay){
      chrome.runtime.sendMessage({message:'nfplay'});
      console.log("I sent msg: play");
    }
    if(nfplayerPause){
      chrome.runtime.sendMessage({message:'nfpause'});
      console.log("I sent msg: pause");
    }

  });
}

// if(nfplayerPlay){
//   nfplayerPlay.addEventListener('click', () => {
//     chrome.runtime.sendMessage({message:'nfplay'});
//     console.log("I sent msg: play");
//   });
// }
//
// if(nfplayerPause){
//   nfplayerPause.addEventListener('click', () => {
//     chrome.runtime.sendMessage({message:'nfpause'});
//     console.log("I sent msg: pause");
//   });
// }


chrome.runtime.onMessage.addListener((request,sender, sendResponse) => {
  console.log(request.message);
  nfplayerPlay = document.getElementsByClassName("button-nfplayerPlay")[0];
  nfplayerPause = document.getElementsByClassName("button-nfplayerPause")[0];
  if(request.message === 'nfplay' && nfplayerPause && document.getElementsByClassName("button-nfplayerPause")[0]){
    nfplayerPause.click();
  }
  if(request.message === 'nfpause' && nfplayerPlay && document.getElementsByClassName("button-nfplayerPlay")[0]){
    nfplayerPlay.click();
  }
});
