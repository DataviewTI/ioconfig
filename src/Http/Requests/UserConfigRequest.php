<?php

namespace Dataview\IOConfig;
use Dataview\IntranetOne\IORequest;

class UserConfigRequest extends IORequest
{
  public function sanitize(){
    $input = parent::sanitize();
    $input['configuration'] = isset($input['__user-configuration']) ? $input['__user-configuration'] : null;
    $this->replace($input);
	}

  public function rules(){
    $this->sanitize();
    return [
    ];
  }
}
