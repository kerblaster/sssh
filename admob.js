 function onLoadAd() {
	
	var admobid = {};
	if( /(android)/i.test(navigator.userAgent) ) { 
		admobid = { // for Android
			banner: 'ca-app-pub-6869992474017983/9375997553',
			interstitial: 'ca-app-pub-6869992474017983/1657046752'
		};
	} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
		admobid = { // for iOS
			banner: 'ca-app-pub-6869992474017983/4806197152',
			interstitial: 'ca-app-pub-6869992474017983/7563979554'
		};
	} else {
		admobid = { // for Windows Phone
			banner: 'ca-app-pub-6869992474017983/8878394753',
			interstitial: 'ca-app-pub-6869992474017983/1355127956'
		};
	}
	
	initApp();
		
	function initApp() {
		alert("AdMob="+AdMob);
		if (! AdMob ) { alert( 'Error loading Ads' ); return; }
		alert( 'initApp()' );//debug
		// display the banner at startup
		AdMob.createBanner( {
			adId:admobid.banner, 
			adSize:'MEDIUM_RECTANGLE', 
			overlap:true, 
			position:AdMob.AD_POSITION.BOTTOM_CENTER, 
			autoShow:true} );
	}
}
    
