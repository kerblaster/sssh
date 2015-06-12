 function onLoadAd() {
	 console.log("onloading the ads");
	  if (admob) {
		var adPublisherIds = {
		  ios : {
			banner : "ca-app-pub-6959590598551540/9151375115",
			interstitial : "ca-app-pub-6959590598551540/9011774319"
		  },
		  android : {
			banner : "ca-app-pub-6959590598551540/6197908715",
			interstitial : "ca-app-pub-6959590598551540/7535041114"
		  }
		};

		var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

		admob.setOptions({
		  publisherId: admobid.banner,
		  interstitialAdId: admobid.interstitial
		});

		admob.createBannerView;

	  } else {
		alert("ERROR: Ads not loading");
	  }
 }