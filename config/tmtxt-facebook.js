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

interactive("messenger-next-conversation",
            "Next conversation",
            function(I){
              var document = I.buffer.document;
              var conversationList = document.querySelector("ul[aria-label='Conversation List']");
              var conversationItems = conversationList.querySelectorAll("li[role='row']");
              var length = conversationItems.length;
              var nextConversation;

              for(var i = 0; i < conversationItems.length; i++) {
                var currentConversation = conversationItems[i];
                if (!!currentConversation.getAttribute('aria-relevant') && i !== (length -1)) {
                  nextConversation = conversationItems[i + 1].querySelector('a');
                  break;
                }
              }

              if (!!nextConversation) {
                dom_node_click(nextConversation);
              }
            });

provide("tmtxt-facebook");
