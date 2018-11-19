<div class ='row'>
  <div class="col-sm-2 col-xs-12">
    <div class="form-group">
      <label for = '{{isset($id) ? $id : ""}}fb-id' class="bmd-label-floating">App ID</label>
      <input name = '{{isset($id) ? $id : ""}}fb-id' type = 'text' id = '{{isset($id) ? $id : ""}}fb-id' class = 'form-control form-control-lg' />
    </div>
  </div>
  <div class="col-sm-1 col-xs-12">
    <div class="form-group">
      <label for = '{{isset($id) ? $id : ""}}fb-version' class="bmd-label-floating">Version</label>
      <input name = '{{isset($id) ? $id : ""}}fb-version' type = 'text' id = '{{isset($id) ? $id : ""}}fb-version' class = 'form-control form-control-lg' />
    </div>
  </div>
  <div class="col-sm-1 col-xs-12">
    <div class="form-group">
      <label for = '{{isset($id) ? $id : ""}}fb-locale' class="bmd-label-floating">Locale</label>
      <input name = '{{isset($id) ? $id : ""}}fb-locale' type = 'text' id = '{{isset($id) ? $id : ""}}fb-locale' class = 'form-control form-control-lg' />
    </div>
  </div>
  <div class="col-sm-3 col-xs-12">
    <div class="form-group">
      <label for = '{{isset($id) ? $id : ""}}fb-page' class="bmd-label-floating">Página</label>
      <input name = '{{isset($id) ? $id : ""}}fb-page' type = 'text' id = '{{isset($id) ? $id : ""}}fb-page' class = 'form-control form-control-lg' />
    </div>
  </div>
  <div class="col-sm-3 col-xs-12">
    <div class="form-group">
      <label for = '{{isset($id) ? $id : ""}}fb-longToken' class="bmd-label-floating">Long Token</label>
      <input name = '{{isset($id) ? $id : ""}}fb-longToken' type = 'text' id = '{{isset($id) ? $id : ""}}fb-longToken' class = 'form-control form-control-lg' />
    </div>
  </div>
</div>