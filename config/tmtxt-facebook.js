// extended facebook mode
let (path = get_home_directory()) {
  // add to load path
  path.appendRelativePath(".conkerorrc");
  path.appendRelativePath("modules");
  path.appendRelativePath("cefm");
  load_paths.unshift(make_uri(path).spec);

  // include the library
  require("conkeror-extended-facebook-mode.js");  
};

// bind key for facebook mode
define_key(facebook_keymap, "C-M-o", "facebook-open-current-story-new-buffer");
define_key(facebook_keymap, "C-O", "facebook-open-current-story-new-buffer-background");
define_key(facebook_keymap, "C-C", "facebook-cycle-conversations");

provide("tmtxt-facebook");
