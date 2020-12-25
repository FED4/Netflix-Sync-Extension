var active_tabs = [];
let active_tab_id = 0;
var roomId;
chrome.tabs.onActivated.addListener(tab =>{
  chrome.tabs.get(tab.tabId, current_tab_info =>{
    active_tabs.push(tab.tabId);
    active_tab_id = tab.tabId;
    console.log(current_tab_info.url);
    if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
      chrome.tabs.insertCSS(null, {file: 'mystyles.css'})
      chrome.tabs.executeScript(null, {file: 'foreground.js'}, () => console.log("injected"))
    }
    if (/^https:\/\/www\.netflix/.test(current_tab_info.url)) {
      chrome.tabs.insertCSS(null, {file: 'mystyles.css'})
      chrome.tabs.executeScript(null, {file: 'netflix_foreground.js'}, () => console.log("injected"))
    }
  })
});

chrome.tabs.onCreated.addListener(tab =>{
  chrome.tabs.get(tab.tabId, current_tab_info =>{
    active_tabs.push(tab.tabId);
    active_tab_id = tab.tabId;
    console.log(current_tab_info.url);
    if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
      chrome.tabs.insertCSS(null, {file: 'mystyles.css'})
      chrome.tabs.executeScript(null, {file: 'foreground.js'}, () => console.log("injected"))
    }
    if (/^https:\/\/www\.netflix/.test(current_tab_info.url)) {
      chrome.tabs.insertCSS(null, {file: 'mystyles.css'})
      chrome.tabs.executeScript(null, {file: 'netflix_foreground.js'}, () => console.log("injected"))
    }
  })
});

//socket = io.connect('http://127.0.0.1:8080', {transports: ['websocket','polling']});
socket = io.connect('http://ec2-18-135-16-247.eu-west-2.compute.amazonaws.com:5000');
//socket = io.connect('http://localhost:5000');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.message === 'check'){
    chrome.tabs.sendMessage(active_tab_id, {message: 'got it'});
    chrome.storage.local.get("password", value =>{
      console.log(value);
    });
    socket.emit('message',{
      message:'check',
    });
  }

  if(request.message === 'join'){
    var value = request.roomId;
    console.log("atempt to join:"+value);
    socket.emit('join',{
      roomId:value
    });
  }

  if(request.message === 'nfplays'){
    chrome.tabs.sendMessage(active_tab_id, {message: 'sent to server: nfplay'});
    socket.emit('message',{
      message:'nfplay',
    });
  }

  if(request.message === 'nfpauses'){
    chrome.tabs.sendMessage(active_tab_id, {message: 'sent to server: nfpause'});
    socket.emit('message',{
      message:'nfpause',
    });
  }

  if(request.message === 'popup'){
    console.log("popup");
    sendResponse({message: roomId});
  }

})



socket.on('connect', async() => {
  socket.send({message:'User has connected'});
  roomId = socket.id;
  console.log("connected");
});

socket.on('message', function(msg) {
  console.log(msg.message);
  chrome.tabs.query({}, function(tabs) {
    for (var i=0; i<active_tabs.length; ++i) {
      if(msg.message === "check"){
        chrome.tabs.sendMessage(active_tabs[i], {message: 'click it'});
      }

      if(msg.message === "nfplay" || msg.message === "nfpause"){
        chrome.tabs.sendMessage(active_tabs[i], {message: msg.message});
      }
    }
});


});

// $.getScript('http://cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min.js', function(){
  // socket = io.connect('http://localhost:4000');
  // socket.on('connect', function(){
  //   socket.on('message', function(data){
  //     console.log("on data");
  //   });
  // });
// });
