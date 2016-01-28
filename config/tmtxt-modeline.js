// mode line
require("mode-line.js");

// buffer count
add_hook("mode_line_hook", mode_line_adder(buffer_count_widget), true);
// loading buffer count
add_hook("mode_line_hook", mode_line_adder(loading_count_widget), true);

// conkeror mac modeline buttons
(function(){
  let path = get_home_directory();
  // add to load path
  path.appendRelativePath(".conkerorrc");
  path.appendRelativePath("modules");
  path.appendRelativePath("cmmb");
  load_paths.unshift(make_uri(path).spec);

  // include the library
  require("conkeror-mac-modeline-buttons.js");
}());

// set the image path for cmmb
cmmb_image_path = get_home_directory();
cmmb_image_path.append(".conkerorrc");
cmmb_image_path.append("modules");
cmmb_image_path.append("cmmb");
cmmb_image_path.append("images");
cmmb_image_path = make_uri(cmmb_image_path).spec;

provide("tmtxt-modeline");
