////////////////////////////////////////////////////////////////////////////////
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
			        show_tab();
              switch_to_buffer(I.window,
                               // This is the way to go in newer
                               // conkeror versions
                               I.window.buffers.buffer_history[1]);
			        hide_tab_delay();
            });

////////////////////////////////////////////////////////////////////////////////
//// Use numeric key to switch buffers (1-9)
function define_switch_buffer_key (key, buf_num) {

  define_key(default_global_keymap, key,
             function (I) {
			         show_tab();
               switch_to_buffer(I.window,
                                I.window.buffers.get_buffer(buf_num));
			         hide_tab_delay();
             });
}
for (let i = 0; i < 9; ++i) {
  define_switch_buffer_key(String((i+1)%10), i); // 1-9 for switching
}
tmtxt_in_mac(function(){
  define_switch_buffer_key("C-A-z", 0); // first buffer
});
tmtxt_in_linux(function(){
  define_switch_buffer_key("C-s-z", 0); // first buffer
  define_switch_buffer_key("C-J", 0); // first buffer
});

function switch_to_last_tab(I) {
  show_tab();
  switch_to_buffer(I.window,
                   I.window.buffers.get_buffer(I.window.buffers.count - 1));
  hide_tab_delay();
}

////////////////////////////////////////////////////////////////////////////////
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

provide("tmtxt-buffer-switcher");
