Template.summary.helpers({
  files: function(){
    var len = Articles.find().count();
    if (len === undefined) return 0;
    else return len;
  }
})

Template.files.helpers({
  curFile: function(){
    return Files.findOne({"_id":Session.get("curFile")});
  }
})

Template.uploadedDocsList.helpers({
  files: function(){
    return Articles.find();
  },
  getHtml: function(){
    if(Session.get("selectedArticle")){
      return Articles.findOne({"_id":Session.get("selectedArticle")}).html;
    }
  },
})
