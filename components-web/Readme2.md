Para crear un componente reutilizable de una escena Three.js utilizando VanillaJS, primero necesitaremos tener una estructura básica de un componente que pueda encapsular la inicialización de Three.js y pueda ser utilizado en cualquier parte de tu aplicación HTML.

El componente incluirá la inicialización de una escena, una cámara y un renderizador, además de un simple cubo como ejemplo de objeto en la escena. También incorporará la capacidad de redimensionar la vista automáticamente cuando el tamaño de la ventana cambie.

A continuación, te muestro cómo podrías estructurar este componente:

1. **HTML Base**:
   Para usar nuestro componente, primero necesitas tener un elemento contenedor en tu HTML donde el componente de Three.js será insertado.

   ```html
   <!DOCTYPE html>
   <html lang="es">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Componente Three.js Reutilizable</title>
       <style>
           body { margin: 0; }
           #threejs-container { width: 100%; height: 100vh; }
       </style>
   </head>
   <body>
       <div id="threejs-container"></div>
       <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
       <script src="miComponenteThree.js"></script>
       <script>
           // Inicialización del componente
           const container = document.getElementById('threejs-container');
           const miComponente = new MiComponenteThree(container);
           miComponente.iniciar();
       </script>
   </body>
   </html>
   ```

2. **JavaScript (miComponenteThree.js)**:
   El componente en sí estará contenido en un archivo JavaScript separado (`miComponenteThree.js`). Este script define una clase `MiComponenteThree` que encapsula toda la funcionalidad necesaria para configurar y mostrar una escena básica de Three.js.

   ```javascript
   class MiComponenteThree {
       constructor(contenedor) {
           this.contenedor = contenedor;
           this.escena = new THREE.Scene();
           this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
           this.renderizador = new THREE.WebGLRenderer();
           this.cubo = null;
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
   ```

Este código define un componente básico que puedes empezar a utilizar y expandir según tus necesidades. Recuerda incluir Three.js en tu proyecto, ya sea a través de un CDN como en el ejemplo o instalándolo en tu proyecto.