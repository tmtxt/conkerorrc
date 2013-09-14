// TODO: quit hook: save session to another file along the default auto session file

//mozrepl
user_pref('extensions.mozrepl.autoStart', true);
if ('@hyperstruct.net/mozlab/mozrepl;1' in Cc) {
  let mozrepl = Cc['@hyperstruct.net/mozlab/mozrepl;1']
    .getService(Ci.nsIMozRepl);
  if (! mozrepl.isActive())
    mozrepl.start(4242);
}
let (mozrepl_init = get_home_directory()) {
    mozrepl_init.appendRelativePath(".mozrepl-conkeror.js");
    session_pref('extensions.mozrepl.initUrl', make_uri(mozrepl_init).spec);
}

// OSX mapping: Command => A | Option => M
modifiers.M = new modifier(function (event) { return event.altKey; },
                           function (event) { event.altKey = true; });
modifiers.A = new modifier(function (event) { return event.metaKey; },
                           function (event) { event.metaKey = true; });

define_key(default_global_keymap, "A-`", null, $fallthrough);

// Some useful modules
require("daemon.js");
require("session.js");
require("dom-inspector.js");

// mode line
// the bar in Conkeror's gui between the browser and the minibuffer.
require("mode-line.js");
// some widgets for this mode
// show how many buffers are in the current window and which one is currently
// selected
add_hook("mode_line_hook", mode_line_adder(buffer_count_widget), true);
// show how many buffers are currently loading
add_hook("mode_line_hook", mode_line_adder(loading_count_widget), true);

// load_paths.unshift("file://~/.conkerorrc/modules/");
require("favicon.js"); // they forgot this in new-tabs.js
require("new-tabs.js");
tab_bar_show_icon = true;
tab_bar_show_index = true;

// Auto load the auto-save session when conkeror starts
session_auto_save_auto_load = true;

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

define_key(default_global_keymap, "A-i", "inspect-chrome");
define_key(read_buffer_keymap, "A-i", "inspect-chrome");

// Personal theme
theme_load_paths.unshift("~/.conkerorrc/themes/");
theme_unload("default");
theme_load("tmtxt");
interactive("tmtxt-theme", "Load my personal theme",
            function(I) {
                theme_load("tmtxt");
            });
define_key(default_global_keymap, "A-u", "tmtxt-theme");

// gmail-mode
require("page-modes/gmail.js");
define_key(gmail_keymap, "v", null, $fallthrough);
define_key(gmail_keymap, "space", null, $fallthrough);
define_key(gmail_keymap, "S-space", null, $fallthrough);
define_key(gmail_keymap, "page_up", null, $fallthrough);
define_key(gmail_keymap, "page_down", null, $fallthrough);

// form
user_pref("signon.prefillForms", true);
user_pref("signon.autofillForms", true);
user_pref("signon.rememberSignons", true);

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

//// Switch to last buffer (key 0 or )
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

////Switch to last buffer
// this is for older version of conkeror 
// define_key(default_global_keymap, "C-S-tab",
//           function (I)
//           {
//               switch_to_buffer(I.window,
//                                I.window.buffers.buffer_list[1])
//           });
// this is for newer version of conkeror
interactive("switch-to-last-buffer", "Switch to the last visited buffer",
            function (I) {
                switch_to_buffer(I.window,
                                 // This is the way to go in newer
                                 // conkeror versions
                                 I.window.buffers.buffer_history[1])
            });
define_key(default_global_keymap, "C-S-tab", "switch-to-last-buffer");

// Custom key-bindings
//// buffer change
// next and previous buffer
define_key(default_global_keymap, "A-z", "buffer-previous"); //one hand user
// define_key(default_global_keymap, "M-A-}", "buffer-previous"); //one hand user 
define_key(default_global_keymap, "C-j", "buffer-previous"); //two hands user
// define_key(default_global_keymap, "M-A-.", "buffer-next"); //one hand user
define_key(default_global_keymap, "A-x", "buffer-next"); //one hand user
define_key(default_global_keymap, "C-l", "buffer-next"); //two hands user
define_key(default_global_keymap, "A-left", "buffer-previous"); //not convinience
define_key(default_global_keymap, "A-right", "buffer-next");//not convinience
//// follow new buffer background
define_key(content_buffer_normal_keymap, "A-f", "follow-new-buffer-background");
undefine_key(default_global_keymap, "q");
define_key(content_buffer_normal_keymap, "q", "follow-new-buffer-background");
define_key(default_global_keymap, "C-t", "find-url-new-buffer");
//// kill current buffer
define_key(default_global_keymap, "w", "tmtxt-close-and-save-current-buffer");
define_key(default_global_keymap, "A-w", "tmtxt-close-and-save-current-buffer");
define_key(default_global_keymap, "A-k", "tmtxt-close-and-save-current-buffer");
//reopen last closed buffer
define_key(default_global_keymap, "A-W", "tmtxt-open-closed-buffer")
//// word selection
define_key(content_buffer_normal_keymap, "S-M-right", "cmd_selectWordNext");
define_key(content_buffer_normal_keymap, "S-M-left", "cmd_selectWordPrevious");
define_key(content_buffer_normal_keymap, "S-A-right", "cmd_selectEndLine");
define_key(content_buffer_normal_keymap, "C-E", "cmd_selectEndLine");
define_key(content_buffer_normal_keymap, "C-A", "cmd_selectBeginLine");
define_key(content_buffer_normal_keymap, "S-A-left", "cmd_selectBeginLine");
// navigation in emacs style
define_key(default_global_keymap, "M-F", "cmd_selectWordNext");
//// other key bindings
//open the url in the clipboard in new buffer
define_key(content_buffer_normal_keymap, "C-A-v", "paste-url-new-buffer");
define_key(content_buffer_normal_keymap, "V", "paste-url-new-buffer");
define_key(content_buffer_normal_keymap, "A-page_down", "paste-url-new-buffer");
//quit conkeror
define_key(default_global_keymap, "A-q" , "quit");
//enable/disable caret mode
// define_key(content_buffer_normal_keymap, "C-c", "caret-mode");
// define_key(content_buffer_normal_keymap, "A-x", "cmd_cut")
//open url in new buffer
// define_key(default_global_keymap, "A-t", "find-url-new-buffer");
// undefine_key(content_buffer_normal_keymap, "t");
// define_key(default_global_keymap, "t", "find-url-new-buffer");

// function define_key_alias (typed_key, generated_key) {
//     var name = "generate-key-event:"+generated_key;
//     interactive(name,
//         "Generate a fake key press event for the key: "+generated_key,
//         function (I) {
//           var keys = generated_key.split(" ");
//           call_after_timeout(function () {
//             _.each(keys, function(key) {
//               send_key_as_event(I.window,
//                                 I.buffer.focused_element,
//                                 key);
//             });
//           }, 0);
//         });
//   define_key(global_overlay_keymap, typed_key, name);
//   global_overlay_keymap_mode(true);
// }

//// Key Aliases
require("global-overlay-keymap");
define_key_alias("C-m", "return");//emacs style
define_key_alias("A-c", "M-w");//mac os style
define_key_alias("A-v", "C-y");//mac os style
define_key_alias("C-J", "C-A-z");//switch to first tab
define_key_alias("C-L", "C-A-x");//switch to last buffer
define_key_alias("C-o", "escape");

// caret-mode disable by default
user_pref('accessibility.browsewithcaret', false);

// Some webjumps
define_webjump("bookmark",
               function(term) {return term;},
               $completer = history_completer($use_history = false,
                                              $use_bookmarks = true,
                                              $match_required = true),
               $description = "Visit a conkeror bookmark");

//special web jump (searching)
define_webjump("hdvn", "http://www.google.com/search?q=%s%20site:hdvietnam.com",
			  $description = "Google search for hdvietnam.com");
define_webjump("yan", "http://www.google.com/search?q=%s%20site:yeuamnhac.com",
			  $description = "Google Search for yeuamnhac.com");
define_webjump("g", "http://www.google.com/search?q=%s", 
			  $description = "Google Search");
define_webjump("rut", "http://www.google.com/search?q=%s%20site:rutracker.org",
			  $description = "Google search for rutracker.org");
define_webjump("yt", "http://www.youtube.com/results?search_query=%s",
			  $description = "Youtue Search");
define_webjump("js", "https://developer.mozilla.org/en-US/search?q=%s",
			  $description = "Javascript documentation search (Mozilla)");
define_webjump("tt", "http://www.google.com/search?q=%s%20site:tinhte.vn",
			  $description = "Google search for tinhte.vn");
define_webjump("tpb", "http://thepiratebay.se/search/%s",
               $description = "Pirate Bay torrent search");
define_webjump("php", "http://www.php.net/manual-lookup.php?pattern=%s&scope=quickref",
               $description = "PHP Doc Search");

//normal web jumps
define_webjump("dantri", "http://dantri.com.vn");
define_webjump("vnexpress", "http://vnexpress.net");
define_webjump("ti", "http://tinhte.vn");
define_webjump("macvn", "http://macvn.com");
define_webjump("sohoa", "http://sohoa.net");
define_webjump("voz", "http://voz.vn");
define_webjump("pcworldVN", "http://pcworld.com.vn");
define_webjump("hdvietnam", "http://hdvietnam.com");
define_webjump("yeuamnhac", "http://yeuamnhac.com");
define_webjump("demonoid", "http://demonoid.me");
define_webjump("ggvn", "http://google.com.vn/");

//keyboard shorcut for often-used sites
interactive("tmtxt-open-facebook-new", "Open Facebook New Buffer", "follow-new-buffer",
            $browser_object = "http://facebook.com/");
define_key(content_buffer_normal_keymap, "C-1", "tmtxt-open-facebook-new");
interactive("tmtxt-open-myblog-new", "Open My Blog New Buffer", "follow-new-buffer",
            $browser_object = "http://truongtx.me/");
define_key(content_buffer_normal_keymap, "C-2", "tmtxt-open-myblog-new");
interactive("tmtxt-open-myblog-local-new", "Open My Blog Localhost New Buffer",
			"follow-new-buffer",
            $browser_object = "http://localhost:4000/");
define_key(content_buffer_normal_keymap, "C-@", "tmtxt-open-myblog-local-new");
interactive("tmtxt-open-hn-new", "Open HN New Buffer", "follow-new-buffer",
            $browser_object = "http://news.ycombinator.com/");
define_key(content_buffer_normal_keymap, "C-3", "tmtxt-open-hn-new");
interactive("tmtxt-open-tinhte-new", "Open Tinhte New Buffer", "follow-new-buffer",
            $browser_object = "http://tinhte.vn/");
define_key(content_buffer_normal_keymap, "C-4", "tmtxt-open-tinhte-new");
interactive("tmtxt-open-linkedin-new", "Open Linkedin New Buffer", "follow-new-buffer",
            $browser_object = "http://www.linkedin.com/");
define_key(content_buffer_normal_keymap, "C-5", "tmtxt-open-linkedin-new");
interactive("tmtxt-open-trello-new", "Open Trello New Buffer", "follow-new-buffer",
            $browser_object = "https://trello.com/");
define_key(content_buffer_normal_keymap, "C-6", "tmtxt-open-trello-new");

/// clear cache function
interactive("tmtxt-cache-clear-all", "clear all cache",
            function (I) {
			  cache_clear(CACHE_ALL);
            });
define_key(default_global_keymap, "C-`", "tmtxt-cache-clear-all");

// Use history not bookmark?
url_completion_use_history = true;

// XKCD
xkcd_add_title = true;

// Download in background
download_buffer_automatic_open_target = OPEN_NEW_BUFFER_BACKGROUND;

// Load clicked link in background
require("clicks-in-new-buffer.js");
clicks_in_new_buffer_target = OPEN_NEW_BUFFER_BACKGROUND;

// Replacement of built-in C-x b
// minibuffer.prototype.read_recent_buffer = function () {
//     var window = this.window;
//     var buffer = this.window.buffers.current;
//     keywords(arguments, $prompt = "Buffer:",
//              $default = buffer,
//              $history = "buffer");
//     var buffers = window.buffers.buffer_list.slice(0);
//     buffers.push(buffers.shift());
//     var completer = all_word_completer(
//         $completions = buffers,
//         $get_string = function (x) x.title,
//         $get_description = function (x) x.description);
//     var result = yield this.read(
//         $keymap = read_buffer_keymap,
//         $prompt = arguments.$prompt,
//         $history = arguments.$history,
//         $completer = completer,
//         $match_required = true,
//         $auto_complete = "buffer",
//         $auto_complete_initial = true,
//         $auto_complete_delay = 0,
//         $default_completion = arguments.$default);
//     yield co_return(result);
// };

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


// Darken page - for reading webpage in the night
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

// Allow installing extension from any source
session_pref("xpinstall.whitelist.required", false);

//Enable Password Manager
Components.classes["@mozilla.org/login-manager;1"]
    .getService(Components.interfaces.nsILoginManager);

// Set default download location to ~/Downloads
cwd=get_home_directory(); 
cwd.append("Downloads"); 

//Facebook share
function facebook_share(I){
    var d=I.buffer.document;
    var f='http://www.facebook.com/sharer';
    var l=d.location, e=encodeURIComponent;
    var p='.php?src=bm&v=4&i=1279479932&u='+e(l.href)+'&t='+e(d.title);
    browser_object_follow(I.buffer,
                          OPEN_NEW_BUFFER,
                          f+p);
};
interactive("facebook-share", "Share the current site on Facebook.", facebook_share);
//also bind M-f to facebook share function
//define_key(default_global_keymap, "M-f", "facebook-share");

//Use bookmark and history on url completion
url_completion_use_bookmarks = true;
url_completion_use_history = true;

//google search mode
require("page-modes/google-search-results.js");

//viewmarks extension, to manage bookmarks
interactive("viewmarks",
    "Open ViewMarks window.",
    function (I) {
        make_chrome_window('chrome://viewmarks/content/viewmark.xul');
    });

//colors-toggle
//replace darken-page mode
interactive("colors-toggle", "toggle between document and forced colors",
            function (I) {
                var p = "browser.display.use_document_colors";
                if (get_pref(p)) {
                    session_pref("browser.active_color", "yellow");
                    session_pref("browser.anchor_color", "#4986dd");
                    session_pref("browser.display.background_color", "#0C141E");
                    session_pref("browser.display.foreground_color", "#A0AFA8");
                    session_pref("browser.display.focus_background_color", "green"); // ?
                    session_pref("browser.display.focus_text_color", "red"); // ?
                    session_pref("browser.visited_color", "#805DBB");
                    session_pref(p, false);
                } else {
                    session_pref("browser.active_color", "#EE0000");
                    session_pref("browser.anchor_color", "#0000EE");
                    session_pref("browser.display.background_color", "#FFFFFF");
                    session_pref("browser.display.foreground_color", "#000000");
                    session_pref("browser.display.focus_background_color", "#117722");
                    session_pref("browser.display.focus_text_color", "#FFFFFF");
                    session_pref("browser.visited_color", "#551A8B");
                    session_pref(p, true);
                }
            });
define_key(default_global_keymap, "A-n", "colors-toggle");

// get tiny url for the current page
// press * q and then c to generate and copy the tinyurl into clipboard
define_browser_object_class(
    "tinyurl", "Get a tinyurl for the current page",
    function (I, prompt) {
        check_buffer(I.buffer, content_buffer);
        let createurl = 'http://tinyurl.com/api-create.php?url=' +
            encodeURIComponent(
                load_spec_uri_string(
                    load_spec(I.buffer.top_frame)));
        try {
            var content = yield send_http_request(
                load_spec({uri: createurl}));
            yield co_return(content.responseText);
        } catch (e) { }
    });
define_key(content_buffer_normal_keymap, "* q", "browser-object-tinyurl");

/// open remote url in new tab not new frame
url_remoting_fn = load_url_in_new_buffer;

/// enable adblock
require("adblockplus.js");

/// auto-exit hinting
hints_auto_exit_delay = 1;
hints_ambiguous_auto_exit_delay = 500;





/// Basic navigation buttons in mode line
/// include mode-line-button library
load_paths.unshift("chrome://conkeror-contrib/content/");
require("mode-line-buttons.js");

/// Function to replace 
function tmtxt_make_button_widget (command, attributes) {
    if (typeof attributes == "string")
        // Simple case
        attributes = { src: "file:///Volumes/tmtxt/" + attributes + ".png" };

    function new_widget (window) {
        button_widget.call(this, window);
    }
    new_widget.prototype = {
        constructor: new_widget,
        __proto__: button_widget.prototype,
        command: command,
        attributes: attributes
    };
    new_widget.mode_line_adder = function (window) {
        var widget = new new_widget(window);
        window.mode_line.add_widget(widget, widget.make_element(window));
    };

    return new_widget;
}

/// The array to hold all the mode line buttons
var tmtxt_mode_line_button_widgets = new Array();

/// Function to replace the function mode_line_add_buttons
function tmtxt_mode_line_add_buttons (buttons, prepend) {
  for (var i = 0, n = buttons.length; i < n; i++) {
	

	// code from conkeror sourse file
    var j = prepend ? n - i - 1 : i;

	// my custom code
	if(typeof buttons[j][1]  == "string")
	  buttons[j][1] = { src: "file:///Volumes/tmtxt/" + buttons[j][1] + ".png" };

	/// code from conkeror source file
	var w = make_button_widget(buttons[j][0], buttons[j][1]);
    add_hook("mode_line_hook", mode_line_adder(w), prepend);

	// My custom code
	tmtxt_mode_line_button_widgets[i] = w; // add the button to the array

  }
}

/// The array to hold the definition for the mode line buttons
tmtxt_standard_mode_line_buttons = [
    ["back", "go-back"],
    ["find-url-new-buffer", "new"]
];

/// Interactive function to show the mode line buttons
interactive("tmtxt-add-mode-line-nav-buttons", "Add basic navigation buttons to the mode line",
			function(I){
			  // check if the array that hold all the button widgets contains no element
			  if(tmtxt_mode_line_button_widgets.length == 0){
				// add the button
				tmtxt_mode_line_add_buttons(tmtxt_standard_mode_line_buttons, true);

				// restart mode line
				mode_line_mode(false);
				mode_line_mode(true);
			  }
			  
			});

/// Interactive function to hide the mode line buttons
interactive("tmtxt-remove-mode-line-nav-buttons", "Remove navigation buttons from mode line", 
			function(I){
			  // loop through the array to remove hook
			  for(var i=0; i<tmtxt_mode_line_button_widgets.length;i++){
				remove_hook("mode_line_hook", mode_line_adder(tmtxt_mode_line_button_widgets[i]));
			  }

			  // remove all widgets in the array
			  tmtxt_mode_line_button_widgets.length = 0;

			  // restart mode line
			  mode_line_mode(false);
			  mode_line_mode(true);
			});
