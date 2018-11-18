<?php
namespace Dataview\IOConfig;

use Illuminate\Database\Seeder;
use Dataview\IntranetOne\Service;
use Sentinel;
use Dataview\IntranetOne\Config;

class ConfigSeeder extends Seeder
{
    public function run(){
      $serv = 'Config';

      if(!Service::where('alias',strtolower($serv))->exists()){
        Service::insert([
            'service' => $serv,
            'alias' =>$serv,
            'ico' => 'ico-gears',
            'description' => "Configurações da IO",
            'order' => Service::max('order')+1
          ]);
      }
      //seta privilegios padrão para o user admin
      $user = Sentinel::findById(1);
      $user->addPermission(strtolower($serv).'.view');
      $user->addPermission(strtolower($serv).'.create');
      $user->addPermission(strtolower($serv).'.update');
      $user->addPermission(strtolower($serv).'.delete');
      $user->save();
    }
} 
