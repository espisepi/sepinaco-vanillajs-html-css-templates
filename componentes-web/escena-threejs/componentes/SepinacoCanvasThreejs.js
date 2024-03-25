class SepinacoCanvasThreejs extends HTMLElement {
    constructor() {
        super();
        // https://lenguajejs.com/webcomponents/shadow-dom/que-es-shadow-dom/
        this.attachShadow({ mode: 'open' });

        // SepinacoCanvasThreejs
        this.contenedor = this.shadowRoot;
        console.log(this.shadowRoot);
        this.escena = new THREE.Scene();
        this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderizador = new THREE.WebGLRenderer();
        this.cubo = null;

        this.iniciar();
    }

    iniciar() {
        this.camara.position.z = 5;
        this.renderizador.setSize(window.innerWidth, window.innerHeight);
        this.contenedor.appendChild(this.renderizador.domElement);

        // Añadir un objeto a la escena
        const geometria = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cubo = new THREE.Mesh(geometria, material);
        this.escena.add(this.cubo);

        this.ajustarRenderizador();
        this.animar();
    }

    ajustarRenderizador() {
        window.addEventListener('resize', () => {
            this.camara.aspect = window.innerWidth / window.innerHeight;
            this.camara.updateProjectionMatrix();
            this.renderizador.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animar() {
        requestAnimationFrame(() => this.animar());
        this.cubo.rotation.x += 0.01;
        this.cubo.rotation.y += 0.01;
        this.renderizador.render(this.escena, this.camara);
    }
}

// Definimos el custom element
customElements.define('sepinaco-canvas-threejs', SepinacoCanvasThreejs);