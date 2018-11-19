<?php

namespace Dataview\IOConfig;

use Illuminate\Support\ServiceProvider;

class IOConfigServiceProvider extends ServiceProvider
{
  public static function pkgAddr($addr){
    return __DIR__.'/'.$addr;
  }

  public function boot(){
    $this->loadViewsFrom(__DIR__.'/views', 'Config');
  }

  public function register(){
  $this->commands([
    Console\Install::class,
    Console\Remove::class
  ]);

  $this->app['router']->group(['namespace' => 'dataview\ioconfig'], function () {
    include __DIR__.'/routes/web.php';
  });
  
    $this->app->make('Dataview\IOConfig\ConfigController');
    $this->app->make('Dataview\IOConfig\ConfigRequest');
    $this->app->make('Dataview\IOConfig\UserConfigRequest');
  }
}
