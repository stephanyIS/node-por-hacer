const fs = require('fs');
const { resolve } = require('path');
const { parse } = require('url');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); //objeto(arreglo) a jsons
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar ', err);
    });
};

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (e) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB(listadoPorHacer);
    return porHacer;
};

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const getListadoPorEstado = (completado) => {
    cargarDB();
    //Buscar coincidencia con la descripcion
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.completado === parseBoolean(completado);
    });
    return nuevoListado;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //Buscar coincidencia con la descripcion

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    //returna - 1 si no lo encuentra
    if (index >= 0) {
        listadoPorHacer[index].completado = parseBoolean(completado);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });



    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

const parseBoolean = (entrada) => {
    if (entrada === 'true') {
        return true
    }

    if (entrada === 'false') {
        return false
    }

}



module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    getListadoPorEstado
}