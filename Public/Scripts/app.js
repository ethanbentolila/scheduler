"use strict";
(function () {
    function DisplayHomePage() {
        console.log("Home Page");
    }
    function Start() {
        console.log("App Started!!");
        let page_id = $("body")[0].getAttribute("id");
        switch (page_id) {
            case "home":
                DisplayHomePage();
                break;
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map