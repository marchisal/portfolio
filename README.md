# Portfolio - Maria Chiara Salis

Portfolio personale sviluppato in HTML, CSS e JavaScript vanilla con design moderno ispirato a 21st.dev/magic.

## Design

- **Palette**: Viola scuro freddo (#0d0a1a, #1a1530) con accenti blu elettrico (#0ea5e9, #06b6d4)
- **Stile**: Glassmorphism, gradient effects, animazioni fluide
- **Ispirazione**: 21st.dev/magic, layout organici e asimmetrici

## Caratteristiche

- Design moderno dark theme con viola/blu elettrico
- Hero section con immagine profilo e stats animati
- Cursor glow effect (desktop)
- Typing effect dinamico nel hero
- Filtri progetti interattivi per categoria
- Counter animati con Intersection Observer
- Scroll reveal animations
- Form di contatto interattivo
- Mobile-first responsive design
- Ottimizzato per performance e SEO

## Progetti Inclusi

1. **FAM Vision** - Web Agency con design 3D immersivo
2. **SCFinance** - Landing page lead generation
3. **CERNET ESCO** - Sito corporate multipage
4. **SC Dashboard Admin** - Piattaforma CER con Stripe
5. **SC Corporate** - Sito Comunita Energetiche
6. **Adriano Group** - Landing page SEO-ottimizzata
7. **SC Dashboard User** - Dashboard utente CER
8. **Football Match Analytics** - SaaS con AI/ML
9. **Caora Film** - Boutique production house

## Tecnologie Utilizzate

- HTML5 semantico con Open Graph meta
- CSS3 (Custom Properties, Grid, Flexbox, Animations, Glassmorphism)
- JavaScript ES6+ (Intersection Observer, RequestAnimationFrame)
- Google Fonts (Inter, JetBrains Mono)

## Struttura Progetto

```
portfolio/
├── index.html          # Pagina principale
├── styles.css          # Stili CSS completi
├── script.js           # JavaScript interazioni
├── assets/             # Immagini progetti
│   ├── mari.JPG        # Foto profilo
│   ├── pr0.png         # FAM Vision
│   ├── pr1.png         # SCFinance
│   ├── pr2.png         # CERNET ESCO
│   ├── pr3.png         # SC Dashboard Admin
│   ├── pr4.png         # SC Corporate
│   ├── pr5.png         # Adriano Group
│   ├── pr6.png         # SC Dashboard User
│   ├── pr7.png         # Football Analytics
│   └── pr9.png         # Caora Film
├── robots.txt          # SEO
├── sitemap.xml         # SEO
├── llms.txt            # AI crawlers
└── README.md
```

## Deploy su GitHub Pages

1. Vai nelle **Settings** del repository
2. Scorri fino a **Pages**
3. In "Source" seleziona **Deploy from a branch**
4. Seleziona il branch **main** e la cartella **/ (root)**
5. Clicca **Save**

Il sito sara disponibile su: `https://[username].github.io/portfolio/`

## Sviluppo Locale

Apri semplicemente `index.html` nel browser, oppure usa un server locale:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Con VS Code Live Server extension
```

## Personalizzazione

### Colori

Modifica le CSS custom properties in `styles.css`:

```css
:root {
    /* Dark Purple Cold Palette */
    --color-bg-dark: #0d0a1a;
    --color-bg: #12101f;

    /* Electric Blue Cold Accents */
    --color-primary: #6366f1;
    --color-accent: #0ea5e9;
    --color-electric: #06b6d4;
}
```

### Contenuti

- Modifica i testi direttamente in `index.html`
- Aggiungi/rimuovi progetti nella sezione `#projects`
- Aggiorna i link social nella sezione `#contact`
- Modifica le skill nella sezione `#skills`

## Performance

- Lazy loading immagini native
- CSS Custom Properties per theming
- JavaScript modulare IIFE
- Font preconnect
- Animazioni GPU-accelerate
- Reduced motion support

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Licenza

MIT License
