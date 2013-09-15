// Download in background
download_buffer_automatic_open_target = OPEN_NEW_BUFFER_BACKGROUND;

// Set default download location to ~/Downloads
cwd=get_home_directory(); 
cwd.append("Downloads"); 

provide("tmtxt-download");
