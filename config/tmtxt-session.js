// config for conkeror session

require("session.js");

// Auto load the auto-save session when conkeror starts
session_auto_save_auto_load = true;

// backup session everytime create/delete a new buffer
// require the conkeror-session-backup.sh script
add_hook("create_buffer_hook", function(buffer){
  shell_command_blind("sh ~/bin/conkeror-session-backup.sh");
});

provide("tmtxt-session");
