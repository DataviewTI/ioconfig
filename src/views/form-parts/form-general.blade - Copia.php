@php
  $__user = isset($id) ? $id."-" : "";
@endphp
<div class = 'row'>
  <div class="col-sm-9 col-xs-12 pl-1">
    <div class = 'row'>
      <div class="col-sm-3 col-xs-12">
        <div class="form-group">
        <label for = '{{$__user}}cpf_cnpj' class="bmd-label-floating __required">CPF/CNPJ</label>
          <input name = '{{$__user}}cpf_cnpj' type = 'text' id = '{{$__user}}cpf_cnpj' class = 'form-control form-control-lg' />
        </div>
      </div>
      <div class="col-sm-5 col-xs-12">
        <div class="form-group">
          <label for = '{{$__user}}name' class="bmd-label-floating __required">Nome da Entidade</label>
          <input name = '{{$__user}}name' type = 'text' id = '{{$__user}}name' class = 'form-control form-control-lg' />
        </div>
      </div>
      <div class="col-sm-4 col-xs-12">
        <div class="form-group">
          <label for = '{{$__user}}systemName' class="bmd-label-floating __required">Nome do Sistema</label>
          <input name = '{{$__user}}systemName' type = 'text' id = '{{$__user}}systemName' class = 'form-control form-control-lg' />
        </div>
      </div>
    </div>
    <div class = 'row'>
      <div class="col-sm-2 col-xs-12 pr-0">
        <div class="form-group">
          <label for = '{{$__user}}phone' class="bmd-label-floating">Telefone Fixo</label>
          <input name = '{{$__user}}phone' type = 'tel' id = '{{$__user}}phone' class = 'form-control form-control-lg' />
        </div>
      </div>
      <div class="col-sm-2 col-xs-12 pr-0">
        <div class="form-group">
          <label for = '{{$__user}}mobile' class="bmd-label-floating">Celular/WhatsApp</label>
          <input name = '{{$__user}}mobile' type = 'tel' id = '{{$__user}}mobile' class = 'form-control form-control-lg' />
        </div>
      </div>
      <div class="col-sm-4 col-xs-12 pr-0">
        <div class="form-group">
          <label for = '{{$__user}}email' class="bmd-label-floating">Email Principal</label>
          <input name = '{{$__user}}email' type = 'email' id = '{{$__user}}email' class = 'form-control form-control-lg' />
        </div>
      </div>
      <div class="col-sm-4 col-xs-12 d-none">
        <div class="form-group">
          <label for = '{{$__user}}pathStorage' class="bmd-label-floating">Path Storage</label>
          <input name = '{{$__user}}pathStorage' type = 'url' id = '{{$__user}}pathStorage' class = 'form-control form-control-lg' disabled />
        </div>
      </div>
      <div class="col-sm-4 col-xs-12">
        <div class="form-group">
          <label for = '{{$__user}}mainColor' class="bmd-label-static w-100">Cor Principal</label>
          <span class = 'mt-3 d-flex'>
            <input name = '{{$__user}}mainColor' type = 'text' id = '{{$__user}}mainColor'/>
          </span>
        </div>
      </div>
    </div>
    <div class = 'row'>
      <div class="col-sm-2 col-xs-12 pr-0">
        <div class="form-group">
          <label for = '{{$__user}}zipCode' class="bmd-label-floating">CEP</label>
          <input name = '{{$__user}}zipCode' type = 'tel' id = '{{$__user}}zipCode' class = 'form-control form-control-lg' />
        </div>
      </div>
      <div class="col-sm-6 col-xs-12 pr-0">
        <div class="form-group">
          <label for = '{{$__user}}address' class="bmd-label-floating">Logradrouro / Endereço / Nº / Complemento</label>
          <input name = '{{$__user}}address' type = 'text' id = '{{$__user}}address' class = 'form-control form-control-lg' />
        </div>
      </div>
      <div class="col-sm-4 col-xs-12">
        <div class="form-group">
          <label for = '{{$__user}}address2' class="bmd-label-floating">Bairro</label>
          <input name = '{{$__user}}address2' type = 'text' id = '{{$__user}}address2' class = 'form-control form-control-lg' />
        </div>
      </div>
    </div>
  </div>
  <div class="col-sm-3 col-xs-12">
    @include("IntranetOne::io.forms.form-images",[
      "modal" => 'Slide::infos-modal'
    ])
    <div class = 'row'>
      <div class="col-10 pl-0">
        <div class="form-group">
          <label for = '{{$__user}}city' class="bmd-label-floating">Cidade</label>
          <input name = '{{$__user}}city' type = 'text' id = '{{$__user}}city' class = 'form-control form-control-lg' disabled/>
        </div>
      </div>
      <div class="col-2 pl-0">
        <div class="form-group">
          <label for = '{{$__user}}state' class="bmd-label-floating">UF</label>
          <input name = '{{$__user}}state' type = 'text' id = '{{$__user}}state' class = 'form-control form-control-lg' disabled/>
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
            "view"=>"Config::social-media-facebook"
          ],
          [
            "tab"=>"",
            "icon"=>"ico ico-google",
            "view"=>"Config::social-media-google"
          ],
          [
            "tab"=>"",
            "icon"=>"ico ico-instagram",
            "view"=>"Config::social-media-facebook"
          ]
        ]
      ])
      @endcomponent
  </div>
</div>
<input name = '{{$__user}}__configuration' type = 'hidden' id = '{{$__user}}__configuration' />

