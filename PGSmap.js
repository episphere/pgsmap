(async ()=>{
    //PGSmap = await import('http://localhost:8000/pgsmap/export.js')
    PGSmap = await import('https://episphere.github.io/pgsmap/export.js')
    if(typeof(define)!='undefined'){
        define(PGSmap)
    }
})()