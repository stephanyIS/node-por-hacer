const descripcion = {
    demand: true, //obligatorio,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}

const completado = {
    alias: 'c',
    desc: 'Marca como completado  o pendiente la tarea'
}


const argv = require('yargs') //comando listar , ayuda
    .command('crear', 'Crea un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra el elemento segun su descripción', {
        descripcion
    })
    .command('listar', "lista todas las tareas completadas o no", {
        completado
    })
    .help()
    .argv;

module.exports = {
    argv
}