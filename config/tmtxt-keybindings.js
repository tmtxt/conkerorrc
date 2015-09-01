// NOTE: This file should be loaded finally, after all other files
var tmtxt = tmtxt || {};

// define keys for specific keymap
// arguments: keymap, keystroke1, command1, keystroke2, command2,...
function tmtxt_define_keys(){
  // check if arguments if larger than 1
  if(arguments.length > 1){
	  var args = Array.prototype.slice.call(arguments);

	  // get the keymap
	  var keymap = args[0];

	  // remove the first item (keymap)
	  args.splice(0, 1);

	  // the length
	  var length = 0;

	  // check the number of elements in arguments
	  if(args.length % 2 == 0){
	    length = args.length;
	  } else {
	    length = args.length + 1;
	    // add one more null item to the array
	    args[length] = null;
	  }

	  // loop through the arguments
	  for(var i = 0; i < length; i+=2){
	    define_key(keymap, args[i], args[i+1]);
	  }
  }
}

// define key aliases for each pair in the input arguments
function tmtxt_define_keys_aliases(){
  var args = Array.prototype.slice.call(arguments);

  // check if the number of arguments is even
  var length;
  if(args.length % 2 == 0){
	  length = args.length;
  } else {
	  length = args.length + 1;
	  args[length] = null;
  }

  // loop through the args
  for(var i = 0; i < length; i+=2){
	  define_key_alias(args[i], args[i+1]);
  }
}

// undefine all input keys for the specific keymap
// arguments: keymap, key1, key2, key3,...
function tmtxt_undefine_keys(){
  var args = Array.prototype.slice.call(arguments);

  // check if the arguments number is bigger than 1
  if(args.length > 1){
	  var keymap = args[0];

	  args.splice(0,1);

	  // loop through the args
	  for(var i = 0; i < args.length; i++){
	    undefine_key(keymap, args[i]);
	  }
  }
}

// undefine some built-in keys
tmtxt_undefine_keys(content_buffer_normal_keymap, "F", "C-f", "C-b", "C-p", "C-n", "M-v", "C-v", "g", "G");
tmtxt_undefine_keys(text_keymap, "C-f", "C-b", "C-p", "C-n");
tmtxt_undefine_keys(default_global_keymap, "M-N");

// redefine some keys
tmtxt_define_keys(default_global_keymap,
				          "C-j",		previous_buffer,
				          "C-l",		next_buffer,
				          "O",			"find-url-new-buffer",
				          "C-x C-d",	"find-alternate-url",
				          "C-S-tab",	"switch-to-last-buffer",
				          "0",			switch_to_last_tab,
				          "A-n",		"colors-toggle",
				          "C-R",		"show-tab-temporarily",
				          "w",			"tmtxt-close-and-save-current-buffer"
				         );
tmtxt.os.inMac(function(){
  tmtxt_define_keys(default_global_keymap,
                    "C-tab",		"switch-to-recent-buffer",
				            "A-z",		previous_buffer,
				            "A-x",		next_buffer,
                    "A-l",    next_buffer,
                    "A-j",    previous_buffer,
				            "A-q",		"quit",
				            "C-A-x",		switch_to_last_tab,
				            "A-n",		"colors-toggle",
				            "A-w",		"tmtxt-close-and-save-current-buffer",
				            "A-k",		"tmtxt-close-and-save-current-buffer",
				            "A-C",		"tmtxt-close-and-save-current-buffer",
				            "A-W",		"tmtxt-open-closed-buffer",
				            "A-T",		"tmtxt-open-closed-buffer",
				            "A-h",		"stop-loading-all-buffers",
				            "A-r",		"reload-all-buffers"
				           );
});
tmtxt.os.inLinux(function(){
  tmtxt_define_keys(default_global_keymap,
				            "s-k",    "tmtxt-close-and-save-current-buffer",
                    "s-h",		"stop-loading-all-buffers",
                    "s-n",		"colors-toggle",
                    "C-L",    switch_to_last_tab,
                    "M-W",    "tmtxt-close-and-save-current-buffer",
                    "C-tab",  "switch-to-buffer"
				           );
});

tmtxt_define_keys(content_buffer_normal_keymap,
                  "F",      "follow-new-buffer-background",
                  "* q",    "browser-object-tinyurl",
                  "C-D",    "caret-mode",

                  // ergoemacs style
                  // "M-l",    "cmd_scrollRight",
                  // "M-j",    "cmd_scrollLeft",
                  // "M-i",    "cmd_scrollLineUp",
                  // "M-k",    "cmd_scrollLineDown",
                  "M-I",    "cmd_scrollPageUp",
                  "M-K",    "cmd_scrollPageDown",
                  "M-n",    "scroll-top-left",
                  "M-N",    "cmd_scrollBottom",

                  // vim style navigation
                  "k",      "cmd_scrollLineUp",
                  "j",      "cmd_scrollLineDown",
                  "g g",    "scroll-top-left",
                  "G",      "cmd_scrollBottom",
                  "L",      "back",
                  "H",      "forward",

                  // exchange point and mark like emacs
                  "C-x C-x",  "tmtxt-back-to-last-position",
                  "'", "save"
                 );
tmtxt.os.inMac(function(){
  tmtxt_define_keys(content_buffer_normal_keymap,
                    "A-f",    "follow-new-buffer-background",
                    "C-A-v",    "paste-url-new-buffer",

                    // mac os specific
                    "A-up",   "tmtxt-scroll-top",
                    "A-down",   "tmtxt-scroll-bottom"
                   );
});
tmtxt.os.inLinux(function(){
  tmtxt_define_keys(content_buffer_normal_keymap,
                    "C-s-v",    "paste-url-new-buffer"
                   );
});

tmtxt_define_keys(text_keymap,
				          "M-l",		"forward-char",
				          "M-j",		"backward-char",
				          "M-u",		"backward-word",
				          "M-o",		"forward-word",
                  "S-delete", "cmd_deleteWordForward",
                  "M-F",    "cmd_deleteWordBackward"
				         );
tmtxt_define_keys(content_buffer_textarea_keymap,
				          // "M-i",		"backward-line",
				          // "M-k",		"forward-line",
				          "A-up",		"beginning-of-first-line",
				          "A-down",		"end-of-last-line",
                  "S-delete", "cmd_deleteWordForward"
				         );
tmtxt_define_keys(facebook_keymap,
				          "C-M-o",		"cefm-open-current-story-new-buffer",
				          "C-O",		"cefm-open-current-story-new-buffer-background",
				          "A-o",		"cefm-open-current-story-new-buffer-background",
				          "C-C",		"cefm-cycle-conversations",
                  "C-S",		"cefm-cycle-conversations",
				          "C-I",		"cefm-scroll-up-current-conversation",
				          "C-K",		"cefm-scroll-down-current-conversation",
				          "C-M-E",		"cefm-expand-content",
				          "1",			"cefm-open-home",
				          "3",			"cefm-open-friend-request",
				          "4",			"cefm-open-messages",
				          "5",			"cefm-open-notification",
				          "C-A-n",		"cefm-follow-notifications-new-buffer-background",
                  "C-T", "cefm-attach-image",
                  "A-return",	"cefm-follow-messages"
				         );

// and then some aliases
tmtxt_define_keys_aliases("C-o",			"escape",
						              "C-m",			"return",
						              "M-L",			"C-e",
						              "M-J",			"C-a",
						              "C-i",			"tab",
						              "M-d",			"delete",

						              "M-f",			"back_space");
tmtxt.os.inMac(function(){
  tmtxt_define_keys_aliases("A-v",			"C-y",
						                "A-c",			"M-w",
                            "A-L",      "C-A-x",
                            "M-W",      "A-k",
                            "A-J",      "C-A-z",
                            "C-J",			"C-A-z",
						                "C-L",			"C-A-x"
						                );
});
tmtxt.os.inLinux(function(){
  tmtxt_define_keys_aliases("s-v",			"C-y",
						                "s-c",			"M-w",
                            "s-L",      "C-A-x",
                            "s-J",      "C-A-z",
                            "M-m",      "return",
                            "M-v",      "C-y",
                            "M-k",      "down",
                            "M-i",      "up",
                            "M-j",      "left",
                            "M-l",      "right"
						                );
});

// text selection
define_key(content_buffer_normal_keymap, "S-M-right", "cmd_selectWordNext");
define_key(content_buffer_normal_keymap, "S-M-left", "cmd_selectWordPrevious");
define_key(content_buffer_normal_keymap, "S-A-right", "cmd_selectEndLine");
define_key(content_buffer_normal_keymap, "C-E", "cmd_selectEndLine");
define_key(content_buffer_normal_keymap, "C-A", "cmd_selectBeginLine");
define_key(content_buffer_normal_keymap, "S-A-left", "cmd_selectBeginLine");
define_key(default_global_keymap, "M-F", "cmd_selectWordNext");

provide("tmtxt-keybindings");
