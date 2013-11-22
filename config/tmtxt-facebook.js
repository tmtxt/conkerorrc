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
define_key(facebook_keymap, "C-M-o", "cefm-open-current-story-new-buffer");
define_key(facebook_keymap, "C-O", "cefm-open-current-story-new-buffer-background");
define_key(facebook_keymap, "A-o", "cefm-open-current-story-new-buffer-background");
define_key(facebook_keymap, "C-C", "cefm-cycle-conversations");
define_key(facebook_keymap, "C-I", "cefm-scroll-up-current-conversation");
define_key(facebook_keymap, "C-K", "cefm-scroll-down-current-conversation");
define_key(facebook_keymap, "C-M-E", "cefm-expand-content");
define_key(facebook_keymap, "1", "cefm-open-home");
define_key(facebook_keymap, "3", "cefm-open-friend-request");
define_key(facebook_keymap, "4", "cefm-open-messages");
define_key(facebook_keymap, "5", "cefm-open-notification");

provide("tmtxt-facebook");
