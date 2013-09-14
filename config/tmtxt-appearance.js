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

//colors-toggle
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

provide("tmtxt-appearance");
