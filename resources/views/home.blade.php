@extends('layouts.app')

@section('content')

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  <script src="{{ asset('js/helper.js') }}?v={{ time() }}" defer></script>
  <script>
    // global app configuration object
    var config = {
        data : {
          user_id : "{{Auth::user()->id}}"
        },
        routes: {
            getRequest: "{{ URL::to('get-requests') }}",
            getSuggestion: "{{ URL::to('get-suggestions') }}",
            getConnection: "{{ URL::to('get-connections') }}",
            sendRequest: "{{ URL::to('send-request') }}",
            acceptRequest: "{{ URL::to('accept-request') }}",
            deleteRequest: "{{ URL::to('destroy') }}",
            getCommonConnection: "{{ URL::to('get-common-connections') }}",
        }
    };
  </script>
  <script src="{{ asset('js/main.js') }}?v={{ time() }}" defer></script>
  <div class="container">
    <x-dashboard />
    <x-network_connections />
  </div>
@endsection