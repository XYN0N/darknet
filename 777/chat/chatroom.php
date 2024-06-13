<?php

/**
 * Simple Chat v2.0.2 by Stephan Soller
 * http://arkanis.de/projects/simple-chat/
 */

$messages_buffer_file = "messages.json";
$messages_buffer_size = 50;
$enable_chatlog = false;

if (isset($_POST["content"]) && isset($_POST["name"]) && isset($_POST["color"])) {
    if (!file_exists($messages_buffer_file))
        touch($messages_buffer_file);

    $buffer = fopen($messages_buffer_file, "r+b");
    flock($buffer, LOCK_EX);
    $buffer_data = stream_get_contents($buffer);

    $messages = $buffer_data ? json_decode($buffer_data, true) : [];
    $next_id = (count($messages) > 0) ? $messages[count($messages) - 1]["id"] + 1 : 0;

    // Memorizza il messaggio inviato dall'utente
    $messages[] = [
        "id" => $next_id,
        "time" => time(),
        "name" => $_POST["name"],
        "color" => $_POST["color"],
        "content" => $_POST["content"]
    ];

    // Controllo dei comandi
    if ($_POST["content"][0] === '/') {
        $command = strtolower(trim($_POST["content"]));
        
        // Gestione dei comandi
        switch ($command) {
            case '/help':
                $response = "Available commands: /help, /time, /ping";
                break;
            case '/time':
                $response = "Current time is " . date("H:i:s");
                break;
            case '/ping':
                $response = "Pong!";
                break;
            default:
                // Se il comando non è riconosciuto, non fare nulla
                return;
        }
        
        // Inseriamo la risposta dell'@bot nel buffer dei messaggi
        $messages[] = [
            "id" => $next_id + 1, // Incrementiamo l'id per distinguere il messaggio dell'@bot
            "time" => time(),
            "name" => "@bot",
            "color" => "#ff0000", // Colore per l'@bot (es. rosso)
            "content" => $response
        ];
    }

    // Limitiamo la dimensione del buffer dei messaggi
    if (count($messages) > $messages_buffer_size)
        $messages = array_slice($messages, count($messages) - $messages_buffer_size);

    // Scriviamo i messaggi nel file
    ftruncate($buffer, 0);
    rewind($buffer);
    fwrite($buffer, json_encode($messages));
    flock($buffer, LOCK_UN);
    fclose($buffer);

    if ($enable_chatlog)
        file_put_contents("chatlog.txt", date("Y-m-d H:i:s") . "\t" . strtr($_POST["name"], "\t", " ") . "\t" . strtr($_POST["content"], "\t", " ") . "\n", FILE_APPEND);

    exit();
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Stephan Soller">
    <title>Simple Chat</title>
    <style>
        body {
            background: url('https://cdn.sci.news/images/enlarge11/image_12312e-G35.2-0.7N.jpg') no-repeat center center fixed;
            background-size: cover;
            margin: 0;
            font-family: Arial, sans-serif;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        #messages {
            border: 1px solid #ccc;
            overflow-y: auto;
            max-height: 400px;
            max-width: 80%;
            padding: 10px;
            margin-bottom: 10px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            margin-left: auto;
            margin-right: auto;
        }

        .message {
            margin-bottom: 5px;
            padding: 5px 10px;
            border-radius: 10px;
            background-color: #f0f0f0;
        }

        #user-input {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 10px;
            width: 80%;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }

        .input-fields, .message-field {
            display: flex;
            gap: 10px;
        }

        .input-fields input[type="text"], .input-fields input[type="color"],
        .message-field input[type="text"] {
            flex: 1;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .message-field {
            flex-direction: column;
        }

        .message-field button {
            padding: 8px 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
            align-self: flex-start;
        }

        .message-field button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

<h1>Simple Chat</h1>

<ul id="messages">
    <li>loading…</li>
</ul>

<form id="user-input" method="post">
    <div class="input-fields">
        <input type="text" name="name" placeholder="Name" value="Anonymous">
        <input type="color" name="color" value="#000000">
    </div>
    <div class="message-field">
        <input type="text" name="content" placeholder="Message" autofocus>
        <button type="submit">Send</button>
    </div>
</form>

<script type="module">
    // Rimuoviamo l'elemento "loading…"
    document.querySelector("ul#messages > li").remove();

    document.querySelector("form").addEventListener("submit", async event => {
        const form = event.target;
        const name = form.name.value;
        const content = form.content.value;
        const color = form.color.value;

        // Previeni l'azione predefinita del browser (invio del modulo e visualizzazione della pagina di risultato).
        event.preventDefault();

        // Invia il messaggio solo se non è vuoto
        if (name === "" || content === "") return;

        // Invia il messaggio al server
        await fetch(form.action, { method: "POST", body: new URLSearchParams({ name, content, color }) });

        // Pulisci il campo di input
        form.content.value = "";
        form.content.focus();
    });

    // Funzione per ottenere nuovi messaggi
    async function poll_for_new_messages() {
        // Ottieni i messaggi dal server
        const response = await fetch("messages.json", { cache: "no-cache" });

        // Se la richiesta ha successo
        if (response.ok) {
            const messages = await response.json();
            const messageList = document.querySelector("ul#messages");

            // Rimuovi l'elemento "loading…"
            messageList.innerHTML = "";

            // Aggiungi i nuovi messaggi alla chat
            messages.forEach(msg => {
                const messageElement = document.createElement("li");
                messageElement.classList.add("message");
                messageElement.innerHTML = `<strong style="color:${msg.color}">${msg.name}</strong>: ${msg.content}`;
                messageList.appendChild(messageElement);
            });

            // Scendi fino in fondo per visualizzare i nuovi messaggi
            messageList.scrollTop = messageList.scrollHeight;
        }
    }

    // Avvia la funzione per ottenere nuovi messaggi e ripetila ogni due secondi
    poll_for_new_messages();
    setInterval(poll_for_new_messages, 2000);
</script>

</body>
</html>
