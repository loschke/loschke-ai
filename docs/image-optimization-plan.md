# Astro Bildoptimierungsplan

Dieses Dokument enthält einen umfassenden Plan zur Optimierung aller Bilder auf der Website mit Astro's integrierten Bildoptimierungsfunktionen. Die Implementierung kann schrittweise erfolgen, wobei jeder Abschnitt unabhängig umgesetzt werden kann.

## Inhaltsverzeichnis

1. [Empfohlene Bildstrategie](#empfohlene-bildstrategie)
2. [Komponenten-Updates](#komponenten-updates)
3. [Wiederverwendbare Komponenten](#wiederverwendbare-komponenten)
4. [Content Collections für Bilder](#content-collections-für-bilder)
5. [SEO-Optimierungen](#seo-optimierungen)
6. [Implementierungscheckliste](#implementierungscheckliste)

## Empfohlene Bildstrategie

### Option A: Bilder in `src/assets/` (empfohlen für UI-Elemente)

Diese Methode ist ideal für:
- Wiederverwendbare UI-Elemente
- Logos und Icons
- Hauptbilder der Website
- Bilder, die in mehreren Komponenten verwendet werden

**Vorteile:**
- Automatische Optimierung beim Build
- Automatische Dimensionserkennung
- Typsicherheit durch Imports
- Build-Zeit-Validierung (fehlende Bilder werden erkannt)

**Implementierung:**
1. Erstellen Sie Ordner wie `src/assets/guides/`, `src/assets/blog/`, etc.
2. Verschieben Sie Bilder von `public/images/` nach `src/assets/`
3. Importieren Sie Bilder in Komponenten

```astro
---
import { Image } from 'astro:assets';
import guideImage from '../assets/guides/how-to-prompt-guide.png';
---

<Image src={guideImage} alt="How-to-Prompt Guide" />
```

### Option B: Bilder in Content Collections (empfohlen für Blog-Artikel)

Diese Methode ist ideal für:
- Blog-Posts
- Fallstudien
- Dynamische Inhalte, die regelmäßig aktualisiert werden

**Vorteile:**
- Bilder sind direkt mit Content verknüpft
- Einfache Verwaltung von Inhalten
- Frontmatter-Integration

**Implementierung:**
Siehe Abschnitt [Content Collections für Bilder](#content-collections-für-bilder)

### Option C: Bilder in `public/` mit optimierter Verwendung

Wenn Bilder aus bestimmten Gründen in `public/` bleiben müssen:

**Implementierung:**
```astro
---
import { Image } from 'astro:assets';
---

<Image 
  src="/images/guide.png" 
  alt="Guide" 
  width={800} 
  height={450} 
/>
```

**Hinweis:** Bei dieser Methode müssen Breite und Höhe manuell angegeben werden.

## Komponenten-Updates

### 1. `src/components/sections/Guides.astro`

**Aktueller Code:**
```astro
<div class={`aspect-video bg-gradient-to-br ${guide.color} overflow-hidden`}>
    <img 
        src={guide.image} 
        alt={guide.title} 
        class="w-full h-full object-cover"
    />
</div>
```

**Optimierter Code (mit Bildern in src/assets/):**
```astro
---
import { Image } from 'astro:assets';

// Bilder importieren
import howToPromptGuide from '../assets/guides/how-to-prompt-guide.png';
import promptBibliothek from '../assets/guides/prompt-bibliothek.png';
import aiDesignGuide from '../assets/guides/ai-design-guide.png';
import aiDesignModifier from '../assets/guides/ai-design-modifier.png';

// Bildmap erstellen
const imageMap = {
    "/images/how-to-prompt-guide.png": howToPromptGuide,
    "/images/prompt-bibliothek.png": promptBibliothek,
    "/images/ai-design-guide.png": aiDesignGuide,
    "/images/ai-design-modifier.png": aiDesignModifier
};

// Guides-Array aktualisieren
const guides = [
    {
        title: "How-to-Prompt Guide",
        description: "Systematisches Framework für effektive KI-Kommunikation und optimale Ergebnisse mit ChatGPT & Co.",
        color: "from-[#2a4858] to-[#162a36]",
        href: "/how-to-prompt-guide",
        image: imageMap["/images/how-to-prompt-guide.png"],
        tags: ["Prompt Crafting", "Chat Assistenten"]
    },
    // Weitere Guides...
];
---

<div class={`aspect-video bg-gradient-to-br ${guide.color} overflow-hidden`}>
    <Image 
        src={guide.image} 
        alt={guide.title} 
        class="w-full h-full object-cover"
    />
</div>
```

**Optimierter Code (mit Bildern in public/):**
```astro
---
import { Image } from 'astro:assets';

const guides = [
    // Bestehende Guide-Daten...
];
---

<div class={`aspect-video bg-gradient-to-br ${guide.color} overflow-hidden`}>
    <Image 
        src={guide.image} 
        alt={guide.title}
        width={800}
        height={450}
        class="w-full h-full object-cover"
    />
</div>
```

### 2. `src/pages/guides.astro`

Ähnliche Änderungen wie bei `src/components/sections/Guides.astro` vornehmen. Idealerweise sollte eine wiederverwendbare Komponente erstellt werden, um Duplikation zu vermeiden.

### 3. `src/components/blog/BlogPosts.astro`

Diese Komponente sollte aktualisiert werden, um die `<Image />`-Komponente für Blog-Post-Bilder zu verwenden. Idealerweise sollte sie mit Content Collections arbeiten.

## Wiederverwendbare Komponenten

### 1. OptimizedImage.astro

Diese Komponente kann für alle Bildtypen verwendet werden:

```astro
---
// src/components/ui/OptimizedImage.astro
import { Image } from 'astro:assets';

const { 
    src, 
    alt, 
    className = "", 
    width, 
    height,
    sizes = "(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw",
    loading = "lazy"
} = Astro.props;

// Unterscheiden zwischen importierten und Pfad-basierten Bildern
const isImported = typeof src === 'object' && src.src !== undefined;
---

{isImported ? (
  <Image 
    src={src} 
    alt={alt} 
    class={className}
    sizes={sizes}
    loading={loading}
  />
) : (
  <Image 
    src={src} 
    alt={alt} 
    width={width || 800} 
    height={height || 450} 
    class={className}
    sizes={sizes}
    loading={loading}
  />
)}
```

### 2. GuideCard.astro

Eine wiederverwendbare Komponente für Guide-Karten:

```astro
---
// src/components/ui/GuideCard.astro
import { Image } from 'astro:assets';

const { 
    title, 
    description, 
    image, 
    href, 
    color, 
    tags = [], 
    external = false 
} = Astro.props;

// Prüfen, ob es ein importiertes Bild oder ein Pfad ist
const isImportedImage = typeof image === 'object' && image.src !== undefined;
---

<article class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
    <div class={`aspect-video bg-gradient-to-br ${color} overflow-hidden`}>
        {isImportedImage ? (
            <Image 
                src={image} 
                alt={title} 
                class="w-full h-full object-cover"
            />
        ) : (
            <Image 
                src={image} 
                alt={title} 
                width={800}
                height={450}
                class="w-full h-full object-cover"
            />
        )}
    </div>
    <div class="p-6">
        <div class="flex items-center gap-2 text-sm text-white/60 mb-4">
            {tags.map(tag => (
                <span class="px-3 py-1 bg-primary/10 rounded-full">
                    {tag}
                </span>
            ))}
        </div>
        <h3 class="text-2xl font-bold mb-4">
            {title}
        </h3>
        <p class="text-white/80 mb-6">
            {description}
        </p>
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
        >
            {external ? "Zum externen Guide" : 
              (title.includes("Bibliothek") || title.includes("Modifiers") 
                ? "Zur Bibliothek" 
                : "Zum Guide")}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
            >
                {external ? (
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                ) : (
                    <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                )}
            </svg>
        </a>
    </div>
</article>
```

### 3. BlogCard.astro

Eine wiederverwendbare Komponente für Blog-Karten:

```astro
---
// src/components/ui/BlogCard.astro
import { Image } from 'astro:assets';
import { formatDate } from '../../utils/date';

const { post } = Astro.props;
const { title, description, pubDate, coverImage, slug, category } = post.data;
---

<article class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
    <div class="aspect-video overflow-hidden">
        <Image 
            src={coverImage} 
            alt={title} 
            class="w-full h-full object-cover"
        />
    </div>
    <div class="p-6">
        <div class="flex items-center gap-2 text-sm text-white/60 mb-4">
            <span class="px-3 py-1 bg-primary/10 rounded-full">
                {category}
            </span>
            <span class="text-white/60">
                {formatDate(pubDate)}
            </span>
        </div>
        <h3 class="text-2xl font-bold mb-4">
            {title}
        </h3>
        <p class="text-white/80 mb-6">
            {description}
        </p>
        <a
            href={`/blog/${slug}`}
            class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
        >
            Weiterlesen
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </a>
    </div>
</article>
```

## Content Collections für Bilder

### Detaillierter Implementierungsplan für Blog-Bilder

Für Blog-Bilder verwenden wir Option B (Content Collections), da diese Methode besser für content-zentrierte Bilder geeignet ist. Hier ist der detaillierte Implementierungsplan:

#### 1. Verzeichnisstruktur für Blog-Bilder

```
src/content/blog/
├── artikel-1/
│   ├── index.md
│   └── images/
│       ├── hero.png
│       └── weitere-bilder.png
├── artikel-2/
│   ├── index.md
│   └── images/
│       └── hero.png
└── ...
```

Diese Struktur bietet mehrere Vorteile:
- Bilder sind direkt neben dem zugehörigen Content
- Einfache Verwaltung und Organisation
- Natürliche Struktur für Content-Ersteller
- Bessere Skalierbarkeit bei wachsendem Content

#### 2. Blog-Collection-Schema aktualisieren

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) => z.object({
    // Basis-Informationen
    title: z.string().min(1).max(100),
    description: z.string().min(10).max(160),
    
    // Datum
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    
    // Bilder - image() Helper für Optimierung
    coverImage: image(), // Bild direkt in der Collection
    
    // Taxonomie
    category: z.string(),
    tags: z.array(z.string()).optional().default([]),
    
    // Status
    draft: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
    
    // Autor
    author: z.object({
      name: z.string(),
      avatar: z.string().optional(),
    }).default({
      name: 'Rico Loschke',
    }),
    
    // SEO
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      ogImage: z.string().optional(),
    }).optional().default({}),
  }),
});

export const collections = {
  blog,
  // andere Collections...
};
```

#### 3. Schritte zur Migration eines Blog-Posts

1. **Verzeichnisstruktur erstellen**:
   ```bash
   mkdir -p src/content/blog/ki-entwicklung-2024/images
   ```

2. **Bilder verschieben**:
   ```bash
   cp public/images/blog/ki-entwicklung-2024/hero.png src/content/blog/ki-entwicklung-2024/images/
   ```

3. **Blog-Post-Frontmatter aktualisieren**:
   ```markdown
   ---
   title: "KI-Entwicklung 2024"
   description: "Ein Überblick über die wichtigsten Trends und Entwicklungen im Bereich der Künstlichen Intelligenz für 2024."
   pubDate: 2024-01-15
   coverImage: "./images/hero.png"
   category: "KI-Trends"
   tags: ["KI", "Machine Learning", "Trends"]
   ---

   Inhalt des Blog-Posts...
   ```

#### 4. BlogPosts.astro Komponente aktualisieren

Die Komponente muss sowohl mit dem neuen `coverImage` als auch mit dem alten `heroImage` umgehen können, um eine reibungslose Migration zu ermöglichen:

```astro
---
// src/components/blog/BlogPosts.astro
import { Image } from 'astro:assets';
import { formatDate } from '../../utils/date';

const { posts, showCategories = false, className = "" } = Astro.props;
---

<div class={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
    {posts.map((post) => (
        <article class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
            <div class="aspect-video overflow-hidden">
                {post.data.coverImage ? (
                    <Image 
                        src={post.data.coverImage} 
                        alt={post.data.title} 
                        class="w-full h-full object-cover"
                    />
                ) : post.data.heroImage ? (
                    <Image 
                        src={post.data.heroImage} 
                        alt={post.data.title}
                        width={800}
                        height={450}
                        class="w-full h-full object-cover"
                    />
                ) : (
                    <div class="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                )}
            </div>
            <div class="p-6">
                {showCategories && (
                    <div class="flex items-center gap-2 text-sm text-white/60 mb-4">
                        <span class="px-3 py-1 bg-primary/10 rounded-full">
                            {post.data.category}
                        </span>
                        <span class="text-white/60">
                            {formatDate(post.data.pubDate)}
                        </span>
                    </div>
                )}
                <h3 class="text-2xl font-bold mb-4">
                    {post.data.title}
                </h3>
                <p class="text-white/80 mb-6">
                    {post.data.description}
                </p>
                <a
                    href={`/blog/${post.slug}`}
                    class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
                >
                    Weiterlesen
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-4 w-4 ml-2" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </a>
            </div>
        </article>
    ))}
</div>
```

#### 5. Blog-Post-Template mit strukturierten Daten

Für optimale SEO sollte das Blog-Post-Template strukturierte Daten enthalten:

```astro
---
// src/layouts/BlogPostLayout.astro
import Layout from './Layout.astro';
import { Picture } from 'astro:assets';
import { formatDate } from '../utils/date';

const { frontmatter } = Astro.props;
const { title, description, pubDate, coverImage, category, tags, author } = frontmatter;

// Strukturierte Daten für SEO
const schemaData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description,
  "image": new URL(coverImage.src, Astro.site).toString(),
  "datePublished": pubDate,
  "author": {
    "@type": "Person",
    "name": author?.name || "Rico Loschke"
  },
  "keywords": tags?.join(", ")
};
---

<Layout title={title} description={description}>
  <!-- Strukturierte Daten -->
  <script type="application/ld+json" set:html={JSON.stringify(schemaData)} />
  
  <article class="blog-post max-w-4xl mx-auto">
    <header class="mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
      <div class="flex items-center gap-4 text-white/60 mb-8">
        <time datetime={pubDate.toISOString()}>{formatDate(pubDate)}</time>
        <span class="px-3 py-1 bg-primary/10 rounded-full">{category}</span>
      </div>
      
      <!-- Responsive Hero-Bild mit Picture -->
      <div class="rounded-xl overflow-hidden">
        <Picture
          src={coverImage}
          widths={[400, 800, 1200, 1600]}
          sizes="(max-width: 768px) 100vw, 1200px"
          formats={['avif', 'webp']}
          alt={title}
          class="w-full"
          loading="eager"
        />
      </div>
    </header>
    
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <slot />
    </div>
  </article>
</Layout>
```

#### 6. Migrationsplan für bestehende Blog-Posts

1. **Skript erstellen** für die automatische Migration von Bildern und Frontmatter
2. **Schrittweise Migration** der Blog-Posts, beginnend mit den neuesten oder wichtigsten
3. **Überprüfung und Optimierung** der Alt-Texte und Bildqualität während der Migration
4. **Testen** der migrierten Posts auf korrekte Darstellung und SEO

#### 7. Dokumentation für Content-Ersteller

Erstellen Sie eine Anleitung für Content-Ersteller mit folgenden Informationen:
- Verzeichnisstruktur und Namenskonventionen
- Optimale Bildgrößen und -formate
- Best Practices für Alt-Texte
- Beispiele für gute und schlechte Bildverwendung

## SEO-Optimierungen

### 1. Alt-Text-Strategie

- **Beschreibend**: Beschreiben Sie, was auf dem Bild zu sehen ist
- **Relevant**: Verwenden Sie Keywords, die zum Inhalt passen
- **Kurz**: Halten Sie Alt-Texte unter 125 Zeichen
- **Keine Füllwörter**: Vermeiden Sie "Bild von" oder "Foto von"

**Beispiel:**
```astro
<Image 
    src={guideImage} 
    alt="Framework für effektives Prompt Engineering mit ChatGPT" 
/>
```

### 2. Responsive Bilder mit `<Picture />`

Für wichtige Hero-Bilder oder Bilder, die in verschiedenen Formaten angezeigt werden sollen:

```astro
---
import { Picture } from 'astro:assets';
import heroImage from '../assets/hero.png';
---

<Picture
    src={heroImage}
    formats={['avif', 'webp', 'png']}
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    alt="KI-Experte Rico Loschke während einer Keynote"
    loading="eager"
    widths={[400, 800, 1200]}
/>
```

### 3. Strukturierte Daten (Schema.org)

Für Blog-Artikel:

```astro
---
// In Ihrem Blog-Post-Layout
const { title, description, pubDate, coverImage, author } = Astro.props;

const schemaData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description,
  "image": new URL(coverImage.src, Astro.site).toString(),
  "datePublished": pubDate,
  "author": {
    "@type": "Person",
    "name": author || "Rico Loschke"
  }
};
---

<Layout title={title} description={description}>
  <script type="application/ld+json" set:html={JSON.stringify(schemaData)} />
  <!-- Rest des Layouts -->
</Layout>
```

### 4. Bildnamen und Dateipfade

- Verwenden Sie semantische Dateinamen mit Keywords
- Trennen Sie Wörter mit Bindestrichen
- Halten Sie Dateinamen kurz und beschreibend

**Gut:** `ki-prompt-engineering-framework.webp`
**Schlecht:** `image1.jpg` oder `screenshot_2023_12_15.png`

### 5. Astro Config für Bildoptimierung

```javascript
// astro.config.mjs
export default defineConfig({
  // ... andere Konfigurationen
  image: {
    // Standardeinstellungen für Bildoptimierung
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Standardoptionen für Bildoptimierung
    defaultOptions: {
      format: 'webp',
      quality: 80,
      widths: [640, 750, 828, 1080, 1200, 1920],
      sizes: '(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw',
      loading: 'lazy',
      decoding: 'async'
    }
  }
});
```

## Implementierungscheckliste

### Phase 1: Grundlegende Infrastruktur ✅

- [x] Ordnerstruktur in `src/assets/` erstellen
- [x] Wiederverwendbare Komponenten erstellen:
  - [x] OptimizedImage.astro
  - [ ] GuideCard.astro
  - [ ] BlogCard.astro
- [x] Astro Config für Bildoptimierung aktualisieren

### Phase 2: UI-Komponenten aktualisieren (teilweise abgeschlossen)

- [x] src/components/sections/Guides.astro
- [x] src/pages/guides.astro
- [ ] src/components/blog/BlogPosts.astro
- [ ] Weitere Komponenten mit Bildern

### Aktueller Implementierungsstand (05.04.2025)

Bisher wurden folgende Schritte erfolgreich umgesetzt:

1. **Grundlegende Infrastruktur**:
   - Ordnerstruktur in `src/assets/guides/` für die Guide-Bilder erstellt
   - Wiederverwendbare `OptimizedImage.astro` Komponente implementiert
   - Bilder von `public/images/` nach `src/assets/guides/` kopiert

2. **Komponenten aktualisiert**:
   - `src/components/sections/Guides.astro` auf die `OptimizedImage` Komponente umgestellt
   - `src/pages/guides.astro` ebenfalls aktualisiert
   - Bilder werden jetzt direkt importiert und über die Bildoptimierung von Astro verarbeitet

3. **Astro-Konfiguration optimiert**:
   - Bildoptimierungseinstellungen in `astro.config.mjs` auf Top-Level verschoben
   - Standardformate und Qualitätseinstellungen konfiguriert

Die Änderungen wurden erfolgreich getestet und funktionieren wie erwartet. Die Bilder werden jetzt durch Astros Bildoptimierungsdienst verarbeitet, was zu folgenden Verbesserungen führt:

- Automatische Konvertierung in moderne Formate wie WebP
- Korrekte Dimensionen zur Vermeidung von Cumulative Layout Shift (CLS)
- Lazy-Loading für bessere Performance
- Optimierte Bildgrößen für verschiedene Geräte

### Phase 3: Content Collections für Blog-Bilder

- [x] Blog-Collection-Schema mit coverImage-Feld aktualisieren
- [x] Verzeichnisstruktur für Blog-Bilder erstellen (src/content/blog/artikel-name/images/)
- [x] Beispiel-Blog-Post migrieren (ki-entwicklung-2024)
- [x] BlogPosts.astro Komponente für Content Collection Bilder anpassen
- [x] Blog-Post-Template mit strukturierten Daten aktualisieren
- [ ] Migrationsplan für restliche Blog-Posts erstellen
- [ ] Dokumentation für Content-Ersteller verfassen

### Phase 4: SEO-Optimierungen

- [ ] Alt-Texte für alle Bilder überprüfen und verbessern
- [ ] Strukturierte Daten für Blog-Artikel implementieren
- [ ] Bildnamen und -pfade optimieren
- [ ] Responsive Bilder für wichtige Seiten implementieren

### Phase 5: Testen und Optimieren

- [ ] Lighthouse-Tests durchführen
- [ ] Ladezeiten überprüfen
- [ ] Cumulative Layout Shift (CLS) überprüfen
- [ ] Bildgrößen und -formate optimieren

## Ressourcen

- [Astro Docs: Images](https://docs.astro.build/en/guides/images/)
- [Astro Docs: Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Web.dev: Web Vitals](https://web.dev/vitals/)
- [Google: Image SEO](https://developers.google.com/search/docs/appearance/image-seo)
