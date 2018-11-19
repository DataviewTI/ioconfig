<form action = '/admin/config/create' id='odin-default-form' method = 'post' class = 'form-fit'>
  @component('IntranetOne::io.components.wizard',[
    "_id" => "odin-default-wizard",
    "_min_height"=>"435px",
    "_steps"=> [
        [
          "name" => "Valhalla Configs",
          "view" => "Config::odin.form-general",
          'params'=>[
            'id'=>'odin'
          ]
        ],
      ]
  ])
  @endcomponent
</form>