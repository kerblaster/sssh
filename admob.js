var admobid = {};

 function onLoadAd() {
	if( /(android)/i.test(navigator.userAgent) ) { 
		admobid = { // for Android
			banner: 'ca-app-pub-6959590598551540/6197908715',
			interstitial: 'ca-app-pub-6959590598551540/7535041114'
		};
		alert("onLoadAd(): android"); //debug
	} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
		admobid = { // for iOS
			banner: 'ca-app-pub-6959590598551540/9151375115',
			interstitial: 'ca-app-pub-6959590598551540/9011774319'
		};
		alert("onLoadAd(): android");	//debug
	} else {
		admobid = { // for Windows Phone
			banner: 'ca-app-pub-6869992474017983/8878394753',
			interstitial: 'ca-app-pub-6959590598551540/1488507514'
		};
	}
	
	initApp();
}
    
function initApp(){
	alert("initApp()");
	alert("AdMob="+AdMob);
	if(AdMob) AdMob.createBanner( {
		adId: admobid.banner, 
		position: AdMob.AD_POSITION.BOTTOM_CENTER, 
		autoShow: true } );
}
