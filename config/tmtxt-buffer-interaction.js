// setting for interacting with buffers

//this is for replacing the built in kill-this-buffer command
//the command tmtxt-close-and-save-current-buffer will save the URL of the
//current buffer beforing closing it
//later when you want to reopen it, just call the command tmtxt-open-closed-buffer
//first, create an array to hold the closed buffers
var tmtxt_closed_buffers = new Array();
//save the URL of the current buffer before closing it
interactive("tmtxt-close-and-save-current-buffer",
			"close and save the current buffer for later restore",
			function(I) {
			  show_tab();
			  if(tmtxt_closed_buffers.length==10) {
				tmtxt_closed_buffers.shift(); // remove older item to save
				// memory, just save maximum 10 buffers
			  }
			  tmtxt_closed_buffers.push(I.buffer.document.URL); //add one item
			  kill_buffer(I.buffer); //kill the current buffer
			  hide_tab_delay();
			});
//reopen the last closed buffer and remove it from the array
interactive("tmtxt-open-closed-buffer",
			"open the last closed buffer",
			function(I){
			  show_tab();
			  if(tmtxt_closed_buffers.length>0){
				load_url_in_new_buffer(
				  tmtxt_closed_buffers[tmtxt_closed_buffers.length - 1],
				  I.window);
				tmtxt_closed_buffers.pop();
			  }
			  hide_tab_delay();
			});
//// kill current buffer
define_key(default_global_keymap, "w", "tmtxt-close-and-save-current-buffer");
define_key(default_global_keymap, "A-w", "tmtxt-close-and-save-current-buffer");
define_key(default_global_keymap, "A-k", "tmtxt-close-and-save-current-buffer");
//reopen last closed buffer
define_key(default_global_keymap, "A-W", "tmtxt-open-closed-buffer");
define_key(default_global_keymap, "A-T", "tmtxt-open-closed-buffer");

//// Stop loading all buffer (key A-h)
define_key(default_global_keymap, "A-h", function (I) {
  for (var i = 0; i < I.window.buffers.count; i++) {
    stop_loading(I.window.buffers.get_buffer(i));
  }
});

//// reload all buffer (key A-r)
define_key(default_global_keymap, "A-r", function (I) {
  for (var i = 0; i < I.window.buffers.count; i++) {
    reload(I.window.buffers.get_buffer(i));
  }
});

provide("tmtxt-buffer-interaction");
