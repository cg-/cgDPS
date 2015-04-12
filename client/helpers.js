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
  }
})
