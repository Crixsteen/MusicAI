function showDayDetails(day, month) {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="day-details" style="position: relative; background-color: #333; margin: auto; width: 90%; max-width: 500px; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            <canvas id="falling-notes" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; border-radius: 10px;"></canvas>
            <h1>${day} ${getMonthName(month)} 2025</h1>
            
            <!-- Menù a tendina per scegliere l'emozione -->
            <div style="margin-top: 20px;">
                <label for="emotion-select" style="font-family: 'Comic Sans MS', cursive; color: #8A2BE2; font-size: 24px; font-weight: bold;">MY MOOD</label>
                <select id="emotion-select">
                    <option value="😊">😊 Felice</option>
                    <option value="😢">😢 Triste</option>
                    <option value="😡">😡 Arrabbiato</option>
                    <option value="😴">😴 Stanco</option>
                    <option value="❤️">❤️ Innamorato</option>
                    <option value="😎">😎 Sicuro</option>
                    <option value="🤔">🤔 Pensieroso</option>
                </select>
            </div>
            
            <!-- Campo per aggiungere i link delle canzoni -->
            <div style="margin-top: 20px;">
                <label for="song-link" style="font-family: 'Comic Sans MS', cursive; color: #8A2BE2; font-size: 24px; font-weight: bold;">Cosa voglio ascoltare oggi?</label>
                <input type="url" id="song-link" placeholder="Inserisci il link della canzone" style="width: 100%; padding: 8px; margin-top: 10px;">
                <button id="save-song-link" style="margin-top: 10px; padding: 8px 16px; background-color: #1e90ff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Salva Link
                </button>
                
                <!-- Visualizzazione dei link salvati -->
                <div id="link-display" style="margin-top: 10px;"></div>
            </div>
            
            <!-- Area delle note -->
            <div style="margin-top: 20px;">
                <label for="notes-input" style="font-size: 18px;">Note:</label>
                <textarea id="notes-input" placeholder="Scrivi qui le tue note..." style="width: 100%; height: 150px; font-size: 20px; font-family: 'Roboto', sans-serif; padding: 12px; margin-top: 10px;"></textarea>
                <button id="save-notes" style="margin-top: 10px; padding: 10px 16px; background-color: #1e90ff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Salva Nota
                </button>
                <div id="notes-display" style="margin-top: 20px;"></div>
            </div>

            <!-- Emoji per le note -->
            <div style="margin-top: 20px; text-align: center;">
                <div style="display: flex; justify-content: center; gap: 10px;">
                    <span class="emoji" style="font-size: 24px; cursor: pointer;">😊</span>
                    <span class="emoji" style="font-size: 24px; cursor: pointer;">😢</span>
                    <span class="emoji" style="font-size: 24px; cursor: pointer;">😡</span>
                    <span class="emoji" style="font-size: 24px; cursor: pointer;">😴</span>
                    <span class="emoji" style="font-size: 24px; cursor: pointer;">❤️</span>
                    <span class="emoji" style="font-size: 24px; cursor: pointer;">😎</span>
                </div>
            </div>

            <div style="margin-top: 20px; text-align: center;">
                <button id="back-to-calendar" style="padding: 10px 20px; background-color: #1e90ff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Torna al Calendario
                </button>
            </div>
        </div>
    `;

    // Funzione per salvare i link delle canzoni e mostrare il titolo
    document.getElementById("save-song-link").addEventListener("click", () => {
        const linkInput = document.getElementById("song-link").value.trim();
        if (linkInput) {
            const linkDisplay = document.getElementById("link-display");

            // Fetch the song title
            fetch(`https://noembed.com/embed?url=${encodeURIComponent(linkInput)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.title) {
                        // Crea l'elemento del titolo
                        const link = document.createElement("a");
                        link.href = linkInput;
                        link.target = "_blank";
                        link.innerText = data.title;

                        // Aggiungi il titolo direttamente al contenitore
                        const listItem = document.createElement("div");
                        listItem.style.marginBottom = "10px"; // Ensure spacing between items
                        link.style.color = "red"; // Set the link color to red
                        listItem.appendChild(link);
                        linkDisplay.appendChild(listItem);
                    } else {
                        alert("Non è possibile recuperare il titolo per questo link.");
                    }
                })
                .catch(() => {
                    alert("Errore nel recupero del titolo.");
                });

            // Svuota l'input
            document.getElementById("song-link").value = "";
        }
    });

    // Funzione per salvare le note con emoji
    document.getElementById("save-notes").addEventListener("click", () => {
        const notesInput = document.getElementById("notes-input").value.trim();
        if (notesInput) {
            const emoji = document.querySelector(".emoji.selected")?.innerText || "";
            const noteText = `${emoji} ${notesInput}`;

            const notesDisplay = document.getElementById("notes-display");

            const noteDiv = document.createElement("div");
            noteDiv.innerText = noteText;
            notesDisplay.appendChild(noteDiv);

            // Svuota il campo di input
            document.getElementById("notes-input").value = "";
        }
    });

    // Listener per il pulsante "Torna al Calendario"
    document.getElementById("back-to-calendar").addEventListener("click", () => {
        showDiaryPage();
    });

    // Aggiungi interattività alle emoji
    document.querySelectorAll(".emoji").forEach(emoji => {
        emoji.addEventListener("click", () => {
            document.querySelectorAll(".emoji").forEach(e => e.classList.remove("selected"));
            emoji.classList.add("selected");
        });
    });
}

function getMonthName(month) {
    const months = [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];
    return months[month - 1];
}