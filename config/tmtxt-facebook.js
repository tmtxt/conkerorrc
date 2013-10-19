//Facebook share
function facebook_share(I){
    var d=I.buffer.document;
    var f='http://www.facebook.com/sharer';
    var l=d.location, e=encodeURIComponent;
    var p='.php?src=bm&v=4&i=1279479932&u='+e(l.href)+'&t='+e(d.title);
    browser_object_follow(I.buffer,
                          OPEN_NEW_BUFFER,
                          f+p);
};
interactive("facebook-share", "Share the current site on Facebook.", facebook_share);

// Conkeror Extended Facebook Mode
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
define_key(facebook_keymap, "A-o", "facebook-open-current-story-new-buffer-background");
define_key(facebook_keymap, "C-C", "facebook-cycle-conversations");
define_key(facebook_keymap, "C-I", "facebook-scroll-up-current-coversation");
define_key(facebook_keymap, "C-K", "facebook-scroll-down-current-coversation");

provide("tmtxt-facebook");
