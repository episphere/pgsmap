import * as pako from "https://cdn.jsdelivr.net/npm/pako/+esm"

const hello=`hello world at ${Date()}`

class PGS {
    constructor(id=4,fun) {
        id=id.toString()
        this.id = "PGS000000".slice(0,-id.length)+id
        loadScore(this.id).then(txt=>{
            this.txt=txt
            let y = parse(txt)
            Object.keys(y).forEach(k=>{
                this[k]=y[k]
            })
            // Assemble iterated map coordinates
            
            if(fun){fun()}
        })
  }
}

async function loadScore(id='PGS000004',build=37,range){
    const url = `https://ftp.ebi.ac.uk/pub/databases/spot/pgs/scores/${id}/ScoringFiles/Harmonized/${id}_hmPOS_GRCh${build}.txt.gz`
    let txt=''
    if(range){
        if(typeof(range)=='number'){
            range=[0,range]
        }
        //debugger
        txt= pako.inflate(await (await fetch(url,{
            headers:{
                'content-type': 'multipart/byteranges',
                'range': `bytes=${range.join('-')}`,
            }
        })).arrayBuffer(),{to:'string'})
        //debugger
    }else{
        txt = pako.inflate(await (await fetch(url)).arrayBuffer(),{to:'string'})
    }
    return txt
}

function deblank(txt){
    return txt.replace(/^[#\s]+/,'').replace(/\s+?/,'')
}

function parse(txt){
    let arr = txt.split(/\n/).filter(x=>x.length>0) // remove empty rows
    let y={info:deblank(arr[0])}
    let parm=''
    for(var i = 1;i<arr.length;i++){
        if(arr[i][0]=='#'){
            if(arr[i][1]=='#'){
                parm=deblank(arr[i])
                y[parm]={}
            }else{
                let av = deblank(arr[i]).split('=').map(deblank)

                if(parm==''){
                    y[av[0]]=av[1]
                }else{
                    y[parm][av[0]]=av[1]
                }
            }

            //console.log(i,arr[i])
        }
        else{
            //console.log(i)
            break
        }
    }
    //console.log(i,arr[i])
    y.fields = arr[i].split(/\t/g) // list
    y.values = arr.slice(i+1).map(x=>x.split(/\t/g).map(xi=>parseFloat(xi)?parseFloat(xi):xi))
    return y
}


export{
    hello,
    PGS,
    pako,
    loadScore,
    parse
}