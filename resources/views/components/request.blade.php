<div class="my-2 shadow text-white bg-dark p-1" id="">
  <div class="d-flex justify-content-between">
    <table class="ms-1" id="request_table_{{$mode}}" width="100%">
      {{-- <td class="align-middle">Name</td>
      <td class="align-middle"> - </td>
      <td class="align-middle">Email</td>
      <td class="align-middle"> --}}
    </table>
    {{-- <div>
      @if ($mode == 'sent')
        <button id="cancel_request_btn_" class="btn btn-danger me-1"
          onclick="">Withdraw Request</button>
      @else
        <button id="accept_request_btn_" class="btn btn-primary me-1"
          onclick="">Accept</button>
      @endif
    </div> --}}
  </div>
</div>
<div class="d-flex justify-content-center mt-2 py-3" id="load_more_btn_parent_request_{{$mode}}" ></div>
