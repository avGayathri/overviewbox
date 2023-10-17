class overviewBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const overview = document.createElement("div");
        overview.className = "container";

        const t = document.createTextNode("OverView");
        overview.appendChild(t);

        const content = document.createElement('div');
        content.className = "content";
        content.textContent = "";
        overview.appendChild(content);

        const style = document.createElement('style');
        style.textContent = `
            .container {
                width: fit-content;
                height: fit-content;
                border: 2px solid black;
                border-radius: 15px;
                background-color: powderblue;
                font-family: sans-serif;
                font-size: 25px;
                font-weight: bold;
                padding: 25px;
                color: grey;
            }
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(overview);
    }

    updateContent(newContent) {
        console.log("new content is:", newContent);
        newContent.steps.forEach((obj) => {
            const stepElement = new StepComponent(obj);
            this.shadowRoot.querySelector('.content').appendChild(stepElement);
        });
    }
}

customElements.define("overview-box", overviewBox);

async function fetchdata() {
    const response = await fetch("https://admint-io.github.io/files/distribution_method_details.json");
    const data = await response.json();
    var selectedObj;
    data.forEach((obj) => {
        console.log("objects are:", obj);
        if (obj.method == "Collect & Drop") {
            selectedObj = obj;
        }
    });

    const webComponent = document.querySelector("overview-box");
    webComponent.updateContent(selectedObj);
}

fetchdata();

class StepComponent extends HTMLElement {
    constructor(inputData) {
        super();
        this.attachShadow({ mode: "open" });

        const overview = document.createElement("div");
        overview.className = "container2";

        const t = document.createTextNode(inputData);
        overview.appendChild(t);
        t.className = "text";

        const content = document.createElement("div");
        overview.appendChild(content);

        const style = document.createElement('style');
        style.textContent = `
            .container2 {
                width: fit-content;
                height: fit-content;
                height: 10%;
                padding: 15px;
                font-family: sans-serif;
                font-size: 20px;
                color: black;
            }
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(overview);
    }
}

customElements.define("step-component", StepComponent);
