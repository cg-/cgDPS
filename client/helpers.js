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
    var articleId = Session.get("selectedArticle");
    if(articleId){
      var html = Articles.findOne({"_id":articleId}).html;
      if(html){
        return html;
      }
    }
  },
  getPdfLink: function(){
    var articleId = Session.get("selectedArticle");
    if(articleId){
      var article = Articles.findOne({"_id":articleId});
      var pdfFile = PDFs.findOne({"_id":article.pdfId});
      if(pdfFile){
        return pdfFile.url();
      }
    }
  }
})
