Crear un Web Component con VanillaJS que sea fácilmente distribuible tanto mediante NPM como mediante un tag `<script>` implica varios pasos importantes para asegurar su accesibilidad y facilidad de uso en diferentes contextos. Aquí te detallo una guía general para lograr esto:

### 1. Desarrollo del Web Component

Primero, necesitas desarrollar tu Web Component usando VanillaJS. Asegúrate de que tu componente sea autónomo y no dependa de bibliotecas externas para funcionar. Esto es importante para garantizar que funcione correctamente en cualquier contexto donde se utilice.

#### Ejemplo básico de un Web Component:

```javascript
class MiComponente extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<p>Hola, mundo!</p>`;
  }
}

customElements.define('mi-componente', MiComponente);
```

### 2. Preparación para NPM

Para distribuir tu Web Component a través de NPM, necesitas preparar un paquete NPM. Esto implica:

- Crear un archivo `package.json` en la raíz de tu proyecto (puedes generar uno usando el comando `npm init`).
- Asegúrate de que el campo `main` en tu `package.json` apunte al archivo JavaScript que contiene tu Web Component.
- Opcionalmente, configura Babel o TypeScript para compilar tu código a una versión de JavaScript que sea ampliamente compatible con la mayoría de los navegadores.
- Publica tu paquete en NPM con `npm publish`.

### 3. Uso mediante NPM

Los usuarios podrán instalar tu Web Component usando NPM con el comando:

```bash
npm install nombre-de-tu-paquete
```

Y luego importarlo en su proyecto JavaScript:

```javascript
import 'nombre-de-tu-paquete';
```

### 4. Distribución mediante `<script>`

Para permitir que tu Web Component se use mediante un tag `<script>`, necesitas:

- Compilar tu código (si es necesario) y asegurarte de que esté en un formato UMD o IIFE para que sea ejecutable directamente en el navegador.
- Alojar el archivo JavaScript resultante en un CDN o en un servidor web accesible públicamente.
- Proporcionar a los usuarios el enlace al script para que lo incluyan en sus páginas HTML:

```html
<script src="url-a-tu-componente/mi-componente.js"></script>
```

### 5. Documentación

No olvides documentar claramente cómo los usuarios pueden instalar y utilizar tu Web Component, tanto mediante NPM como a través de un tag `<script>`. Incluye ejemplos de código y cualquier paso necesario para su integración en proyectos existentes.

Siguiendo estos pasos, podrás crear un Web Component que sea fácilmente distribuible y utilizable en una amplia variedad de proyectos web, maximizando su accesibilidad y utilidad para la comunidad de desarrolladores.