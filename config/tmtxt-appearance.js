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

tmtxt.display.allowHideTab = false;
tmtxt.display.showTab();
tmtxt.display.hideTabDelay();

provide("tmtxt-appearance");
