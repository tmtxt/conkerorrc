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
require("dom-inspector.js");
require("page-modes/gmail.js");
require("global-overlay-keymap");
require("clicks-in-new-buffer.js");
require("page-modes/google-search-results.js");

// my config files
tmtxt_add_path("config");
require("tmtxt-development.js");
require("tmtxt-appearance.js");
require("tmtxt-webjumps.js");
require("tmtxt-buffer-switcher.js");
require("tmtxt-buffer-interaction.js");
require("tmtxt-modeline.js");
require("tmtxt-readability.js");
require("tmtxt-useragent.js");
require("tmtxt-minibuffer.js");
require("tmtxt-download.js");
require("tmtxt-sites.js");
require("tmtxt-form.js");
require("tmtxt-facebook.js");
require("tmtxt-env.js");
require("tmtxt-extensions.js");
require("tmtxt-hinting.js");
require("tmtxt-session.js");
require("tmtxt-navigation.js");
require("tmtxt-keybindings.js");

// caret-mode disable by default
user_pref('accessibility.browsewithcaret', false);

/// clear cache function
interactive("tmtxt-cache-clear-all", "clear all cache",
            function (I) {
			        cache_clear(CACHE_ALL);
            });
define_key(default_global_keymap, "C-`", "tmtxt-cache-clear-all");

/// open remote url in new tab not new frame
url_remoting_fn = load_url_in_new_buffer;

// Load clicked link in background
clicks_in_new_buffer_target = OPEN_NEW_BUFFER_BACKGROUND;

// history expire
user_pref("browser.history_expire_day", 99999);
