/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//=========================validar la insercion de solo numeros===================================

function validarNumeros(e){
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla === 8)
    {
        return true;
    }
    patron = /[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}


//=========================validar la insercion de solo letras===================================

function validarLetras(e) { 
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla === 8)
    {
        return true;
    }
    patron = /[A-Za-z\s]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
