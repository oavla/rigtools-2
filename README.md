<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autoclicker with Draggable Window</title>
    <style>
        /* Style for the draggable icon */
        #draggableIcon {
            width: 50px;
            height: 50px;
            background-color: lightgray;
            border-radius: 50%;
            position: absolute;
            top: 20px;
            left: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        /* Style for the mini window */
        #miniWindow {
            width: 200px;
            height: 100px;
            background-color: white;
            border: 2px solid gray;
            position: absolute;
            top: 100px;
            left: 100px;
            display: none;
            padding: 10px;
        }

        /* Draggable window header */
        #windowHeader {
            background-color: gray;
            padding: 5px;
            cursor: move;
        }

        /* Drag button */
        .drag-button {
            margin: 5px;
            padding: 5px 10px;
            cursor: pointer;
        }
    </style>
</head>
<body>

    <!-- Draggable Icon -->
    <div id="draggableIcon">⚙️</div>

    <!-- Draggable Mini Window -->
    <div id="miniWindow">
        <div id="windowHeader">Autoclicker</div>
        <button class="drag-button" onclick="startAutoClick()">Start</button>
        <button class="drag-button" onclick="stopAutoClick()">Stop</button>
    </div>

    <script>
        let autoClickInterval = null;

        // Function to simulate a click at the current mouse position
        function autoClicker() {
            const mouseEvent = new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: currentMouseX,
                clientY: currentMouseY
            });
            document.dispatchEvent(mouseEvent);
        }

        // Start the autoclicker
        function startAutoClick(interval = 1000) {
            if (!autoClickInterval) {
                autoClickInterval = setInterval(autoClicker, interval);
            }
        }

        // Stop the autoclicker
        function stopAutoClick() {
            if (autoClickInterval) {
                clearInterval(autoClickInterval);
                autoClickInterval = null;
            }
        }

        // Variables to track the mouse position
        let currentMouseX = 0;
        let currentMouseY = 0;

        // Update the mouse position when it moves
        document.addEventListener("mousemove", function(e) {
            currentMouseX = e.clientX;
            currentMouseY = e.clientY;
        });

        // Make the window draggable
        function makeDraggable(element, dragHandle) {
            let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

            dragHandle.onmousedown = function(e) {
                e.preventDefault();
                mouseX = e.clientX;
                mouseY = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            };

            function elementDrag(e) {
                e.preventDefault();
                offsetX = mouseX - e.clientX;
                offsetY = mouseY - e.clientY;
                mouseX = e.clientX;
                mouseY = e.clientY;
                element.style.top = (element.offsetTop - offsetY) + "px";
                element.style.left = (element.offsetLeft - offsetX) + "px";
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }

        // Initialize draggable elements
        const icon = document.getElementById("draggableIcon");
        const miniWindow = document.getElementById("miniWindow");
        const windowHeader = document.getElementById("windowHeader");

        // Toggle mini window visibility when clicking the icon
        icon.onclick = function() {
            if (miniWindow.style.display === "none") {
                miniWindow.style.display = "block";
            } else {
                miniWindow.style.display = "none";
            }
        };

        // Make the mini window draggable
        makeDraggable(miniWindow, windowHeader);
    </script>

</body>
</html>