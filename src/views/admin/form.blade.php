<form action = '/admin/config/create' id='admin-default-form' method = 'post' class = 'form-fit'>
  @component('IntranetOne::io.components.wizard',[
    "_id" => "odin-default-wizard",
    "_min_height"=>"435px",
    "_steps"=> [
        [
          "name" => "Configurações de Sistema",
          "view" => "Config::admin.form-general",
          'params'=>[
            'id'=>'admin'
          ]
        ],
      ]
  ])
  @endcomponent
</form>