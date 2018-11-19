@php
  $__user = isset($id) ? $id."-" : "";
@endphp

<div class = 'row'>
  <div class="col-xs-12 col-sm-8 p-0">
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
  <div class="col-xs-12 col-sm-4">
    <div class = 'row'>
      <div class="col-10">
        <div class="form-group">
          <label for = '{{$__user}}city' class="bmd-label-floating">Cidade</label>
          <input name = '{{$__user}}city' type = 'text' id = '{{$__user}}city' class = 'form-control form-control-lg' disabled/>
        </div>
      </div>
      <div class="col-2 pr-0">
        <div class="form-group">
          <label for = '{{$__user}}state' class="bmd-label-floating">UF</label>
          <input name = '{{$__user}}state' type = 'text' id = '{{$__user}}state' class = 'form-control form-control-lg' disabled/>
        </div>
      </div>
    </div>
  </div>
</div>
