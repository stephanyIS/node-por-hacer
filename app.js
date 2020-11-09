const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

console.log(argv);
let comando = argv._[0];

switch (comando) {
    case 'crear':
        console.log('Crear por hacer');
        let tareaPorHacer = porHacer.crear(argv.descripcion);
        console.log(tareaPorHacer);

        break;
    case 'listar':
        console.log('Mostrar todas las tareas por hacer');
        let listadoPorHacer = porHacer.getListado();


        for (let tarea of listadoPorHacer) {
            console.log('===========Por Hacer==========='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('=============================='.green);
        }
        break;
    case 'actualizar':
        console.log('Actualiza una tarea por hacer');
        console.log(argv.completado);
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado)
        break;
    case 'borrar':

        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('Comando no recnocido');
        break;
}