var mammoth = Meteor.npmRequire("mammoth");
var fs = Meteor.npmRequire("fs");

Files.on("stored", Meteor.bindEnvironment(function(file){
  Meteor.call("processFile", file._id)
  console.log("Finished a run.");
}));

Meteor.methods({
  processHtml : function(articleId, fileId){
    var file = Files.findOne({"_id":fileId});
    var filepath = process.env.PWD + "/../../doc-uploads/files-" + file._id + "-" + file.name();
    var html = Async.runSync(function(done){
      mammoth.convertToHtml({
        path: filepath
      }).then(function(result){
        done(result);
      }).done()
    }).error.value;
  Articles.update({"_id":articleId}, {$set : {"html":html}});
  },
  processFile : function(fileId){
    var file = Files.findOne({"_id": fileId});
    var newFile = Articles.insert({
      name: file.name(),
      docxFileId: fileId
    }, function(err, articleId){
      if(err){
        console.log("ERROR: " + err);
        return;
      }
      Meteor.call("processHtml", articleId, fileId);
    });
  }
});
