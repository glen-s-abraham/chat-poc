var userName = prompt('Enter Username');
if(!userName) location.reload();
var params = {query: `userName=${userName}`}
var socket = io('http://localhost:8080',params);