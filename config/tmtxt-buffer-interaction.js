var tmtxt = tmtxt || {};

// setting for interacting with buffers

////////////////////////////////////////////////////////////////////////////////
//this is for replacing the built in kill-this-buffer command
//the command tmtxt-close-and-save-current-buffer will save the URL of the
//current buffer beforing closing it
//later when you want to reopen it, just call the command tmtxt-open-closed-buffer
//first, create an array to hold the closed buffers
tmtxt.data = tmtxt.data || {};
tmtxt.data.closedBuffers = [];
//save the URL of the current buffer before closing it
interactive("tmtxt-close-and-save-current-buffer",
			      "close and save the current buffer for later restore",
			      function(I) {
              tmtxt.display.showTab();
              var closedBuffers = tmtxt.data.closedBuffers;
			        if(closedBuffers.length === 10) {
                // remove older item to save memory, just save maximum 10 buffers
				        closedBuffers.shift();
			        }
              // add one item
              closedBuffers.push(I.buffer.document.URL);
              // kill the current buffer
			        kill_buffer(I.buffer);
			        tmtxt.display.hideTabDelay();
			      });
//reopen the last closed buffer and remove it from the array
interactive("tmtxt-open-closed-buffer",
			      "open the last closed buffer",
			      function(I){
			        tmtxt.display.showTab();
              var closedBuffers = tmtxt.data.closedBuffers;
			        if(closedBuffers.length > 0){
				        load_url_in_new_buffer(
				          closedBuffers[closedBuffers.length - 1],
				          I.window);
				        closedBuffers.pop();
			        }
			        tmtxt.display.hideTabDelay();
			      });

////////////////////////////////////////////////////////////////////////////////
interactive("stop-loading-all-buffers", "Stop loading all buffers",
			      function (I) {
			        for (var i = 0; i < I.window.buffers.count; i++) {
				        stop_loading(I.window.buffers.get_buffer(i));
			        }
			      });
interactive("reload-all-buffers", "Reload al buffers",
			      function (I) {
			        for (var i = 0; i < I.window.buffers.count; i++) {
				        reload(I.window.buffers.get_buffer(i));
			        }
			      });

provide("tmtxt-buffer-interaction");
