<?php
namespace Dataview\IOConfig\Console;
use Dataview\IntranetOne\Console\IOServiceInstallCmd;
use Dataview\IOConfig\IOConfigServiceProvider;
use Dataview\IOConfig\ConfigSeeder;

class Install extends IOServiceInstallCmd
{
  public function __construct(){
    parent::__construct([
      "service"=>"config",
      "provider"=> IOConfigServiceProvider::class,
      "seeder"=>ConfigSeeder::class,
    ]);
  }

  public function handle(){
    parent::handle();
  }
}
