//// Changing buffer, show tab and then hide
function next_buffer(I){
  show_tab();
  buffer_next(I.window, I.p);
  hide_tab_delay();
}

function previous_buffer(I){
  show_tab();
  buffer_next(I.window, -I.p);
  hide_tab_delay();
}

define_key(default_global_keymap, "A-z", previous_buffer);
define_key(default_global_keymap, "C-j", previous_buffer);
define_key(default_global_keymap, "A-x", next_buffer);
define_key(default_global_keymap, "C-l", next_buffer);

// follow new buffer background
define_key(content_buffer_normal_keymap, "A-f", "follow-new-buffer-background");
undefine_key(content_buffer_normal_keymap, "F");
define_key(content_buffer_normal_keymap, "F", "follow-new-buffer-background");

// find url new buffer
define_key(default_global_keymap, "O", "find-url-new-buffer");
// undefine_key(content_buffer_normal_keymap, "t");
// undefine_key(default_global_keymap, "t");
// define_key(default_global_keymap, "t", "find-url-new-buffer");
define_key(default_global_keymap, "C-x C-d", "find-alternate-url");

// ergonomic layout for navigation
// for MacOS, the key binding with M- got problem, use KeyRemap4Macbook to fix

// undefine key first
undefine_key(content_buffer_normal_keymap, "C-f");
undefine_key(text_keymap, "C-f");
undefine_key(content_buffer_normal_keymap, "C-b");
undefine_key(text_keymap, "C-b");
undefine_key(content_buffer_normal_keymap, "C-p");
undefine_key(text_keymap, "C-p");
undefine_key(content_buffer_normal_keymap, "C-n");
undefine_key(text_keymap, "C-n");
undefine_key(content_buffer_normal_keymap, "M-v");
undefine_key(content_buffer_normal_keymap, "C-v");

// then rebind them to other keystrokes
define_key(content_buffer_normal_keymap, "M-l", "cmd_scrollRight");
define_key(text_keymap, "M-l", "forward-char");
define_key(content_buffer_normal_keymap, "M-j", "cmd_scrollLeft");
define_key(text_keymap, "M-j", "backward-char");
define_key(content_buffer_normal_keymap, "M-i", "cmd_scrollLineUp");
define_key(text_keymap, "M-i", "backward-line");
define_key(content_buffer_normal_keymap, "M-k", "cmd_scrollLineDown");
define_key(text_keymap, "M-k", "forward-line");
define_key(content_buffer_normal_keymap, "M-I", "cmd_scrollPageUp");
define_key(content_buffer_normal_keymap, "M-K", "cmd_scrollPageDown");
define_key_alias("M-L", "C-e");
define_key_alias("M-J", "C-a");

// text selection
define_key(content_buffer_normal_keymap, "S-M-right", "cmd_selectWordNext");
define_key(content_buffer_normal_keymap, "S-M-left", "cmd_selectWordPrevious");
define_key(content_buffer_normal_keymap, "S-A-right", "cmd_selectEndLine");
define_key(content_buffer_normal_keymap, "C-E", "cmd_selectEndLine");
define_key(content_buffer_normal_keymap, "C-A", "cmd_selectBeginLine");
define_key(content_buffer_normal_keymap, "S-A-left", "cmd_selectBeginLine");
define_key(default_global_keymap, "M-F", "cmd_selectWordNext");

// vim style navigation
define_key(content_buffer_normal_keymap, "k", "cmd_scrollLineUp");
define_key(content_buffer_normal_keymap, "j", "cmd_scrollLineDown");
undefine_key(content_buffer_normal_keymap, "g");
define_key(content_buffer_normal_keymap, "g g", "scroll-top-left");
undefine_key(content_buffer_normal_keymap, "G");
define_key(content_buffer_normal_keymap, "G", "cmd_scrollBottom");
undefine_key(content_buffer_normal_keymap, "B");
define_key(content_buffer_normal_keymap, "L", "back");
define_key(content_buffer_normal_keymap, "H", "forward");

// other key bindings
define_key(default_global_keymap, "A-q" , "quit");
define_key(content_buffer_normal_keymap, "C-A-v", "paste-url-new-buffer");

//// Key Aliases
define_key_alias("C-m", "return");
define_key_alias("A-c", "M-w");
define_key_alias("A-v", "C-y");
define_key_alias("C-o", "escape");

provide("tmtxt-keybindings");
