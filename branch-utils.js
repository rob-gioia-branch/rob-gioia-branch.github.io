//keeps track of whether or not the user has disabled Branch tracking
var isTrackingDisabled = false;  

//used for making sure that the images have loaded AND the Branch SDK has initialized before trying to deep link
var startupSystemsInitialized = false;

/*
  Load and initialize the Branch SDK
   • Pass in true to use the test key, false to use the live key
   • Be sure to call this function in the <head> of the HTML (so that journeys / events, etc... happen right away and don't get delayed)
   • If you'd like to use a specific version of the SDK, point to https://cdn.branch.io/branch-x.xx.x.min.js (e.g. https://cdn.branch.io/branch-2.47.1.min.js) rather than https://cdn.branch.io/branch-latest.min.js when initializing
*/
function initializeBranch(isTestMode = false) {
  //load the Branch SDK
  (function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking qrCode".split(" "), 0);
  //initialize Branch with the live key or test
  addJourneyLifecycleEventListener();
  if(isTestMode) {
    branch.init('key_test_hcGYfaAnBPHUutc7SRmrSgjdCrgZ30RL', function(err, data) {
      window.linkData = data;
      handleStartupSystemFinishedInitializing();
    });
  } else {
    branch.init('key_live_ccQ8piFdCMPVysh8TLmEhghmuCk162Rr', function(err, data) {
      window.linkData = data;
      handleStartupSystemFinishedInitializing();
    });
  }
}

/*
  Creates a Branch link and outputs it to the console
   • Uses the character name as the alias for the link
*/
function createBranchLink() {
  const name = window.character.getCharacterName();
  var linkData = {
    alias: name,
    data: {
    'name': name,
    '$desktop_url': 'https://rob-gioia-branch.github.io/'  
  	}
  };
  branch.link(linkData, function(err, link) {
  console.log(link);
});
}

/*
  Creates a Branch QR Code
   • QR Code Settings - Pre-defined set of QR code related properties that works over the overall display of the QR Code. Full list of fields: https://help.branch.io/developers-hub/reference/qr-code-branch-api#qr_code_settings
   • QR Code Link Data - The dictionary to embed link data behind the QR Code. Full list of fields: https://help.branch.io/using-branch/docs/creating-a-deep-link#section-redirections
*/
function createQRCode() {
  const name = window.character.getCharacterName();
  const qrCodeImage = window.character.getQRCodeImage();
  
  var qrCodeSettings = {
    "code_color":"#000000",
    "background_color": "#FFFFFF",
    "margin": 0,
    "width": 480,
    "image_format": "png",
    "center_logo_url": qrCodeImage
  };
  
  var qrCodeLinkData = {
      tags: [ name ],
      channel: 'Marvel & DC Comics Superhero Website',
      data: {
          'name': name,
      }
  };
  
  branch.qrCode(qrCodeLinkData, qrCodeSettings, function(err, qrCode) {
      const imageElement = document.getElementById("qr-image");
      imageElement.src = "data:image/png;charset=utf-8;base64," + qrCode.base64();
  }); 
}

/* 
  Toggles user tracking
  • More info: https://help.branch.io/developers-hub/docs/web-advanced-features#enable--disable-user-tracking
*/
function toggleTracking() {
  isTrackingDisabled = !isTrackingDisabled;
  branch.disableTracking(isTrackingDisabled);
  var trackingState = isTrackingDisabled ? "disabled" : "enabled";
  console.log("Tracking has been " + trackingState);
}

/* 
  Sets the user identity to be appended to each event
  • ID will be appended to all events tracked after this function is called
  • Don't send PII! More info: https://help.branch.io/using-branch/docs/best-practices-to-avoid-sending-pii-to-branch#developer-identity
*/
function login() {
  const name = window.character.getCharacterName();
  branch.setIdentity(name);
  console.log("User has been logged in as " + name);
}

/* 
  Removes the user ID from any events tracked after this function is called
  • NOT retroactive
*/
function logout() {
  branch.logout();
  console.log("User has been logged out");
}

/* 
  Tracks a custom branch event
  • Use the Branch Liveview for real time testing of events + viewing metadata
  • Branch Event Ontology: https://help.branch.io/developers-hub/docs/branch-event-ontology
*/
function trackEvent() {
  const name = window.character.getCharacterName();
  var custom_data = { "character name": name };
  
  branch.logEvent(
    "Character Event Tracked",
    JSON.stringify(custom_data),
    function(err) { console.log("Event Logged: " + "Name: " + "Character Event Tracked", JSON.stringify(custom_data), "Error: " + err); }
);
}

/* 
  Handles deep link routing when a Branch link is clicked
  • If app.link - uses the name to route the user to the detail view for that character
  • If bnc.lt - uses the alias to route the user to the detail view for that character
*/
function handleDeepLinkRouting(data) {
  if(data == undefined) { return; } //if a Branch link was not clicked we can return since we don't need to deep link
  console.log(data);
  var referringLink = data['data_parsed']['~referring_link'];
  var characterName = "";
  if(referringLink.includes("app.link")) {
    characterName = data['data_parsed']['name'];
  } else {
    characterName = data['data_parsed']['alias'];
  }
  window.character = window.allCharacters[characterName];
  import("/utils.js").then((utilsModule) => {
        utilsModule.loadCharacterDetailView();
      });
}

/* 
  Listens for Branch journeys events
  • Logs the event and data to the console
  • Full list of journeys lifecycle events: https://help.branch.io/faq/docs/is-there-a-way-to-set-up-a-listener-function-to-listen-to-events
*/
function addJourneyLifecycleEventListener() {
   var listener = function(event, data) { console.log(event, data); }
   branch.addListener(listener);
}

/* 
  This function gets called twice:
  • Once when the images are loaded 
  • Once when the Branch SDK finishes initializing
  • On the second call, once we know both startup systems have initialized, we can deep link the user
*/
function handleStartupSystemFinishedInitializing() {
  if(!startupSystemsInitialized) {
    startupSystemsInitialized = true;
  } else {
    handleDeepLinkRouting(window.linkData);
  }
}
