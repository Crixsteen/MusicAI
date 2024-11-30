document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    // Applica lo stile salvato
    const savedStyle = localStorage.getItem("selectedStyle");
    if (savedStyle) {
        document.body.style.backgroundImage = `url('./assets/images/${savedStyle}.jpg')`;
    }

    function showLogin() {
        app.innerHTML = `
            <div class="login-container">
                <h1>MusicAI - Login</h1>
                <form id="login-form">
                    <label for="name">Nome:</label>
                    <input type="text" id="name" placeholder="Inserisci il tuo nome" required>
                    
                    <label for="email">Email:</label>
                    <input type="email" id="email" placeholder="Inserisci la tua email" required>
                    
                    <label for="password">Password:</label>
                    <input type="password" id="password" placeholder="Inserisci la tua password" required>
                    
                    <label for="style-select">Scegli il tuo stile:</label>
                    <select id="style-select">
                        <option value="classical">Classical</option>
                        <option value="dark">Dark</option>
                        <option value="disco">Disco</option>
                        <option value="hiphop">Hip Hop</option>
                        <option value="metal">Metal</option>
                        <option value="pop">Pop</option>
                        <option value="punk">Punk</option>
                        <option value="rock">Rock</option>
                        <option value="romantic">Romantic</option>
                    </select>
                    
                    <button type="submit">Accedi</button>
                    <p id="error-message" style="color: red; display: none;">Per favore, compila tutti i campi.</p>
                </form>
            </div>
        `;

        const styleSelect = document.getElementById("style-select");

        // Imposta il selettore sullo stile salvato
        if (savedStyle) {
            styleSelect.value = savedStyle;
        }

        // Cambia stile quando viene selezionato
        styleSelect.addEventListener("change", () => {
            const selectedStyle = styleSelect.value;
            document.body.style.backgroundImage = `url('./assets/images/${selectedStyle}.jpg')`;
            localStorage.setItem("selectedStyle", selectedStyle);
        });

        document.getElementById("login-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (name && email && password) {
                showDiaryHome();
            } else {
                const errorMessage = document.getElementById("error-message");
                errorMessage.style.display = "block";
            }
        });
    }

    function showDiaryHome() {
        app.innerHTML = `
            <div class="welcome-page">
                <h1>Benvenuto nel tuo Diario Musicale!</h1>
                <button id="open-diary">Apri il tuo diario</button>
                <button id="logout">Esci</button>
            </div>
        `;

        document.getElementById("open-diary").addEventListener("click", showDiaryPage);
        document.getElementById("logout").addEventListener("click", showLogin);
    }

    function showDiaryPage() {
        app.innerHTML = `
            <div class="calendar-page">
                <h1>Calendario Musicale</h1>
                <div class="months-grid">
                    ${generateMonths()}
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button id="back-to-home" class="navigation-button">Torna alla Home</button>
                </div>
            </div>
        `;

        document.querySelectorAll(".month").forEach(button => {
            button.addEventListener("click", function () {
                const month = parseInt(this.dataset.month) - 1;
                showDaysPage(month);
            });
        });

        const backToHomeButton = document.getElementById("back-to-home");
        if (backToHomeButton) {
            backToHomeButton.addEventListener("click", showDiaryHome);
        } else {
            console.error("Pulsante 'Torna alla Home' non trovato!");
        }
    }

    function generateMonths() {
        const months = [
            "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
            "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
        ];
        return months.map((month, index) => `
            <button class="month" data-month="${index + 1}">${month}</button>
        `).join("");
    }

    function showDaysPage(month) {
        const daysInMonth = new Date(2025, month + 1, 0).getDate();
        app.innerHTML = `
            <div class="days-page">
                <h1>Giorni di ${getMonthName(month + 1)}</h1>
                <div class="days-grid">
                    ${generateDays(daysInMonth, month + 1)}
                </div>
                <button id="back-to-calendar" class="navigation-button">Torna al Calendario</button>
            </div>
        `;

        document.getElementById("back-to-calendar").addEventListener("click", showDiaryPage);

        document.querySelectorAll(".day").forEach(button => {
            button.addEventListener("click", function () {
                const day = parseInt(this.dataset.day);
                showDayDetails(day, month + 1);
            });
        });
    }

    function generateDays(daysInMonth, month) {
        return Array.from({ length: daysInMonth }, (_, i) => `
            <button class="navigation-button day" data-day="${i + 1}" data-month="${month}">
                ${i + 1}
            </button>
        `).join("");
    }

    function getMonthName(month) {
        const months = [
            "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
            "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
        ];
        return months[month - 1];
    }

    window.showDiaryPage = showDiaryPage;
    showLogin();
});

