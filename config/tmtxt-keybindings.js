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

// redefine some keys
tmtxt_define_keys(default_global_keymap,
				  "A-z",		previous_buffer,
				  "C-j",		previous_buffer,
				  "A-x",		next_buffer,
				  "C-l",		next_buffer,
				  "O",			"find-url-new-buffer",
				  "C-x C-d",	"find-alternate-url",
				  "A-q",		"quit"
				 );
tmtxt_define_keys(content_buffer_normal_keymap,
				  "A-f",		"follow-new-buffer-background",
				  "F",			"follow-new-buffer-background",
				  "M-l",		"cmd_scrollRight",
				  "M-j",		"cmd_scrollLeft",
				  "M-i",		"cmd_scrollLineUp",
				  "M-k",		"cmd_scrollLineDown",
				  "M-I",		"cmd_scrollPageUp",
				  "M-K",		"cmd_scrollPageDown",
				  "C-A-v",		"paste-url-new-buffer",
				  "k",			"cmd_scrollLineUp",
				  "j",			"cmd_scrollLineDown",
				  "g g",		"scroll-top-left",
				  "G",			"cmd_scrollBottom",
				  "L",			"back",
				  "H",			"forward"
				 );
tmtxt_define_keys(text_keymap,
				  "M-l",		"forward-char",
				  "M-j",		"backward-char",
				  "M-i",		"backward-line",
				  "M-k",		"forward-line"
				 );

// and then some aliases
tmtxt_define_keys_aliases("C-o",			"escape",
						  "A-v",			"C-y",
						  "A-c",			"M-w",
						  "C-m",			"return",
						  "M-L",			"C-e",
						  "M-J",			"C-a");

// text selection
define_key(content_buffer_normal_keymap, "S-M-right", "cmd_selectWordNext");
define_key(content_buffer_normal_keymap, "S-M-left", "cmd_selectWordPrevious");
define_key(content_buffer_normal_keymap, "S-A-right", "cmd_selectEndLine");
define_key(content_buffer_normal_keymap, "C-E", "cmd_selectEndLine");
define_key(content_buffer_normal_keymap, "C-A", "cmd_selectBeginLine");
define_key(content_buffer_normal_keymap, "S-A-left", "cmd_selectBeginLine");
define_key(default_global_keymap, "M-F", "cmd_selectWordNext");

provide("tmtxt-keybindings");
