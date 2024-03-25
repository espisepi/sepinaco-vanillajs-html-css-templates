Para crear una clase que te permita cambiar entre `OrbitControls` y `FlyControls` utilizando scripts CDN, necesitarás incluir ambos scripts en tu HTML. Aquí te muestro cómo incluirlos y luego cómo estructurar la clase para alternar entre los dos controles.

1. Primero, incluye los siguientes scripts en tu HTML para `OrbitControls` y `FlyControls` junto con `three.min.js`:

```html
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/FlyControls.js"></script>
```

2. Ahora, aquí tienes una nueva clase que incluye un método para cambiar entre `OrbitControls` y `FlyControls`. La clase inicializará con `OrbitControls` por defecto y podrás cambiar a `FlyControls` llamando al método `cambiarControles`.

```javascript
class ControlesCanvasThreejs extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.contenedor = this.shadowRoot;
        this.escena = new THREE.Scene();
        this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderizador = new THREE.WebGLRenderer({antialias: true});
        this.controles = null;
        this.tipoControlActual = 'orbit';

        this.iniciar();
        this.iniciarControles();
    }

    iniciar() {
        this.camara.position.set(0, 20, 100);
        this.renderizador.setSize(window.innerWidth, window.innerHeight);
        this.contenedor.appendChild(this.renderizador.domElement);

        const geometria = new THREE.BoxGeometry(20, 20, 20);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cubo = new THREE.Mesh(geometria, material);
        this.escena.add(cubo);

        this.ajustarRenderizador();
        this.animar();
    }

    iniciarControles(tipo = 'orbit') {
        if (this.controles) {
            this.controles.dispose();
        }

        switch (tipo) {
            case 'fly':
                this.controles = new THREE.FlyControls(this.camara, this.renderizador.domElement);
                this.controles.movementSpeed = 50;
                this.controles.domElement = this.renderizador.domElement;
                this.controles.rollSpeed = Math.PI / 24;
                this.controles.autoForward = false;
                this.controles.dragToLook = true;
                break;
            case 'orbit':
            default:
                this.controles = new THREE.OrbitControls(this.camara, this.renderizador.domElement);
                this.controles.enableDamping = true;
                this.controles.dampingFactor = 0.05;
                break;
        }

        this.tipoControlActual = tipo;
    }

    cambiarControles() {
        const nuevoTipo = this.tipoControlActual === 'orbit' ? 'fly' : 'orbit';
        this.iniciarControles(nuevoTipo);
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

        if (this.controles && this.tipoControlActual === 'fly') {
            this.controles.update(0.5);
        } else if (this.controles && this.tipoControlActual === 'orbit') {
            this.controles.update(); // sólo necesario si enableDamping = true, o si autoRotate = true
        }

        this.renderizador.render(this.escena, this.camara);
    }
}

customElements.define('controles-canvas-threejs', ControlesCanvasThreejs);
```

Este código define una clase personalizada de elemento web que puede alternar entre `OrbitControls` y `FlyControls` mediante el método `cambiarControles()`. La lógica para alternar entre los controles se maneja dentro del método `iniciarControles`, que crea instancias de los controles basados en el tipo especificado. El método `cambiarControles` alterna entre estos tipos cada vez que se llama. La inicialización predeterminada es con `OrbitControls`, pero puedes cambiar fácilmente a `FlyControls` llamando a `cambiarControles()` después de crear una instancia de tu componente.

Recuerda incluir los scripts necesarios en tu