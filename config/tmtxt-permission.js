// web page permission manager
var tmtxt = tmtxt || {};

// List of web api permission
tmtxt.permissionsList = [
  {desc: "Audio Capture", value: "audio-capture"},
  {desc: "Video Capture", value: "video-capture"},
  {desc: "Geo Location", value: "geolocation"},
  {desc: "Desktop Notification", value: "desktop-notification"}
];

// read permission from minibuffer
tmtxt.readPermission = function(I) {
  return I.minibuffer.read(
    $prompt = "Select permission:",
    $completer = new all_word_completer(
      $completions = tmtxt.permissionsList,
      $get_string = function(x) {return x.value;},
      $get_description = function(x) {return x.desc;}
    )
  );
};

// add and remove permission for current page
tmtxt.addPermission = function(I) {
  var permissionManager = tmtxt.xpcom.permissionManager;
  var perm = yield tmtxt.readPermission(I);
  var uri = make_uri(I.buffer.current_uri.prePath);
  var allow = Components.interfaces.nsIPermissionManager.ALLOW_ACTION;

  permissionManager.add(uri, perm, allow);

  I.minibuffer.message("Permission " + perm + " added");
};
tmtxt.removePermission = function(I) {
  var permissionManager = tmtxt.xpcom.permissionManager;
  var perm = yield tmtxt.readPermission(I);
  var uri = make_uri(I.buffer.current_uri.prePath);
  var deny = Components.interfaces.nsIPermissionManager.DENY_ACTION;

  permissionManager.add(uri, perm, deny);

  I.minibuffer.message("Permission " + perm + " removed");
};

// interactive
interactive("add-permission", "Add specific permission for current uri", tmtxt.addPermission);
interactive("remove-permission", "Remove specific permission for current uri", tmtxt.removePermission);

provide("tmtxt-permission");
