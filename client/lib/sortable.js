  $(function() {
    /*Tooltip control*/
    $('#share_tooltip').tooltip();
    $('#start_tooltip').tooltip();
    $('.next_song').tooltip();
    $('.destroy').tooltip();
    $('.loop_activate').tooltip();
    $('#close_player').tooltip();

    /*Then we make sortable*/
    $( "#playlist" ).sortable({
	update: function(){
	Template.list.updateList(); //Updates on moving the position of an element around.
     }});
    $( "#playlist" ).disableSelection();
  });
