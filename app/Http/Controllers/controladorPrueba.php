<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\cliente;

class controladorPrueba extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("ActualizarCliente");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $cliente=new cliente();
        $cliente->codigoPostal=$request->get('codigoPostal');
        $cliente->direccionExacta=$request->get('direccionExacta');
        $cliente->idDistrito=$request->get('idDistrito');
        $cliente->idCuenta=$request->get('idCuenta');
        $cliente->save();
        return redirect("agregarCliente");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $cliente=new cliente();
        $cliente =cliente::select("*")->get();
        return view("ConsultarCliente",["cliente"=>$cliente]);
    }
    
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function principal()
    {
        
        return view('Principal');
    }
    
    
   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function agregarCliente()
    {
        
        return view('agregarCliente');
    }
    
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function actualizar(Request $request)
    {
        $idCliente= $request->get('idCliente');
        //$res= \DB::select("call sp_consultarCliente(?)",array($idCliente));
        $res=cliente::select("*")->get();
        return redirect("principal");
        
    }
    
   
    
    
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $idCliente= $request->get('idCliente');
        $res= \DB::select("call sp_eliminarCliente(?)",array($idCliente));
        
        return response()->json(['message' => 'Insertado correctamente']);
    }
}
