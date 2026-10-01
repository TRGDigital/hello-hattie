// Google Analytics 4 settings, shared by the layout (server) and the consent banner (browser).
export const GA_ID = 'G-G740QQBRHQ'
export const CONSENT_KEY = 'hh_consent'

/** Runs first, in the page head: analytics off unless the visitor has already accepted (Consent Mode). */
export const CONSENT_DEFAULT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;var c=null;try{c=localStorage.getItem('${CONSENT_KEY}')}catch(e){}gtag('consent','default',{analytics_storage:c==='granted'?'granted':'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${GA_ID}');`
