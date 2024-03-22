function takeScreenshot() {
    var screenshotImg = document.getElementById('screenshot');
    var randomQueryParam = '?random=' + new Date().getTime(); // Aggiunge un parametro casuale per evitare la cache
    screenshotImg.src = 'https://api.apiflash.com/v1/urltoimage?access_key=174aec80e7134d2681b26854b12536b3&url=https://app.earth2.io/#profile/54638dca-25ba-4807-ac37-fe50b2530875/properties' + randomQueryParam;
}

// Aggiorna lo screenshot ogni volta che la pagina viene caricata
window.onload = takeScreenshot;
// Aggiorna lo screenshot ogni 5 minuti (300000 ms)
setInterval(takeScreenshot, 300000);
