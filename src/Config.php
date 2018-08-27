<?php
namespace Dataview\IOConfig;

use Dataview\IntranetOne\IOModel;
use Dataview\IntranetOne\File as ProjectFile;
use Dataview\IntranetOne\Group;
use Illuminate\Support\Facades\Storage;

class Config extends IOModel
{
  protected $fillable = ['name','group_id'];

  public function group(){
    return $this->belongsTo('Dataview\IntranetOne\Group');
  }

  public static function boot(){
    parent::boot(); 

    static::created(function (Config $obj) {
        $group = new Group([
          'group' => "Logo da configuração geral ".$obj->id,
          'sizes' => $obj->getAppend("sizes")
        ]);
        $group->save();
        $obj->group()->associate($group)->save();
    });
    
  }
}
