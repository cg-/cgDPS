Template.summary.helpers({
  files: function(){
    var len = Articles.find().count();
    if (len === undefined) return 0;
    else return len;
  }
})

Template.uploadedDocsList.helpers({
  files: function(){
    return Articles.find();
  },
  getHtml: function(){
    if(Session.get("selectedArticle")){
      Meteor.call("getHtml", Session.get("selectedArticle"));
      return Articles.findOne({"_id":Session.get("selectedArticle")}).html;
    }
  },
})
