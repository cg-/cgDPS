Template.BootstrapLayout.events({
  'click .links': function(event){
    var objs = document.getElementsByClassName("link-box");
    for(var i = 0; i < objs.length; i++){
      objs[i].className = "link-box";
    }
    event.target.parentNode.className = "link-box active";
  },
  'click .navbar-brand': function(){
    var objs = document.getElementsByClassName("link-box");
    for(var i = 0; i < objs.length; i++){
      objs[i].className = "link-box";
    }
    document.getElementById("home-link").className = "link-box active";
  }
});

Template.uploadedDocsList.events({
  'click .upload-delete': function(event){
    var fileid = event.target.parentNode.parentNode.parentNode.id;
    Session.set("selectedFile", fileid);
  },
  'click .upload-details': function(event){
    var fileid = event.target.parentNode.parentNode.parentNode.id;
    Session.set("selectedFile", fileid);
  },
  'click .upload-edit': function(event){
    var fileid = event.target.parentNode.parentNode.parentNode.id;
    Session.set("selectedFile", fileid);
  },
  'click .upload-genPDF': function(event){
    var fileid = event.target.parentNode.parentNode.parentNode.id;
    Session.set("selectedFile", fileid);
  },
  'click .upload-genHTML': function(event){
    var fileid = event.target.parentNode.parentNode.parentNode.id;
    Session.set("selectedFile", fileid);
  },
})
