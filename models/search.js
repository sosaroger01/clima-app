const axios = require('axios');
const { save, read } = require('../helpers/filesystem');

class Search {


    history=[];

    constructor(){
        const data=read();
        if(data){
            this.history=data.history;
        }
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }

    get paramsWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units':'metric',
            'lang':'es'
        }
    }

    get formatHistory(){
        return this.history.map(history=>{
            let word=history.split(" ");
            word=word.map(w => {
                return w[0].toUpperCase()+w.substring(1);
            });
            return word.join(" ");
        })
    }
    
    async city(place=''){
        try {
            const instance=axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params:this.paramsMapBox
            });
            
            const resp=await instance.get();
            return resp.data.features.map(place=>({
                id:place.id,
                name:place.place_name,
                lng:place.center[0],
                lat:place.center[1],
            }));
        } catch (error) {
            
            return [];
        }

    }

    async wheater({lng,lat}){
        try {
            const instance=axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params:{...this.paramsWeather, lat,lon:lng}
            });
            
            let resp=await instance.get();
            resp=resp.data;
            return {
                desc: resp.weather[0].description,
                min: resp.main.temp_min,
                max: resp.main.temp_max, 
                temp: resp.main.temp
            };
        } catch (error) {
            console.log(error)
            return [];
        }

    }

    async addHistory(lugar=''){
        try {
            //prevenir duplicidad
            if(this.history.includes(lugar.toLocaleLowerCase() ) ){
                return ;
            }
            //agregar lugar
            this.history.unshift(lugar.toLocaleLowerCase());

            //guardar en un archivo de texto
            const payload={
                history:this.history
            }
            save(payload);
        } catch (error) {
            console.log(error)
            return [];
        }

    }
}

module.exports=Search;