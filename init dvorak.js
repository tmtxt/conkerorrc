// OSX mapping: Command => A | Option => M
modifiers.M = new modifier(function (event) { return event.altKey; },
                           function (event) { event.altKey = true; });
modifiers.A = new modifier(function (event) { return event.metaKey; },
                           function (event) { event.metaKey = true; });

define_key(default_global_keymap, "A-`", null, $fallthrough);

// Some useful modules
require("mode-line.js");
require("daemon.js");
require("session.js");
require("dom-inspector.js");

// load_paths.unshift("file:///Users/ubolonton/.conkerorrc/modules/");
require("favicon.js"); // they forgot this in new-tabs.js
require("new-tabs.js");
tab_bar_show_icon = true;
tab_bar_show_index = true;

define_key(default_global_keymap, "A-i", "inspect-chrome");
define_key(read_buffer_keymap, "A-i", "inspect-chrome");

// Textmate as external editor
editor_shell_command = "mate -w";

// Personal theme
theme_load_paths.unshift("~/.conkerorrc/themes/");
theme_unload("default");
theme_load("ubolonton");
interactive("ubolonton-theme", "Load my personal theme",
            function(I) {
                theme_load("ubolonton");
            });
define_key(default_global_keymap, "A-u", "ubolonton-theme");

// gmail-mode
require("page-modes/gmail.js");
define_key(gmail_keymap, "v", null, $fallthrough);

// Does not seem to work :-(
user_pref("signon.prefillForms", true);
user_pref("signon.autofillForms", true);
user_pref("signon.rememberSignons", true);

// Custom key-bindings
//// buffer next & previous for 1 & 2 hands user
define_key(default_global_keymap, "A-;", "buffer-previous"); //one hand user
define_key(default_global_keymap, "A-q", "buffer-next"); //one hand user
define_key(default_global_keymap, "A-left", "buffer-previous");
define_key(default_global_keymap, "A-right", "buffer-next");
//// follow new buffer background
undefine_key(content_buffer_normal_keymap,"A-u");
define_key(content_buffer_normal_keymap, "A-u", "follow-new-buffer-background");
define_key(content_buffer_normal_keymap, "a", "follow-new-buffer-background");
undefine_key(content_buffer_normal_keymap,"j");
define_key(content_buffer_normal_keymap, "j", "copy");
undefine_key(content_buffer_normal_keymap,"u");
define_key(content_buffer_normal_keymap, "u", "follow");
define_key(content_buffer_normal_keymap, "p", "reload");
//// kill current buffer
undefine_key(default_global_keymap,"q"); //unbind key q (kill current buffer)
define_key(default_global_keymap, "A-,", "kill-current-buffer");
define_key(default_global_keymap, ",", "kill-current-buffer");
define_key(default_global_keymap, "w", "kill-current-buffer");
//// word selection
define_key(content_buffer_normal_keymap, "S-M-right", "cmd_selectWordNext");
define_key(content_buffer_normal_keymap, "S-M-left", "cmd_selectWordPrevious");
define_key(content_buffer_normal_keymap, "S-A-right", "cmd_selectEndLine");
define_key(content_buffer_normal_keymap, "S-A-left", "cmd_selectBeginLine");
//// other key bindings
define_key(content_buffer_normal_keymap, "C-A-k", "paste-url-new-buffer");
define_key(content_buffer_normal_keymap, "A-o", "stop-loading");
define_key(default_global_keymap, "A-'" , "quit");
define_key(default_global_keymap, "A-e", "find-url-new-window");
define_key(content_buffer_normal_keymap, "C-c", "caret-mode");
define_key(default_global_keymap, "A-y", "find-url-new-buffer");
define_key(default_global_keymap, "A-s", "save-page-complete");
//// Navigation in page
undefine_key(content_buffer_normal_keymap,"i"); //undefine i
//define_key(content_buffer_normal_keymap, "i", "cmd_scrollLineUp");
//define_key(content_buffer_normal_keymap, "k", "cmd_scrollLineDown");
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
define_switch_buffer_key("C-A-j", 0);
//// Switch to last buffer (key 0 or )
define_key(default_global_keymap, "0",
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
define_key(default_global_keymap, "A-p",
          function (I)
          {
              for (var i = 0; i < I.window.buffers.count; i++)
              {
                  reload(I.window.buffers.get_buffer(i));
              }
          });
////Switch to last buffer
define_key(default_global_keymap, "C-S-tab",
          function (I)
          {
              switch_to_buffer(I.window,
                               I.window.buffers.buffer_list[1])
          });
//// Key Aliases
require("global-overlay-keymap");
define_key_alias("C-m", "return");
define_key_alias("A-a", "return");
define_key_alias("A-c", "M-w");
define_key_alias("A-v", "C-y");
define_key_alias("C-A-right", "0");
define_key_alias("C-A-left", "1");
define_key_alias("C-A-q", "0");
define_key_alias("C-A-;", "1");
define_key_alias("C-i", "C-g");
define_key_alias("A-t", "A-y");
define_key_alias("A-k", "A-v");
define_key_alias("C-,", "up");
define_key_alias("C-o", "down");

// caret-mode by default
user_pref('accessibility.browsewithcaret', false);

// Some webjumps
define_webjump("bookmark",
               function(term) {return term;},
               $completer = history_completer($use_history = false,
                                              $use_bookmarks = true,
                                              $match_required = true),
               $description = "Visit a conkeror bookmark");
define_webjump("duckduckgo", "http://duckduckgo.com/?q=%s");
//Google search for specific site
define_webjump("tcb", "http://www.google.com/search?q=%s%20site:thecentralbox.com"); //Google search for thecentralbox.com
define_webjump("hdvn", "http://www.google.com/search?q=%s%20site:hdvietnam.com"); //Google search for hdvietnam.com
define_webjump("yan", "http://www.google.com/search?q=%s%20site:yeuamnhac.com"); //Google search for yeuamnhac.com
//Custom web jumps
define_webjump("dantri", "http://dantri.com.vn");
define_webjump("vnexpress", "http://vnexpress.net");
define_webjump("tinhte", "http://tinhte.vn");
define_webjump("macvn", "http://macvn.com");
define_webjump("sohoa", "http://sohoa.net");
define_webjump("voz", "http://voz.vn");
define_webjump("gsm", "http://gsm.vn");
define_webjump("handheld", "http://handheld.com.vn");
define_webjump("pcworldVN", "http://pcworld.com.vn");
define_webjump("hdvietnam", "http://hdvietnam.com");
define_webjump("yeuamnhac", "http://yeuamnhac.com");
define_webjump("demonoid", "http://demonoid.me");
define_webjump("thecentralbox", "http://thecentralbox.com");
define_webjump("facebook", "http://www.facebook.com");
define_webjump("lqdhn", "http://www.lequydonhn.vn/");
define_webjump("googlevn", "http://google.com.vn/");

// Use history not bookmark?
url_completion_use_history = true;

// XKCD
xkcd_add_title = true;

// Download in background
download_buffer_automatic_open_target = OPEN_NEW_BUFFER_BACKGROUND;

// Load clicked link in background
require("clicks-in-new-buffer.js");
clicks_in_new_buffer_target = OPEN_NEW_BUFFER_BACKGROUND;

// MozRepl (4242)
user_pref('extensions.mozrepl.autoStart', true);
user_pref('extensions.mozrepl.loopbackOnly', false);
let (mozrepl_init = get_home_directory()) {
    mozrepl_init.appendRelativePath(".conkerorrc/mozrepl/init.js");
    session_pref('extensions.mozrepl.initUrl', make_uri(mozrepl_init).spec);
}

// Replacement of built-in C-x b
minibuffer.prototype.read_recent_buffer = function () {
    var window = this.window;
    var buffer = this.window.buffers.current;
    keywords(arguments, $prompt = "Buffer:",
             $default = buffer,
             $history = "buffer");
    var buffers = window.buffers.buffer_list.slice(0);
    buffers.push(buffers.shift());
    var completer = all_word_completer(
        $completions = buffers,
        $get_string = function (x) x.title,
        $get_description = function (x) x.description);
    var result = yield this.read(
        $keymap = read_buffer_keymap,
        $prompt = arguments.$prompt,
        $history = arguments.$history,
        $completer = completer,
        $match_required = true,
        $auto_complete = "buffer",
        $auto_complete_initial = true,
        $auto_complete_delay = 0,
        $default_completion = arguments.$default);
    yield co_return(result);
};

interactive("switch-to-recent-buffer",
            "Switch to a buffer specified in the minibuffer.  List of buffers "+
            "will be ordered by recency.",
            function (I) {
                switch_to_buffer(
                    I.window,
                    (yield I.minibuffer.read_recent_buffer(
                        $prompt = "Switch to buffer:",
                        $default = (I.window.buffers.count > 1 ?
                                    I.window.buffers.buffer_list[1] :
                                    I.buffer))));
            });
define_key(default_global_keymap, "C-x B", "switch-to-recent-buffer");
define_key(default_global_keymap, "C-tab", "switch-to-recent-buffer");
//define_key(read_buffer_keymap, "C-tab", "minibuffer-complete");
define_key(read_buffer_keymap, "C-S-tab", "minibuffer-complete-previous");
define_key(default_global_keymap, "A-return", "switch-to-recent-buffer");
define_key(read_buffer_keymap, "A-return", "minibuffer-complete");
define_key(read_buffer_keymap, "A-S-return", "minibuffer-complete-previous");

// Readability tool
interactive("readability_arc90",
            "Readability is a simple tool that makes reading on the web more enjoyable by removing the clutter around what you are reading",
            function readability_arc90(I) {
                var document = I.window.buffers.current.document;

                var readConvertLinksToFootnotes = false;
                var readStyle = 'style-newspaper';
                var readSize = 'size-medium';
                var readMargin = 'margin-wide';

                var _readability_readStyle = document.createElement('SCRIPT');
                _readability_readStyle.text = 'var readStyle = \'' + readStyle + '\';';
                document.getElementsByTagName('head')[0].appendChild(_readability_readStyle);

                var _readability_readSize = document.createElement('SCRIPT');
                _readability_readSize.text = 'var readSize = \'' + readSize + '\';';
                document.getElementsByTagName('head')[0].appendChild(_readability_readSize);

                var _readability_readMargin = document.createElement('SCRIPT');
                _readability_readMargin.text = 'var readMargin = \'' + readMargin + '\';';
                document.getElementsByTagName('head')[0].appendChild(_readability_readMargin);

                var _readability_readConvertLinksToFootnotes = document.createElement('SCRIPT');
                _readability_readConvertLinksToFootnotes.text = 'var readConvertLinksToFootnotes = ' + readConvertLinksToFootnotes + ';';
                document.getElementsByTagName('head')[0].appendChild(_readability_readConvertLinksToFootnotes);

                var _readability_script = document.createElement('script')
                _readability_script.type='text/javascript'
                _readability_script.src='http://lab.arc90.com/experiments/readability/js/readability.js?x='+(Math.random())
                document.documentElement.appendChild(_readability_script)

                var _readability_css = document.createElement('link')
                _readability_css.rel = 'stylesheet'
                _readability_css.href = 'http://lab.arc90.com/experiments/readability/css/readability.css'
                _readability_css.type = 'text/css'
                _readability_css.media = 'all'
                document.documentElement.appendChild(_readability_css)

                var _readability_print_css = document.createElement('link')
                _readability_print_css.rel = 'stylesheet'
                _readability_print_css.href = 'http://lab.arc90.com/experiments/readability/css/readability-print.css'
                _readability_print_css.media = 'print'
                _readability_print_css.type = 'text/css'
                document.getElementsByTagName('head')[0].appendChild(_readability_print_css)
            });
define_key(content_buffer_normal_keymap, "j", "readability_arc90");

undefine_key(default_global_keymap,"j");
define_key(content_buffer_normal_keymap, "j", "copy");

// What's this?
function repl_context() {
    let ctx = {};
    ctx.__proto__ = conkeror;
    ctx.conkeror = conkeror;
    ctx.window = conkeror.get_recent_conkeror_window();
    ctx.buffer = ctx.window.buffers.current;
    ctx.document = ctx.buffer.document;
    return ctx;
}

// The rest is experimental ----------------------------------------------------

// Darken page
// TODO: use a boolean to keep track of dark/light state
// TODO: add hook for new buffers
function foo (I) {
    var styles='* { background: black !important; color: gray !important; }'+
        ':link, :link * { color: #4986dd !important; }'+
        ':visited, :visited * { color: #d75047 !important; }';
    var wd = conkeror.get_recent_conkeror_window();
    // FIXME: better way for this?
    if (typeof foo.darkened == 'undefined') {
        foo.darkened = true;
    } else {
        foo.darkened = !foo.darkened;
    }
    // FIXME: content buffers only
    for (var i=0; i < wd.buffers.count; i++) {
        var document = I.window.buffers.get_buffer(i).document;
        var id = 'ubolonton/darken_page';
        let (newSS = document.getElementById(id)) {
            if (newSS == null) {
                if (foo.darkened) {
                    newSS = document.createElement('link');
                    newSS.rel = 'stylesheet';
                    newSS.href = 'data:text/css,' + escape(styles);
                    newSS.id = id;
                    document.getElementsByTagName("head")[0].appendChild(newSS);
                }
            } else {
                if (!foo.darkened) {
                    newSS.parentNode.removeChild(newSS);
                }
            }
        }
    }
}
interactive("foo", "Toggle darkening all pages", foo);
define_key(content_buffer_normal_keymap, "A-D", "foo");
function toggle_darkened_page (I) {
    var styles='* { background: black !important; color: gray !important; }'+
        ':link, :link * { color: #4986dd !important; }'+
        ':visited, :visited * { color: #d75047 !important; }';
    var document = I.buffer.document;
    var id = 'ubolonton/darken_page';
    let (newSS = document.getElementById(id)) {
        if (newSS == null) {
            newSS = document.createElement('link');
            newSS.rel = 'stylesheet';
            newSS.href = 'data:text/css,' + escape(styles);
            newSS.id = id;
            document.getElementsByTagName("head")[0].appendChild(newSS);
        } else {
            newSS.parentNode.removeChild(newSS);
        }
    }
}
interactive("toggle-darkened-page", "Toggle darkening the page in an attempt to save your eyes.",
            toggle_darkened_page);
define_key(content_buffer_normal_keymap, "A-d", "toggle-darkened-page");

// FIXME: the page is darkened only after the DOM is finished
// loading. This causes flickering, which is sub-optimal

define_variable("darkened", false, "Darkened or not");

function set_darkness (buffer) {
    var styles='* { background: black !important; color: gray !important; }'+
        ':link, :link * { color: #4986dd !important; }'+
        ':visited, :visited * { color: #d75047 !important; }';
    var document = buffer.document;
    var id = 'ubolonton/darken_page';
    let (newSS = document.getElementById(id)) {
        if (newSS == null) {
            if (darkened) {
                newSS = document.createElement('link');
                newSS.rel = 'stylesheet';
                newSS.href = 'data:text/css,' + escape(styles);
                newSS.id = id;
                document.getElementsByTagName("head")[0].appendChild(newSS);
            }
        } else {
            if (!darkened) {
                newSS.parentNode.removeChild(newSS);
            }
        }
    }
}

add_hook("buffer_dom_content_loaded_hook", set_darkness, false, true);
add_hook("buffer_loaded_hook", set_darkness, false, true);

// Auto load the auto-save session when conkeror starts
session_auto_save_auto_load = true;

// Allow installing extension from any source
session_pref("xpinstall.whitelist.required", false);

//Enable Password Manager
Components.classes["@mozilla.org/login-manager;1"]
    .getService(Components.interfaces.nsILoginManager);

// Set default download location to ~/Downloads
cwd=get_home_directory(); 
cwd.append("Downloads"); 
