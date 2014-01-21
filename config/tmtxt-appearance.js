////////////////////////////////////////////////////////////////////////////////
// Personal theme
theme_load_paths.unshift("~/.conkerorrc/themes/");
theme_unload("default");
theme_load("tmtxt");
function tmtxt_reload_theme () {
  theme_unload("tmtxt");
  theme_load("tmtxt");
}
interactive("tmtxt-theme", "Load my personal theme", tmtxt_reload_theme);

////////////////////////////////////////////////////////////////////////////////
// Tab bar
require("favicon.js");
require("new-tabs.js");
tab_bar_show_icon = true;
tab_bar_show_index = true;

////////////////////////////////////////////////////////////////////////////////
// Stylesheet toggling
// From technomancy
interactive("toggle-stylesheets",
            "Toggle whether conkeror uses style sheets (CSS) for the " +
            "current buffer. It is sometimes useful to turn off style " +
            "sheets when the web site makes obnoxious choices.",
            function(I) {
              var s = I.buffer.document.styleSheets;
              for (var i = 0; i < s.length; i++)
                s[i].disabled = !s[i].disabled;
            });

let(st_on = false) {
  function toggle_custom_stylesheet(str) {
    if (!st_on) {
      register_user_stylesheet(str);
    } else {
      unregister_user_stylesheet(str);
    };
    st_on = !st_on;
  };
};

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

////////////////////////////////////////////////////////////////////////////////
// Auto hide show tab bar
var allow_hide_tab = true;
var tmtxt_last_timer = null;

// Hide tab bar immediately
function hide_tab(){
  if(allow_hide_tab){
	let (sheet = get_home_directory()) {
      sheet.append(".conkerorrc");
      sheet.append("no-tab.css");
      register_user_stylesheet(make_uri(sheet));
	};
  }
}

// Show tab bar
function show_tab(){
  let (sheet = get_home_directory()) {
	sheet.append(".conkerorrc");
	sheet.append("no-tab.css");
	unregister_user_stylesheet(make_uri(sheet));
  };
}

// Hide tab bar with delay
function hide_tab_delay(){
  // we need an nsITimerCallback compatible...
  // ... interface for the callbacks.
  var event = {
	notify: function(timer) {
      hide_tab();
	  tmtxt_last_timer = null;
	}
  };

  if(tmtxt_last_timer != null){
	tmtxt_last_timer.cancel();
  }
  
  // Now it is time to create the timer...  
  tmtxt_last_timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
  
  // ... and to initialize it, we want to call event.notify() ...
  // ... one time after exactly ten seconds. 
  tmtxt_last_timer.initWithCallback(event, 3000, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
}

// Interactive commands
interactive("show-tab-temporarily", "Show tab bar for a short time", function(I){
  show_tab();
  hide_tab_delay();
});
interactive("show-tab-permanantly", "Show tab bar permanantly", function(I){
  show_tab();
  allow_hide_tab = false;
});
interactive("hide-tab", "Hide tab bar", function(I){
  allow_hide_tab = true;
  hide_tab();
});

// Now activate the feature
show_tab();
hide_tab_delay();

provide("tmtxt-appearance");
