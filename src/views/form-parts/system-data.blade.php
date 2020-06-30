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
  </div>
  <div class="col-sm-3 col-xs-12">
    @include("IntranetOne::io.forms.form-images",[
      "id" => $__user."custom-dropzone",
    ])
  </div>  
</div>