<?php
namespace Dataview\IOConfig;

use Illuminate\Database\Seeder;
use Dataview\IntranetOne\Service;
use Illuminate\Support\Facades\Artisan;
use Faker\Generator as Faker;
use Faker\Factory as Factory;

use Sentinel;
use Dataview\IOConfig\Config;


class ConfigSeeder extends Seeder
{
    public function run(){
      $serv = 'Config';
      $faker = Factory::create('pt_BR');


      if(!Service::where('service',$serv)->exists()){
        Service::insert([
            'service' => $serv,
            'alias' =>str_slug($serv),
            'trans' => 'Configurações',
            'ico' => 'ico-gears',
            'description' => "Configurações da IO",
            'order' => Service::max('order')+1
          ]);
      }
      //seta privilegios padrão para o user odin/admin

      $odinRole = Sentinel::findRoleBySlug('odin');
      $odinRole->addPermission(strtolower($serv).'.view');
      $odinRole->addPermission(strtolower($serv).'.create');
      $odinRole->addPermission(strtolower($serv).'.update');
      $odinRole->addPermission(strtolower($serv).'.delete');
      $odinRole->save();

      $adminRole = Sentinel::findRoleBySlug('admin');
      $adminRole->addPermission(strtolower($serv).'.view');
      $adminRole->addPermission(strtolower($serv).'.create');
      $adminRole->addPermission(strtolower($serv).'.update');
      $adminRole->addPermission(strtolower($serv).'.delete');
      $adminRole->save();

      //create default cache
      Artisan::call('config:cache');

      //Create default system config
      if(!Config::where('name','default')->whereNull('user_id')->exists()){

        $_conf = new Config([
          'name' => "default",
          'description' => "Odin Configuration - valid for all base system",
          'configuration' => json_encode(
            [
              'cpf_cnpj'=>"07.820.675/0001-26",
              'name'=>"Dataview TI",
              'systemName'=>"IntranetOne",
              'phone'=>"",
              'mobile'=>"",
              'email'=>"contato@dataview.com.br",
              'pathStorage'=>"app/public/intranetone/",
              'zipCode'=>"",
              'address'=>"",
              'address2'=>"",
              'city'=>"",
              'state'=>"",
              'uf'=>"",
              'socialMedia'=>[
                "facebook"=>[
                  'appID'=>"000000000000000",
                  'appVersion'=>"v3.0",
                  'locale'=>"pt_BR",
                  'longToken'=>"",
                ]
              ],
              'colors'=>[
                "mainColor"=>"#333333"
              ]
            ],true)
        ]);
        $_sizes =  '{"original":true,"sizes":{"thumb":{"w":270,"h":80},"big":{"w":800,"h":237}}}';
        $_conf->setAppend("sizes",$_sizes);
        $_conf->setAppend("group","Default IO system configuration");

        $_conf->save();

        $tmp_name = tempnam(sys_get_temp_dir(),'dz');
        file_put_contents($tmp_name, file_get_contents($faker->imageUrl(270,80)));

        $_conf->group->manageImages([[
          "name"=>$faker->bothify('default_#?#?#?#?.jpg'),
          "data"=>["data"=>false],
          "mimetype"=>"image/png",
          "id"=>null,
          "tmp"=>$tmp_name,
          "order"=>1
        ]],json_decode($_sizes,true));

        $_conf->save();



        Artisan::call('config:cache');

      }

    }
} 
