Router.configure({
  layoutTemplate: 'BootstrapLayout'
});

Router.route('/', function () {
  this.layout('BootstrapLayout');

  this.render('main-template');

  this.render('summary', {to: 'main-area'});

  this.render('footer', {to: 'footer'});
});

Router.route('home', function () {
  this.layout('BootstrapLayout');

  this.render('main-template');

  this.render('summary', {to: 'main-area'});

  this.render('footer', {to: 'footer'});
});

Router.route('files', function () {
  this.layout(Session.get('layout') || 'BootstrapLayout');

  this.render('main-template');

  this.render('files', {to: 'main-area'});

  this.render('uploadedDocsList', {to: 'existing-docs'});

  this.render('footer', {to: 'footer'});
});

Router.route('reports', function () {
  this.layout(Session.get('layout') || 'BootstrapLayout');

  this.render('main-template');

  this.render('reports', {to: 'main-area'});

  this.render('footer', {to: 'footer'});
});

Router.route('about', function () {
  this.layout(Session.get('layout') || 'BootstrapLayout');

  this.render('main-template');

  this.render('about', {to: 'main-area'});

  this.render('footer', {to: 'footer'});
});

Router.route('htmldisplay', function () {
  this.layout(Session.get('layout') || 'BootstrapLayout');

  this.render('main-template');

  this.render('htmldisplay', {to: 'main-area'});

  this.render('footer', {to: 'footer'});
});
