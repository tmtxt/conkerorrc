//mozrepl, localhost port 4242 default
user_pref('extensions.mozrepl.autoStart', true);
let (mozrepl_init = get_home_directory()) {
  mozrepl_init.appendRelativePath(".conkerorrc");
  mozrepl_init.appendRelativePath(".mozrepl-conkeror.js");
  session_pref('extensions.mozrepl.initUrl', make_uri(mozrepl_init).spec);
}

// OSX mapping: Command => A | Option => M
modifiers.M = new modifier(function (event) { return event.altKey; },
                           function (event) { event.altKey = true; });
modifiers.A = new modifier(function (event) { return event.metaKey; },
                           function (event) { event.metaKey = true; });

define_key(default_global_keymap, "A-`", null, $fallthrough);

// add directory dir inside .conkerorrc to load_paths
function tmtxt_add_path(dir) {
    let (path = get_home_directory()) {
        path.appendRelativePath(".conkerorrc");
        path.appendRelativePath(dir);
        load_paths.unshift(make_uri(path).spec);
    };
}

// Some useful modules
require("daemon.js");
require("session.js");
require("dom-inspector.js");
require("page-modes/gmail.js");
require("global-overlay-keymap");
require("clicks-in-new-buffer.js");
require("page-modes/google-search-results.js");

// my config files
tmtxt_add_path("config");
require("tmtxt-appearance.js");
require("tmtxt-webjumps.js");
require("tmtxt-buffer.js");
require("tmtxt-modeline.js");
require("tmtxt-keybindings.js");
require("tmtxt-readability.js");
require("tmtxt-useragent.js");
require("tmtxt-minibuffer.js");
require("tmtxt-download.js");
require("tmtxt-sites.js");

// Auto load the auto-save session when conkeror starts
session_auto_save_auto_load = true;

// form
user_pref("signon.prefillForms", true);
user_pref("signon.autofillForms", true);
user_pref("signon.rememberSignons", true);

// caret-mode disable by default
user_pref('accessibility.browsewithcaret', false);

/// clear cache function
interactive("tmtxt-cache-clear-all", "clear all cache",
            function (I) {
			  cache_clear(CACHE_ALL);
            });
define_key(default_global_keymap, "C-`", "tmtxt-cache-clear-all");

// XKCD
xkcd_add_title = true;



// Load clicked link in background

clicks_in_new_buffer_target = OPEN_NEW_BUFFER_BACKGROUND;



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

// Allow installing extension from any source
session_pref("xpinstall.whitelist.required", false);

//Enable Password Manager
Components.classes["@mozilla.org/login-manager;1"]
    .getService(Components.interfaces.nsILoginManager);

//viewmarks extension, to manage bookmarks
interactive("viewmarks",
    "Open ViewMarks window.",
    function (I) {
        make_chrome_window('chrome://viewmarks/content/viewmark.xul');
    });

/// open remote url in new tab not new frame
url_remoting_fn = load_url_in_new_buffer;

/// auto-exit hinting
hints_auto_exit_delay = 1;
hints_ambiguous_auto_exit_delay = 500;

// Default webjump
read_url_handler_list = [read_url_make_default_webjump_handler("google")];
