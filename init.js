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



//viewmarks extension, to manage bookmarks
interactive("viewmarks",
    "Open ViewMarks window.",
    function (I) {
        make_chrome_window('chrome://viewmarks/content/viewmark.xul');
    });

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
// require("adblockplus.js");

/// auto-exit hinting
hints_auto_exit_delay = 1;
hints_ambiguous_auto_exit_delay = 500;

// Default webjump
read_url_handler_list = [read_url_make_default_webjump_handler("google")];
