onerror = alert;

const managementTemplate = `
<div id="chrome_management_disable_ext">
  <h1>RigToolsV2 - By Jobi#8313</h1>
  <h2>This is an addon to the remake of rigtools by appleflyer.</h2>
  <p>Note that this only works on extensions installed by your administrator</p>
  <button id="loadSelenite">Load Selenite.cc</button>
  <div id="iframeContainer" style="display:none; margin-top: 20px;">
    <iframe id="seleniteIframe" src="" width="600" height="400" style="border:1px solid black;"></iframe>
  </div>
</div>
`;

document.body.innerHTML = managementTemplate;

// Event listener for the new button
document.getElementById("loadSelenite").onclick = function () {
  const iframeContainer = document.getElementById("iframeContainer");
  const iframe = document.getElementById("seleniteIframe");
  
  // Set the iframe source to the desired URL
  iframe.src = "https://selenite.cc";
  
  // Show the iframe container
  iframeContainer.style.display = "block";
};
