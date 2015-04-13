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

Template.files.events({
  'click #upload-button': function(){
    var files = document.getElementById("file-upload-form").files;
    if(files === undefined || files.length === 0){
      alert("Please select a file to upload.");
      return;
    }else {
      for(var i = 0; i < files.length; i++){
        if(files[i].type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
          alert("Please upload a .docx file.");
          return;
        }else if(files[i].size > 20000000){
          alert("File too big (must be below 20MB), yours was: " + files[i].size);
          return;
        }else{
          Files.insert(files[i], function(err, fileObj){
            if(err){
              alert("Trouble uploading your file! Server said: " + err);
              return;
            }

            Session.set("curFile", fileObj._id);
          }); // end insert
          var oldInput = document.getElementById("file-upload-form");
          var newInput = document.createElement("input");
          newInput.type = "file";
          newInput.id = oldInput.id;
          newInput.name = oldInput.name;
          newInput.className = oldInput.className;
          newInput.style.cssText = oldInput.style.cssText;
          // copy any other relevant attributes
          oldInput.parentNode.replaceChild(newInput, oldInput);
        }
      }
    }
  }
})

Template.uploadedDocsList.events({
  'click .upload-delete': function(event){
    var fileid = event.target.parentNode.parentNode.parentNode.id;
    Session.set("selectedArticle", fileid);
    var docx = Articles.findOne({"_id":Session.get("selectedArticle")}).docxFileId;
    var pdf = Articles.findOne({"_id":Session.get("selectedArticle")}).pdfId;
    Session.set("selectedArticle", null);
    Files.remove({"_id":docx});
    Articles.remove({"_id":fileid});
    PDFs.remove({"_id":pdfId});
  },
  'click .upload-details': function(event){
    var fileid = event.target.parentNode.parentNode.parentNode.id;
    Session.set("selectedArticle", fileid);
  },
  'click .upload-edit': function(event){
    var fileid = event.target.parentNode.parentNode.parentNode.id;
    Session.set("selectedArticle", fileid);
  },
  'click .upload-genPDF': function(event){
    var fileid = event.target.parentNode.parentNode.parentNode.id;
    Session.set("selectedArticle", fileid);
    $("#pdfModal").modal("show");
  },
  'click .upload-genHTML': function(event){
    var fileid = event.target.parentNode.parentNode.parentNode.id;
    Session.set("selectedArticle", fileid);
    $("#htmlModal").modal("show");
  },
})
