var mammoth = Meteor.npmRequire("mammoth");
var fs = Meteor.npmRequire("fs");

Meteor.methods({
  processDoc : function(fileId){
    var file = Files.findOne({_id: fileId});
    Articles.insert({
      name: file.name(),
      docxFileId: fileId
    })
  },
  getHtml : function(articleId){
    var article = Articles.findOne({"_id":articleId});
    var file = Files.findOne({"_id":article.docxFileId});
    var filepath = process.env.PWD + "/../../doc-uploads/files-" + file._id + "-" + file.name();
    var html = Async.runSync(function(done){
      mammoth.convertToHtml({
        path: filepath
      }).then(function(result){
        done(result);
      }).done()
    }).error.value;
    Articles.update({"_id":articleId}, {$set : {"html":html}});
  }
});
