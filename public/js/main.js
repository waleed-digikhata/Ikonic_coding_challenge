var skeletonId = 'skeleton';
var contentId = 'content';
var skipCounter = 0;
var takeAmount = 10;

function getRequests(page=1,mode) {
  $('#suggestion_block').hide();
  $('#connection_block').hide();
  if(mode =='sent'){
    $('#sent_block').show();
    $('#received_block').hide();
  }else{
    $('#received_block').show();
    $('#sent_block').hide();
  }
  $.ajax({
    url: config.routes.getRequest+'?page='+page+'&mode='+mode,
    type: 'GET',
    dataType: 'json', // added data type
    error: function(xhr, textStatus, error) {
      console.log(xhr.responseText);
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
    },
    beforeSend: function(){
      $('#loader').show();
    },
    complete: function(){
      $('#loader').hide();
    },
    success: function(response) {
      if(response['requests']){
        $(`#get_${mode}_request_count`).text('('+response['requests']['total']+')')
        var table  =  '';
        if(response['requests']['data'].length > 0){
          response['requests']['data'].forEach((v,k)=>{
            table += '<tr style="box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important">'
            table += '<td class="align-middle" width="200px">'
            table += v['user']['name'];
            table += '</td>'
            table += '<td class="align-middle">-</td>'
            table += '<td class="align-middle">'
            table += v['user']['email'];
            table += '</td>'
            if(mode =='sent'){
              table += '<td style="float:right">'
              table += '<button id="cancel_request_btn_" class="btn btn-danger me-1" onClick="deleteRequest('+config.data.user_id+','+v['user']['id']+')">Withdraw Request</button>';
              table += '</td>'
            }else{
              table += '<td style="float:right">'
              table += '<button id="accept_request_btn_" class="btn btn-primary me-1" onClick="acceptRequest('+config.data.user_id+','+v['user']['id']+')">Accept</button>';
              table += '</td>'
            }

            table += '</tr>';
          })
        }else{
          $(`#request_table_${mode}`).html('')
        }

        if(page == 1){
          $(`#request_table_${mode}`).html('')
        }

        $(`#request_table_${mode}`).append(table);

        if(response['requests']['next_page_url']){
          let nextPage = getUrlVars(response['requests']['next_page_url'])['page']
          $(`#load_more_btn_parent_request_${mode}`).removeClass('d-none')
          $(`#load_more_btn_parent_request_${mode}`).html(`<button class="btn btn-primary" onclick="getRequests(${nextPage},'${mode}')" id="load_more_btn_request">Load more</button>`)
        }else{
          $(`#load_more_btn_parent_request_${mode}`).addClass('d-none')
        }
      }//sent if end
    }
  });
}

function getMoreRequests(mode) {
  // Optional: Depends on how you handle the "Load more"-Functionality
  // your code here...
}

function getConnections(page=1) {
  $('#suggestion_block').hide();
  $('#sent_block').hide();
  $('#received_block').hide();
  $('#connection_block').show();
  $.ajax({
    url: config.routes.getConnection+'?page='+page,
    type: 'GET',
    dataType: 'json', // added data type
    error: function(xhr, textStatus, error) {
      console.log(xhr.responseText);
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
    },
    beforeSend: function(){
      $('#loader').show();
    },
    complete: function(){
      $('#loader').hide();
    },
    success: function(response) {
      if(response['connections']){
        $('#get_connection_count').text('('+response['connections']['total']+')')
        var table  =  '';
        response['connections']['data'].forEach((v,k)=>{
          table += '<tr style="box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important">'
          table += '<td class="align-middle" width="200px">'
          table += v['user']['name'];
          table += '</td>'
          table += '<td class="align-middle">-</td>'
          table += '<td class="align-middle">'
          table += v['user']['email'];
          table += '</td>'
          table += '<td style="float:right">'
          table += `<button style="width: 220px" id="get_connections_in_common_" class="btn btn-primary" type="button"
          data-bs-toggle="collapse" data-bs-target="#collapse_" aria-expanded="false" aria-controls="collapseExample" onclick="getConnectionsInCommon(${config.data.user_id},${response['common']})">
          Connections in common (${response['common'].length})
        </button>
        <button id="create_request_btn_" class="btn btn-danger me-1" onClick="removeConnection(${config.data.user_id},${v['user']['id']})">Remove Connection</button>
          `;
          table += '</td>'
          table += '</tr>';
        })
        if(page == 1){
          $('#connections_table').html('')
        }
        $('#connections_table').append(table);

        if(response['connections']['next_page_url']){
          let nextPage = getUrlVars(response['connections']['next_page_url'])['page']
          $('#load_more_btn_parent_connection').removeClass('d-none')
          $('#load_more_btn_parent_connection').html('<button class="btn btn-primary" onclick="getConnections('+nextPage+')" id="load_more_btn_connections">Load more</button>')
        }else{
          $('#load_more_btn_parent_connection').addClass('d-none')
        }
      }//connections if end
    }
  });
}

function getMoreConnections() {
  // Optional: Depends on how you handle the "Load more"-Functionality
  // your code here...
}

function getConnectionsInCommon(userId, connectionId) {
  // your code here...
}

function getMoreConnectionsInCommon(userId, connectionId) {
  // Optional: Depends on how you handle the "Load more"-Functionality
  // your code here...
}

function getSuggestions(page=1) {
  $('#sent_block').hide();
  $('#suggestion_block').show();
  $('#received_block').hide();
  $('#connection_block').hide();
    $.ajax({
      url: config.routes.getSuggestion+'?page='+page,
      type: 'GET',
      dataType: 'json', // added data type
      error: function(xhr, textStatus, error) {
        console.log(xhr.responseText);
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);
      },
      beforeSend: function(){
        $('#loader').show();
      },
      complete: function(){
        $('#loader').hide();
      },
      success: function(response) {
        if(response['suggestions']){
          $('#get_suggestions_count').text('('+response['suggestions']['total']+')')
          var table  =  '';
          response['suggestions']['data'].forEach((v,k)=>{
            table += '<tr style="box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important">'
            table += '<td class="align-middle" width="200px">'
            table += v['name'];
            table += '</td>'
            table += '<td class="align-middle">-</td>'
            table += '<td class="align-middle">'
            table += v['email'];
            table += '</td>'
            table += '<td style="float:right">'
            table += '<button id="create_request_btn_" class="btn btn-primary me-1" onClick="sendRequest('+config.data.user_id+','+v['id']+')">Connect</button>';
            table += '</td>'
            table += '</tr>';
          })
          if(page == 1){
            $('#suggestion_table').html('')
          }
          $('#suggestion_table').append(table);

          if(response['suggestions']['next_page_url']){
            let nextPage = getUrlVars(response['suggestions']['next_page_url'])['page']
            $('#load_more_btn_parent_suggestion').removeClass('d-none')
            $('#load_more_btn_parent_suggestion').html('<button class="btn btn-primary" onclick="getSuggestions('+nextPage+')" id="load_more_btn_suggestion">Load more</button>')
          }else{
            $('#load_more_btn_parent_suggestion').addClass('d-none')
          }
        }//suggestion if end
      }
    });
}

function getMoreSuggestions() {
  // Optional: Depends on how you handle the "Load more"-Functionality
  // your code here...
}

function sendRequest(userId, suggestionId) {

  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.ajax({
    url: config.routes.sendRequest,
    type: 'POST',
    data: {'userId':userId,'suggestionId':suggestionId},
    dataType: 'json', // added data type
    error: function(xhr, textStatus, error) {
      console.log(xhr.responseText);
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
    },
    beforeSend: function(){
      $('#loader').show();
    },
    complete: function(){
      $('#loader').hide();
    },
    success: function(response) {
      if(response['success']){
        getSuggestions()
      }else{
        console.log(response['msg'])
      }
    }
  });
}

function deleteRequest(userId, requestId) {
  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.ajax({
    url: config.routes.deleteRequest,
    type: 'POST',
    data: {'userId':userId,'requestId':requestId,'methodType':'request'},
    dataType: 'json', // added data type
    error: function(xhr, textStatus, error) {
      console.log(xhr.responseText);
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
    },
    beforeSend: function(){
      $('#loader').show();
    },
    complete: function(){
      $('#loader').hide();
    },
    success: function(response) {
      if(response['success']){
        getRequests(1,'sent')
      }else{
        console.log(response['msg'])
      }
    }
  });
}

function acceptRequest(userId, requestId) {
  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.ajax({
    url: config.routes.acceptRequest,
    type: 'POST',
    data: {'userId':userId,'requestId':requestId},
    dataType: 'json', // added data type
    error: function(xhr, textStatus, error) {
      console.log(xhr.responseText);
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
    },
    beforeSend: function(){
      $('#loader').show();
    },
    complete: function(){
      $('#loader').hide();
    },
    success: function(response) {
      if(response['success']){
        getRequests(1,'received')
      }else{
        console.log(response['msg'])
      }
    }
  });
}

function removeConnection(userId, connectionId) {
  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.ajax({
    url: config.routes.deleteRequest,
    type: 'POST',
    data: {'userId':userId,'connectionId':connectionId,'methodType':'connection'},
    dataType: 'json', // added data type
    error: function(xhr, textStatus, error) {
      console.log(xhr.responseText);
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
    },
    beforeSend: function(){
      $('#loader').show();
    },
    complete: function(){
      $('#loader').hide();
    },
    success: function(response) {
      if(response['success']){
        getConnections()
      }else{
        console.log(response['msg'])
      }
    }
  });
}

$(function () {
  getSuggestions();

});
