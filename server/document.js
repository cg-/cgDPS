var mammoth = Meteor.npmRequire("mammoth");
var fs = Meteor.npmRequire("fs");
var phantomJS = Meteor.npmRequire("phantomjs");
var spawn = Meteor.npmRequire('child_process').spawn;
Fiber = Meteor.npmRequire('fibers');

Files.on("stored", Meteor.bindEnvironment(function(file){
  if(file.extension() === "docx"){
    Meteor.call("processFile", file._id)
  }
}));

Meteor.methods({
  processHtml : function(articleId, fileId){
    var file = Files.findOne({"_id":fileId});
    var filepath = Meteor.npmRequire('fs').realpathSync( METEOR_ROOT + '/../../../cfs/files/files/files-' + fileId + '-' + file.name());
    var html = Async.runSync(function(done){
      mammoth.convertToHtml({
        path: filepath
      }).then(function(result){
        done(result);
      }).done()
    }).error.value;
    Articles.update({"_id":articleId}, {$set : {"html":html}}, function(){
      Fiber(function(){
        Meteor.call("processPdf", articleId, fileId);
      }).run();
    });
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
  },
  processPdf : function(articleId, fileId){
    fs.writeFile('/tmp/' + fileId + '.html', Articles.findOne({"_id": articleId}).html, function(err){
      if(err){
        console.log("ERROR: " + err);
        return;
      }
      command = spawn(phantomJS.path, ['assets/app/phantomDriver.js', '/tmp/' + fileId+'.html', '/tmp/' + fileId + '.pdf']);
      command.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });
      command.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });
      command.on('exit', function (code) {
        Fiber(function(){
          PDFs.insert('/tmp/' + fileId + '.pdf', function(err, pdfFile){
            Articles.update({"_id":articleId}, {$set : {"pdfId":pdfFile._id}});
            fs.unlink('/tmp/' + fileId + '.html');
            fs.unlink('/tmp/' + fileId + '.pdf');
          });
        }).run();
      });
    });
  }
});
