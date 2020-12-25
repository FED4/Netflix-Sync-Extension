console.log("from foreground");

const first = document.createElement('button');
first.innerText = "SET DATA";
first.id = "first";
document.querySelector('body').appendChild(first);

first.addEventListener('click', () => {
  chrome.storage.local.set({"password":"123456"})
  console.log("I set data");
  chrome.runtime.sendMessage({message:'check'});
  console.log("I sent msg");
});


chrome.runtime.onMessage.addListener((request,sender, sendResponse) => {
  console.log(request.message);
  if(request.message === 'click it'){
    document.getElementsByName("btnI")[0].click();
  }
});
