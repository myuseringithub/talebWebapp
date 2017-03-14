// IMPORTANT: This doesn't work ! as it ends up loading script later on in the load page.

// JSPM 
{   
    let script;
    script = document.createElement('script');
    script.async = true;
    script.src = '/asset/javascript/jspm_packages/system.js';
    document.head.appendChild(script);
    script.onload = () => {

        System.config({
            baseURL: "/asset/javascript/"
        });

        let script = document.createElement('script');
        script.async = true;
        script.src = '/asset/javascript/jspm.config.js';
        script.onload = onload;
        document.head.appendChild(script);
        
    };
    
    // Same as jspm.config.js 'browserConfig' option. Maybe will use it in the future for dynamic path, depending on app.
    // System.import('/asset/javascript/').then(()=>{
    // });
}
