@php
  $__user = isset($id) ? $id."-" : "";
@endphp

@include('Config::form-parts.system-data',['__user'=>$__user])

@include('Config::form-parts.full-address',['__user'=>$__user])

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
              "id"=>$__user
              ]
            ],
          [
            "tab"=>"",
            "icon"=>"ico ico-google",
            "view"=>"Config::form-parts.social-media-google",
            "params"=>[
              "id"=>$__user
              ]
          ],
          [
            "tab"=>"",
            "icon"=>"ico ico-instagram",
            "view"=>"Config::form-parts.social-media-facebook",
            "params"=>[
              "id"=>$__user
              ]
          ]
        ]
      ])
      @endcomponent
  </div>
</div>
<input name = '{{$__user}}__configuration' type = 'hidden' id = '{{$__user}}__configuration' />



