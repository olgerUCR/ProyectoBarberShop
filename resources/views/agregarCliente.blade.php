
<!DOCTYPE html>
<html>
    <head> 
        <script src="{{asset('js/jquery-3.2.1.min.js')}}" type="text/javascript"></script>        
        <script src="{{asset('js/funciones.js')}}" type="text/javascript"></script>
        <script src="{{asset('js/funcionesCuentaCliente.js')}}" type="text/javascript"></script>
        <script src="{{asset('js/funcionesGenerales.js')}}" type="text/javascript"></script>
        <link href="{{asset('css/cliente.css')}}" rel="stylesheet" type="text/css"/>
        <link href="{{asset('css/consultarCliente.css')}}" rel="stylesheet" type="text/css"/>
        <link href="{{asset('css/crearCuentaCliente.css')}}" rel="stylesheet" type="text/css"/>
        <link href="{{asset('css/general.css')}}" rel="stylesheet" type="text/css"/>
        <link href="{{asset('css/principal.css')}}" rel="stylesheet" type="text/css"/>
 <title>Crear Cuenta Cliente</title>
    </head>
    <body> 
        <header>
            <div class="top">
                <div class="titulo" class="titulo">
                    <a class="link-vacio" href="">Arte Express</a>
                </div>
            </div>
        </div>
    </div>
</header>
<nav>
    <ul>
        <li class="ddl">
          <a href="http://localhost:5000/WSDefinitivo/" class="ddlB">Todas las tecnologias</a>

        </li>
        <li class="ddl">
            <a href="principal" class="ddlB">inicio</a>

        </li>

        <li class="ddl">
            <a href="agregarCliente" class="ddlB">Crear Cuenta</a>

        </li>

        <li>
            <a href="consultar">Consultar</a>
        </li> 
    </ul>
</nav>

<div class="contenedor" id="contForm">
    <form action="create" method="get" id="formCrearCuenta">
        <h1><center>Agregar Cliente</center></h1>

        <label class="formulario-label">Código Postal:</label>
        <input type="text"  class="formulario-input"  name="codigoPostal" maxlength="5" required>
        <label class="formulario-label">Dirección Exacta:</label>
        <input type="text"  class="formulario-input" name="direccionExacta" maxlength="50" required onkeypress="return validarLetras(event)">
        <label class="formulario-label">Id Distrito:</label>
        <input type="text" class="formulario-input" name="idDistrito"  maxlength="50" required onkeypress="return validarLetras(event)">
        <label class="formulario-label">Id Cuenta</label>
        <input type="text" class="formulario-input" name="idCuenta" id="telefono" onkeypress="return validarNumeros(event)" maxlength="8" required>
        <input type="submit" class="btn" value="Registrar" id="btnCrear">
    </form> 
</div>
</body>
<footer>
    Derechos Reservados &copy; 2018
</footer>
</html>






