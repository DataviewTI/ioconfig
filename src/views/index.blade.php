@extends('IntranetOne::io.layout.dashboard')

{{-- page level styles --}}
@section('header_styles')
  <link rel="stylesheet" type="text/css" href="{{ asset('io/services/io-config.min.css') }}">
@stop


@section('after_body_scripts')
  @if(Sentinel::check())
    @php

      $group = Dataview\IOConfig\Config::select('group_id')
      ->where('name','default')
      ->whereNull('user_id')
      ->with([
              'group'=>function($query){
              $query->select('groups.id','sizes')
              ->with('files');
            },
          ]) 
      ->first() ?: [];
      
      $__config = array_replace_recursive(config('intranetone'),[
        "group"=> optional(optional($group)->group)->toArray()
      ]);

      $__userConfig = optional(Dataview\IOConfig\Config::select('id','user_id','configuration')
      ->where('name','default')
      ->where('user_id',optional(\Sentinel::getUser())->id ?: 99999)
      ->first())->toArray() ?: [];
    @endphp
    <script>
      window.sessionStorage.setItem("IntranetOne",'@json($__config)');
      window.sessionStorage.setItem("configUser",'@json($__userConfig)');
    </script>
  @endif
@endsection


@section('main-content')
  @php
    //display tabs by user type
    $user_type = Sentinel::getUser()->roles->first()->slug;
    
    $__tabs = [];

    if($user_type == 'odin'){
      $__tabs[] = [
        "tab"=>"Will of Odin",
        "icon"=>"ico ico-gears",
        "view"=>"Config::odin.form" 
      ];
    }

    if($user_type == 'admin'){
      $__tabs[] = [
        "tab"=>"Configurações de Administrador",
        "icon"=>"ico ico-gears",
        "view"=>"Config::form"
      ];
    }

    $__tabs[] = [
      "tab"=>"Preferências do Usuário",
      "icon"=>"ico ico-gears",
      "view"=>"Config::user.form"
    ];

@endphp

	<!--section ends-->
			@component('IntranetOne::io.components.nav-tabs',
			[
				"_id" => "default-tablist",
        "_active"=>0,
        "_controls"=>false,
				"_tabs"=>$__tabs
			])
			@endcomponent
	<!-- content -->
  @stop
@section('footer_scripts')
<script src="{{ asset('io/services/io-config-babel.min.js') }}"></script>
<script src="{{ asset('io/services/io-config-mix.min.js') }}"></script>
@if($user_type == 'odin'))
<script src="{{ asset('io/services/io-odin-config.min.js') }}"></script>
<script src="{{ asset('io/services/io-user-config.min.js') }}"></script>
@endif
@stop
