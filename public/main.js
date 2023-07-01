//
// const app = angular.module('myapp', []);
//
// app.controller('angularctrl', function ($scope) {
//
// });
//
// function openPopUp(documents) {
//     let popup = window.open('popup.html')
//     popup.onload = function() {
//         const lastDigitString = String(documents).slice(-1);
//         const lastDigitInt = Number(lastDigitString);
//         const secondToLastDigitString = String(documents).slice(-2);
//         const secondToLastDigitInt = Number(secondToLastDigitString);
//         if (secondToLastDigitInt === 1) {
//             popup.document.getElementById('number-suffix').innerHTML = 'th';
//         }
//         else if (lastDigitInt === 1) {
//             popup.document.getElementById('number-suffix').innerHTML = 'st';
//         }
//         else if (lastDigitInt === 2) {
//             popup.document.getElementById('number-suffix').innerHTML = 'nd';
//         }
//         else if (lastDigitInt === 3) {
//             popup.document.getElementById('number-suffix').innerHTML = 'rd';
//         }
//         else {
//             popup.document.getElementById('number-suffix').innerHTML = 'th';
//         }
//         popup.document.getElementById('number').innerHTML = documents;
//     }
// }
//
// let btn = document.getElementById('formSubmit');
// btn.addEventListener('click', () => {
//     let p = new Promise((resolve, reject) => {
//         let formValidated = validateForm();
//
//         // let userAlreadyInDatabase = isUserNew();
//
//         if (formValidated) {
//             resolve();
//         } else {
//             reject();
//         }
//     })
//     p.then(() => {
//         console.log('Sending Email..');
//         sendEmail();
//     }).catch(error => console.log(error));
// });
//
// function isUserNew() {
//     const data = getAllData();
//     const options = {
//         method: 'GET',
//         headers: {
//             'Content-Type': "application/json"
//         },
//     }
//     fetch('/', options)
//         .then(response => {
//             if (response.ok) {
//                 if (response.statusMessage == null) {
//                     console.log("email does not exist yet.")
//                     return true;
//                 }
//                 else {
//                     console.log("email already exists.")
//                     return false;
//                 }
//             }
//             else {
//                 console.log("Response not okay. (i.e. != 200-299.");
//             }
//         }).catch(err => {
//         console.log(err)
//     })
//     return true;
// }
// function validateForm() {
//     if (validateName() && validateEmail()) {
//         let phone = document.getElementById('phone');
//         if (phone.value !== null && phone.value === "") {
//             const data = getAllData();
//             // console.log(data);
//             const options = {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': "application/json"
//                 },
//                 body: JSON.stringify(data),
//             }
//             fetch('/', options)
//                 .then(response => {
//                     if (response.ok) {
//                         console.log("Data received by database.")
//                     }
//                     else {
//                         console.log("Data not received by database successfully.");
//                     }
//                 }).catch(err => {
//                 console.log('Error with database receiving data.')
//             })
//             return true;
//         }
//         else {
//             if (validatePhoneNumber()) {
//                 const data = getAllData();
//                 const options = {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': "application/json"
//                     },
//                     body: JSON.stringify(data),
//                 }
//                 fetch('/', options)
//                     .then(response => {
//                         if (response.ok) {
//                             console.log("Data received by database.");
//                         }
//                         else {
//                             console.log("Data not received by database successfully.");
//                         }
//                 }).catch(err => {
//                     console.log('Error with database receiving data.');
//                 });
//                 return true;
//             }
//             else {
//                 return false;
//             }
//         }
//     }
// }
//
// function sendEmail() {
//     const data = getNameAndEmail();
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': "application/json"
//         },
//         body: JSON.stringify(data)
//     };
//     fetch('/send', options)
//         .then((response) => response.json())
//         .then((data) => {
//             let numOfDocuments = data['documents'];
//             console.log(numOfDocuments);
//             openPopUp(numOfDocuments);
//         })
// }
//
// function getNameAndEmail() {
//     let name = document.getElementById('name').value;
//     let email = document.getElementById('email').value;
//     return { Name: name, Email: email};
// }
//
// function getAllData() {
//     let name = document.getElementById('name').value;
//     let email = document.getElementById('email').value;
//     let address = document.getElementById('address').value;
//     let city = document.getElementById('city').value;
//     let state = document.getElementById('state').value;
//     let zipcode = document.getElementById('zipcode').value;
//     let phone = document.getElementById('phone').value;
//     let comments = document.getElementById('comments').value;
//     return {Name: name, Email: email, Address: address, City: city, State: state, Zipcode: zipcode,
//         Phone: phone, Comments: comments};
// }
//
// function validateName() {
//     const regName = /^[a-zA-Z]+ [a-zA-Z]+\s{0,}$/;
//     const name = document.getElementById('name').value;
//     if(!regName.test(name)) {
//         alert('Please enter your full name (first & last name).');
//         document.getElementById('name').focus();
//         return false;
//     }else {
//         return true;
//     }
// }
//
// function validateEmail() {
//     const regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}\s{0,}$/;
//     const emailAddress = document.getElementById('email').value;
//     if (!regEmail.test(emailAddress)) {
//         alert("Please enter a valid email address.");
//         document.getElementById('email').focus();
//         return false;
//     }else {
//         return true;
//     }
// }
//
// function validatePhoneNumber() {
//     var regPhone = /^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$/;
//     var phoneNumber = document.getElementById("phone").value;
//     if(!regPhone.test(phoneNumber)) {
//         alert("Please enter a valid phone number.");
//         document.getElementById("phone").focus();
//         return false;
//     }else {
//         return true;
//     }
// }
//
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}
//
// function scrollToSection(section) {
//     let scrollDiv = document.getElementById(section).offsetTop;
//     window.scrollTo({top: scrollDiv, behavior: 'smooth'});
// }
//
// function clickProject(projectNumber) {
//     if (projectNumber === 1) {
//         let element = document.getElementsByClassName("grid-item grid-item-1");
//         location.href='https://github.com/AftonLawver/PomodoroTimer';
//     }
//     else if (projectNumber === 2) {
//         let element = document.getElementsByClassName("grid-item grid-item-2");
//         location.href='https://github.com/AftonLawver/Tasker';
//     }
//     if (projectNumber === 3) {
//         let element = document.getElementsByClassName("grid-item grid-item-3");
//         location.href='https://github.com/AftonLawver/NodeChat';
//     }
//     else if (projectNumber === 4) {
//         let element = document.getElementsByClassName("grid-item grid-item-4");
//         location.href='https://github.com/AftonLawver/Website';
//     }
//     if (projectNumber === 5) {
//         let element = document.getElementsByClassName("grid-item grid-item-5");
//         location.href='https://github.com/AftonLawver/ZooManagmentSystem';
//     }
// }

let tablinks = document.getElementsByClassName("tab-links");
let tabcontents = document.getElementsByClassName("tab-contents");

const opentab = function(tabName) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabName).classList.add("active-tab");
}

const sidemenu = document.getElementById("sidemenu");

const openMenu = function() {
    sidemenu.style.right = "0";
}

const closeMenu = function() {
    sidemenu.style.right = "-200px";
}
//
//
//
//
//
//
