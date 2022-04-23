(function()
{

    function DisplayHomePage() : void
    {
        console.log("Home Page");

    }


    //Named function
    function Start() : void
    {
        console.log("App Started!!");

        let page_id = $("body")[0].getAttribute("id");
        switch(page_id)
        {
            case "home":  
                DisplayHomePage();
            break;
        }
    }
    
    window.addEventListener("load", Start);

})();