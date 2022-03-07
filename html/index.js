const messages = [
    'Уважаемые россияне, ваши СМИ подвергаются цензуре.  Кремль лжет.  Узнайте правду об Украине в бесплатном Интернете и в приложении Telegram.  Время свергнуть диктатора Путина!',
    'Кремль лжет!Война Путина принесла катастрофу народу России!В банках нет денег,нет топлива,все иностранные компании ушли из страны,а Путин прячется в своем дворце в Геленджике!',
    'На Украине погибло больше сынов Русского Народа, чем в Афганистане! Война Путина уничтожит Россию! Топлива нет, денег в банках нет. Путин уничтожает Россию! Кремль лжет!',
    'В Украине погибло более 10 000 сынов Русского Народа. Кремль лжет! Путин спрятался в своем дворце в Геленджике, но денег в банках нет, топлива нет, Россия обанкротилась. Вставай!',
    'Ваши СМИ подвергаются цензуре. Кремль лжет. Ищите правду о войне в Украине в TOR: https://www.bbcnewsd73hkzno2ini43t4gblxvycyac5aw4gnv7t2rccijh7745uqd.onion/russian или используйте приложение Psiphon.'
]
let messageIndex = 0;
let currentMsg = '';
let phoneNum = '';

function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function isMobile() {
    var ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod/i.test(ua);
}

async function draw() {
    const response = await fetch('https://example.in/api'); //provide yours api endpoint, 1920.in won't work due to cors
    phoneNum = await response.json();
    setMessage();
}

function setMessage()
{
    const phoneNumberField = document.getElementById("phoneNumber");
    phoneNumberField.innerText = '+' + phoneNum;
    let queryChar = iOS() ? '&' : '?';
	let smshref = "sms:" + '+' + phoneNum + queryChar + "body=" + encodeURI(currentMsg);
    phoneNumberField.href = smshref;
    const sendButton = document.getElementById("buttonSend");
    sendButton.href = smshref;
}

function getDefaultIndex() {
    messageIndex = 0;
    return messageIndex;
}

function drawText() {
    currentMsg = messages[messageIndex == messages.length ? getDefaultIndex() : messageIndex];
    messageIndex++;
    const messageField = document.getElementById("message");
    messageField.innerText = currentMsg;
    setMessage()
}

document.addEventListener("DOMContentLoaded", async () => {
    if (isMobile()) {
        document.getElementById("buttonCopy").style = 'display: none';
    } else {
        document.getElementById("buttonSend").style = 'display: none';
        document.getElementById("buttonCopy").addEventListener("click", () => { 
            const phoneNumberField = document.getElementById("phoneNumber");
            navigator.clipboard.writeText(phoneNumberField.innerText);
        });
    }
    drawText();
    const buttonReload = document.getElementById("buttonReload");
    buttonReload.addEventListener("click", async () => { await draw() });
    await draw();
    
    document.getElementById("buttonCopyText").addEventListener("click", () => {
        const messageField = document.getElementById("message");
        navigator.clipboard.writeText(messageField.innerText);
    });

    document.getElementById("buttonTextReload").addEventListener("click", () => { drawText() });
});
