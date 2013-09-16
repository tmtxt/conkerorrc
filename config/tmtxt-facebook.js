// facebook mode

require("content-buffer.js");

define_keymap("facebook_keymap", $display_name = "facebook");

// facebook shortcut keys
define_key(facebook_keymap, "j", null, $fallthrough);
define_key(facebook_keymap, "k", null, $fallthrough);
define_key(facebook_keymap, "return", null, $fallthrough);
define_key(facebook_keymap, "q", null, $fallthrough);
define_key(facebook_keymap, "/", null, $fallthrough);
define_key(facebook_keymap, "l", null, $fallthrough);
define_key(facebook_keymap, "m", null, $fallthrough);
define_key(facebook_keymap, "c", null, $fallthrough);

// interactive command to open selected story
// new buffer
interactive("facebook-open-current-story-new-buffer", null, function (I) {
  var link = facebook_mode_find_story_link(I);
  load_url_in_new_buffer(link,I.window);
  });
// new buffer background
interactive("facebook-open-current-story-new-buffer-background", null, function (I) {
  var link = facebook_mode_find_story_link(I);
  load_url_in_new_buffer_background(link,I.window);
  });
define_key(facebook_keymap, "C-M-o", "facebook-open-current-story-new-buffer");
define_key(facebook_keymap, "C-O", "facebook-open-current-story-new-buffer-background");

// function for inspecting and finding the link of selected story
function facebook_mode_find_story_link(I){
  var doc = I.buffer.document;
  var selectedStory = doc.querySelector(".selectedStorySimple");
  if(selectedStory == null){
	I.minibuffer.message("No selected story");
  } else {
	var timestamp = selectedStory.querySelector(".timestamp");
	if(timestamp == null){
	  I.minibuffer.message("Cannot find timestamp link");
	} else {
	  var link = timestamp.parentNode;
	  return link;
	}
  }
}

define_keymaps_page_mode("facebook-mode",
    build_url_regexp($domain = "facebook",
                     $allow_www = true),
    { normal: facebook_keymap },
    $display_name = "Facebook");

page_mode_activate(facebook_mode);

provide("tmtxt-facebook");
