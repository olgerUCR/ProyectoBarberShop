<!DOCTYPE html>
<html>
    <head>
        <title>Consultar Cliente</title>
        <script src="{{asset('js/jquery-3.2.1.min.js')}}" type="text/javascript"></script>    
        <script src="{{asset('js/funciones.js')}}" type="text/javascript"></script>
     <script src="{{asset('js/funcionesCuentaCliente.js')}}" type="text/javascript"></script>
     <script src="{{asset('js/funcionesGenerales.js')}}" type="text/javascript"></script>
     <link href="{{asset('css/cliente.css')}}" rel="stylesheet" type="text/css"/>
     <link href="{{asset('css/consultarCliente.css')}}" rel="stylesheet" type="text/css"/>
     <link href="{{asset('css/crearCuentaCliente.css')}}" rel="stylesheet" type="text/css"/>
     <link href="{{asset('css/general.css')}}" rel="stylesheet" type="text/css"/>
     <link href="{{asset('css/principal.css')}}" rel="stylesheet" type="text/css"/>
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
        </logic:equal>
    </ul>
</nav>
        
        <form  id="formulario" method="post" action="">
            
            <h1><center>Listar Clientes</center></h1>
            <div class="contenedor">
                 <label class="formulario-label">Ingrese el Código de la Cuenta</label>
                <input type="text" id="idCuenta"   class="txtBuscar" onkeypress="return validarNumeros(event)" maxlength="8" name="idCuenta" required/>
                <input type="submit" class="btnConsultar"><br>
                <table id="table">
                    <thead>
                    <th>idCliente</th>
                    <th>Código Postal</th>
                    <th>Dirección Exacta</th>
                    <th>Id Distrito</th>
                    <th>Id Cuenta</th>
                    <th></th>
                    </thead>
                   
                        
                         @foreach($cliente as $client)
                         <tr>
                        <td>
                            {{$client->idCliente}}
                        </td>
                            <td>
                                {{$client->codigoPostal}}
                            </td>
                            <td>
                                {{$client->direccionExacta}}
                            </td>
                            <td>
                                {{$client->idDistrito}}
                            </td>
                            <td>
                                {{$client->idDistrito}}

                            </td>
                            <td>
                                <input type="hidden" value="{{$client->idCliente}}">
                                <input type="button" value="Actualizar" class="actualizar">
                                <input type="button" value="Eliminar" class="eliminar">
                            </td>
                            </tr> 
                            @endforeach
                        
                </table>
            </div>
         
        </form>
        <div class="carga"></div> 
        <div id="snackbar"></div>
    </body>
    <footer>
        Derechos Reservados &copy; 2018
    </footer>
</html>

     



