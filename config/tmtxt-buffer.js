//this is for replacing the built in kill-this-buffer command
//the command tmtxt-close-and-save-current-buffer will save the URL of the
//current buffer beforing closing it
//later when you want to reopen it, just call the command tmtxt-open-closed-buffer
//first, create an array to hold the closed buffers
var tmtxt_closed_buffers = new Array();
//save the URL of the current buffer before closing it
interactive("tmtxt-close-and-save-current-buffer", "close and save the current buffer for later restore",
			function(I) {
			  if(tmtxt_closed_buffers.length==10){
				tmtxt_closed_buffers.shift(); // remove older item to save
				// memory, just save maximum 10 buffers
			  }
			  tmtxt_closed_buffers.push(I.buffer.document.URL); //add one item
			  kill_buffer(I.buffer); //kill the current buffer
			});
//reopen the last closed buffer and remove it from the array
interactive("tmtxt-open-closed-buffer", "open the last closed buffer", 
			function(I){
			  if(tmtxt_closed_buffers.length>0){
				load_url_in_new_buffer(tmtxt_closed_buffers[tmtxt_closed_buffers.length-1],I.window);
				tmtxt_closed_buffers.pop();
			  }
			});
//// kill current buffer
define_key(default_global_keymap, "w", "tmtxt-close-and-save-current-buffer");
define_key(default_global_keymap, "A-w", "tmtxt-close-and-save-current-buffer");
define_key(default_global_keymap, "A-k", "tmtxt-close-and-save-current-buffer");
//reopen last closed buffer
define_key(default_global_keymap, "A-W", "tmtxt-open-closed-buffer");
define_key(default_global_keymap, "A-T", "tmtxt-open-closed-buffer");

// Replacement of built-in buffer switcher
minibuffer.prototype.read_recent_buffer = function () {
    var window = this.window;
    var buffer = this.window.buffers.current;
    keywords(arguments, $prompt = "Buffer:",
             $default = buffer,
             $history = "buffer");
    var buffers = window.buffers.buffer_history.slice(0);
    buffers.push(buffers.shift());
    var completer = all_word_completer(
        $completions = buffers,
        $get_string = function (x) {
            return ' ' + x.title;
        },
        $get_description = function (x) x.description,
        $get_icon = (read_buffer_show_icons ?
                     function (x) x.icon : null)
    );
    var result = yield this.read(
        $keymap = read_buffer_keymap,
        $prompt = arguments.$prompt,
        $history = arguments.$history,
        $completer = completer,
        $enable_icons = read_buffer_show_icons,
        $match_required = true,
        $auto_complete = "buffer",
        $auto_complete_initial = true,
        $auto_complete_delay = 0,
        $default_completion = arguments.$default
    );
    yield co_return(result);
};
interactive("switch-to-recent-buffer",
            "Switch to a buffer specified in the minibuffer.  List of buffers "+
            "will be ordered by recency.",
            function (I) {
              switch_to_buffer(
                I.window,
                (yield I.minibuffer.read_recent_buffer(
                  $prompt = "Switch to buffer:",
                  $default = (I.window.buffers.count > 1 ?
                              I.window.buffers.buffer_history[1] :
                              I.buffer))));
            });
define_key(default_global_keymap, "C-tab", "switch-to-recent-buffer");


//// Use numeric key to switch buffers (1-9)
function define_switch_buffer_key (key, buf_num) {
    define_key(default_global_keymap, key,
               function (I) {
                   switch_to_buffer(I.window,
                                    I.window.buffers.get_buffer(buf_num));
               });
}
for (let i = 0; i < 9; ++i) {
    define_switch_buffer_key(String((i+1)%10), i);
}


//// Use  to swtich to first buffer
define_switch_buffer_key("C-A-z", 0);

//// Switch to last buffer
define_key(default_global_keymap, "0",
          function (I)
          {
              switch_to_buffer(I.window,
                               I.window.buffers.get_buffer(I.window.buffers.count - 1));
          });
define_key(default_global_keymap, "C-A-x",
          function (I)
          {
              switch_to_buffer(I.window,
                               I.window.buffers.get_buffer(I.window.buffers.count - 1));
          });


//// Stop loading all buffer (key A-h)
define_key(default_global_keymap, "A-h",
          function (I)
          {
              for (var i = 0; i < I.window.buffers.count; i++)
              {
                  stop_loading(I.window.buffers.get_buffer(i));
              }
          });


//// reload all buffer (key A-r)
define_key(default_global_keymap, "A-r",
          function (I)
          {
              for (var i = 0; i < I.window.buffers.count; i++)
              {
                  reload(I.window.buffers.get_buffer(i));
              }
          });

provide("tmtxt-buffer");
