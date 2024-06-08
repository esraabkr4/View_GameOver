
var welcomeMsg = document.getElementById('welcomeMsg');
var logoutBTN = document.getElementById('logout');
var userInfo = [];
// move localStorage content to userInfo array if exist
if (Boolean(localStorage.getItem('userInfoArr')) == false) {
    userInfo = [];
} else {
    userInfo = JSON.parse(localStorage.getItem('userInfoArr'));
    for (var i = 0; i < userInfo.length; i++) {
        if (userInfo[i].isCurrent) {
            welcomeMsg.innerHTML = "welcome " + userInfo[i].name;
            break;
        }
    }
}
logoutBTN.addEventListener('click', function () {
    userInfo.forEach(function (item, index) {
        userInfo[index].isCurrent = false;
    });
    window.location.href = "index.html";
})