<?php
namespace Dataview\IOConfig\Console;
use Dataview\IntranetOne\Console\IOServiceRemoveCmd;
use Dataview\IOConfig\IOConfigServiceProvider;
use Dataview\IntranetOne\IntranetOne;


class Remove extends IOServiceRemoveCmd
{
  public function __construct(){
    parent::__construct([
      "service"=>"config",
      "tables" =>['configs'],
    ]);
  }

  public function handle(){
    parent::handle();
  }
}
