//============================ se muesta el mensaje de que la cuenta se creo correctamente======================
function mostrarSnackbar(mensaje) {

    if ($("#snackbar").css("display") !== "block") {
        $("#snackbar").html(mensaje);
        $("#snackbar").fadeIn();
        $("#snackbar").animate({"bottom": "20px", "opacity": "1"}, 450).delay(4500);
        $("#snackbar").animate({"bottom": "-70px", "opacity": "0"}, 450);
        $("#snackbar").fadeOut();
    }
}

//==============================================ajax de Jquery para eliminar una cuenta=======================
function eliminarCuenta(e) {
    $(".optEl").attr("disabled", true);
    $("#confirmacion").css("display", "none");
    var idCliente = e;
    $.ajax({

        type: "get",
        url: 'destroy',
        data: {idCliente: idCliente},
        success: function (data)
        {
            mostrarSnackbar("Se eliminó con Exito");
        },
        error: function (error)
        {
            mostrarSnackbar("Error al eliminar");
        }
    });
}

//================================creamos el ajaxC============================================================
function ajaxC() {
    var xmlhttp = null;

    try {
        xmlhttp = new XMLHttpRequest();

    } catch (e) {
        xmlhttp = null;
    }
    return xmlhttp;
}


//=====================Cuando el documento este listo ejecutamos el Jquery=====================================


$(document).ready(function () {
    $(".actualizar").on("click", function (e) {
        var $idCliente = $(this).prev().val();
        alert("hola mundo");
        $.ajax({
            type: "get",
            url: 'actualizar',
            data: {idCliente: $idCliente}
        });
        
    });


//=====================validamos que la consulta no este vacia antes de enviarla en consultar==================

    $("#formulario").on('submit', function () {
        var tecla = $("#idCuenta").val();
        patron = /[0-9]/;
        var validar = patron.test(tecla);
        if (tecla === "")
        {
            if ($("#msjId") == null) {
                $("<div  id=" + "msjId" + " class=" + "msjError" + ">Ingrese un Teléfono Valido</div>").insertAfter('#idCuenta');
            }
            return false;
        }
        if ($("#msjId") != null) {
            $("#msjId").remove();
        }

        return true;
    });

//==================================bton del cuadro de dialog para cancelar la eliminacion===================

    $("#btnConfirmacionCancelar").on('click', function () {
        $("#confirmacion").animate({"opacity": "0"}, 'fast', "linear", function () {
            $("#confirmacion").css("display", "none");
        });
    });


//========================lo que sucede al presionar el boton eliminar de la tabla===========================

    $(".eliminar").on("click", function () {
        var idCuenta = $(this).prev().prev().val();
        var tabla = this;
                eliminarCuenta(idCuenta);
                tabla.closest('tr').remove();
    });

//==============================hacemos todas las validaciones del caso antes de enviar el form===============

    $("#formCrearCuenta").on("submit", function (e) {
        validarUsuario();//validamos que el usuario no exista
        var salida = true;
        if (!validarContrasenias()) {
            salida = false;
        }
        if ($('#msjUsuario').val() != null) {
            salida = false
        }
        if (!validarTelefono())
        {
            salida = false;
        }

        if (!validarEMail())
        {
            salida = false;
        }
        if (!validarProvinciaCantonDistrito())
        {
            salida = false;
        }
        return salida;
    });


//=========================validamos la los campos antes de enviar el form actualizar============

    $("#formActualizarCuenta").on("submit", function (e) {
        var salida = true;
        if (!validarContrasenias()) {
            salida = false;
        }
        if (!validarTelefono())
        {
            salida = false;
        }
        return salida;
    });

    //=====================================vemos la contrasenia=================================================

    $('#ojoContrasenia').on('click', function (e) {
        e.preventDefault();
        var current = $(this).attr('action');
        if (current == 'hide') {
            $(this).prev().attr('type', 'password');
            $(this).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open').attr('action', 'hide');
        }

        if (current == 'show') {
            $(this).prev().attr('type', 'text');
            $(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close').attr('action', 'show');

        }
    });
    //=====================================vemos la confirmacion de la contrasenia================================
    $('#ojoConfirmarContra').on('click', function (e) {
        e.preventDefault();
        var current = $(this).attr('action');
        if (current == 'hide') {
            $(this).prev().attr('type', 'password');
            $(this).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open').attr('action', 'hide');

        }
        if (current == 'show') {
            $(this).prev().attr('type', 'text');
            $(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close').attr('action', 'show');

        }

    });
});//=============================fin de documento.ready=========================================


//==============================validamos el cambio del provincia con el canton===============================

function cambioProvincia(e) {
    var idProvincia = e.value;
    var sCantones = document.getElementById("cantones");
    var sDistritos = document.getElementById("distritos");
    var ajax = ajaxC();
    ajax.open("POST", "./clienteaction.do", true); //Cambiar por la clase.do real
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("metodo=getCantones&idProvincia=" + idProvincia);
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4) {
            var cantones = JSON.parse(ajax.responseText);  //Transformar String en objeto
            sCantones.innerHTML = ""; //Limpiar select de cantones
            sDistritos.innerHTML = "";//Limpiar select de Distritos
            var canton = document.createElement("option");
            canton.value = 0;
            canton.text = "Seleccione";
            sCantones.appendChild(canton);
            for (var i = 1; i < cantones.length; i++) {
                var canton = document.createElement("option");
                canton.value = cantones[i].idCanton; //cambiar por id canton
                canton.text = cantones[i].nombre; //cambiar por nombre canton
                sCantones.appendChild(canton);
            }
        }
    };
}



//===================validamos el cambio del canton con el distrito============================================

function cambioCanton(e) {
    var idDistrito = e.value;
    var sDistritos = document.getElementById("distritos");
    var ajax = ajaxC();
    ajax.open("POST", "./clienteaction.do", true); //Cambiar por la clase.do real
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("metodo=getDistritos&idCanton=" + idDistrito);
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4) {
            var distritos = JSON.parse(ajax.responseText);  //Transformar String en objeto
            sDistritos.innerHTML = ""; //Limpiar select de cantones
            var distrito = document.createElement("option");
            distrito.value = 0;
            distrito.text = "Seleccione";
            sDistritos.appendChild(distrito);
            for (var i = 0; i < distritos.length; i++) {
                var distrito = document.createElement("option");
                distrito.value = distritos[i].idDistrito;
                distrito.text = distritos[i].nombre;
                sDistritos.appendChild(distrito);
            }
        }
    };
}

//==================================validamos el email========================================================

function validarEMail()
{
    var object = document.getElementById("email");
    valueForm = object.value;
    var patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (valueForm.search(patron) === 0)
    {
        if ($('#emailError').val() != null)
        {
            $('#emailError').remove();
        }
        object.style.color = "#000";
        return true;
    }
    if ($('#emailError').val() == null)
    {
        object.style.color = "#f00";
        $("<div  id='emailError' style='color:red'>Ingres un email valido</div>").insertAfter('#email');

    }
    return false;
}


//============================validamos la contrasenia======================================================
function validarContrasenias()
{
    var p1 = $("#contrasenia").val();
    var p2 = $("#confirmarContrasenia").val();
    var espacios = false;
    var cont = 0;
    var validar = true;

    while (!espacios && (cont < p1.length)) {
        if (p1.charAt(cont) == " ")
            espacios = true;
        cont++;
    }

    if (espacios)
    {
        if ($("#contraVacia").val() == null) {
            $("<div id='contraVacia' style='color:red'>La Contraseña no puede contener espacios</div>").insertAfter("#divContrasenia");
        }
        validar = false;
    } else if ($("#contraVacia").val() != null) {
        $("#contraVacia").remove();
    }

    if (p1 != p2)
    {
        if ($("#contraDistintas").val() == null) {
            $("<div id='contraDistintas' style='color:red'>Las contraseñas no coinciden</div>").insertAfter("#divConfirmar");
        }
        validar = false;
    } else if ($("#contraDistintas").val() != null) {
        $("#contraDistintas").remove();
    }
    return validar;
}


//========================validamos provincia,canton,pococi==================================

function validarProvinciaCantonDistrito()
{
    var provincia = $('#provincias').val();
    var canton = $('#cantones').val();
    var distrito = $('#distritos').val();
    var validar = true;
    if (provincia == 0)
    {
        if ($("#msjProvincia").val() == null) {
            $("<div  id='msjProvincia' style='color:red'>Seleccione una Provincia</div>").insertAfter('#provincias');
        }
        validar = false;
    } else if ($("#msjProvincia").val() != null)
    {
        $('#msjProvincia').remove();
    }

    if (canton == 0)
    {
        if ($("#msjCanton").val() == null) {
            $("<div  id='msjCanton' style='color:red'>Seleccione un Canton</div>").insertAfter('#cantones');
        }
        validar = false;
    } else if ($("#msjCanton").val() != null)
    {
        $('#msjCanton').remove();
    }

    if (distrito == 0)
    {
        if ($("#msjDistrito").val() == null) {
            $("<div  id='msjDistrito' style='color:red'>Seleccione un Distrito</div>").insertAfter("#distritos");
        }
        validar = false;
    } else if ($("#msjDistrito").val() != null)
    {
        $('#msjDistrito').remove();
    }

    return validar;
}

//================================validamos que el usuario sea correcto======================================
function validarUsuario() {
    var usuario = $('#txtUsuario').val();
    $.ajax({
        url: './clienteaction.do?metodo=verificarUsuario',
        type: 'post',
        data: {usuario: usuario},
        dataType: 'text',
        success: function (data)
        {
            if (data == "false") {
                if ($('#msjUsuario').val() == null) {
                    $("<div  id='msjUsuario' style='color:red'>El usuario ya existe</div>").insertAfter('#txtUsuario');
                }
            } else if ($('#msjUsuario').val() != null && data == "true") {
                $('#txtUsuario').next().remove();
            }

        },
        error: function (error)
        {
        }
    });
}

//======================================================validamos que el telefono sea valido==================

function validarTelefono() {
    var salida = true;
    var telefono = $("#telefono").val();
    if (telefono.length < 8)
    {
        if ($('#msjTelefono').val() == null)
        {
            $("<div  id='msjTelefono' style='color:red' >Ingrese un Teléfono Valido</div>").insertAfter('#telefono');
        }
        salida = false;
    } else if ($('#msjTelefono').val() != null)
    {
        $('#msjTelefono').remove();
    }
    return salida;
}
    