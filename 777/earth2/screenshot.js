async function takeScreenshot() {
    try {
        const response = await fetch('https://app.earth2.io/#profile/54638dca-25ba-4807-ac37-fe50b2530875/properties');
        const html = await response.text();

        // Crea un iframe e inserisci l'HTML della pagina di Earth2
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.body.innerHTML = html;

        // Aspetta un po' per garantire che la pagina sia stata caricata completamente
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Cattura lo screenshot del contenuto dell'iframe
        const canvas = document.createElement('canvas');
        canvas.width = iframe.offsetWidth;
        canvas.height = iframe.offsetHeight;
        const context = canvas.getContext('2d');
        context.drawImage(iframe, 0, 0, iframe.offsetWidth, iframe.offsetHeight);
        
        // Ottieni l'URL dell'immagine dal canvas e imposta l'immagine nell'elemento <img>
        const screenshotImg = document.getElementById('screenshot');
        screenshotImg.src = canvas.toDataURL('image/png');

        // Rimuovi l'iframe
        document.body.removeChild(iframe);
    } catch (error) {
        console.error('Si è verificato un errore durante la cattura dello screenshot:', error);
    }
}

// Cattura lo screenshot quando la pagina è completamente caricata
window.onload = takeScreenshot;