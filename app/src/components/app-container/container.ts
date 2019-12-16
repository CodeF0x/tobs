class AppContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template: string = `
      <style>
        .container {
          background: red;
          height: 300px;
          width: 95%;
          margin: 0 auto;
        }

        @media (max-width: 1600px) {
          .container:nth-child(2) {
            float: right;
            width: 45%;
          }
        }
      </style>

      <p>Dummy container</p>
    `;

    const templateOuter: HTMLElement = document.createElement('section');
    templateOuter.classList.add('container');
    templateOuter.innerHTML = template;

    const shadowRoot: Node = this.attachShadow({
      mode: 'open'
    }).appendChild(templateOuter.cloneNode(true));
  }
}

export default AppContainer;
