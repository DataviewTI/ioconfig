<form action = '/admin/config/create' id='default-form' method = 'post' class = 'form-fit'>
  @component('IntranetOne::io.components.wizard',[
    "_id" => "default-wizard",
    "_min_height"=>"435px",
    "_steps"=> [
        ["name" => "Configurações Gerais", "view" => "Config::form-general"],
      ]
  ])
  @endcomponent
</form>