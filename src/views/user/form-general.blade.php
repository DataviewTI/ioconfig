<div class = 'row'>
  <div class="col-sm-9 col-xs-12 pl-1">
    <div class = 'row'>
      <div class="col-sm-3 col-xs-12">
        <div class="form-group">
          <label for = 'user-cpf_cnpj' class="bmd-label-floating __required">CPF/CNPJ</label>
          <input name = 'user-cpf_cnpj' type = 'text' id = 'user-cpf_cnpj' class = 'form-control form-control-lg' />
        </div>
      </div>
      <div class="col-sm-4 col-xs-12">
        <div class="form-group">
          <label for = 'user-systemName' class="bmd-label-floating __required">Nome do Sistema</label>
          <input name = 'user-systemName' type = 'text' id = 'user-systemName' class ='form-control form-control-lg' />
        </div>
      </div>
      <div class="col-sm-2 col-xs-12">
        <div class="form-group">
          <label for = 'user-mainColor' class="bmd-label-static w-100">Cor Principal</label>
          <span class = 'mt-3 d-flex'>
            <input name = 'user-mainColor' type = 'text' id = 'user-mainColor'/>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class = 'row'>
  <div class = 'col-12 p-0'>
      @component('IntranetOne::io.components.nav-tabs',
      [
        "_id" => "social-media-configs",
        "_active"=>0,
        '_controls'=>false,
        "_tabs"=> [
          [
            "tab"=>"",
            "icon"=>"ico ico-facebook",
            "view"=>"Config::form-parts.social-media-facebook",
            "params"=>[
              "id"=>'user-'
            ]
          ],
          [
            "tab"=>"",
            "icon"=>"ico ico-google",
            "view"=>"Config::form-parts.social-media-google",
            "params"=>[
              "id"=>'user-'
            ]
          ],
          [
            "tab"=>"",
            "icon"=>"ico ico-instagram",
            "view"=>"Config::form-parts.social-media-facebook",
            "params"=>[ 
              "id"=>'user-'
            ]
          ]
        ]
      ])
      @endcomponent
  </div>
</div>

<input name = '__user-configuration' type = 'hidden' id = '__user-configuration' />

