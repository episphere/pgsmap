// UI

loadPGSbutton.onclick=function(){
    pgs = new PGSmap.PGS(PGSid.value,function(){
        //console.log(PGSi)
        entryTextArea.value=pgs.txt
        pgsInfo.innerHTML=`<span style="color:maroon">${pgs['POLYGENICSCORE (PGS) INFORMATION'].trait_mapped}</span>, ${pgs['POLYGENICSCORE (PGS) INFORMATION'].variants_number} variants, [<a href="${'https://doi.org/'+pgs['SOURCEINFORMATION'].citation.match(/doi\:.*$/)[0].slice(4)
}" target="_blank">ref</a>][<a href="https://www.pgscatalog.org/score/${pgs.id}" target="_blank">cat</a>][<a href="https://ftp.ebi.ac.uk/pub/databases/spot/pgs/scores/${pgs.id}/ScoringFiles/Harmonized/" target="_blank">ftp</a>]`
    })
}

PGSid.onkeyup=function(ev){
    if(ev.key=='Enter'){
        loadPGSbutton.click()
    }
}
