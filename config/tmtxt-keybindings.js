//// Changing buffer
// next and previous buffer
define_key(default_global_keymap, "A-z", "buffer-previous"); //one hand user
define_key(default_global_keymap, "C-j", "buffer-previous"); //two hands user
define_key(default_global_keymap, "A-x", "buffer-next"); //one hand user
define_key(default_global_keymap, "C-l", "buffer-next"); //two hands user

// follow new buffer background
define_key(content_buffer_normal_keymap, "A-f", "follow-new-buffer-background");
undefine_key(content_buffer_normal_keymap, "F");
define_key(content_buffer_normal_keymap, "F", "follow-new-buffer-background");

// find url new buffer
define_key(default_global_keymap, "o", "find-url-new-buffer");
undefine_key(content_buffer_normal_keymap, "t");
undefine_key(default_global_keymap, "t");
define_key(default_global_keymap, "t", "find-url-new-buffer");

//// text selection
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

// other key bindings
define_key(default_global_keymap, "A-q" , "quit");
define_key(content_buffer_normal_keymap, "C-A-v", "paste-url-new-buffer");

//// Key Aliases
define_key_alias("C-m", "return"); //emacs style
define_key_alias("A-c", "M-w"); //mac os style
define_key_alias("A-v", "C-y"); //mac os style
define_key_alias("C-o", "escape");

provide("tmtxt-keybindings");
