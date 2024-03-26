https://www.youtube.com/watch?v=AGs7hk0DWP0  ->  Building a Web Components Framework with Webpack, in Just a Few Hundred Lines of Code
https://github.com/JGH153/web-components-webrtc/blob/main/examples/web-component.html

<h1>Outside</h1>
<my-element></my-element>

<template id="my-element-template">
  <style>
    * {
      background: red;
    }
  </style>
  <h1>Inside</h1>
</template>

<script>
  class MyElement extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({ mode: "open" });
      const template = document.getElementById("my-element-template").content;
      shadow.appendChild(template.cloneNode(true));
    }
  }

  customElements.define("my-element", MyElement);
</script>