var tmtxt = tmtxt || {};

////////////////////////////////////////////////////////////////////////////////
// Personal theme
theme_load_paths.unshift("~/.conkerorrc/themes/");
theme_unload("default");
theme_load("tmtxt");
interactive("tmtxt-theme", "Load my personal theme", function() {
  theme_unload("tmtxt");
  theme_load("tmtxt");
});

////////////////////////////////////////////////////////////////////////////////
// Tab bar
require("favicon.js");
require("new-tabs.js");
tab_bar_show_icon = true;
tab_bar_show_index = true;

////////////////////////////////////////////////////////////////////////////////
// Colors-toggle
interactive("colors-toggle", "toggle between document and forced colors",
            function (I) {
              var p = "browser.display.use_document_colors";
              if (get_pref(p)) {
                session_pref("browser.active_color", "yellow");
                session_pref("browser.anchor_color", "#4986dd");
                session_pref("browser.display.background_color", "#0C141E");
                session_pref("browser.display.foreground_color", "#A0AFA8");
                session_pref("browser.display.use_focus_colors", true);
                session_pref("browser.display.focus_background_color", "#062B35"); // ?
                session_pref("browser.display.focus_text_color", "#30A098"); // ?
                session_pref("browser.visited_color", "#805DBB");
                session_pref(p, false);
              } else {
                session_pref("browser.active_color", "#EE0000");
                session_pref("browser.anchor_color", "#0000EE");
                session_pref("browser.display.background_color", "#FFFFFF");
                session_pref("browser.display.foreground_color", "#000000");
                session_pref("browser.display.use_focus_colors", false);
                session_pref("browser.display.focus_background_color", "#117722");
                session_pref("browser.display.focus_text_color", "#FFFFFF");
                session_pref("browser.visited_color", "#551A8B");
                session_pref(p, true);
              }
            });

////////////////////////////////////////////////////////////////////////////////
// Auto hide show tab bar
tmtxt.display = {};
tmtxt.display.allowHideTab = false;
tmtxt.display.tabLastTimer = null;

// Hide tab bar immediately
tmtxt.display.hideTab = function() {
  if (tmtxt.display.allowHideTab) {
    let sheet = get_home_directory();
    sheet.append(".conkerorrc");
    sheet.append("no-tab.css");
    register_user_stylesheet(make_uri(sheet));
  }
};

// Show tab bar
tmtxt.display.showTab = function() {
  let sheet = get_home_directory();
	sheet.append(".conkerorrc");
	sheet.append("no-tab.css");
	unregister_user_stylesheet(make_uri(sheet));
};

// Hide tab bar with delay
tmtxt.display.hideTabDelay = function() {
  var display = tmtxt.display;

  // cancel the last timer if exists
  if (!!display.tabLastTimer) {
    display.tabLastTimer.cancel();
  }

  // init a new timer for hide tab
  display.tabLastTimer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
  display.tabLastTimer.initWithCallback(
    {
      notify: function(timer) {
        display.hideTab();
        display.tabLastTimer = null;
	    }
    },
    3000,
    Components.interfaces.nsITimer.TYPE_ONE_SHOT
  );
};

// Interactive commands
interactive("show-tab-temporarily", "Show tab bar for a short time", function(I){
  tmtxt.display.showTab();
  tmtxt.display.hideTabDelay();
});
interactive("show-tab-permanantly", "Show tab bar permanantly", function(I){
  tmtxt.display.showTab();
  tmtxt.display.allowHideTab = false;
});
interactive("hide-tab", "Hide tab bar", function(I){
  tmtxt.display.allowHideTab = true;
  tmtxt.display.hideTab();
});

tmtxt.allowHideTab = false;
tmtxt.display.showTab();
tmtxt.display.hideTabDelay();

provide("tmtxt-appearance");
