function save_current_position(I){
  var doc = I.buffer.document;
  doc.lastScrollPosition = doc.documentElement.scrollTop;
}

interactive("tmtxt-scroll-top", "scroll to top",
            function(I){
              save_current_position(I);
              co_call(call_interactively(I, "scroll-top-left"));              
            });

interactive("tmtxt-scroll-bottom", "scroll to botom",
            function(I){
              save_current_position(I);
              co_call(call_interactively(I, "cmd_scrollBottom"));
            });

interactive("tmtxt-back-to-last-position", "back to last position before scrolling",
            function(I){
              var doc = I.buffer.document;
              if(doc.lastScrollPosition){
                doc.documentElement.scrollTop = doc.lastScrollPosition;
              }
            });

provide("tmtxt-navigation");
