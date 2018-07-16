<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::resource('cliente','controladorPrueba');
Route::get('create',"controladorPrueba@create");
Route::get('consultar',"controladorPrueba@store");
Route::get('agregarCliente',"controladorPrueba@agregarCliente");
Route::get('principal',"controladorPrueba@principal");
Route::get('destroy',"controladorPrueba@destroy");
Route::get('actualizar',"controladorPrueba@actualizar");



Route::get('/', function () {
    return view('AgregarCliente');
});


Route::delete('/tasks/{task_id?}',function($task_id){
    $task = Task::destroy($task_id);

    return Response::json($task);
});