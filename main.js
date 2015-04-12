Meteor.methods({
  "clear":function(){
    Files.remove({});
    Articles.remove({});
    PDFs.remove({});
  }
})
