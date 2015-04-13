Articles = new Meteor.Collection("articles");
FileStore = new FS.Store.FileSystem("files");
Files = new FS.Collection("files", {
  stores: [FileStore]
});
PDFStore = new FS.Store.FileSystem("pdfs");
PDFs = new FS.Collection("pdfs", {
  stores: [PDFStore]
});
