import { CONTACT } from "@/content/site";

export const GOOGLE_ADS_ID = "AW-18430311742";

// Runs in the head before hydration, including for links added by client navigation.
export const GOOGLE_ADS_SCRIPT = `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
window.gtag('js', new Date());
window.gtag('config', '${GOOGLE_ADS_ID}');

// Event snippet for Click to call conversion.
window.gtag_report_conversion = function (url) {
  var completed = false;
  var timer;
  var callback = function () {
    if (completed) return;
    completed = true;
    window.clearTimeout(timer);
    if (typeof url === 'string' && url) window.location.assign(url);
  };
  if (url) timer = window.setTimeout(callback, 1000);
  try {
    window.gtag('event', 'conversion', {
      'send_to': '${GOOGLE_ADS_ID}/Ihp2CMOU17odEL76oNRE',
      'value': 1.0,
      'currency': 'INR',
      'event_callback': callback,
      'event_timeout': 1000
    });
  } catch (error) {
    callback();
  }
  return false;
};

document.addEventListener('click', function (event) {
  if (window.location.pathname === '/admin' || window.location.pathname.indexOf('/admin/') === 0) return;
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  var link = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!link) return;
  var href = link.getAttribute('href') || '';
  if (href.slice(0, 4).toLowerCase() !== 'tel:') return;
  if (href.slice(4).replace(/[^+0-9]/g, '') !== ${JSON.stringify(CONTACT.phoneHref.slice(4).replace(/[^+0-9]/g, ""))}) return;
  event.preventDefault();
  window.gtag_report_conversion(href);
});
`;
