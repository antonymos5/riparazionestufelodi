# CLAUDE.md — riparazionestufelodi

## Descrizione e scopo

Sito dedicato alla **riparazione e assistenza stufe a pellet** a Lodi e provincia. Servizio multimarca con intervento rapido, a partire da 70€. Rivolto a privati e condomini che necessitano di tecnico qualificato per stufe a pellet guaste o malfunzionanti.  
Sito HTML/CSS statico, pubblicato via GitHub Pages.

**Dominio:** https://www.riparazionestufelodi.it  
**Repository:** https://github.com/antonymos5/riparazionestufelodi

---

## Brand

- **Azienda:** Verde Oliva S.r.l.s.
- **P.IVA:** IT10927440965
- **Telefono:** 333 645 3219
- **Indirizzo:** Via Colombera 2, 26831 Casalmaiocco (LO)
- **Colori brand:** Arancio `#e05a00`, carbone `#1a1a1a`, grigio scuro `#2d2d2d`
- **Font:** Barlow Condensed (titoli) + Barlow (corpo)
- **Prezzo di ingresso:** Da 70€ (elemento di conversione chiave)

---

## Struttura cartelle

```
riparazionestufelodi/
├── index.html                  # Homepage principale
├── stufe_sitemap.xml           # Sitemap specifica stufe
├── google2a5f68fcbab4234d.html # Verifica Google Search Console
├── CNAME                       # Dominio custom GitHub Pages
├── README.md                   # Note progetto
├── cookie-policy/              # Cookie policy (cartella)
├── privacy-policy/             # Privacy policy (cartella)
├── lodi/                       # Pagine geo-localizzate per comune
├── casalmaiocco/
├── sant-angelo-lodigiano/
├── codogno/
├── [altri ~60 comuni]/         # Una cartella per comune servito
└── ...
```

---

## Zone geografiche target

Lodi (capoluogo), **Casalmaiocco** (sede operativa), e tutto il **Lodigiano**:  
Sant'Angelo Lodigiano, Codogno, Lodi Vecchio, San Martino in Strada, Tavazzano con Villavesco, Sordio, Massalengo, Marudo, Livraga, Brembio, Graffignana, San Colombano al Lambro, Secugnago, Turano Lodigiano, Valera Fratta, Borghetto Lodigiano, più comuni del milanese limitrofo (San Donato, San Giuliano, Paullo, Segrate, Pioltello, ecc.).

---

## Regole SEO specifiche

### Keyword primari
- Homepage: `riparazione stufe pellet Lodi`, `assistenza stufe pellet Lodi`
- Pagine geo: `riparazione stufe pellet [comune]`, `tecnico stufe pellet [comune]`
- Long-tail: `stufa pellet non funziona Lodi`, `stufa pellet non accende [comune]`, `errore E1 stufa pellet`

### Homepage
- H1: deve contenere keyword + prezzo (`da 70€`) — elemento differenziante forte.
- Meta description: includere prezzo, "intervento rapido", "multimarca", telefono.
- Schema.org: `LocalBusiness` con `priceRange: "Da 70€"`, `telephone`, `address` (Casalmaiocco).
- Elencare marchi trattati: Palazzetti, Edilkamin, MCZ, Piazzetta, Extraflame, ecc.

### Pagine geo (cartelle comuni)
- `<title>`: `Riparazione Stufe Pellet [Comune] da 70€ | Assistenza Multimarca – 333 645 3219`
- `<meta name="description">`: comune, "da 70€", "intervento rapido", marchi, telefono.
- Canonical: `<link rel="canonical" href="https://www.riparazionestufelodi.it/[comune]/"/>`
- Schema.org `LocalBusiness` + `Service` con `areaServed` = comune.
- H1: `Riparazione Stufe a Pellet a [Comune]`
- Contenuto minimo unico per ogni comune: 150 parole oltre al template.

### Contenuti
- Problemi comuni da citare: "stufa non accende", "errore E1/E2/E3", "coclea bloccata", "sonda temperatura guasta", "ventilatore rumoroso".
- Vantaggio chiave: **multimarca** + **prezzo fisso da 70€** + **intervento rapido**.
- Mai usare "economico" — preferire "conveniente", "trasparente", "senza sorprese".

### Regole generali
- Immagini: `alt` con keyword + comune.
- `stufe_sitemap.xml`: aggiornare `<lastmod>` a ogni modifica.
- `robots.txt`: verificare che sia presente con `Allow: /`.
- Interlink: homepage → pagine comuni, pagine comuni → homepage e pagine correlate.
- Non eliminare `google2a5f68fcbab4234d.html`.

---

## Workflow GitHub

```bash
# Staging delle modifiche
git add <file>
# oppure
git add .

# Commit con messaggio descrittivo
git commit -m "descrizione della modifica"

# Pubblicazione
git push origin main
```

**Convenzioni commit:**
- `feat: aggiungi pagina riparazione [comune]`
- `fix: correggi prezzo pagina [comune]`
- `seo: aggiorna meta description homepage`
- `style: aggiorna tema dark orange`
- `content: aggiungi sezione marchi supportati`

---

## Note operative

- Il sito è su **GitHub Pages** — push su `main` pubblica automaticamente.
- Il prezzo **"da 70€"** è un elemento di conversione critico: deve essere visibile in hero, title e meta.
- Il numero **333 645 3219** sempre cliccabile: `<a href="tel:+393336453219">`.
- Tema dark (carbone/arancio) — non modificare verso colori chiari senza decisione esplicita.
- Schema.org `LocalBusiness` con indirizzo Casalmaiocco è già nella homepage — replicare sulle pagine comunali.
- Non eliminare `google2a5f68fcbab4234d.html` (verifica Search Console).
