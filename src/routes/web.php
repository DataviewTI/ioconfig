<?php

Route::group(['prefix' => 'admin', 'middleware' => ['web','admin'], 'as' => 'admin.'],function(){
    Route::group(['prefix' => 'config'], function () {
    Route::get('/','ConfigController@index');
    Route::post('create', 'ConfigController@create');
    Route::get('list', 'ConfigController@list');
    Route::get('view/{id}', 'ConfigController@view');
    Route::post('update/{id}', 'ConfigController@update');
    Route::get('delete/{id}', 'ConfigController@delete');			
  });
});
