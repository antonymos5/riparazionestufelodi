/* ============================================================
   Misurazione conversioni Google Ads — Verde Oliva S.r.l.s.
   Versione 2 — file unico, valido per tutti i siti.

   Cosa fa:
   1. carica il tag Google Ads con Consent Mode v2 (default: denied)
   2. si aggancia al banner cookie già presente sul sito, qualunque
      siano i nomi delle funzioni usate (rileva il clic, non la funzione)
   3. se il banner NON esiste, lo crea lui
   4. registra una conversione quando l'utente clicca sul numero di telefono

   Modificare SOLO questo file: le pagine HTML richiamano soltanto
   <script src="/gtag.js"></script>
   ============================================================ */
(function () {
  'use strict';

  var AW_ID    = 'AW-959116144';           // ID conversione Google Ads
  var AW_LABEL = 'Xe28CKGa9eAcEPDmq8kD';   // Etichetta "Click-to-call"

  /* Chiavi localStorage usate dai banner dei vari siti.
     La prima è quella che scriviamo noi se creiamo il banner. */
  var CHIAVI = ['cc', 'cookie_consent'];

  /* ---------- lettura dello stato di consenso ---------- */
  function valoreConsenso() {
    for (var i = 0; i < CHIAVI.length; i++) {
      try {
        var v = localStorage.getItem(CHIAVI[i]);
        if (v !== null && v !== '') return v;
      } catch (e) { /* localStorage non disponibile */ }
    }
    return null;
  }
  function accettato() { return valoreConsenso() === 'all'; }
  function giaRisposto() { return valoreConsenso() !== null; }

  /* ---------- bootstrap gtag ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var stato = accettato() ? 'granted' : 'denied';
  gtag('consent', 'default', {
    ad_storage: stato,
    ad_user_data: stato,
    ad_personalization: stato,
    analytics_storage: stato,
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  gtag('js', new Date());
  gtag('config', AW_ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + AW_ID;
  (document.head || document.documentElement).appendChild(s);

  /* ---------- aggiornamento consenso ---------- */
  var ultimoStato = stato;
  function applicaConsenso() {
    var nuovo = accettato() ? 'granted' : 'denied';
    if (nuovo === ultimoStato) return;
    ultimoStato = nuovo;
    gtag('consent', 'update', {
      ad_storage: nuovo,
      ad_user_data: nuovo,
      ad_personalization: nuovo,
      analytics_storage: nuovo
    });
  }

  /* ---------- conversione: clic sul numero di telefono ---------- */
  function registraChiamata() {
    if (!accettato()) return;   // nessun consenso, nessuna conversione
    gtag('event', 'conversion', {
      send_to: AW_ID + '/' + AW_LABEL,
      value: 1.0,
      currency: 'EUR'
    });
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target;
    var a = (t && t.closest) ? t.closest('a[href^="tel:"]') : null;
    if (a) registraChiamata();
  }, true);

  /* ---------- aggancio al banner cookie ----------
     Non dipende dai nomi delle funzioni del sito: intercetta il clic
     dentro #cookie-banner e poi rilegge il consenso salvato.        */
  document.addEventListener('click', function (ev) {
    var t = ev.target;
    var dentro = (t && t.closest) ? t.closest('#cookie-banner') : null;
    if (!dentro) return;
    setTimeout(applicaConsenso, 120);
    setTimeout(applicaConsenso, 700);
  }, true);

  /* ---------- testo del banner ----------
     Il tag Google Ads è un cookie di marketing: il banner deve
     nominarlo, altrimenti il consenso raccolto non copre la
     categoria giusta (art. 122 Codice privacy).                     */
  function aggiornaTesto(p, hrefPrivacy, hrefCookie) {
    if (!p || /marketing/i.test(p.textContent)) return;
    p.innerHTML =
      'Questo sito utilizza cookie tecnici necessari e, previo tuo consenso, cookie ' +
      'analitici e di <strong>marketing</strong> di Google, usati per misurare le ' +
      'richieste di contatto provenienti dalla pubblicità. Leggi la ' +
      '<a href="' + hrefPrivacy + '">Privacy Policy</a> e la ' +
      '<a href="' + hrefCookie + '">Cookie Policy</a>.';
  }

  function trovaLink(parolaChiave, fallback) {
    var link = document.querySelector('a[href*="' + parolaChiave + '"]');
    if (!link) return fallback;
    var href = link.getAttribute('href') || '';
    if (!href) return fallback;
    /* I link relativi (es. "cookie.html") si romperebbero nelle
       sottocartelle: li rendo assoluti rispetto alla radice del sito. */
    if (!/^(https?:)?\/\//i.test(href) && href.charAt(0) !== '/') {
      href = '/' + href.replace(/^\.\//, '');
    }
    return href;
  }

  /* ---------- creazione del banner se manca ---------- */
  function creaBanner(hrefPrivacy, hrefCookie) {
    var box = document.createElement('div');
    box.id = 'cookie-banner';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Informativa cookie');
    box.style.cssText =
      'position:fixed;left:0;right:0;bottom:0;z-index:2147483000;' +
      'background:#0f1a2b;color:#e6edf5;border-top:2px solid #3d9be9;' +
      'padding:16px 20px;display:flex;gap:14px;align-items:center;' +
      'flex-wrap:wrap;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;' +
      'font-size:14px;line-height:1.5;box-shadow:0 -4px 20px rgba(0,0,0,.35)';

    var p = document.createElement('p');
    p.style.cssText = 'flex:1;min-width:240px;margin:0;color:#e6edf5';
    box.appendChild(p);

    function bottone(testo, principale) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = testo;
      b.style.cssText =
        'cursor:pointer;border-radius:4px;padding:9px 18px;font-size:14px;' +
        'font-weight:600;font-family:inherit;white-space:nowrap;' +
        (principale
          ? 'background:#3d9be9;color:#fff;border:none'
          : 'background:transparent;color:#e6edf5;border:1px solid rgba(255,255,255,.35)');
      return b;
    }

    var rifiuta = bottone('Solo necessari', false);
    var accetta = bottone('Accetta tutti', true);

    function salva(valore) {
      try { localStorage.setItem(CHIAVI[0], valore); } catch (e) {}
      box.style.display = 'none';
      applicaConsenso();
    }
    rifiuta.addEventListener('click', function () { salva('min'); });
    accetta.addEventListener('click', function () { salva('all'); });

    box.appendChild(rifiuta);
    box.appendChild(accetta);
    document.body.appendChild(box);

    /* il testo lo scrive la funzione condivisa, così è identico ovunque */
    p.textContent = 'placeholder';
    aggiornaTesto(p, hrefPrivacy, hrefCookie);
  }

  /* ---------- avvio ---------- */
  function avvia() {
    var hrefPrivacy = trovaLink('privacy', '/privacy.html');
    var hrefCookie  = trovaLink('cookie',  '/cookie.html');

    var banner = document.getElementById('cookie-banner');

    if (banner) {
      /* Il sito ha già il suo banner: aggiorno solo il testo. */
      aggiornaTesto(banner.querySelector('p'), hrefPrivacy, hrefCookie);
    } else if (!giaRisposto()) {
      /* Nessun banner sul sito e nessuna scelta ancora fatta: lo creo. */
      creaBanner(hrefPrivacy, hrefCookie);
    }

    applicaConsenso();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', avvia);
  } else {
    avvia();
  }
})();
