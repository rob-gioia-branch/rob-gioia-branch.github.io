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
  Creates and shares a Branch link
   • Uses the character name as the alias for the link
*/
function shareBranchLink() {
  const name = window.character.getCharacterName();
  var linkData = {
    alias: "test",
    data: {
    'name': "test",
  	}
  };
  branch.link(linkData, function(err, link) {
  // bind elements
  document.getElementById('detail-button1').onclick = function() {
    window.open(link || err);
  };
  document.getElementById('link').href = link || err;
});
}
