// Impersonating other browsers

var user_agents = {
  "conkeror": "Mozilla/5.0 (X11; Linux x86_64; rv:8.0.1) " + "Gecko/20100101 conkeror/1.0pre",
  "ipad": "Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) " +
    "AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b " +
    "Safari/531.21.10",
  "iphone": "Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) " +
    "AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543a " +
    "Safari/419.3",
  "chromium": "Mozilla/5.0 (X11; U; Linux x86_64; en-US) " +
    "AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63" +
    " Safari/534.3",
  "firefox": "Mozilla/5.0 (X11; Linux x86_64; rv:8.0.1) " +
    "Gecko/20100101 Firefox/8.0.1",
  "android": "Mozilla/5.0 (Linux; U; Android 2.2; en-us; " +
    "Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like " +
    "Gecko) Version/4.0 Mobile Safari/533.1",
  "ie8": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)"
};

var agent_completer = prefix_completer($completions = Object.keys(user_agents));

interactive("user-agent", "Pick a user agent from the list of presets",
            function(I) {
                var ua = (yield I.window.minibuffer.read(
                    $prompt = "Agent:",
                    $completer = agent_completer));
                set_user_agent(user_agents[ua]);
            });

provide("tmtxt-useragent");
