class UI {
    static Class = 'ui';
    static elements = {};
    static eventHandlers = {};
    static scssCache = {};

    // Set the HTML Tag
    static Element(id) {
        this.Class = id;
    }

    // load scss files
    static async LoadScss(filePath, forceReload = false) {
        if (this.scssCache[filePath] && !forceReload) {
            return this.scssCache[filePath];
        }
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const scssContent = await response.text();
            const processedCss = this.processSCSS(scssContent);
            this.scssCache[filePath] = processedCss;
            return processedCss;
        } catch (error) {
            console.error(`Fehler beim Laden der SCSS-Datei '${filePath}':`, error);
            return null;
        }
    }

    static async ApplyScssFile(filePath, forceReload = false) {
        const css = await this.LoadScss(filePath, forceReload);
        if (css) {
            this.Css(css);
            return true;
        }
        return false;
    }

    static async LoadMultipleScss(filePaths, forceReload = false) {
        const promises = filePaths.map(filePath => this.LoadScss(filePath, forceReload));
        const results = await Promise.allSettled(promises);
        
        let combinedCss = '';
        results.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value) {
                combinedCss += result.value + '\n';
            } else {
                console.warn(`Fehler beim Laden der Datei '${filePaths[index]}':`, result.reason);
            }
        });
        
        return combinedCss;
    }

    static async ApplyMultipleScssFiles(filePaths, forceReload = false) {
        const combinedCss = await this.LoadMultipleScss(filePaths, forceReload);
        if (combinedCss) {
            this.Css(combinedCss);
            return true;
        }
        return false;
    }

    static ClearScssCache(filePath = null) {
        if (filePath) {
            delete this.scssCache[filePath];
        } else {
            this.scssCache = {};
        }
    }

    // Create UI
    static Create({ id, html, css, appendTo = null, animate = null, elements = null, scssFile = null }) {
        if (this.elements[id]) {
            return console.warn(`UI mit ID '${id}' existiert bereits.`);
        }
        if (scssFile) {
            this.ApplyScssFile(scssFile);
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
        // Helper function to find matching closing brace
        function findClosingBrace(text, startIndex) {
            let braceCount = 1;
            for (let i = startIndex + 1; i < text.length; i++) {
                if (text[i] === '{') braceCount++;
                else if (text[i] === '}') braceCount--;
                
                if (braceCount === 0) return i;
            }
            return -1;
        }
        function extractRules(content) {
            let cleanContent = content;
            let index = 0;
            while (index < cleanContent.length) {
                const openBrace = cleanContent.indexOf('{', index);
                if (openBrace === -1) break;
                const closeBrace = findClosingBrace(cleanContent, openBrace);
                if (closeBrace === -1) break;
                let selectorStart = openBrace;
                while (selectorStart > 0 && cleanContent[selectorStart - 1] !== '}' && cleanContent[selectorStart - 1] !== ';') {
                    selectorStart--;
                }
                cleanContent = cleanContent.substring(0, selectorStart) + cleanContent.substring(closeBrace + 1);
                index = 0;
            }
            return cleanContent
                .split(';')
                .map(rule => rule.trim())
                .filter(rule => rule.length > 0)
                .join('; ');
        }
        function processBlock(selector, content, result = []) {
            const directRules = extractRules(content);
            if (directRules.length > 0) {
                result.push({
                    selector: selector,
                    rules: directRules
                });
            }
            let index = 0;
            let inComment = false;
            while (index < content.length) {
                if (content.substr(index, 2) === '/*') {
                    inComment = true;
                    index += 2;
                    continue;
                }
                if (inComment) {
                    if (content.substr(index, 2) === '*/') {
                        inComment = false;
                        index += 2;
                    } else {
                        index++;
                    }
                    continue;
                }
                if (content[index] === '{') {
                    let selectorStart = index - 1;
                    while (selectorStart >= 0 && content[selectorStart] !== '}' && content[selectorStart] !== ';') {
                        selectorStart--;
                    }
                    selectorStart++;
                    const nestedSelector = content.substring(selectorStart, index).trim();
                    if (!nestedSelector) {
                        index++;
                        continue;
                    }
                    const closeBraceIndex = findClosingBrace(content, index);
                    if (closeBraceIndex === -1) {
                        index++;
                        continue;
                    }
                    const nestedContent = content.substring(index + 1, closeBraceIndex);
                    let fullSelector;
                    if (nestedSelector.includes('&')) {
                        fullSelector = nestedSelector.replace(/&/g, selector);
                    } else {
                        fullSelector = `${selector} ${nestedSelector}`;
                    }
                    processBlock(fullSelector, nestedContent, result);
                    index = closeBraceIndex + 1;
                } else {
                    index++;
                }
            }
            
            return result;
        }
        function processScss(scss) {
            const results = [];
            let index = 0;
            while (index < scss.length) {
                while (index < scss.length && /\s/.test(scss[index])) {
                    index++;
                }
                if (index >= scss.length) break;
                if (scss.substr(index, 2) === '/*') {
                    const endComment = scss.indexOf('*/', index + 2);
                    if (endComment !== -1) {
                        index = endComment + 2;
                    } else {
                        break;
                    }
                    continue;
                }
                if (scss.substr(index, 2) === '//') {
                    const endLine = scss.indexOf('\n', index);
                    if (endLine !== -1) {
                        index = endLine + 1;
                    } else {
                        break;
                    }
                    continue;
                }
                const braceIndex = scss.indexOf('{', index);
                if (braceIndex === -1) break;
                const selector = scss.substring(index, braceIndex).trim();
                if (!selector || selector.startsWith('@') || selector.startsWith('//')) {
                    if (selector.startsWith('@')) {
                        const closeBraceIndex = findClosingBrace(scss, braceIndex);
                        if (closeBraceIndex !== -1) {
                            index = closeBraceIndex + 1;
                        } else {
                            index = braceIndex + 1;
                        }
                    } else {
                        index = braceIndex + 1;
                    }
                    continue;
                }
                const closeBraceIndex = findClosingBrace(scss, braceIndex);
                if (closeBraceIndex === -1) break;
                const blockContent = scss.substring(braceIndex + 1, closeBraceIndex);
                const blockResults = processBlock(selector, blockContent);
                results.push(...blockResults);
                index = closeBraceIndex + 1;
            }
            return results;
        }
        function generateCss(results) {
            return results.map(item => {
                if (!item.rules) return '';
                return `${item.selector} { ${item.rules}; }`;
            }).filter(css => css.length > 0).join('\n');
        }
        const processed = processScss(scss);
        return generateCss(processed);
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
