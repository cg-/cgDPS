Articles = new Meteor.Collection("articles");
FileStore = new FS.Store.FileSystem("files", {path: "~/doc-uploads"});
Files = new FS.Collection("files", {
  stores: [FileStore]
});
PDFStore = new FS.Store.FileSystem("pdfs", {path: "~/pdf-created"});
PDFs = new FS.Collection("pdfs", {
  stores: [PDFStore]
});
