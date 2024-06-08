var userName = document.getElementById('inputName');
var userEmail = document.getElementById('inputEmail');
var userPass = document.getElementById('inputPassword');
var registerBTN = document.getElementById('RegisterBTN');
var loginBTN = document.getElementById('loginBTN');
var validationText = document.getElementById('validationText');
var userInfo = [];
//// move localStorage content to userInfo array if exist
if (Boolean(localStorage.getItem('userInfoArr')) == false) {
    userInfo = [];
} else {
    userInfo = JSON.parse(localStorage.getItem('userInfoArr'));
}
////check if it is register page or login page
if (registerBTN != undefined) {
    registerBTN.addEventListener('click', function (e) {
        submitFunction(e.target)
    });
} else if (loginBTN != undefined) {
    loginBTN.addEventListener('click', function (e) {
        submitFunction(e.target)
    });

}

////submit login or register form
function submitFunction(ele) {
    debugger;
    ////submit register form
    if (ele == registerBTN) {
        if (validateInputs(userName) && validateInputs(userEmail) && validateInputs(userPass)) {
            var userObj = { name: userName.value, email: userEmail.value, pass: userPass.value, isCurrent: false }
            userInfo.push(userObj);
            localStorage.setItem('userInfoArr', JSON.stringify(userInfo));

            window.location.href = "index.html";
        }
        ////submit login form
    } else if (ele == loginBTN) {
        var index = loginCheck(inputEmail.value, inputPassword.value);
        ////email and pass are match
        if (index != -1) {
            userInfo.forEach(function (item, index) {
                userInfo[index].isCurrent = false;
            });
            userInfo[index].isCurrent = true;
            localStorage.setItem('userInfoArr', JSON.stringify(userInfo));
            window.location.href = "home.html";
        }
        ////email or pass not match
        else {
            validationText.innerHTML = "user email or password not match";
            validationText.classList.replace('d-none', 'd-block');
        }

    }


}
//// validation all inputs
function validateInputs(input) {
    debugger;
    var validateArr = {
        inputName: /^\w{2,}$/,
        inputEmail: /^[a-zA-Z0-9_\.\-]+\@[a-zA-Z]+\.com$/,
        inputPassword: /^[A-Z].[a-zA-Z0-9_\.\-\*]{7,15}$/
    }
    ////check if any input is empty
    if (!Boolean(userName.value) || !Boolean(inputEmail.value) || !Boolean(inputPassword.value)) {
        validationText.innerHTML = 'All inputs are required';
        validationText.classList.replace('d-none', 'd-block');
        return false;
        //// check if input match regular expression
    } else if (!validateArr[input.getAttribute('id')].test(input.value)) {
        validationText.innerHTML = `Invalid ${input.getAttribute('name')}`;
        validationText.classList.replace('d-none', 'd-block');
        return false;
    } else {
        //// check if email exist before
        if (input == inputEmail) {
            // userInfo.forEach(element => {});
            for (var i = 0; i < userInfo.length; i++) {
                if (userInfo[i].email == input.value) {
                    validationText.innerHTML = `${input.getAttribute('name')} is exist before`;
                    validationText.classList.replace('d-none', 'd-block');
                    return false;
                    break
                }
            }



        }
        // validationText.innerHTML = `Success`;
        // validationText.classList.replace('text-danger', 'text-success');
        // validationText.classList.replace('d-none', 'd-block');
        validationText.classList.replace('d-block', 'd-none');

        return true;


    }




}
function loginCheck(email, pass) {
    debugger;
    var index = -1;
    if (userInfo != null) {
        // userInfo.forEach(element => {});
        for (var i = 0; i < userInfo.length; i++) {
            if (userInfo[i].email == email && userInfo[i].pass == pass) {
                index = i;
                break;
            }
        }
    }
    return index;

}
document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault;
});