const modal = document.getElementById('modal');
const form = document.querySelector('form');
const openModalBtn = document.querySelectorAll('.btn');
const closeModalBtn = document.querySelector('.modal__close');
const modalSuccess = document.getElementById('modal-success');
const modalSendError = document.getElementById('sendError');
const btnUp = document.querySelector('.btn-up');

const dataJs = {
    "access_token": "x3ie3xp8yipmisiwd2yh4z2s"
};

closeModalBtn.onclick = function() {
    modal.style.display = "none";
}

openModalBtn.forEach((btn) => {
    btn.onclick = function() {
        modal.style.display = "block";
    }
});

window.onscroll = function() {
    let pixelTop = window.pageYOffset;

    if (pixelTop > 0 ) {
        btnUp.style.display = "block";
    } else if(pixelTop < 1 ) {
        btnUp.style.display = "none";
    }
}

btnUp.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'} );
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function toParams(data_js) {
    let form_data = [];
    for ( let key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

function jsSend() {
    modalSendError.style.display = "none";
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            modal.style.display = "none";
            modalSuccess.style.display = "block";
            setTimeout(() => {
                modalSuccess.style.display = "none";
            }, 5000);
            form.reset();
        } else
        if(request.readyState == 4) {
            modalSendError.style.display = "block";
        }
    };

    let email = document.querySelector( "[name='user_email']").value;
    let subject = document.querySelector( "[name='user_name']").value;
    let phone = document.querySelector("[name='user_phone']").value;
    let message = document.querySelector("[name='message']").value;

    dataJs['subject'] = '???????????? ???? '  + subject;
    dataJs['text'] = `E-mail: ${email} ??????????????: ${phone} ??????????????????: ${message}`;
    let params = toParams(dataJs);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    jsSend();
});