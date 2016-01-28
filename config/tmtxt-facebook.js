////////////////////////////////////////////////////////////////////////////////
// Conkeror Extended Facebook Mode
(function(){
  var path = get_home_directory();
  // add to load path
  path.appendRelativePath(".conkerorrc");
  path.appendRelativePath("modules");
  path.appendRelativePath("cefm");
  load_paths.unshift(make_uri(path).spec);

  // include the library
  require("conkeror-extended-facebook-mode.js");
}());
interactive("facebook-share", "Share the current site on Facebook.", cefm.facebookShare);

provide("tmtxt-facebook");
