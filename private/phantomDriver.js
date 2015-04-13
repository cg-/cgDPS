var system = require('system');
var page = require('webpage').create();
page.paperSize = {
  format: "Letter",
  orientation: "portrait",
  margin: {left:"2.5cm", right:"2.5cm", top:"1cm", bottom:"1cm"},
};
var settings = {
  encoding: "utf8"
};
page.open(system.args[1], settings, function (){
    page.render(system.args[2]);
    phantom.exit();
});
