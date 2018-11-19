<form action = '/admin/config/user/create' id='user-default-form' method = 'post' class = 'form-fit'>
  @component('IntranetOne::io.components.wizard',[
    "_id" => "user-default-wizard",
    "_min_height"=>"435px",
    "_steps"=> [
        ["name" => "Configurações do Usuário", "view" => "Config::user.form-general"],
      ]
  ])
  @endcomponent
</form>