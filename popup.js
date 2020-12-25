var roomId = document.createElement('li');

chrome.runtime.sendMessage({message:'popup'},function(response){
  console.log(response.message);
  document.getElementById("placeholder").remove();
  roomId.innerText = response.message;
  roomId.id = "roomIdo";
  document.getElementById("myRoomId").appendChild(roomId);
});

document.getElementById("sendRoomId").addEventListener('click', ()=>{
  var value = document.getElementById("roomId").value;
  roomId.innerText = "Joined:"+value;
  chrome.runtime.sendMessage({message:'join', roomId:value});
});
