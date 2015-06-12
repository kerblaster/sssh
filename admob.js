var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-6959590598551540/6197908715',
        interstitial: 'ca-app-pub-6959590598551540/7535041114'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-6959590598551540/9151375115',
        interstitial: 'ca-app-pub-6959590598551540/9011774319'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-6959590598551540/1488507514',
        interstitial: 'ca-app-pub-6959590598551540/1488507514'
    };
}

function onLoadAd(){	//call function at onload body
	if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
		document.addEventListener('deviceready', initApp, false);
	} else {
		initApp();
	}
}

function initApp() {
    if (! AdMob ) { alert( 'admob plugin not ready' ); return; }

    AdMob.createBanner( {
        adId: admobid.banner, 
        //isTesting: true, // set to true, to receiving test ad for testing purpose
        overlap: false, 
        offsetTopBar: false, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        bgColor: 'black'
    } );
    
    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: true
    });
}