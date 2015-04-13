var system = require('system');
var page = require('webpage').create();
page.paperSize = {
  format: "Letter",
  orientation: "portrait",
  margin: {left:"2.5cm", right:"2.5cm", top:"1cm", bottom:"1cm"},
};
page.open(system.args[1], function (){
    page.render(system.args[2]);
    phantom.exit();
});
