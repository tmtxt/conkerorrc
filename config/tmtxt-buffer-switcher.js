////////////////////////////////////////////////////////////////////////////////
var tmtxt = tmtxt || {};
tmtxt.nav = tmtxt.nav || {};

require("minibuffer");
buffer_container.prototype.for_each_history = function(f) {
  var buffers = this.buffer_history.slice(0);
  buffers.push(buffers.shift());
  var count = buffers.length;
  for (var i = 0; i < count; ++i)
    f(buffers[i]);
};
minibuffer.prototype.read_recent_buffer = function () {
  var window = this.window;
  var buffer = this.window.buffers.current;
  keywords(arguments, $prompt = "Buffer:",
           $buffers = function(visitor) window.buffers.for_each_history(visitor),
           $default = buffer,
           $history = "buffer");
  var completer = new all_word_completer(
    $completions = arguments.$buffers,
    $get_string = function (x) {
      return "" + x.title || "";
    },
    $get_description = function (x) {
      return x.description || "";
    },
    $get_icon = (read_buffer_show_icons ?
                 function (x) {
                   return x.icon || null;
                 } : null)
  );
  var result = yield this.read(
    $keymap = read_buffer_keymap,
    $prompt = arguments.$prompt,
    $history = arguments.$history,
    $completer = completer,
    $enable_icons = read_buffer_show_icons,
    $require_match = true,
    $auto_complete = "buffer",
    $auto_complete_initial = true,
    $auto_complete_delay = 0,
    $default_completion = arguments.$default
  );
  yield co_return(result);
};
interactive("switch-to-recent-buffer",
            "Switch to a buffer specified in the minibuffer. List of buffers "+
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

////////////////////////////////////////////////////////////////////////////////
////Switch to last buffer
interactive("switch-to-last-buffer", "Switch to the last visited buffer",
            function (I) {
              tmtxt.display.showTab();
              switch_to_buffer(I.window,
                               // This is the way to go in newer
                               // conkeror versions
                               I.window.buffers.buffer_history[1]);
			        tmtxt.display.hideTabDelay();
            });

////////////////////////////////////////////////////////////////////////////////
//// Use numeric key to switch buffers (1-9)
tmtxt.nav.defineSwitchBufferKey = function(key, bufNum) {
  define_key(default_global_keymap,
             key,
             function (I) {
			         tmtxt.display.showTab();
               switch_to_buffer(I.window,
                                I.window.buffers.get_buffer(bufNum));
			         tmtxt.display.hideTabDelay();
             });
};
for (let i = 0; i < 9; ++i) {
  tmtxt.nav.defineSwitchBufferKey(String((i+1)%10), i);
}
tmtxt.os.inMac(function(){
  tmtxt.nav.defineSwitchBufferKey("C-A-z", 0); // first buffer
});
tmtxt.os.inLinux(function(){
  tmtxt.nav.defineSwitchBufferKey("C-s-z", 0); // first buffer
  tmtxt.nav.defineSwitchBufferKey("C-J", 0); // first buffer
});

// Switch to last tab
interactive("switch-to-last-tab", "Switch to last tab", function(I){
  tmtxt.display.showTab();
  switch_to_buffer(I.window,
                   I.window.buffers.get_buffer(I.window.buffers.count - 1));
  tmtxt.display.hideTabDelay();
});

////////////////////////////////////////////////////////////////////////////////
//// Changing buffer, show tab and then hide
interactive("next-buffer", "Switch to next buffer", function(I){
  tmtxt.display.showTab();
  buffer_next(I.window, I.p);
  tmtxt.display.hideTabDelay();
});

interactive("previous-buffer", "Switch to previous buffer", function(I){
  tmtxt.display.showTab();
  buffer_next(I.window, -I.p);
  tmtxt.display.hideTabDelay();
});

provide("tmtxt-buffer-switcher");
