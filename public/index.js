var userName = localStorage.getItem('userName')?localStorage.getItem('userName'):prompt('Enter Username');
if(!userName) location.reload();
localStorage.setItem('userName',userName)
var params = {query: `userName=${userName}`}
var socket = io('http://localhost:8080',params);

socket.on('onlineUsersList',users =>{
    let membersOnline = document.querySelector('#members-online');
    membersOnline.innerHTML = users.reduce((html,curUser)=>html+=renderOnlineUser({name:curUser}),'');
    
})

function renderOnlineUser(user){
    return `<li class="p-2 border-bottom" style="background-color: #eee;">
    <a href="#!" class="d-flex justify-content-between">
      <div class="d-flex flex-row">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp" alt="avatar"
          class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60">
        <div class="pt-1">
          <p class="fw-bold mb-0">${user.name}</p>
          <p class="small text-muted">Hello, Are you there?</p>
        </div>
      </div>
      <div class="pt-1">
        <p class="small text-muted mb-1">Just now</p>
        <span class="badge bg-danger float-end">1</span>
      </div>
    </a>
  </li>`
}