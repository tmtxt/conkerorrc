// visit a bookmark
define_webjump("bookmark",
               function(term) {return term;},
               $completer = history_completer($use_history = false,
                                              $use_bookmarks = true,
                                              $match_required = true),
               $description = "Visit a conkeror bookmark");

// Default webjump
read_url_handler_list = [read_url_make_default_webjump_handler("google")];

// searching
define_webjump("g", "http://www.google.com/search?q=%s", 
			  $description = "Google Search");
define_webjump("yt", "http://www.youtube.com/results?search_query=%s",
			  $description = "Youtue Search");
define_webjump("tt", "http://www.google.com/search?q=%s%20site:tinhte.vn",
			  $description = "Google search for tinhte.vn");
define_webjump("tpb", "http://thepiratebay.se/search/%s",
               $description = "Pirate Bay torrent search");
define_webjump("hdvn", "http://www.google.com/search?q=%s%20site:hdvietnam.com",
			  $description = "Google search for hdvietnam.com");
define_webjump("yan", "http://www.google.com/search?q=%s%20site:yeuamnhac.com",
			  $description = "Google Search for yeuamnhac.com");
define_webjump("rut", "http://www.google.com/search?q=%s%20site:rutracker.org",
			  $description = "Google search for rutracker.org");

// computer programming
define_webjump("js", "https://developer.mozilla.org/en-US/search?q=%s",
			  $description = "Javascript documentation search (Mozilla)");
define_webjump("php", "http://www.php.net/manual-lookup.php?pattern=%s&scope=quickref",
               $description = "PHP Doc Search");

// usually visit site
define_webjump("dantri", "http://dantri.com.vn");
define_webjump("vnexpress", "http://vnexpress.net");
define_webjump("ti", "http://tinhte.vn");
define_webjump("macvn", "http://macvn.com");
define_webjump("sohoa", "http://sohoa.net");
define_webjump("voz", "http://voz.vn");
define_webjump("pcworldVN", "http://pcworld.com.vn");
define_webjump("hdvietnam", "http://hdvietnam.com");
define_webjump("yeuamnhac", "http://yeuamnhac.com");
define_webjump("demonoid", "http://demonoid.me");
define_webjump("ggvn", "http://google.com.vn/");

//keyboard shorcut for often-used sites
interactive("tmtxt-open-facebook-new", "Open Facebook New Buffer", "follow-new-buffer",
            $browser_object = "http://facebook.com/");
define_key(content_buffer_normal_keymap, "C-1", "tmtxt-open-facebook-new");
interactive("tmtxt-open-myblog-new", "Open My Blog New Buffer", "follow-new-buffer",
            $browser_object = "http://truongtx.me/");
define_key(content_buffer_normal_keymap, "C-2", "tmtxt-open-myblog-new");
interactive("tmtxt-open-myblog-local-new", "Open My Blog Localhost New Buffer",
			"follow-new-buffer",
            $browser_object = "http://localhost:4000/");
define_key(content_buffer_normal_keymap, "C-@", "tmtxt-open-myblog-local-new");
interactive("tmtxt-open-hn-new", "Open HN New Buffer", "follow-new-buffer",
            $browser_object = "http://news.ycombinator.com/");
define_key(content_buffer_normal_keymap, "C-3", "tmtxt-open-hn-new");
interactive("tmtxt-open-tinhte-new", "Open Tinhte New Buffer", "follow-new-buffer",
            $browser_object = "http://tinhte.vn/");
define_key(content_buffer_normal_keymap, "C-4", "tmtxt-open-tinhte-new");
interactive("tmtxt-open-linkedin-new", "Open Linkedin New Buffer", "follow-new-buffer",
            $browser_object = "http://www.linkedin.com/");
define_key(content_buffer_normal_keymap, "C-5", "tmtxt-open-linkedin-new");
interactive("tmtxt-open-twitter-new", "Open Twitter New Buffer", "follow-new-buffer",
            $browser_object = "https://twitter.com/");
define_key(content_buffer_normal_keymap, "C-6", "tmtxt-open-twitter-new");
interactive("tmtxt-open-google-plus-new", "Open Google+ New Buffer", "follow-new-buffer",
            $browser_object = "https://plus.google.com/");
define_key(content_buffer_normal_keymap, "C-7", "tmtxt-open-google-plus-new");
interactive("tmtxt-open-aria2-webui", "Open aria2 webui", "follow-new-buffer",
            $browser_object = "file:///Volumes/tmtxt/webui-aria2/index.html");
define_key(content_buffer_normal_keymap, "C-Q", "tmtxt-open-aria2-webui");

provide("tmtxt-webjumps")
