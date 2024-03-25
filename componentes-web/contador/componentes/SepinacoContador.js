class SepinacoContador extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.count = 0; // Estado inicial del contador

        // Elementos del DOM
        this.countDisplay = document.createElement('span');
        this.increaseButton = this.createButton('+', this.increaseCount.bind(this));
        this.decreaseButton = this.createButton('-', this.decreaseCount.bind(this));
        this.resetButton = this.createButton('Reset', this.resetCount.bind(this));

        // Estilos básicos
        const styles = `
            :host {
                display: block;
                font-family: sans-serif;
                text-align: center;
            }
            span {
                margin: 0 10px;
                font-size: 20px;
            }
        `;

        // Aplicamos los estilos y elementos al shadow DOM
        const styleEl = document.createElement('style');
        styleEl.textContent = styles;
        this.shadowRoot.append(styleEl, this.decreaseButton, this.countDisplay, this.increaseButton, this.resetButton);

        this.updateCountDisplay();
    }

    // Métodos para manejar los eventos de los botones
    increaseCount() {
        this.count++;
        this.updateCountDisplay();
        this.dispatchEvent(new CustomEvent('change', { detail: this.count }));
    }

    decreaseCount() {
        this.count--;
        this.updateCountDisplay();
        this.dispatchEvent(new CustomEvent('change', { detail: this.count }));
    }

    resetCount() {
        this.count = 0;
        this.updateCountDisplay();
        this.dispatchEvent(new CustomEvent('change', { detail: this.count }));
    }

    // Actualiza el display del contador
    updateCountDisplay() {
        this.countDisplay.textContent = this.count;
    }

    // Crea botones de forma programática
    createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }
}

// Definimos el custom element
customElements.define('sepinaco-contador', SepinacoContador);