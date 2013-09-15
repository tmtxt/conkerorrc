// config for interacting with forms

// autofill
user_pref("signon.prefillForms", true);
user_pref("signon.autofillForms", true);
user_pref("signon.rememberSignons", true);

//Enable Password Manager
Components.classes["@mozilla.org/login-manager;1"]
    .getService(Components.interfaces.nsILoginManager);

provide("tmtxt-form");
