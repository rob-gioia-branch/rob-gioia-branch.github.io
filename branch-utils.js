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
  if(isTestMode) {
    branch.init('key_test_hcGYfaAnBPHUutc7SRmrSgjdCrgZ30RL');
  } else {
    branch.init('key_live_ccQ8piFdCMPVysh8TLmEhghmuCk162Rr');
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
    "margin": 5,
    "width": 400,
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

function createAndShowJourneyBanner() {
  const name = window.character.getCharacterName();
  const qrCodeImage = window.character.getQRCodeImage();
  
  var linkData = {
  campaign: name,
  channel: name,
  alias: name,
  data: {
    '$og_title': name,
    '$og_description': "More info about " + name,
    '$og_image_url': qrCodeImage
  }
};

  branch.setBranchViewData(linkData);  

  //close any existing journey that might be showing
  branch.closeJourney(function(err, data) {
    console.log(err, data);
  });

  //show the journey
  branch.track("pageview");
}
