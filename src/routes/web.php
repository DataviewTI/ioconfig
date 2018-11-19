<?php

Route::group(['prefix' => 'admin', 'middleware' => ['web','admin'], 'as' => 'admin.'],function(){
    Route::group(['prefix' => 'config'], function () {
    Route::get('/','ConfigController@index');
    Route::post('create', 'ConfigController@create');
    Route::post('user/create', 'ConfigController@createUserConfig');
    Route::get('list', 'ConfigController@list');
    Route::get('view/{id}', 'ConfigController@view');
    Route::post('update/{id}', 'ConfigController@update');
    Route::post('user/update/{id}', 'ConfigController@updateUserConfig');
    Route::get('delete/{id}', 'ConfigController@delete');			
  });
});
