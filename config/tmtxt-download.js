////////////////////////////////////////////////////////////////////////////////
// Download in background
download_buffer_automatic_open_target = OPEN_NEW_BUFFER_BACKGROUND;

// Set default download location to ~/Downloads
cwd=get_home_directory(); 
cwd.append("Downloads");

////////////////////////////////////////////////////////////////////////////////
// Integrating with aria2
// My handler function
function content_handler_add_to_aria2(ctx) {
  var source = ctx.launcher.source.spec;

  // for aria2
  var req = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance();
  var data = {
    'jsonrpc':'2.0',
    'id':'qwer',
    'method':'aria2.addUri',
    'params':[[source]]
  };

  // open the request
  req.open('POST', "http://localhost:6800/jsonrpc", true);
  ctx.window.minibuffer.message("Sending download to aria2...");
  req.onreadystatechange = function (aEvt) {
    if (req.readyState === 4) {
      if(req.status === 200)
        ctx.window.minibuffer.message("Download sent to aria2 successfully");
      else
        ctx.window.minibuffer.message("Error while sending download to aria2");
    }
  };
  req.send(JSON.stringify(data));

  // abort the context since aria2 handles it already
  source.abort();
}

// this function is taken from content-handler.js in conkeror source code.
// Sadly, I haven't found any better solution than rewriting this function
function content_handler_prompt (ctx) {
  var action_chosen = false;
  var can_view_internally = ctx.frame != null &&
    can_override_mime_type_for_uri(ctx.launcher.source);
  var panel;
  try {
    panel = create_info_panel(ctx.window, "download-panel",
                              [["downloading", "Downloading:", ctx.launcher.source.spec],
                               ["mime-type", "Mime type:", ctx.launcher.MIMEInfo.MIMEType]]);
    // add my own option (a for aria2)
    var action = yield ctx.window.minibuffer.read_single_character_option(
      $prompt = "Action to perform: (s: save; o: open; O: open URL; c: copy URL; a: aria2; "+
        (can_view_internally ? "i: view internally; t: view as text)" : ")"),
      $options = (can_view_internally ? ["s", "o", "O", "c", "a", "i", "t"] : ["s", "o", "O", "c", "a"]));
    switch (action) {
    case "s":
      yield content_handler_save(ctx);
      action_chosen = true;
      break;
    case "o":
      yield content_handler_open(ctx);
      action_chosen = true;
      break;
    case "O":
      yield content_handler_open_url(ctx);
      action_chosen = true;
      break;
    case "c":
      yield content_handler_copy_url(ctx);
      action_chosen = true;
      break;
    case "i":
      yield content_handler_view_internally(ctx);
      action_chosen = true;
      break;
    case "t":
      yield content_handler_view_as_text(ctx);
      action_chosen = true;
      break;
    case "a":
      yield content_handler_add_to_aria2(ctx);
      action_chosen = true;
      break;
    }
  } catch (e) {
    handle_interactive_error(ctx.window, e);
  } finally {
    if (! action_chosen)
      ctx.abort();
    if (panel)
      panel.destroy();
  }
}

interactive("youtube-download", "Download from youtube",
            function(I){
              // get the url of the page
              var url = I.buffer.current_uri.spec;
              const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"]
                .getService(Components.interfaces.nsIClipboardHelper);
              // put it to clipboard
              gClipboardHelper.copyString(url);
              // run the script
              shell_command_blind("open /Volumes/tmtxt/bin/youtube-download.sh");
            });

provide("tmtxt-download");
