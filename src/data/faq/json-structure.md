# FAQ JSON-Struktur - Neue Header-Daten

## Neue Felder für jede Kategorie-JSON

Folgende Felder sollten zu jeder Kategorie-JSON-Datei hinzugefügt werden:

### Auf oberster Ebene hinzuzufügen:

```json
"sectionIcon": "🔄",                      // Icon für die Kategorie
"sectionColor": "from-[#2d4263] to-[#1a2639]", // Farbverlauf für die Kategorie
"sectionOrder": 5,                       // Reihenfolge für die Anzeige (1-6)
```

### Bei jeder Frage hinzuzufügen:

```json
"isTopQuestion": true,              // Markierung für Top-Fragen auf der Übersichtsseite
```

## Beispiel für eine vollständige JSON-Struktur

```json
{
  "sectionTitle": "KI-Transformation im Unternehmen",
  "sectionId": "ki-transformation-unternehmen",
  "sectionDescription": "Praktische Erkenntnisse und Strategien zur erfolgreichen Implementierung von KI-Technologien in Unternehmen, vom Zeithorizont über die Priorisierung bis hin zum Change Management.",
  "sectionIcon": "🔄",
  "sectionColor": "from-[#2d4263] to-[#1a2639]",
  "sectionOrder": 5,
  "lastUpdated": "2025-04-19",
  "questions": [
    {
      "id": "ki-transformation-dauer",
      "question": "Wie lange dauert eine erfolgreiche KI-Transformation typischerweise?",
      "answer": "Eine KI-Transformation ist kein Sprint, sondern ein Marathon mit strategischen Etappenzielen...",
      "isTopQuestion": true,
      "keywords": ["KI-Transformation", "Zeithorizont", "Implementierungszeit"],
      "chatbotExtras": {
        "relatedQuestions": ["ki-abteilungen-priorisierung", "ki-erfolg-messen"],
        "relatedResources": [
          {"title": "KI-Transformation ohne Illusionen", "url": "https://loschke.ai/impulse#ki-transformation", "type": "keynote"}
        ],
        "shortAnswer": "Eine KI-Transformation dauert typischerweise 18-36 Monate und gliedert sich in vier Phasen..."
      }
    }
  ],
  "seoData": {
    "metaTitle": "KI-Transformation im Unternehmen: Praxisnahe Expertise von Rico Loschke",
    "metaDescription": "Erfahre, wie lange KI-Transformationsprojekte dauern, welche Abteilungen zu priorisieren sind...",
    "focusKeywords": ["KI-Transformation", "KI-Implementierung", "KI-Einführung"],
    "canonicalUrl": "https://loschke.ai/faq#ki-transformation-unternehmen",
    "structuredData": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": []
    }
  }
}
```

## Empfohlene Werte für die Kategorien

### 1. Grundlegendes zu KI und meiner Rolle
```json
"sectionIcon": "💡",
"sectionColor": "from-[#2a4858] to-[#162a36]",
"sectionOrder": 1
```

### 2. Einstieg in KI für Unternehmen
```json
"sectionIcon": "🚀",
"sectionColor": "from-[#4a3c59] to-[#2a1c39]",
"sectionOrder": 2
```

### 3. Prompt Engineering und KI-Nutzung
```json
"sectionIcon": "💬",
"sectionColor": "from-[#005461] to-[#003049]",
"sectionOrder": 3
```

### 4. AI-Design und Kreativprozesse
```json
"sectionIcon": "🎨",
"sectionColor": "from-[#3a3a59] to-[#232339]",
"sectionOrder": 4
```

### 5. KI-Transformation im Unternehmen
```json
"sectionIcon": "🔄",
"sectionColor": "from-[#2d4263] to-[#1a2639]",
"sectionOrder": 5
```

### 6. Zukunftsperspektiven und Trends
```json
"sectionIcon": "🔮",
"sectionColor": "from-[#3b5249] to-[#1e2a25]",
"sectionOrder": 6
```

## Zusätzliche categories.json (optional)

Für eine einfachere Verwaltung könnte auch eine zentrale `categories.json` erstellt werden:

```json
[
  {
    "id": "grundlagen-ki-rolle",
    "title": "Grundlegendes zu KI und meiner Rolle",
    "description": "Erfahre mehr über meine Arbeit als KI-Generalist, meinen Werdegang und meine Herangehensweise an künstliche Intelligenz.",
    "icon": "💡",
    "color": "from-[#2a4858] to-[#162a36]",
    "order": 1
  },
  {
    "id": "ki-einstieg-unternehmen",
    "title": "Einstieg in KI für Unternehmen",
    "description": "Praktische Ratschläge für Unternehmen, die mit KI starten möchten – von der ersten Potenzialanalyse bis zur konkreten Implementierung.",
    "icon": "🚀",
    "color": "from-[#4a3c59] to-[#2a1c39]",
    "order": 2
  },
  {
    "id": "prompt-engineering-ki-nutzung",
    "title": "Prompt Engineering und KI-Nutzung",
    "description": "Praktische Tipps zur effektiven Kommunikation mit KI-Systemen, Vermeidung häufiger Fehler und Auswahl der richtigen KI-Modelle für verschiedene Anwendungsfälle.",
    "icon": "💬",
    "color": "from-[#005461] to-[#003049]",
    "order": 3
  },
  {
    "id": "ai-design-kreativprozesse",
    "title": "AI-Design und Kreativprozesse",
    "description": "Einblicke in die Zukunft kreativer Arbeit mit KI, praktische Tipps zur Optimierung KI-generierter Bilder und Informationen zum 4K-Framework für AI-Design.",
    "icon": "🎨",
    "color": "from-[#3a3a59] to-[#232339]",
    "order": 4
  },
  {
    "id": "ki-transformation-unternehmen",
    "title": "KI-Transformation im Unternehmen",
    "description": "Praktische Erkenntnisse und Strategien zur erfolgreichen Implementierung von KI-Technologien in Unternehmen, vom Zeithorizont über die Priorisierung bis hin zum Change Management.",
    "icon": "🔄",
    "color": "from-[#2d4263] to-[#1a2639]",
    "order": 5
  },
  {
    "id": "zukunftsperspektiven-trends",
    "title": "Zukunftsperspektiven und Trends",
    "description": "Einschätzungen zu kommenden KI-Entwicklungen, deren Auswirkungen auf Arbeitsplätze und Kompetenzen sowie Ausblicke auf die Zukunft der Mensch-KI-Kollaboration.",
    "icon": "🔮",
    "color": "from-[#3b5249] to-[#1e2a25]",
    "order": 6
  }
]
