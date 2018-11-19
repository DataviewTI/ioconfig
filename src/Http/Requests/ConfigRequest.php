<?php

namespace Dataview\IOConfig;
use Dataview\IntranetOne\IORequest;
use Sentinel;

class ConfigRequest extends IORequest
{
  public function sanitize(){
    $input = parent::sanitize();

    $user_type = Sentinel::getUser()->roles->first()->slug;
    $input['user_id'] = null;

    switch($user_type){
      case 'odin':
        $input['configuration'] = isset($input['odin-__configuration']) ? $input['odin-__configuration'] : null;
        break;
      case 'admin':
        $input['configuration'] = isset($input['admin-__configuration']) ? $input['admin__configuration'] : null;
        break;
      case 'user':
        $input['user_id'] = isset($input['user_id']) ? $input['user_id'] : null;
      break;
    }

    $input['sizes'] = isset($input['__dz_copy_params']) ? $input['__dz_copy_params'] : null;
    
    $this->replace($input);
	}

  public function rules(){
    $this->sanitize();
    return [
    ];
  }
}
