
const app = angular.module('myapp', []);

app.controller('angularctrl', function ($scope) {

});

function openPopUp(documents) {

    let popup = window.open('popup.html')
    popup.onload = function() {
        const lastDigitString = String(documents).slice(-1);
        const lastDigitInt = Number(lastDigitString);
        if (lastDigitInt === 1) {
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
    }
}

let btn = document.getElementById('formSubmit');
btn.addEventListener('click', () => {
    let p = new Promise((resolve, reject) => {
        let result = validateForm();
        if (result) {
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
        let phone = document.getElementById('phone');
        if (phone.value !== null && phone.value === "") {
            const data = getAllData();
            // console.log(data);
            const options = {
                method: 'POST',
                // url: 'http://url.com/resource',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(data),

            }
            fetch('/', options)
                .then(response => {
                    if (response.ok) {
                        console.log("Data received by database.");
                    }
                    // if (response.status == 422) {
                    //     document.getElementById('paragraph-2').innerHTML = 'Data not appended to database.'
                    // }
                    else {
                        console.log("Data not received by database successfully.");
                    }
                }).catch(err => {
                console.log('Error with database receiving data.')
            })
            return true;
        }
        else {
            if (validatePhoneNumber()) {
                const data = getAllData();
                // console.log(data);
                const options = {
                    method: 'POST',
                    // url: 'http://url.com/resource',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(data),
                }
                fetch('/', options)
                    .then(response => {
                    if (response.ok) {
                        console.log("Data received by database.");
                    }
                    // if (response.status == 422) {
                    //     document.getElementById('paragraph-2').innerHTML = 'Data not appended to database.'
                    // }
                    else {
                        console.log("Data not received by database successfully.");
                    }
                }).catch(err => {
                    console.log('Error with database receiving data.');
                });
                return true;
            }
            else {
                return false;
            }
        }
    }
}

function sendEmail() {
    const data = getNameAndEmail();
    // console.log(data);
    const options = {
        method: 'POST',
        // url: 'http://url.com/resource',
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
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;
    let zipcode = document.getElementById('zipcode').value;
    let phone = document.getElementById('phone').value;
    let comments = document.getElementById('comments').value;
    return {Name: name, Email: email, Address: address, City: city, State: state, Zipcode: zipcode,
        Phone: phone, Comments: comments};
}

function validateName() {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+\s{0,}$/;
    var name = document.getElementById('name').value;
    if(!regName.test(name)) {
        alert('Please enter your full name (first & last name).');
        document.getElementById('name').focus();
        return false;
    }else {
        return true;
    }
}

function validateEmail() {
    var regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}\s{0,}$/;
    var emailAddress = document.getElementById('email').value;
    if (!regEmail.test(emailAddress)) {
        alert("Please enter a valid email address.");
        document.getElementById('email').focus();
        return false;
    }else {
        return true;
    }
}

function validatePhoneNumber() {
    var regPhone = /^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$/;
    var phoneNumber = document.getElementById("phone").value;
    if(!regPhone.test(phoneNumber)) {
        alert("Please enter a valid phone number.");
        document.getElementById("phone").focus();
        return false;
    }else {
        return true;
    }
}

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

var dict = {};
var counter = 0;

function showCanvasGameBoard() {
    iterations = 0;

    const canvas = document.getElementById('canvas');
    canvas.style.visibility = 'visible';

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.4;
    canvas.height = window.innerHeight * 0.4;

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth * 0.4;
        canvas.heigth = window.innerHeight * 0.4;
    });
    const mouse = {
        x: null,
        y: null,
    };
    var rect = canvas.getBoundingClientRect();

    canvas.addEventListener('click', function(event){
        mouse.x = event.x - rect.left.toFixed();
        mouse.y = event.y - rect.top.toFixed();
        var status = document.getElementById('status');
        status.innerHTML = mouse.x + " | " + mouse.y;
        storeCoordinate(mouse.x, mouse.y, dict);
        counter ++;
        document.getElementById("clicks").innerHTML = counter;
        if (counter == 4) {
            event.stopImmediatePropagation();
            for (const [key, value] of Object.entries(dict))
            {

                var intKey = parseInt(key);
                var intValue = parseInt(value);
                drawShape(key, value);
                iterations++;
                if (iterations == 4) {
                    break;

                }

                // figure out how to save all values of shapes (color, stroke color, x, y, width, height, etc).
            }
            //save the canvas
        }
    });

    canvas.addEventListener('click', clickEffect);

    canvas.addEventListener('mousemove', function(event) {
        var mouseX = event.clientX - rect.left.toFixed();
        var mouseY = event.clientY - rect.top.toFixed();
        var status = document.getElementById('status');
        status.innerHTML = mouseX + " | " + mouseY;
    });
}

function copyCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.putImageData()
}

function saveCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function pasteCanvas(image) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.putImageData(image, 0, 0);
}

function drawShape(x,y) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    chooseColor();
    var shape = Math.floor(Math.random() * 6) + 1;
    if (shape == 1) {
        // line
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(Math.floor(Math.random() * 200), Math.floor(Math.random() * 200));
        ctx.lineWidth = 8;
        ctx.stroke();
    }
    else if (shape == 2) {
        // oval
        ctx.beginPath();
        ctx.ellipse(x, y, 50, 80, Math.PI/4, 0, 2 * Math.PI);
        ctx.fill();
    }
    else if (shape == 3) {
        // rectangle
        ctx.fillRect(x, y, 100, 72);
    }
    else if (shape == 4) {
        // circle
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
    }
    else if (shape == 5) {
        // triangle
        ctx.beginPath();
        ctx.moveTo(100,100);
        ctx.lineTo(150, 150);
        ctx.lineTo(50, 150);
        ctx.lineTo(100,100);
        ctx.fill();
    }

    else if (shape == 6) {
        // square
        ctx.fillRect(x, y, 5, 50);
    }

}

function chooseColor() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const randomColor = Math.floor(Math.random() * (7 - 1 + 1)) + 1; //random number between 1-7
    let color="red";
    if (randomColor === 1)
    {
        //keep default color
    }
    else if (randomColor === 2)
    {
        color="yellow";
    }
    else if (randomColor === 3)
    {
        color="orange";
    }
    else if (randomColor === 4)
    {
        color="green";
    }
    else if (randomColor === 5)
    {
        color="cyan";
    }
    else if (randomColor === 6)
    {
        color="blue";
    }
    else {
        color="purple";
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function hidePlayButton() {
    const playButton = document.getElementById('play-button');
    playButton.hidden = true;
}

function showRestartButton() {
    const restartButton = document.getElementById('restart-button');
    restartButton.style.visibility = "visible";
    restartButton.hidden = false;
}

function showStopButton() {
    const stopButton = document.getElementById('stop-button');
    stopButton.style.visibility = "visible";
    stopButton.hidden = false;
}

function showPlayButton() {
    const playButton = document.getElementById('play-button');
    playButton.hidden = false;
    document.getElementById('stop-button').hidden = true;
    document.getElementById('restart-button').hidden = true;

}

function clearCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.4;
    canvas.height = window.innerHeight * 0.4;
    ctx.clearRect(0 , 0, canvas.width, canvas.height);
}

function stopGame() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    showPlayButton();
    clearCanvas();
    counter = 0;

}

function clickEffect(e){
    var d=document.createElement("div");
    d.className="clickEffect";
    d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
    document.body.appendChild(d);
    d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
}


// function showCanvasGameBoard() {
//
//
//     var canvasBoard = document.getElementById('canvas');
//     canvasBoard.style.visibility = 'visible';
//     var ctx = canvasBoard.getContext('2d');
//     var BB = canvasBoard.getBoundingClientRect();
//
//
//
//     canvasBoard.addEventListener('click', function(event) {
//         var mouseX = event.clientX - BB.left.toFixed();
//         var mouseY = event.clientY - BB.top.toFixed();
//         var status = document.getElementById('status');
//         status.innerHTML = mouseX+" | "+mouseY;
//         // storeCoordinate(mouseX, mouseY, dict);
//         drawShape(mouseX, mouseY);
//     });
// }

// function drawShape(xCoordinate, yCoordinate) {
//     var canvas = document.getElementById("canvas");
//     var ctx = canvas.getContext("2d");
//     ctx.strokeStyle = 'orange';
//     ctx.strokeRect(xCoordinate, yCoordinate, 30, 30);
//         // ctx.fillRect(xCoordinate-15, yCoordinate-15, 30, 20);
// }

function storeCoordinate(xVal, yVal, dict) {
    dict[xVal] = yVal;
}




function showCanvasGameInstructions() {
    var canvasInstructions = document.getElementById('canvas-instructions');
    canvasInstructions.style.visibility = 'visible';
}





