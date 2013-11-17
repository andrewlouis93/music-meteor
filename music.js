//Setting up new collection of links
Links = new Meteor.Collection("links");

if (Meteor.isClient) {

 /*Check if you can put this anywhere else, it looks shit over here.*/
 Template.list.sessID_Gen = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;	
 } 

 Template.list.my_playlist_id = Template.list.sessID_Gen();

 //Renew subscription on state change.
 Deps.autorun( function(){
   Meteor.subscribe( "links", Template.list.my_playlist_id);
 });

 Template.search_bar.events({
    'keypress #query' : function (evt,template) {
      // template data, if any, is available in 'this'
      if (evt.which === 13){
                var url = template.find('#query').value;
                $("#query").val('');
		//YoutubeAPI calls go here
                Links.insert({sess:Template.list.my_playlist_id,youtube_link:url});
		}
       }
  });

  Template.list.my_playlist = function(){
	return Links.find({sess:Template.list.my_playlist_id});
  }

  Template.track.events({
	'click .destroy' : function (){
		Links.remove(this._id);
	}
  });
  
}//End of Client

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.publish("links", function(sess_var) {
      return Links.find({sess:sess_var});  //each client will only have links with that _lastSessionId
    });
  });

  
}//End of Server
