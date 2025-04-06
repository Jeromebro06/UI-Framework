/**
 * UI Framework Dokumentation
 */

/**
 * UI.Element(id)
 * ------------------
 * Setzt das Haupt-HTML-Tag, das als Container für alle UI-Elemente dient.
 * 
 * @param {string} id - Die ID des HTML-Tags, das als Hauptcontainer genutzt werden soll.
 * 
 * @example
 * // Setzt die Klasse "ui" als Hauptcontainer
 * UI.Element('ui');
 */

/**
 * UI.Create({options})
 * ------------------
 * Erstellt ein neues UI-Element und fügt es in den DOM ein.
 * Unterstützt verschachtelte Elemente durch das 'elements'-Objekt.
 * 
 * @param {object} options - Konfigurationsoptionen für das Element
 * @param {string} options.id - Eindeutige ID für das Element
 * @param {string} options.html - HTML-Inhalt des Elements
 * @param {string} [options.css] - CSS-Styles für das Element
 * @param {string} [options.appendTo] - Ziel-Klasse, an die das Element angehängt werden soll
 * @param {string} [options.animate] - Name der Animation, die beim Erstellen angewendet werden soll
 * @param {object} [options.elements] - Verschachtelte Unterelemente
 * 
 * @returns {HTMLElement} - Das erstellte DOM-Element
 * 
 * @example
 * // Einfaches Element erstellen
 * UI.Create({
 *     id: 'myElement',
 *     html: '<div class="content">Hallo Welt</div>',
 *     css: `
 *         #myElement {
 *             color: white;
 *             background-color: #333;
 *             padding: 10px;
 *         }
 *     `,
 *     appendTo: 'ui'
 * });
 * 
 * // Verschachteltes Element mit Animation erstellen
 * UI.Create({
 *     id: 'menu',
 *     html: `
 *         <div class="menu-container">
 *             <div class="header">{{header}}</div>
 *             <div class="body">{{body}}</div>
 *             <div class="footer">{{footer}}</div>
 *         </div>
 *     `,
 *     css: `
 *         .menu-container {
 *             width: 300px;
 *             border-radius: 5px;
 *             overflow: hidden;
 *         }
 *     `,
 *     animate: 'slideInRight',
 *     elements: {
 *         header: {
 *             html: '<h2>Menü-Titel</h2>',
 *             css: `
 *                 h2 {
 *                     margin: 0;
 *                     padding: 10px;
 *                     background-color: #333;
 *                     color: white;
 *                 }
 *             `,
 *             animate: 'slideInLeft'
 *         },
 *         body: {
 *             html: '<div class="content">Menü-Inhalt</div>',
 *             css: `
 *                 .content {
 *                     padding: 15px;
 *                     background-color: #f5f5f5;
 *                 }
 *             `
 *         },
 *         footer: {
 *             html: '<div class="footer-text">© 2025</div>',
 *             css: `
 *                 .footer-text {
 *                     padding: 8px;
 *                     text-align: center;
 *                     background-color: #333;
 *                     color: white;
 *                     font-size: 12px;
 *                 }
 *             `
 *         }
 *     }
 * });
 */

/**
 * UI.Update(id, newHtml)
 * ------------------
 * Aktualisiert den HTML-Inhalt eines vorhandenen Elements.
 * 
 * @param {string} id - ID des zu aktualisierenden Elements
 * @param {string} newHtml - Neuer HTML-Inhalt
 * 
 * @example
 * UI.Update('myElement', '<div>Neuer Inhalt</div>');
 */

/**
 * UI.Destroy(id)
 * ------------------
 * Entfernt ein Element aus dem DOM und löscht es aus dem Cache.
 * 
 * @param {string} id - ID des zu entfernenden Elements
 * 
 * @example
 * UI.Destroy('myElement');
 */

/**
 * UI.Css(css)
 * ------------------
 * Fügt CSS-Styles zur Seite hinzu. Unterstützt erweiterte SCSS-ähnliche Syntax mit
 * verschachtelten Selektoren.
 * 
 * @param {string} css - CSS-Styles im String-Format
 * 
 * @example
 * UI.Css(`
 *     .container {
 *         background-color: #333;
 *         color: white;
 *         
 *         &:hover {
 *             background-color: #555;
 *         }
 *         
 *         & .title {
 *             font-size: 20px;
 *             font-weight: bold;
 *         }
 *     }
 * `);
 */

/**
 * UI.BindData(id, data)
 * ------------------
 * Bindet Daten an ein Element, indem Platzhalter im Format {{key}} durch die entsprechenden
 * Werte aus dem data-Objekt ersetzt werden.
 * 
 * @param {string} id - ID des Elements
 * @param {object} data - Objekt mit Schlüssel-Wert-Paaren für die Ersetzung
 * 
 * @example
 * // HTML: <div id="greeting">Hallo {{name}}! Du bist {{age}} Jahre alt.</div>
 * UI.BindData('greeting', {
 *     name: 'Max',
 *     age: 25
 * });
 * // Ergebnis: <div id="greeting">Hallo Max! Du bist 25 Jahre alt.</div>
 */

/**
 * UI.Configurate(enable)
 * ------------------
 * Setzt Basis-Konfigurationen für die Seite.
 * 
 * @param {boolean} enable - Ob die Konfiguration aktiviert werden soll
 * 
 * @example
 * UI.Configurate(true); // Setzt body margin und padding auf 0
 */

/**
 * UI.ClickFunction(selector, callback, options)
 * ------------------
 * Registriert einen Click-Event-Handler für Elemente, die dem Selektor entsprechen.
 * 
 * @param {string} selector - CSS-Selektor für die Zielelemente
 * @param {function} callback - Funktion, die beim Klick ausgeführt wird
 * @param {object} [options] - Zusätzliche Optionen
 * @param {boolean} [options.preventDefault] - Ob das Standardverhalten verhindert werden soll
 * @param {boolean} [options.stopPropagation] - Ob die Event-Propagation gestoppt werden soll
 * 
 * @example
 * UI.ClickFunction('.button', ($element, dataAttributes, event) => {
 *     console.log('Button geklickt!', dataAttributes);
 * }, { preventDefault: true });
 */

/**
 * UI.RemoveClickFunction(selector)
 * ------------------
 * Entfernt einen zuvor registrierten Click-Event-Handler.
 * 
 * @param {string} selector - CSS-Selektor für die Zielelemente
 * 
 * @example
 * UI.RemoveClickFunction('.button');
 */

/**
 * UI.ItemForEach({options})
 * ------------------
 * Erstellt HTML-Elemente aus einem Template für jedes Element in einem Array.
 * 
 * @param {object} options - Konfigurationsoptionen
 * @param {string} options.id - ID des zu erstellenden Elements
 * @param {string} options.template - HTML-Template mit Platzhaltern
 * @param {Array} options.data - Array mit Daten für die Platzhalter
 * @param {string} [options.css] - CSS-Styles für die erstellten Elemente
 * @param {string} [options.appendTo] - Selektor für den Container, an den die Elemente angehängt werden
 * @param {function} [options.processData] - Funktion, die zusätzliche Daten liefert
 * 
 * @example
 * UI.ItemForEach({
 *     id: 'userList',
 *     template: `
 *         <div class="user-item">
 *             <span class="name">{{name}}</span>
 *             <span class="email">{{email}}</span>
 *         </div>
 *     `,
 *     data: [
 *         { name: 'Max Mustermann', email: 'max@example.com' },
 *         { name: 'Erika Musterfrau', email: 'erika@example.com' }
 *     ],
 *     css: `
 *         .user-item {
 *             padding: 10px;
 *             border-bottom: 1px solid #ddd;
 *         }
 *     `,
 *     appendTo: '.users-container'
 * });
 */

/**
 * UI.Button({options})
 * ------------------
 * Erstellt einen Button oder aktualisiert vorhandene Buttons.
 * 
 * @param {object} options - Konfigurationsoptionen
 * @param {string} [options.id] - ID für den Button (erforderlich für neue Buttons)
 * @param {string} [options.btnClass] - Klasse vorhandener Buttons, die aktualisiert werden sollen
 * @param {string} options.text - Text/HTML für den Button
 * @param {function} options.onClick - Funktion, die beim Klick ausgeführt wird
 * @param {string} [options.appendTo] - Selektor für den Container, an den der Button angehängt wird
 * @param {string} [options.css] - CSS-Styles für den Button
 * 
 * @example
 * // Neuen Button erstellen
 * UI.Button({
 *     id: 'saveButton',
 *     text: 'Speichern',
 *     onClick: () => {
 *         console.log('Speichern geklickt!');
 *     },
 *     appendTo: '#buttonContainer',
 *     css: 'background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px;'
 * });
 * 
 * // Vorhandene Buttons aktualisieren
 * UI.Button({
 *     btnClass: 'action-button',
 *     text: 'Aktion',
 *     onClick: () => {
 *         console.log('Aktion ausgeführt!');
 *     }
 * });
 */

/**
 * UI.Empty(selector)
 * ------------------
 * Leert den Inhalt eines Elements.
 * 
 * @param {string} selector - CSS-Selektor für das zu leerende Element
 * 
 * @example
 * UI.Empty('#container');
 */

/**
 * UI.PostRequest({options})
 * ------------------
 * Sendet eine POST-Anfrage an den Server.
 * 
 * @param {object} options - Konfigurationsoptionen
 * @param {string} options.action - Aktions-Pfad für die Anfrage
 * @param {object} options.data - Zu sendende Daten
 * @param {boolean} [options.expectsResponse=false] - Ob eine Antwort erwartet wird
 * 
 * @returns {Promise<object|undefined|null>} - Bei expectsResponse=true: Die Antwort als Objekt, oder null bei Fehler
 *                                           Bei expectsResponse=false: undefined
 * 
 * @example
 * // Anfrage ohne erwartete Antwort
 * UI.PostRequest({
 *     action: 'saveUser',
 *     data: { name: 'Max', age: 25 }
 * });
 * 
 * // Anfrage mit erwarteter Antwort
 * const response = await UI.PostRequest({
 *     action: 'getUsers',
 *     data: { filter: 'active' },
 *     expectsResponse: true
 * });
 * if (response) {
 *     console.log('Benutzer:', response.users);
 * }
 */

/**
 * UI.Animate(id, animation, duration, callback)
 * ------------------
 * Wendet eine Animation auf ein Element an.
 * 
 * @param {string} id - ID des zu animierenden Elements
 * @param {string|object} animation - Name einer vordefinierten Animation oder benutzerdefinierte Keyframes
 * @param {number} [duration=300] - Dauer der Animation in Millisekunden
 * @param {function} [callback] - Funktion, die nach Abschluss der Animation aufgerufen wird
 * 
 * @example
 * // Vordefinierte Animation verwenden
 * UI.Animate('notification', 'slideInRight', 500, () => {
 *     console.log('Animation abgeschlossen!');
 * });
 * 
 * // Benutzerdefinierte Animation verwenden
 * UI.Animate('element', { 
 *     transform: ['scale(1)', 'scale(1.5)', 'scale(1)'],
 *     opacity: [1, 0.8, 1]
 * }, 800);
 * 
 * @description
 * Verfügbare vordefinierte Animationen:
 * - fadeIn: Einblenden
 * - fadeOut: Ausblenden
 * - slideIn: Nach oben gleiten
 * - slideOut: Nach unten gleiten
 * - slideInLeft: Von links einblenden
 * - slideInRight: Von rechts einblenden
 * - slideUp: Von unten nach oben einblenden
 * - slideDown: Von oben nach unten ausblenden
 * - slideUpDown: Von oben nach unten einblenden
 * - slideOutRight: Nach rechts ausblenden
 * - slideOutLeft: Nach links ausblenden
 * - loadingbar: Ladebalken-Animation (Breite verringern)
 * - rotation: Rotation im Uhrzeigersinn (110° → 180° → 45°)
 * - rotation2: Rotation im Uhrzeigersinn (50° → 180° → 90°)
 */

/**
 * UI.CreateNestedElement({options})
 * ------------------
 * (Interne Hilfsmethode) Erstellt ein verschachteltes Element innerhalb eines übergeordneten Elements.
 * Diese Methode wird von UI.Create verwendet und sollte nicht direkt aufgerufen werden.
 * 
 * @param {object} options - Konfigurationsoptionen
 * @param {string} options.id - ID für das zu erstellende Element
 * @param {string} options.parentId - ID des übergeordneten Elements
 * @param {string} options.placeholder - Platzhaltertext im übergeordneten Element
 * @param {object} options.config - Konfiguration für das Element (html, css, animate, elements)
 * 
 * @private
 */

/**
 * @class UI
 * @description
 * Hauptklasse für das UI-Framework. Alle Methoden sind statisch und können direkt über die UI-Klasse
 * aufgerufen werden.
 * 
 * @property {string} UI.Class - Die CSS-Klasse, die als Hauptcontainer für die UI-Elemente dient (Standard: 'ui')
 * @property {object} UI.elements - Cache für alle erstellten DOM-Elemente
 * @property {object} UI.eventHandlers - Cache für alle registrierten Event-Handler
 */

/**
 * Beispiele für typische UI-Erstellungen
 * ------------------
 * Hier sind einige Beispiele für häufig verwendete UI-Patterns:
 */

/**
 * Beispiel 1: Ein einfacher Dialog
 * 
 * @example
 * UI.Create({
 *     id: 'dialog',
 *     html: `
 *         <div class="dialog-container">
 *             <div class="dialog-header">{{header}}</div>
 *             <div class="dialog-body">{{body}}</div>
 *             <div class="dialog-footer">{{footer}}</div>
 *         </div>
 *     `,
 *     css: `
 *         .dialog-container {
 *             position: absolute;
 *             top: 50%;
 *             left: 50%;
 *             transform: translate(-50%, -50%);
 *             width: 400px;
 *             background-color: #fff;
 *             border-radius: 5px;
 *             box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
 *             overflow: hidden;
 *         }
 *     `,
 *     animate: 'fadeIn',
 *     elements: {
 *         header: {
 *             html: '<h2>Dialog-Titel</h2>',
 *             css: `
 *                 .dialog-header {
 *                     padding: 15px;
 *                     background-color: #333;
 *                     color: white;
 *                 }
 *                 
 *                 h2 {
 *                     margin: 0;
 *                     font-size: 18px;
 *                 }
 *             `
 *         },
 *         body: {
 *             html: '<p>Hier steht der Dialog-Inhalt...</p>',
 *             css: `
 *                 .dialog-body {
 *                     padding: 20px;
 *                     max-height: 300px;
 *                     overflow-y: auto;
 *                 }
 *             `
 *         },
 *         footer: {
 *             html: `
 *                 <button class="btn-cancel">Abbrechen</button>
 *                 <button class="btn-confirm">Bestätigen</button>
 *             `,
 *             css: `
 *                 .dialog-footer {
 *                     padding: 15px;
 *                     text-align: right;
 *                     border-top: 1px solid #eee;
 *                 }
 *                 
 *                 button {
 *                     padding: 8px 15px;
 *                     margin-left: 10px;
 *                     border: none;
 *                     border-radius: 3px;
 *                     cursor: pointer;
 *                 }
 *                 
 *                 .btn-cancel {
 *                     background-color: #f5f5f5;
 *                 }
 *                 
 *                 .btn-confirm {
 *                     background-color: #4CAF50;
 *                     color: white;
 *                 }
 *             `
 *         }
 *     }
 * });
 * 
 * // Event-Handler für die Buttons
 * UI.ClickFunction('.btn-cancel', () => {
 *     UI.Animate('dialog', 'fadeOut', 300, () => {
 *         UI.Destroy('dialog');
 *     });
 * });
 * 
 * UI.ClickFunction('.btn-confirm', () => {
 *     // Bestätigungsaktion ausführen
 *     UI.Animate('dialog', 'fadeOut', 300, () => {
 *         UI.Destroy('dialog');
 *     });
 * });
 */

/**
 * Beispiel 2: Eine Benachrichtigung mit Timeout
 * 
 * @example
 * function showNotification(message, type = 'info', duration = 3000) {
 *     const id = `notification-${Date.now()}`;
 *     
 *     UI.Create({
 *         id: id,
 *         html: `
 *             <div class="notification ${type}">
 *                 <div class="notification-icon">{{icon}}</div>
 *                 <div class="notification-content">{{content}}</div>
 *             </div>
 *         `,
 *         css: `
 *             .notification {
 *                 position: fixed;
 *                 top: 20px;
 *                 right: 20px;
 *                 padding: 15px;
 *                 border-radius: 4px;
 *                 box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
 *                 display: flex;
 *                 align-items: center;
 *                 min-width: 300px;
 *                 z-index: 9999;
 *             }
 *             
 *             .notification.info {
 *                 background-color: #2196F3;
 *                 color: white;
 *             }
 *             
 *             .notification.success {
 *                 background-color: #4CAF50;
 *                 color: white;
 *             }
 *             
 *             .notification.warning {
 *                 background-color: #FF9800;
 *                 color: white;
 *             }
 *             
 *             .notification.error {
 *                 background-color: #F44336;
 *                 color: white;
 *             }
 *         `,
 *         animate: 'slideInRight',
 *         elements: {
 *             icon: {
 *                 html: getIconForType(type),
 *                 css: `
 *                     .notification-icon {
 *                         margin-right: 15px;
 *                         font-size: 24px;
 *                     }
 *                 `
 *             },
 *             content: {
 *                 html: message,
 *                 css: `
 *                     .notification-content {
 *                         flex-grow: 1;
 *                     }
 *                 `
 *             }
 *         }
 *     });
 *     
 *     // Notification nach der angegebenen Zeit automatisch ausblenden
 *     setTimeout(() => {
 *         UI.Animate(id, 'slideOutRight', 300, () => {
 *             UI.Destroy(id);
 *         });
 *     }, duration);
 *     
 *     // Hilfsfunktion für Icons
 *     function getIconForType(type) {
 *         switch(type) {
 *             case 'info': return '<i class="fas fa-info-circle"></i>';
 *             case 'success': return '<i class="fas fa-check-circle"></i>';
 *             case 'warning': return '<i class="fas fa-exclamation-triangle"></i>';
 *             case 'error': return '<i class="fas fa-times-circle"></i>';
 *             default: return '<i class="fas fa-bell"></i>';
 *         }
 *     }
 * }
 * 
 * // Verwendung
 * showNotification('Daten wurden gespeichert!', 'success');
 * showNotification('Warnung: Nicht gespeicherte Änderungen gehen verloren!', 'warning', 5000);
 */

/**
 * Beispiel 3: Ein Tab-Interface
 * 
 * @example
 * UI.Create({
 *     id: 'tabs',
 *     html: `
 *         <div class="tabs-container">
 *             <div class="tabs-navigation">{{navigation}}</div>
 *             <div class="tabs-content">{{content}}</div>
 *         </div>
 *     `,
 *     css: `
 *         .tabs-container {
 *             width: 100%;
 *             max-width: 800px;
 *             margin: 0 auto;
 *             background-color: #fff;
 *             border-radius: 5px;
 *             overflow: hidden;
 *             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
 *         }
 *     `,
 *     elements: {
 *         navigation: {
 *             html: `
 *                 <ul class="tabs-nav-list">
 *                     <li class="tab-item active" data-tab="tab1">Tab 1</li>
 *                     <li class="tab-item" data-tab="tab2">Tab 2</li>
 *                     <li class="tab-item" data-tab="tab3">Tab 3</li>
 *                 </ul>
 *             `,
 *             css: `
 *                 .tabs-navigation {
 *                     background-color: #f5f5f5;
 *                     border-bottom: 1px solid #ddd;
 *                 }
 *                 
 *                 .tabs-nav-list {
 *                     display: flex;
 *                     list-style: none;
 *                     margin: 0;
 *                     padding: 0;
 *                 }
 *                 
 *                 .tab-item {
 *                     padding: 15px 20px;
 *                     cursor: pointer;
 *                     transition: all 0.3s;
 *                 }
 *                 
 *                 .tab-item:hover {
 *                     background-color: #eee;
 *                 }
 *                 
 *                 .tab-item.active {
 *                     background-color: #fff;
 *                     border-bottom: 3px solid #2196F3;
 *                     font-weight: bold;
 *                 }
 *             `
 *         },
 *         content: {
 *             html: `
 *                 <div class="tab-content active" id="tab1">
 *                     <h3>Tab 1 Inhalt</h3>
 *                     <p>Dies ist der Inhalt von Tab 1...</p>
 *                 </div>
 *                 <div class="tab-content" id="tab2">
 *                     <h3>Tab 2 Inhalt</h3>
 *                     <p>Dies ist der Inhalt von Tab 2...</p>
 *                 </div>
 *                 <div class="tab-content" id="tab3">
 *                     <h3>Tab 3 Inhalt</h3>
 *                     <p>Dies ist der Inhalt von Tab 3...</p>
 *                 </div>
 *             `,
 *             css: `
 *                 .tab-content {
 *                     padding: 20px;
 *                     display: none;
 *                 }
 *                 
 *                 .tab-content.active {
 *                     display: block;
 *                 }
 *                 
 *                 .tab-content h3 {
 *                     margin-top: 0;
 *                 }
 *             `
 *         }
 *     }
 * });
 * 
 * // Tab-Wechsel-Funktionalität
 * UI.ClickFunction('.tab-item', ($element, dataAttributes) => {
 *     // Aktive Klasse bei Tabs entfernen
 *     document.querySelectorAll('.tab-item').forEach(tab => {
 *         tab.classList.remove('active');
 *     });
 *     
 *     // Aktive Klasse bei Tab-Inhalten entfernen
 *     document.querySelectorAll('.tab-content').forEach(content => {
 *         content.classList.remove('active');
 *     });
 *     
 *     // Aktiven Tab und Inhalt setzen
 *     $element.addClass('active');
 *     document.getElementById(dataAttributes.tab).classList.add('active');
 * });
 */

/**
 * Beispiel 4: Eine Fortschrittsanzeige mit Animation
 * 
 * @example
 * function showProgressBar(percentage, options = {}) {
 *     const id = options.id || 'progressBar';
 *     const color = options.color || '#4CAF50';
 *     const height = options.height || '10px';
 *     const duration = options.duration || 1000;
 *     
 *     // Fortschrittsanzeige erstellen, falls noch nicht vorhanden
 *     if (!UI.elements[id]) {
 *         UI.Create({
 *             id: id,
 *             html: `
 *                 <div class="progress-container">
 *                     <div class="progress-bar" style="width: 0%;"></div>
 *                 </div>
 *             `,
 *             css: `
 *                 .progress-container {
 *                     width: 100%;
 *                     background-color: #f5f5f5;
 *                     border-radius: ${height};
 *                     overflow: hidden;
 *                 }
 *                 
 *                 .progress-bar {
 *                     height: ${height};
 *                     background-color: ${color};
 *                     width: 0%;
 *                     transition: width ${duration}ms ease-in-out;
 *                 }
 *             `,
 *             appendTo: options.appendTo || 'ui'
 *         });
 *     }
 *     
 *     // Fortschritt aktualisieren
 *     const progressBar = UI.elements[id].querySelector('.progress-bar');
 *     progressBar.style.width = `${percentage}%`;
 *     
 *     return {
 *         update: (newPercentage) => {
 *             progressBar.style.width = `${newPercentage}%`;
 *         },
 *         destroy: () => {
 *             UI.Destroy(id);
 *         }
 *     };
 * }
 * 
 * // Verwendung
 * const progress = showProgressBar(0, {
 *     appendTo: '#loadingContainer',
 *     color: '#2196F3',
 *     height: '8px'
 * });
 * 
 * // Fortschritt aktualisieren
 * progress.update(50);
 * 
 * // Nach Abschluss entfernen
 * setTimeout(() => {
 *     progress.update(100);
 *     setTimeout(() => progress.destroy(), 1000);
 * }, 2000);
 */

/**
 * Beispiel 5: Ein Daten-Grid mit sortierbaren Spalten
 * 
 * @example
 * function createDataGrid(data, columns, options = {}) {
 *     const id = options.id || 'dataGrid';
 *     let sortField = options.sortField || columns[0].field;
 *     let sortDirection = options.sortDirection || 'asc';
 *     
 *     UI.Create({
 *         id: id,
 *         html: `
 *             <div class="grid-container">
 *                 <div class="grid-header">{{header}}</div>
 *                 <div class="grid-body">{{body}}</div>
 *             </div>
 *         `,
 *         css: `
 *             .grid-container {
 *                 width: 100%;
 *                 border: 1px solid #ddd;
 *                 border-radius: 4px;
 *                 overflow: hidden;
 *                 background-color: white;
 *             }
 *         `,
 *         appendTo: options.appendTo || 'ui',
 *         elements: {
 *             header: {
 *                 html: generateHeader(),
 *                 css: `
 *                     .grid-header {
 *                         display: flex;
 *                         background-color: #f5f5f5;
 *                         border-bottom: 2px solid #ddd;
 *                         font-weight: bold;
 *                     }
 *                     
 *                     .grid-cell {
 *                         flex: 1;
 *                         padding: 12px 15px;
 *                         position: relative;
 *                     }
 *                     
 *                     .grid-cell.sortable {
 *                         cursor: pointer;
 *                     }
 *                     
 *                     .sort-icon {
 *                         margin-left: 5px;
 *                     }
 *                 `
 *             },
 *             body: {
 *                 html: generateBody(),
 *                 css: `
 *                     .grid-body {
 *                         max-height: 400px;
 *                         overflow-y: auto;
 *                     }
 *                     
 *                     .grid-row {
 *                         display: flex;
 *                         border-bottom: 1px solid #eee;
 *                     }
 *                     
 *                     .grid-row:last-child {
 *                         border-bottom: none;
 *                     }
 *                     
 *                     .grid-row:hover {
 *                         background-color: #f9f9f9;
 *                     }
 *                     
 *                     .grid-cell {
 *                         flex: 1;
 *                         padding: 10px 15px;
 *                         overflow: hidden;
 *                         text-overflow: ellipsis;
 *                     }
 *                 `
 *             }
 *         }
 *     });
 *     
 *     // Sortier-Funktionalität
 *     UI.ClickFunction('.grid-header .grid-cell.sortable', ($element, dataAttributes) => {
 *         const field = dataAttributes.field;
 *         
 *         // Sortierrichtung umkehren, wenn das gleiche Feld erneut geklickt wird
 *         if (field === sortField) {
 *             sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
 *         } else {
 *             sortField = field;
 *             sortDirection = 'asc';
 *         }
 *         
 *         // Header und Body aktualisieren
 *         UI.Update(`${id}-header`, generateHeader());
 *         UI.Update(`${id}-body`, generateBody());
 *     });
 *     
 *     // Header-HTML generieren
 *     function generateHeader() {
 *         let html = '';
 *         
 *         columns.forEach(column => {
 *             const sortable = column.sortable !== false ? 'sortable' : '';
 *             const sortIcon = column.field === sortField
 *                 ? `<span class="sort-icon">${sortDirection === 'asc' ? '▲' : '▼'}</span>`
 *                 : '';
 *             
 *             html += `
 *                 <div class="grid-cell ${sortable}" data-field="${column.field}">
 *                     ${column.header} ${sortIcon}
 *                 </div>
 *             `;
 *         });
 *         
 *         return html;
 *     }
 *     
 *     // Body-HTML generieren
 *     function generateBody() {
 *         // Daten sortieren
 *         const sortedData = [...data].sort((a, b) => {
 *             let comparison = 0;
 *             const valueA = a[sortField];
 *             const valueB = b[sortField];
 *             
 *             if (valueA < valueB) {
 *                 comparison = -1;
 *             } else if (valueA > valueB) {
 *                 comparison = 1;
 *             }
 *             
 *             return sortDirection === 'asc' ? comparison : -comparison;
 *         });
 *         
 *         let html = '';
 *         
 *         sortedData.forEach(item => {
 *             html += '<div class="grid-row">';
 *             
 *             columns.forEach(column => {
 *                 const value = item[column.field] || '';
 *                 const formattedValue = column.formatter 
 *                     ? column.formatter(value, item) 
 *                     : value;
 *                 
 *                 html += `<div class="grid-cell">${formattedValue}</div>`;
 *             });
 *             
 *             html += '</div>';
 *         });
 *         
 *         return html;
 *     }
 *     
 *     // API zum Aktualisieren der Daten zurückgeben
 *     return {
 *         updateData: (newData) => {
 *             data = newData;
 *             UI.Update(`${id}-body`, generateBody());
 *         },
 *         sort: (field, direction) => {
 *             sortField = field;
 *             sortDirection = direction || 'asc';
 *             UI.Update(`${id}-header`, generateHeader());
 *             UI.Update(`${id}-body`, generateBody());
 *         },
 *         destroy: () => {
 *             UI.Destroy(id);
 *         }
 *     };
 * }
 * 
 * // Verwendung
 * const userData = [
 *     { id: 1, name: 'Max Mustermann', age: 25, city: 'Berlin' },
 *     { id: 2, name: 'Erika Musterfrau', age: 32, city: 'Hamburg' },
 *     { id: 3, name: 'John Doe', age: 28, city: 'München' }
 * ];
 * 
 * const columns = [
 *     { field: 'id', header: 'ID', sortable: true },
 *     { field: 'name', header: 'Name', sortable: true },
 *     { field: 'age', header: 'Alter', sortable: true },
 *     { field: 'city', header: 'Stadt', sortable: true }
 * ];
 * 
 * const grid = createDataGrid(userData, columns, {
 *     id: 'userGrid',
 *     sortField: 'name',
 *     appendTo: '#gridContainer'
 * });
 */

/**
 * Beispiel 6: Ein Modal-Dialog mit Hintergrund-Overlay
 * 
 * @example
 * function showModal(options = {}) {
 *     const id = options.id || `modal-${Date.now()}`;
 *     const title = options.title || 'Information';
 *     const content = options.content || '';
 *     const width = options.width || '500px';
 *     const closable = options.closable !== false;
 *     const onClose = options.onClose || (() => {});
 *     
 *     UI.Create({
 *         id: id,
 *         html: `
 *             <div class="modal-overlay">
 *                 <div class="modal-container" style="width: ${width};">
 *                     <div class="modal-header">{{header}}</div>
 *                     <div class="modal-body">{{body}}</div>
 *                     <div class="modal-footer">{{footer}}</div>
 *                 </div>
 *             </div>
 *         `,
 *         css: `
 *             .modal-overlay {
 *                 position: fixed;
 *                 top: 0;
 *                 left: 0;
 *                 right: 0;
 *                 bottom: 0;
 *                 background-color: rgba(0, 0, 0, 0.5);
 *                 display: flex;
 *                 justify-content: center;
 *                 align-items: center;
 *                 z-index: 9999;
 *             }
 *             
 *             .modal-container {
 *                 background-color: white;
 *                 border-radius: 5px;
 *                 box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
 *                 max-width: 90%;
 *                 max-height: 90vh;
 *                 display: flex;
 *                 flex-direction: column;
 *                 overflow: hidden;
 *             }
 *         `,
 *         animate: 'fadeIn',
 *         appendTo: 'ui',
 *         elements: {
 *             header: {
 *                 html: `
 *                     <h3 class="modal-title">${title}</h3>
 *                     ${closable ? '<button class="modal-close">&times;</button>' : ''}
 *                 `,
 *                 css: `
 *                     .modal-header {
 *                         display: flex;
 *                         justify-content: space-between;
 *                         align-items: center;
 *                         padding: 15px;
 *                         border-bottom: 1px solid #eee;
 *                     }
 *                     
 *                     .modal-title {
 *                         margin: 0;
 *                         font-size: 18px;
 *                     }
 *                     
 *                     .modal-close {
 *                         background: none;
 *                         border: none;
 *                         font-size: 24px;
 *                         cursor: pointer;
 *                         color: #999;
 *                     }
 *                     
 *                     .modal-close:hover {
 *                         color: #333;
 *                     }
 *                 `
 *             },
 *             body: {
 *                 html: content,
 *                 css: `
 *                     .modal-body {
 *                         padding: 20px;
 *                         overflow-y: auto;
 *                         max-height: 60vh;
 *                     }
 *                 `
 *             },
 *             footer: {
 *                 html: `
 *                     <button class="btn-cancel">Schließen</button>
 *                     ${options.confirmButton ? 
 *                         `<button class="btn-confirm">${options.confirmButton}</button>` : ''}
 *                 `,
 *                 css: `
 *                     .modal-footer {
 *                         padding: 15px;
 *                         border-top: 1px solid #eee;
 *                         display: flex;
 *                         justify-content: flex-end;
 *                         gap: 10px;
 *                     }
 *                     
 *                     button {
 *                         padding: 8px 15px;
 *                         border: none;
 *                         border-radius: 3px;
 *                         cursor: pointer;
 *                     }
 *                     
 *                     .btn-cancel {
 *                         background-color: #f5f5f5;
 *                     }
 *                     
 *                     .btn-confirm {
 *                         background-color: #4CAF50;
 *                         color: white;
 *                     }
 *                 `
 *             }
 *         }
 *     });
 *     
 *     // Event-Handler für das Schließen
 *     function closeModal() {
 *         UI.Animate(id, 'fadeOut', 300, () => {
 *             UI.Destroy(id);
 *             onClose();
 *         });
 *     }
 *     
 *     UI.ClickFunction(`#${id} .modal-close, #${id} .btn-cancel`, closeModal);
 *     
 *     if (closable) {
 *         UI.ClickFunction(`#${id} .modal-overlay`, (e, data, event) => {
 *             if (event.target.classList.contains('modal-overlay')) {
 *                 closeModal();
 *             }
 *         });
 *     }
 *     
 *     // Event-Handler für den Bestätigungs-Button
 *     if (options.confirmButton && options.onConfirm) {
 *         UI.ClickFunction(`#${id} .btn-confirm`, () => {
 *             options.onConfirm();
 *             if (options.closeOnConfirm !== false) {
 *                 closeModal();
 *             }
 *         });
 *     }
 *     
 *     // API zurückgeben
 *     return {
 *         close: closeModal,
 *         setContent: (newContent) => {
 *             UI.Update(`${id}-body`, newContent);
 *         },
 *         setTitle: (newTitle) => {
 *             const titleElement = document.querySelector(`#${id} .modal-title`);
 *             if (titleElement) {
 *                 titleElement.textContent = newTitle;
 *             }
 *         }
 *     };
 * }
 * 
 * // Verwendung
 * const modal = showModal({
 *     title: 'Bestätigung erforderlich',
 *     content: '<p>Möchten Sie diese Aktion wirklich durchführen?</p>',
 *     confirmButton: 'Ja, fortfahren',
 *     onConfirm: () => {
 *         console.log('Aktion bestätigt!');
 *     },
 *     onClose: () => {
 *         console.log('Modal geschlossen');
 *     }
 * });
 */
