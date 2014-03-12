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

function content_handler_add_to_aria2(ctx) {
  var source = ctx.launcher.source.spec;

  // for aria2
  var req = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance();
  var data = {
    'jsonrpc':'2.0',
    'id':'qwer',
    'method':'aria2.addUri',
    'params':[[source]]
  };

  // open the request
  req.open('POST', "http://localhost:6800/jsonrpc", true);
  ctx.window.minibuffer.message("Sending download to aria2...");
  req.onreadystatechange = function (aEvt) {
    if (req.readyState === 4) {
      if(req.status === 200)
        ctx.window.minibuffer.message("Download sent to aria2 successfully");
      else
        ctx.window.minibuffer.message("Error while sending download to aria2");
    }
  };
  req.send(JSON.stringify(data));
  
}

function content_handler_prompt (ctx) {
  var action_chosen = false;
  var can_view_internally = ctx.frame != null &&
    can_override_mime_type_for_uri(ctx.launcher.source);
  var panel;
  try {
    panel = create_info_panel(ctx.window, "download-panel",
                              [["downloading", "Downloading:", ctx.launcher.source.spec],
                               ["mime-type", "Mime type:", ctx.launcher.MIMEInfo.MIMEType]]);
    var action = yield ctx.window.minibuffer.read_single_character_option(
      $prompt = "Action to perform: (s: save; o: open; O: open URL; c: copy URL; a: aria2; "+
        (can_view_internally ? "i: view internally; t: view as text)" : ")"),
      $options = (can_view_internally ? ["s", "o", "O", "c", "a", "i", "t"] : ["s", "o", "O", "c", "a"]));
    switch (action) {
    case "s":
      yield content_handler_save(ctx);
      action_chosen = true;
      break;
    case "o":
      yield content_handler_open(ctx);
      action_chosen = true;
      break;
    case "O":
      yield content_handler_open_url(ctx);
      action_chosen = true;
      break;
    case "c":
      yield content_handler_copy_url(ctx);
      action_chosen = true;
      break;
    case "i":
      yield content_handler_view_internally(ctx);
      action_chosen = true;
      break;
    case "t":
      yield content_handler_view_as_text(ctx);
      action_chosen = true;
      break;
    case "a":
      yield content_handler_add_to_aria2(ctx);
      action_chosen = true;
      break;
    }
  } catch (e) {
    handle_interactive_error(ctx.window, e);
  } finally {
    if (! action_chosen)
      ctx.abort();
    if (panel)
      panel.destroy();
  }
}
