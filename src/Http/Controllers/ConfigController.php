<?php
namespace Dataview\IOConfig;
  
use Dataview\IntranetOne\IOController;
use Illuminate\Http\Response;

use App\Http\Requests;
use Dataview\IOConfig\ConfigRequest;
use Dataview\IOConfig\Config;
use Dataview\IntranetOne\Group;
use Validator;
use DataTables;
use Session;
use Sentinel;

class ConfigController extends IOController{

	public function __construct(){
    $this->service = 'config';
	}

  public function index(){
		return view('Config::index');
	}
	
	public function list(){
    $query = Config::select('id','name','group_id')
    ->with([
      'group'=>function($query){
        $query->select('groups.id','sizes');
      }
    ])
    ->get();
  
    return Datatables::of(collect($query))->make(true);
  }

	public function create(ConfigRequest $request){
    $check = $this->__create($request);
    if(!$check['status'])
      return response()->json(['errors' => $check['errors'] ], $check['code']);	
      
    $obj = new Config($request->all());
    if($request->sizes!= null){
      $obj->setAppend("sizes",$request->sizes);
      //$obj->setAppend("has_images",$request->has_images);
      $obj->save();
    }
    //if($request->sizes!= null && $request->has_images>0){
      $obj->group->manageImages(json_decode($request->__dz_images),json_decode($request->sizes));
      $obj->save();
    //}

    return response()->json(['success'=>true,'data'=>null]);
	}

  public function view($id){
    $check = $this->__view();
    if(!$check['status'])
      return response()->json(['errors' => $check['errors'] ], $check['code']);	

    $query = Config::select('id','name','group_id')
      ->with([
          'group'=>function($query){
          $query->select('groups.id','sizes')
          ->with('files');
        },
      ])
      ->where('id',$id)
      ->get();
				
			return response()->json(['success'=>true,'data'=>$query]);
	}
	
	public function update($id,ConfigRequest $request){
    $check = $this->__update($request);
    if(!$check['status'])
      return response()->json(['errors' => $check['errors'] ], $check['code']);	

      $_new = (object) $request->all();
			$_old = Config::find($id);
			
      $upd = ['name','date_start','date_end','interval','indicators','controls','wrap','pause','width','height'];

      foreach($upd as $u)
        $_old->{$u} = $_new->{$u};

      
      if($_old->group != null){
        $_old->group->sizes = $_new->sizes;
        $_old->group->manageImages(json_decode($_new->__dz_images),json_decode($_new->sizes));
        $_old->group->save();
      }
      else
				if(count(json_decode($_new->__dz_images))>0){
					$_old->group()->associate(Group::create([
            'group' => "Avatar da configuração ".$id,
            'sizes' => $_new->sizes
            ])
          );
					$_old->group->manageImages(json_decode($_new->__dz_images),json_decode($_new->sizes));
				}
		
        $_old->save();
			return response()->json(['success'=>$_old->save()]);
	}

	public function delete($id){
    $check = $this->__delete();
    if(!$check['status'])
      return response()->json(['errors' => $check['errors'] ], $check['code']);	

      $obj = Slide::find($id);
			$obj = $obj->delete();
			return  json_encode(['sts'=>$obj]);
  }

}
