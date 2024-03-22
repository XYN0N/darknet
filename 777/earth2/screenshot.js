// URL del servizio per catturare lo screenshot
const screenshotUrl = 'https://api.apiflash.com/v1/urltoimage';

// Chiave di accesso al servizio (sostituisci con la tua chiave)
const accessKey = '174aec80e7134d2681b26854b12536b3';

// URL della pagina da catturare lo screenshot (sostituisci con l'URL della tua pagina)
const pageUrl = 'https://app.earth2.io/#profile/54638dca-25ba-4807-ac37-fe50b2530875/properties';

// Variabile per tenere traccia del livello di zoom
let zoomLevel = 1;

// Funzione per ingrandire l'immagine al massimo
function toggleEnlarge() {
    const screenshot = document.getElementById('screenshot');
    if (screenshot.style.maxWidth === '100%') {
        screenshot.style.maxWidth = '80%';
        screenshot.style.maxHeight = '80vh';
    } else {
        screenshot.style.maxWidth = '100%';
        screenshot.style.maxHeight = '100%';
    }
}

// Funzione per zoomare in avanti
function zoomIn() {
    const screenshot = document.getElementById('screenshot');
    zoomLevel += 0.1;
    screenshot.style.transform = `scale(${zoomLevel})`;
}

// Funzione per zoomare indietro
function zoomOut() {
    const screenshot = document.getElementById('screenshot');
    zoomLevel -= 0.1;
    screenshot.style.transform = `scale(${zoomLevel})`;
}

// Funzione per catturare lo screenshot e aggiornare l'immagine
async function takeScreenshot() {
    try {
        // Aggiungi un timestamp per evitare la cache
        const timestamp = new Date().getTime();

        // Costruisci l'URL completo con la chiave di accesso e il timestamp
        const fullUrl = `${screenshotUrl}?access_key=${accessKey}&url=${encodeURIComponent(pageUrl)}&fresh=true&full_page=true&no_cookie_banners=true&timestamp=${timestamp}`;

        // Richiedi l'immagine dello screenshot al servizio
        const response = await fetch(fullUrl);
        
        // Se la richiesta ha avuto successo, aggiorna l'immagine
        if (response.ok) {
            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);
            // Sostituisci l'immagine corrente con quella appena ottenuta
            const screenshot = document.getElementById('screenshot');
            screenshot.src = imgUrl;
            screenshot.onload = () => {
                // Nascondi il simbolo di caricamento
                document.querySelector('.loading').style.display = 'none';
            };
        } else {
            console.error('Errore durante il recupero dello screenshot:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Si è verificato un errore:', error);
    }
}

// Cattura lo screenshot al caricamento della pagina
takeScreenshot();
