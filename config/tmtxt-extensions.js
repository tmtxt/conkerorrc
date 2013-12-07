// setting for extensions

// Allow installing extension from any source
session_pref("xpinstall.whitelist.required", false);

// viewmarks extension, to manage bookmarks
// requirement: viewmarks extension https://addons.mozilla.org/en-US/firefox/addon/viewmarks/
interactive("viewmarks",
    "Open ViewMarks window.",
    function (I) {
        make_chrome_window('chrome://viewmarks/content/viewmark.xul');
    });

// sqlite manager extension
// requirements: sqlite manager https://addons.mozilla.org/en-US/firefox/addon/sqlite-manager/
interactive("sqlite-manager",
    "Open SQLite Manager window.",
    function (I) {
        make_chrome_window('chrome://SQLiteManager/content/sqlitemanager.xul');
    });

provide("tmtxt-extensions");
