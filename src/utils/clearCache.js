import packageJson from "../../package.json";
export const clearCache= ()=> {
    let version = localStorage.getItem('version');
        if(version!=packageJson.version)
        {
            if('caches' in window){
             caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach(name => {
                caches.delete(name);
            })
        });
    
        // Makes sure the page reloads. Changes are only visible after you refresh.
        window.location.reload(true);
    }
    
          localStorage.clear();
          localStorage.setItem('version',packageJson.version);
        }
    };