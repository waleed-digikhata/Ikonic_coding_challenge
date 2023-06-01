<div class="row justify-content-center mt-5">
  <div class="col-12">
    <div class="card shadow  text-white bg-dark">
      <div class="card-header">Coding Challenge - Network connections</div>
      <div class="card-body">
        <div class="btn-group w-100 mb-3" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="btnradio1" id="get_suggestions_btn" onClick="getSuggestions()">Suggestions <span id="get_suggestions_count"><span></label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
          <label class="btn btn-outline-primary" for="btnradio2" id="get_sent_requests_btn" onClick="getRequests(page=1,'sent')">Sent Requests <span id="get_sent_request_count">()<span></label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
          <label class="btn btn-outline-primary" for="btnradio3" id="get_received_requests_btn" onClick="getRequests(page=1,'received')" >Received Requests <span id="get_received_request_count">()<span></label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off">
          <label class="btn btn-outline-primary" for="btnradio4" id="get_connections_btn" onClick="getConnections(page=1)">Connections <span id="get_connection_count">()<span></label>
        </div>
        <hr>
        <div id="content" class="">
          {{-- Display data here --}}
          <span id="loader"><x-skeleton /></span>
          <span id="suggestion_block"><x-suggestion /></span>
          <span id="sent_block"><x-request :mode="'sent'" /></span>
          <span id="received_block"><x-request :mode="'received'" /></span>
          <span id="connection_block"><x-connection /></span>
        </div>

        {{-- Remove this when you start working, just to show you the different components --}}
        {{-- <span class="fw-bold">Sent Request Blade</span>
        <x-request :mode="'sent'" />

        <span class="fw-bold">Received Request Blade</span>
        <x-request :mode="'received'" />

        <span class="fw-bold">Suggestion Blade</span>
        <x-suggestion />

        <span class="fw-bold">Connection Blade (Click on "Connections in common" to see the connections in common
          component)</span>
        <x-connection /> --}}
    
        {{-- <span class="fw-bold">"Load more"-Button</span>
        <div class="d-flex justify-content-center mt-2 py-3 d-none" id="load_more_btn_parent">
          <button class="btn btn-primary" onclick="" id="load_more_btn">Load more</button>
        </div> --}}
      </div>
    </div>
  </div>
</div>

