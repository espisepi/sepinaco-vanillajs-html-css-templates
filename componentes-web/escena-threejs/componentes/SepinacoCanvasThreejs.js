// Es necesario poner en el html:
// <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>

class SepinacoCanvasThreejs extends HTMLElement {
    constructor() {
        super();
        // https://lenguajejs.com/webcomponents/shadow-dom/que-es-shadow-dom/
        this.attachShadow({ mode: 'open' });

        this.contenedor = this.shadowRoot;
        this.escena = new THREE.Scene();
        this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderizador = new THREE.WebGLRenderer();
        this.cubo = null;

        // Agregar OrbitControls
        this.controles = null;

        this.iniciar();
        this.iniciarOrbitControls();
    }

    iniciarOrbitControls() {
        // Inicializar OrbitControls
        this.controles = new THREE.OrbitControls(this.camara, this.renderizador.domElement);
        // Habilitar amortiguación (damping) y configurar el factor de amortiguación
        this.controles.enableDamping = true;
        this.controles.dampingFactor = 0.05;
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

        // Actualizar los controles en cada frame
        this.controles?.update();

        this.renderizador.render(this.escena, this.camara);
    }
}

// Definimos el custom element
customElements.define('sepinaco-canvas-threejs', SepinacoCanvasThreejs);