<?php
namespace Dataview\IOConfig;

use Dataview\IntranetOne\IOModel;
use Dataview\IntranetOne\File as ProjectFile;
use Dataview\IntranetOne\Group;
use Illuminate\Support\Facades\Storage;

class Config extends IOModel
{
  protected $fillable = ['name','user_id','service_id','group_id','description','configuration'];

  protected $casts = [
    'configuration' => 'array',
  ];

  public function setConfigurationAttribute($value){
      $this->attributes['configuration'] = stripslashes($value);
  }


  public function group(){
    return $this->belongsTo('Dataview\IntranetOne\Group');
  }

  public function user(){
    return $this->belongsTo('Dataview\IntranetOne\User');
  }
  
  public function service(){
    return $this->belongsTo('Dataview\IntranetOne\Service');
  }
  
  public static function boot(){
    parent::boot(); 

    static::created(function (Config $obj) {
        if($obj->getAppend("group") !== false){
          $group = new Group([
            'group' => $obj->getAppend("group"),
            'sizes' => $obj->getAppend("sizes")
          ]);
          $group->save();
          $obj->group()->associate($group)->save();
      }
    });
    
  }
}
