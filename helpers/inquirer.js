const inquirer= require('inquirer');
require("colors");

const menuoptions=[
    {
        type:'list',
        name:'opcion',
        message:'Qué desea hacer?',
        choices:[
            {
                value:1,
                name:`${'1'.green}. Buscar ciudad`
            },
            {
                value:2,
                name:`${'2'.green}. Historial`
            },
            {
                value:0,
                name:`${'0'.green}. Salir`
            },

        ]
    }
];

const inquiererMenu=async()=>{
    console.clear();
    console.log("===============================".green)
    console.log("     Seleccione una opción     ".white);
    console.log("===============================\n".green);

    const {opcion}=await inquirer.prompt(menuoptions);
    return opcion;
}

const pause=async()=>{
    const question=[
        {
            type:'input',
            name:'enter',
            message:`Presione ${'enter'.green} para continuar`
        }
    ]
    console.log("\n")
    await inquirer.prompt(question);
}

const readInput=async(message)=>{
    const question=[
        {
            type:'input',
            name:'desc',
            message,
            validate( value ){
                if (value.length==0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]
    console.log("\n")
    const {desc} =await inquirer.prompt(question);
    return desc;
}

const list=async(places=[])=>{
    const choices=places.map((value,i)=>{
        const idx=`${i+1}.`.green
        return {
            value:value.id,
            name:`${idx} ${value.name}`
        }
    });

    choices.unshift({
        value:'0',
        name:`${'0.'.green} ${'Cancelar'}`
    })


    const options=[
        {    
            type:'list',
            name:'id',
            message:'Seleccione lugar?',
            choices
        }
    ]
    const {id}=await inquirer.prompt(options);
    return id;
}

const listCheckbox=async(places=[])=>{
    const choices=places.map((value,i)=>{
        const idx=`${i+1}.`.green
        return {
            value:value.id,
            name:`${idx} ${value.name}`
        }
    });

    const options=[
        {    
            type:'checkbox',
            name:'ids',
            message:'Seleccione?',
            choices
        }
    ]
    const {ids}=await inquirer.prompt(options);
    return ids;
}

const confirm=async (message)=>{
    const question=[{
        type:'confirm',
        name:'ok',
        message
    }]

    const {ok}=await inquirer.prompt(question);
    return ok;
}

module.exports={
    inquiererMenu,
    pause,
    readInput,
    list,
    confirm,
    listCheckbox
}