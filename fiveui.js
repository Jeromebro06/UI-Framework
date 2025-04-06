class UI {
    static Class = 'ui';
    static elements = {};
    static eventHandlers = {};

    // Set the HTML Tag
    static Element(id) {
        this.Class = id;
    }

    // Create UI
    static Create({ id, html, css, appendTo = null, animate = null, elements = null }) {
        if (this.elements[id]) {
            return console.warn(`UI mit ID '${id}' existiert bereits.`);
        }
        if (css) {
            this.Css(css);
        }
        const container = appendTo 
            ? document.querySelector(`.${appendTo}`) 
            : document.querySelector(`.${this.Class}`);
        if (!container) {
            return console.error(`Kein Element mit der Klasse '${appendTo || this.Class}' gefunden.`);
        }
        const element = document.createElement('div');
        element.id = id;
        let originalHtml = html;
        if (elements) {
            element.innerHTML = originalHtml;
            this.elements[id] = element;
            container.appendChild(element);
            for (const key in elements) {
                if (elements.hasOwnProperty(key)) {
                    const subElement = elements[key];
                    const subId = `${id}-${key}`;
                    const placeholder = `{{${key}}}`;
                    if (originalHtml.includes(placeholder)) {
                        // Verschachteltes Element erstellen
                        this.CreateNestedElement({
                            id: subId,
                            parentId: id,
                            placeholder,
                            config: subElement
                        });
                    }
                }
            }
        } else {
            element.innerHTML = originalHtml;
            this.elements[id] = element;
            container.appendChild(element);
        }
        if (animate && this.elements[id]) {
            this.Animate(id, animate);
        }
        return this.elements[id];
    }

    // Hilfsmethode zum Erstellen verschachtelter Elemente
    static CreateNestedElement({ id, parentId, placeholder, config }) {
        if (!this.elements[parentId]) {
            return console.warn(`Übergeordnetes Element mit ID '${parentId}' existiert nicht.`);
        }
        const nestedElement = document.createElement('div');
        nestedElement.id = id;
        nestedElement.innerHTML = config.html || '';
        if (config.css) {
            this.Css(config.css);
        }
        this.elements[id] = nestedElement;
        const parentElement = this.elements[parentId];
        parentElement.innerHTML = parentElement.innerHTML.replace(placeholder, `<div id="${id}"></div>`);
        const mountPoint = document.getElementById(id);
        if (mountPoint) {
            mountPoint.innerHTML = nestedElement.innerHTML;
            mountPoint.className = nestedElement.className;
            this.elements[id] = mountPoint;
            if (config.animate) {
                this.Animate(id, config.animate);
            }
            if (config.elements) {
                let originalHtml = config.html;
                for (const subKey in config.elements) {
                    if (config.elements.hasOwnProperty(subKey)) {
                        const subElement = config.elements[subKey];
                        const subId = `${id}-${subKey}`;
                        const subPlaceholder = `{{${subKey}}}`;
                        
                        if (originalHtml.includes(subPlaceholder)) {
                            this.CreateNestedElement({
                                id: subId,
                                parentId: id,
                                placeholder: subPlaceholder,
                                config: subElement
                            });
                        }
                    }
                }
            }
        } else {
            console.error(`Mount-Punkt für Element mit ID '${id}' konnte nicht gefunden werden.`);
        }
    }

    // Update Elements
    static Update(id, newHtml) {
        if (!this.elements[id]) {
            return console.warn(`UI mit ID '${id}' existiert nicht.`);
        }
        this.elements[id].innerHTML = newHtml;
    }

    // Destroy UI
    static Destroy(id) {
        if (!this.elements[id]) {
            return
        }
        this.elements[id].remove();
        delete this.elements[id];
    }

    // Add CSS Styles
    static Css(css) {
        let style = document.getElementById('ui-styles');
        if (!style) {
            style = document.createElement('style');
            style.id = 'ui-styles';
            document.head.appendChild(style);
        }
        const processedCss = this.processSCSS(css);
        style.innerHTML += processedCss;
    }

    static processSCSS(scss) {
        let processedScss = scss;
        const selectorBlocks = processedScss.match(/([^{}]+)\s*\{([^{}]+(?:\{[^{}]*\}[^{}]*)*)\}/g) || [];
        for (const block of selectorBlocks) {
            const selectorMatch = block.match(/([^{}]+)\s*\{/);
            if (!selectorMatch) continue;
            const parentSelector = selectorMatch[1].trim();
            let blockContent = block.substring(block.indexOf('{') + 1, block.lastIndexOf('}'));
            const nestedBlockRegex = /(&[^{}]*)\s*\{([^{}]*)\}/g;
            let nestedMatch;
            let processedBlock = blockContent;
            while ((nestedMatch = nestedBlockRegex.exec(blockContent)) !== null) {
                const nestedSelector = nestedMatch[1].trim().replace(/&/g, parentSelector);
                const nestedRules = nestedMatch[2].trim();
                processedBlock = processedBlock.replace(nestedMatch[0], '');
                processedScss += `\n${nestedSelector} { ${nestedRules} }`;
            }
            const cleanedRules = processedBlock
                .split(';')
                .map(rule => rule.trim())
                .filter(rule => rule.length > 0)
                .join('; ');
                
            const newBlock = `${parentSelector} { ${cleanedRules}; }`;
            processedScss = processedScss.replace(block, newBlock);
        }
        return processedScss.replace(/([^{}]+)\s*\{\s*;\s*\}/g, '');
    }
    
    // Bind data to UI elements
    static BindData(id, data) {
        if (!this.elements[id]) {
            return console.warn(`UI mit ID '${id}' existiert nicht.`);
        }
        let html = this.elements[id].innerHTML;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const placeholder = `{{${key}}}`;
                const value = data[key];
                html = html.replace(new RegExp(placeholder, 'g'), value);
            }
        }
        this.elements[id].innerHTML = html;
    }

    // Set default page configuration
    static Configurate(enable) {
        if (enable) {
            this.Css(`
                body {
                    margin: 0;
                    padding: 0;
                }
            `);
        }
    }

    // Click function to simplify event handling
    static ClickFunction(selector, callback, options = {}) {
        const handlerId = `click_${selector}`;
        if (this.eventHandlers[handlerId]) {
            $(document).off('click', selector, this.eventHandlers[handlerId]);
        }
        this.eventHandlers[handlerId] = function(event) {
            if (options.preventDefault) {
                event.preventDefault();
            }
            if (options.stopPropagation) {
                event.stopPropagation();
            }
            const $element = $(this);
            const dataAttributes = {};
            if ($element[0] && $element[0].dataset) {
                Object.keys($element[0].dataset).forEach(key => {
                    dataAttributes[key] = $element.data(key);
                });
            }
            callback($element, dataAttributes, event);
        };
        $(document).on('click', selector, this.eventHandlers[handlerId]);
    }
    
    // Remove click handler
    static RemoveClickFunction(selector) {
        const handlerId = `click_${selector}`;
        if (this.eventHandlers[handlerId]) {
            $(document).off('click', selector, this.eventHandlers[handlerId]);
            delete this.eventHandlers[handlerId];
        }
    }

    // Foreach simplify
    static ItemForEach({ id, template, data, css, appendTo = null, processData = null }) {
        if (!Array.isArray(data)) {
            return console.error('Daten müssen ein Array sein.');
        }
    
        if (typeof processData === 'function') {
            const additionalData = processData();
            if (Array.isArray(additionalData)) {
                data = [...data, ...additionalData];
            } else {
                console.error('Die verarbeiteten Daten sind kein Array.');
            }
        }
    
        const container = appendTo 
            ? document.querySelector(appendTo) 
            : document.querySelector(`.${this.Class}`);
    
        if (!container) {
            return console.error(`Kein Element mit dem Selektor '${appendTo || this.Class}' gefunden.`);
        }
        let targetElement;
        if (appendTo) {
            targetElement = container;
        } else {
            if (this.elements[id]) {
                this.elements[id].innerHTML = '';
                targetElement = this.elements[id];
            } else {
                const element = document.createElement('div');
                element.id = id;
                container.appendChild(element);
                this.elements[id] = element;
                targetElement = element;
            }
        }
        if (css) {
            this.Css(css);
        }
        let html = '';
        data.forEach(item => {
            let itemHtml = template;
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    const placeholder = `{{${key}}}`;
                    const value = item[key];
                    itemHtml = itemHtml.replace(new RegExp(placeholder, 'g'), value);
                }
            }
            html += itemHtml;
        });
        targetElement.innerHTML = html;
    }
    

    // Simple button creation
    static Button({ id, btnClass = null, text, onClick, appendTo = null, css = '' }) {
        if (btnClass) {
            const buttons = document.querySelectorAll(`.${btnClass}`);    
            if (buttons.length === 0) {
                return console.warn(`Kein Button mit der Klasse '${btnClass}' gefunden.`);
            }
            buttons.forEach(button => {
                if (text) {
                    button.innerHTML = text;
                }
                button.addEventListener('click', onClick);
            });
        } else {
            const button = document.createElement('button');
            button.id = id;
            button.innerHTML = text;
            const buttonClass = `btn-${id}`;
            button.classList.add(buttonClass);
            button.addEventListener('click', onClick);
            if (appendTo) {
                const container = document.querySelector(appendTo);
                if (!container) {
                    return console.error(`Kein Element mit der Klasse '${appendTo}' gefunden.`);
                }
                container.appendChild(button);
            } else {
                document.body.appendChild(button);
            }
            if (css) {
                this.Css(`
                    .${buttonClass} { ${css} }
                `);
            }
        }
    }

    // Delete Div Content
    static Empty(selector) {
        const container = document.querySelector(selector);
        if (container) {
            container.innerHTML = '';
        } else {
            console.warn(`Kein Element mit dem Selektor '${selector}' gefunden.`);
        }
    }

    // POST request to Server
    static async PostRequest({ action, data, expectsResponse = false }) {
        const url = `https://${GetParentResourceName()}/${action}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                return expectsResponse ? null : undefined;
            }
            if (!expectsResponse) {
                return undefined;
            }
            const responseData = await response.json().catch(() => null);
            if (!responseData) {
                return null;
            }
            return responseData;
        } catch (error) {
            return expectsResponse ? null : undefined;
        }
    }   
    
    // Animation
    static Animate(id, animation, duration = 300, callback = null) {
        if (!this.elements[id]) {
            return console.warn(`UI mit ID '${id}' existiert nicht.`);
        }
        const animations = {
            fadeIn: { opacity: [0, 1] },
            fadeOut: { opacity: [1, 0] },
            slideIn: { transform: ['translateY(100px)', 'translateY(0)'] },
            slideOut: { transform: ['translateY(0)', 'translateY(100px)'] },
            slideInLeft: { transform: ['translateX(-100%)', 'translateX(0)'], opacity: [0, 1] },
            slideInRight: { transform: ['translateX(100%)', 'translateX(0)'], opacity: [0, 1] },
            slideUp: { transform: ['translateY(100%)', 'translateY(0)'], opacity: [0, 1] },
            slideDown: { transform: ['translateY(0)', 'translateY(100%)'], opacity: [1, 0] },
            slideUpDown: { transform: ['translateY(-100%)', 'translateY(0)'], opacity: [0, 1] },
            slideOutRight: { transform: ['translateX(0)', 'translateX(100%)'], opacity: [1, 0] },
            slideOutLeft: { transform: ['translateX(0)', 'translateX(-100%)'], opacity: [1, 0] },
            loadingbar: { width: ['100%', '0%'] },
            rotation: [
                { transform: 'translate(-50%, -50%) rotate(110deg)' },
                { transform: 'translate(-50%, -50%) rotate(180deg)' },
                { transform: 'translate(-50%, -50%) rotate(45deg)' }
            ],
            rotation2: [
                { transform: 'translate(-50%, -50%) rotate(50deg)' },
                { transform: 'translate(-50%, -50%) rotate(180deg)' },
                { transform: 'translate(-50%, -50%) rotate(90deg)' }
            ]
        };
        
        const element = this.elements[id];
        const animationOptions = animations[animation] || animation;
        element.animate(animationOptions, {
            duration: duration,
            easing: 'ease-in-out',
            fill: 'forwards'
        }).onfinish = callback;
    }
}
