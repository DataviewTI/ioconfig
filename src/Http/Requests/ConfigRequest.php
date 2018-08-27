<?php

namespace Dataview\IOConfig;
use Dataview\IntranetOne\IORequest;

class ConfigRequest extends IORequest
{
  public function sanitize(){
    $input = parent::sanitize();

    $input['sizes'] = $input['__dz_copy_params'];
    $this->replace($input);
	}

  public function rules(){
    $this->sanitize();
    return [
      'name' => 'required|max:255',
    ];
  }
}
