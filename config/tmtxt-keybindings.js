//// Changing buffer
// next and previous buffer
define_key(default_global_keymap, "A-z", "buffer-previous"); //one hand user
define_key(default_global_keymap, "C-j", "buffer-previous"); //two hands user
define_key(default_global_keymap, "A-x", "buffer-next"); //one hand user
define_key(default_global_keymap, "C-l", "buffer-next"); //two hands user
define_key(default_global_keymap, "A-left", "buffer-previous"); //not convinience
define_key(default_global_keymap, "A-right", "buffer-next");//not convinience

//// follow new buffer background
define_key(content_buffer_normal_keymap, "A-f", "follow-new-buffer-background");
undefine_key(default_global_keymap, "q");
define_key(content_buffer_normal_keymap, "q", "follow-new-buffer-background");

//// text selection
define_key(content_buffer_normal_keymap, "S-M-right", "cmd_selectWordNext");
define_key(content_buffer_normal_keymap, "S-M-left", "cmd_selectWordPrevious");
define_key(content_buffer_normal_keymap, "S-A-right", "cmd_selectEndLine");
define_key(content_buffer_normal_keymap, "C-E", "cmd_selectEndLine");
define_key(content_buffer_normal_keymap, "C-A", "cmd_selectBeginLine");
define_key(content_buffer_normal_keymap, "S-A-left", "cmd_selectBeginLine");
define_key(default_global_keymap, "M-F", "cmd_selectWordNext");

//open the url in the clipboard in new buffer
define_key(content_buffer_normal_keymap, "C-A-v", "paste-url-new-buffer");

// find url in new buffer
define_key(default_global_keymap, "C-t", "find-url-new-buffer");
define_key(default_global_keymap, "A-t", "find-url-new-buffer");
define_key(default_global_keymap, "o", "find-url-new-buffer");

// vim style navigation
define_key(content_buffer_normal_keymap, "k", "cmd_scrollLineUp");
define_key(content_buffer_normal_keymap, "j", "cmd_scrollLineDown");

//quit conkeror
define_key(default_global_keymap, "A-q" , "quit");

//// Key Aliases
define_key_alias("C-m", "return");//emacs style
define_key_alias("A-c", "M-w");//mac os style
define_key_alias("A-v", "C-y");//mac os style
define_key_alias("C-o", "escape");

provide("tmtxt-keybindings");
