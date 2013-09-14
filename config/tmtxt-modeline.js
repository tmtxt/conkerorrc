// mode line
require("mode-line.js");

// buffer count
add_hook("mode_line_hook", mode_line_adder(buffer_count_widget), true);
// loading buffer count
add_hook("mode_line_hook", mode_line_adder(loading_count_widget), true);

// conkeror mac modeline buttons
let (path = get_home_directory()) {
  // add to load path
  path.appendRelativePath(".conkerorrc");
  path.appendRelativePath("conkeror-mac-modeline-buttons");
  load_paths.unshift(make_uri(path).spec);

  // include the library
  require("conkeror-mac-modeline-buttons.js");  
};

provide("tmtxt-modeline");
