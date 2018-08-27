@extends('IntranetOne::io.layout.dashboard')

{{-- page level styles --}}
@section('header_styles')
  <link rel="stylesheet" type="text/css" href="{{ asset('io/services/io-config.min.css') }}">
</style>
@stop

@section('main-heading')
@stop

@section('main-content')
	<!--section ends-->
			@component('IntranetOne::io.components.nav-tabs',
			[
				"_id" => "default-tablist",
				"_active"=>0,
					[
						"tab"=>"Configurações",
						"icon"=>"ico ico-gears",
						"view"=>"Config::form"
					]
				]
			])
			@endcomponent
	<!-- content -->
  @stop

@section('footer_scripts')

<script src="{{ asset('io/services/io-config-babel.min.js') }}"></script>
<script src="{{ asset('io/services/io-config-mix.min.js') }}"></script>
<script src="{{ asset('io/services/io-config.min.js') }}"></script>
@stop
