var tmtxt = tmtxt || {};

////////////////////////////////////////////////////////////////////////////////
// Conkeror Extended Facebook Mode
(function(){
  var path = get_home_directory();
  // add to load path
  path.appendRelativePath(".conkerorrc");
  path.appendRelativePath("modules");
  path.appendRelativePath("cefm");
  load_paths.unshift(make_uri(path).spec);

  // include the library
  require("conkeror-extended-facebook-mode.js");
}());
interactive("facebook-share", "Share the current site on Facebook.", cefm.facebookShare);

// Facebook messeger (messenger.com)
(function(){
  // init permission manager
  tmtxt.xpcom = tmtxt.xpcom || {};
  const permissionManager = Components.classes["@mozilla.org/permissionmanager;1"]
        .getService(Components.interfaces.nsIPermissionManager);
  tmtxt.xpcom.permissionManager = permissionManager;

  // add permission for messeger.com
  permissionManager.add(
    make_uri("http://www.messenger.com/"),
    "desktop-notification",
    Components.interfaces.nsIPermissionManager.ALLOW_ACTION
  );
}());

provide("tmtxt-facebook");
