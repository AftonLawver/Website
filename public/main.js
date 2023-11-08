function openPopUp(documents) {
    let popup = window.open('popup.html')

    if (popup) {
        popup.onload = function() {
            const lastDigitString = String(documents).slice(-1);
            const lastDigitInt = Number(lastDigitString);
            const secondToLastDigitString = String(documents).slice(-2);
            const secondToLastDigitInt = Number(secondToLastDigitString);
            if (secondToLastDigitInt === 1) {
                popup.document.getElementById('number-suffix').innerHTML = 'th';
            }
            else if (lastDigitInt === 1) {
                popup.document.getElementById('number-suffix').innerHTML = 'st';
            }
            else if (lastDigitInt === 2) {
                popup.document.getElementById('number-suffix').innerHTML = 'nd';
            }
            else if (lastDigitInt === 3) {
                popup.document.getElementById('number-suffix').innerHTML = 'rd';
            }
            else {
                popup.document.getElementById('number-suffix').innerHTML = 'th';
            }
            popup.document.getElementById('number').innerHTML = documents;
        };
    } else {
        // Handle error when the popup could not be opened
        console.error('Failed to open popup window');
    }
}

let submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    let p = new Promise((resolve, reject) => {
        let formValidated = validateForm();

        // let userAlreadyInDatabase = isUserNew();

        if (formValidated) {
            resolve();
        } else {
            reject();
        }
    })
    p.then(() => {
        console.log('Sending Email..');
        sendEmail();
    }).catch(error => console.log(error));
});

function validateForm() {
    if (validateName() && validateEmail()) {
            const data = getAllData();
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(data),
            }
            fetch('/', options)
                .then(response => {
                    if (response.ok) {
                        console.log("Data received by database.")
                    }
                    else {
                        console.log("Data not received by database successfully.");
                    }
                }).catch(err => {
                console.log('Error with database receiving data.')
            })
            return true;
    }
    return false;
}

function sendEmail() {
    const data = getNameAndEmail();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch('/send', options)
        .then((response) => response.json())
        .then((data) => {
            let numOfDocuments = data['documents'];
            console.log(numOfDocuments);
            openPopUp(numOfDocuments);
        })
}

function getNameAndEmail() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    return { Name: name, Email: email};
}

function getAllData() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    return {Name: name, Email: email, Message: message};
}

function validateName() {
    const regName = /^[a-zA-Z]+ [a-zA-Z]+\s{0,}$/;
    const name = document.getElementById('name').value;
    if(!regName.test(name)) {
        alert('Please enter your full name (first & last name).');
        document.getElementById('name').focus();
        return false;
    }else {
        return true;
    }
}

function validateEmail() {
    const regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}\s{0,}$/;
    const emailAddress = document.getElementById('email').value;
    if (!regEmail.test(emailAddress)) {
        alert("Please enter a valid email address.");
        document.getElementById('email').focus();
        return false;
    }else {
        return true;
    }
}

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

let tablinks = document.getElementsByClassName("tab-links");
let tabcontents = document.getElementsByClassName("tab-contents");

const opentab = function(tabName) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
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

let projects = document.querySelectorAll(".unseen");
let seeMoreButton = document.getElementById("seeMoreButton");

const seeMoreProjects = function() {
    if (seeMoreButton.textContent === "See Less") {
        for (i = 0; i < projects.length; i++) {
            projects[i].style.display = "none";
        }
        seeMoreButton.textContent = "See More"
    }
    else {
        for (i = 0; i < projects.length; i++) {
            projects[i].style.display = "block";
        }
        seeMoreButton.textContent = "See Less"
    }
}

const scrollToBottomOfPage = function() {
    window.scrollTo(0, document.body.scrollHeight);
}
