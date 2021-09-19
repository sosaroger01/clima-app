require('dotenv').config();
require('colors');

const { readInput,inquiererMenu,pause ,list} = require('./helpers/inquirer');
const Search = require('./models/search');


const main=async ()=>{

    let opt='';
    const search= new Search();

    do {
        //imprimir menu
        opt=await inquiererMenu();

        switch (opt) {
            case 1: //buscas ciudad
                //mostrar mensaje
                let place=await readInput('Ciudad: ');

                //buscar lugares
                const places=await search.city(place);

                //seleccionar el lugar
                place=await list(places);
                if(place=='0') continue ;
                const selected=places.find(p=> p.id===place)

                //Guardar en DB
                search.addHistory(selected.name);
                
                //Clima
                weather=await search.wheater(selected);

                //Mostrar resultados
                console.log(`Informacion de la ciudad\n`.green);
                console.log(`Ciudad: ${selected.name}`,);
                console.log(`Lat: `,selected.lat);
                console.log(`Lng: `,selected.lng);
                console.log(`Temperatura: `, weather.temp);
                console.log(`Mínima: `, weather.min);
                console.log(`Máxima: `, weather.max);
                console.log(`Clima: `, weather.desc);
                break;
            case 2: //historial
                search.formatHistory.forEach((place,i)=>{
                    const index= `${i+1}. ` .green;

                    console.log(`${index} ${place}` );
                })
                break;
            default:
                break;
        }
        if(opt!==0) await pause();
    } while (opt!==0);

}


main();