/* ============================================================
   Statistiche visitatori - PostHog (server UE, Francoforte)
   Verde Oliva S.r.l.s. - file identico su tutti i siti (23/11/2026)

   - Prima del consenso (o con "Solo necessari"): nessun cookie e
     niente localStorage (persistenza solo in memoria), niente
     registrazioni. Ogni pagina e una visita anonima a se stante.
   - Dopo "Accetta tutti": persistenza completa e registrazione
     anonima della navigazione (campi dei moduli sempre oscurati).
   - Clic sul telefono e su WhatsApp: eventi "chiamata" e "whatsapp".
   Il consenso si legge dalle chiavi usate dai banner dei siti
   ('cc' = 'all'/'min', 'cookie_consent' = 'all'/'necessary').
   ============================================================ */
(function () {
  'use strict';

  var PH_KEY  = 'phc_xwgNdg8zvgPNdEJ2VSZgLV9mXKF9Zzf7QrL3xPFANzVC';  // progetto PostHog 365160 (EU)
  var PH_HOST = 'https://eu.i.posthog.com';
  var CHIAVI  = ['cc', 'cookie_consent'];

  if (window.__phVerdeOliva) return;           // gia caricato su questa pagina
  window.__phVerdeOliva = true;

  function accettato() {
    for (var i = 0; i < CHIAVI.length; i++) {
      try {
        var v = localStorage.getItem(CHIAVI[i]);
        if (v !== null && v !== '') return v === 'all';
      } catch (e) { /* localStorage non disponibile */ }
    }
    return false;
  }

  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  var ultimo = accettato();
  window.posthog.init(PH_KEY, {
    api_host: PH_HOST,
    person_profiles: 'identified_only',
    persistence: ultimo ? 'localStorage+cookie' : 'memory',
    disable_session_recording: !ultimo,
    session_recording: { maskAllInputs: true },
    capture_pageview: true,
    capture_pageleave: true
  });

  function applica() {
    var si = accettato();
    if (si === ultimo || typeof window.posthog.set_config !== 'function') return;
    ultimo = si;
    if (si) {
      window.posthog.set_config({ persistence: 'localStorage+cookie', disable_session_recording: false });
      window.posthog.startSessionRecording();
    } else {
      window.posthog.set_config({ persistence: 'memory', disable_session_recording: true });
      window.posthog.stopSessionRecording();
    }
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target;
    if (!t || !t.closest) return;
    // scelta sul banner cookie (qualunque siano i nomi delle funzioni del sito)
    if (t.closest('#cookie-banner')) { setTimeout(applica, 120); setTimeout(applica, 700); return; }
    // contatti
    var a = t.closest('a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"]');
    if (a) window.posthog.capture(/^tel:/.test(a.getAttribute('href')) ? 'chiamata' : 'whatsapp', { pagina: location.pathname });
  }, true);
})();
