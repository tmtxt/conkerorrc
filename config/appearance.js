// Personal theme
theme_load_paths.unshift("~/.conkerorrc/themes/");
theme_unload("default");
theme_load("tmtxt");

// tab bar
require("favicon.js");
require("new-tabs.js");
tab_bar_show_icon = true;
tab_bar_show_index = true;

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

provide("appearance");
