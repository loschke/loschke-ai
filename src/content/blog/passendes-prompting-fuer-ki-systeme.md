---
title: "Drei KI-Systeme: Drei Prompt-Strategien für Automatisierung, Assistenten und Agenten"
description: "Wie Sie für KI-Agenten, KI-Assistenten und KI-Automatisierung die passenden Prompt-Strukturen entwickeln und einsetzen"
pubDate: 2025-05-02
categories: ["Prompt Engineering", "KI-Praxis"]
tags: ["Prompting", "KI-Agenten", "KI-Assistenten", "KI-Automatisierung", "Prompt-Techniken", "Chain-of-Thought"]
draft: false
audio: "passendes-prompting-fuer-ki-systeme.mp3"
author:
  name: "Rico Loschke"
  avatar: "/images/rico-loschke_avatar.jpg"
seo:
  metaTitle: "Drei KI-Systeme: Drei Prompt-Strategien für Automatisierung, Assistenten und Agenten"
  metaDescription: "Wie Sie Ihre Prompts für KI-Agenten, KI-Assistenten und KI-Automatisierung optimal gestalten und dadurch bessere Ergebnisse erzielen"
---

# Drei KI-Systeme: Drei Prompt-Strategien für Automatisierung, Assistenten und Agenten

In meinem [letzten Artikel](https://loschke.ai/blog/ki-assistenten-agenten-automatisierung) habe ich die grundlegenden Unterschiede zwischen KI-Automatisierung, KI-Assistenten und KI-Agenten beleuchtet. Heute gehen wir einen Schritt weiter und schauen uns an, wie wir diese verschiedenen Systeme richtig "ansprechen" – denn jedes reagiert am besten auf einen spezifischen Kommunikationsstil.

## 1. Grundprinzipien des KI-Promptings im Systemkontext

Der Erfolg jeder KI-Interaktion beginnt mit einem gut formulierten Prompt. Unabhängig vom System gibt es einige universelle Prinzipien:

- **Klarheit und Spezifität:** Je klarer die Anweisung, desto besser das Ergebnis
- **Kontextbereitstellung:** Relevante Hintergrundinformationen liefern
- **Strukturierung:** Komplexe Anfragen sinnvoll gliedern
- **Iteration:** Prompts schrittweise verbessern

Entscheidend ist jedoch: Die ideale Prompt-Struktur variiert stark je nach KI-System. Was bei einem Assistenten funktioniert, führt bei einem Agenten möglicherweise nicht zum gewünschten Ergebnis. Diese Unterschiede werden oft unterschätzt – dabei liegt genau hier der Schlüssel zu wirklich effektiven KI-Interaktionen.

## 2. Prompting für KI-Automatisierung: Präzision in regelbasierten Workflows

KI-Automatisierung dient der effizienten Ausführung vordefinierter Prozesse. Hier steht Präzision im Vordergrund – jeder Parameter muss eindeutig definiert sein.

### Kernelemente eines Automatisierungs-Prompts

| Element | Beschreibung | Beispiel |
|---------|-------------|----------|
| Trigger/Auslöser | Definiert, wann der Prozess startet | "Jeden Montag um 8:00 Uhr" oder "Bei Eingang einer E-Mail mit Betreff 'Bestellung'" |
| Eingabeparameter | Daten, die der Prozess benötigt | Dateipfade, Kundennummern, Zeiträume |
| Prozesslogik | Regelbasierte Abläufe mit klaren Bedingungen | Wenn-Dann-Regeln, Schleifenstrukturen |
| Ausgabeformat | Präzise Definition des erwarteten Ergebnisses | "Als CSV-Datei mit Spalten X, Y, Z" |
| Fehlerbehandlung | Anweisungen für Ausnahmesituationen | "Bei fehlenden Daten: Benachrichtigung an [E-Mail]" |

### Beispiel-Prompt für Automatisierung

```
Trigger: Neuer Eintrag in der Tabelle "Kundenanfragen"
Prozess:
1. Extrahiere Kategorie, Dringlichkeit und Kundennummer
2. Wenn Dringlichkeit = "Hoch": Weiterleitung an Support-Team via Slack
3. Wenn Kategorie = "Rechnung": 
   a. Suche in Rechnungsdatenbank nach Kundennummer
   b. Erstelle PDF mit Rechnungskopie
   c. Sende automatische Antwort-E-Mail mit Anhang
4. Für alle anderen: Sortiere in entsprechende Ticket-Queue
Ausgabe: Statusbericht mit Anzahl bearbeiteter Anfragen pro Kategorie
Fehlerfall: Bei Datenbankfehler E-Mail an admin@unternehmen.de
```

### Tipps für effektives Automatisierungs-Prompting

- **Struktur ist alles:** Verwende klare, hierarchische Strukturen mit nummerierten Schritten
- **Präzise Parameter:** Definiere exakt, welche Daten wo herkommen und wohin sie gehen
- **Lückenlose Logik:** Stelle sicher, dass jeder mögliche Pfad definiert ist
- **Eindeutige Bedingungen:** Formuliere Regeln so, dass keine Interpretationsspielräume bleiben
- **Testfälle mitdenken:** Überlege, welche Eingabedaten zum Testen verwendet werden sollen

## 3. Prompting für KI-Assistenten: Direkte Anweisungen für reaktive Systeme

KI-Assistenten wie ChatGPT oder Claude reagieren auf direkte Anfragen und liefern unmittelbare Antworten. Ihr Prompting ist konversationeller und aufgabenorientiert.

### Kernmerkmale eines Assistenten-Prompts

- **Direkt und fokussiert** auf eine spezifische Aufgabe oder Frage
- **Single-Turn-orientiert**, auch wenn Konversationskontext genutzt wird
- **Eingabe- und Ausgabe-bezogen** mit klarer Erwartungshaltung
- **Moderate Komplexität** ohne komplizierte Mehrstufigkeit

### Strukturierte Prompt-Elemente für Assistenten

1. **Klare Aufgabendefinition:** Was soll der Assistent tun?
2. **Eingabedaten:** Welche Informationen werden bereitgestellt?
3. **Gewünschtes Format:** Wie soll die Antwort strukturiert sein?
4. **Tonalität/Stil (optional):** In welchem Stil soll geantwortet werden?
5. **Einschränkungen (optional):** Was soll vermieden werden?

### Beispiel-Prompts für Assistenten

**Einfacher Prompt:**  
"Fasse diesen Artikel über erneuerbare Energien in drei Kernpunkten zusammen."

**Strukturierter Prompt:**  
"Analysiere den folgenden Quartalsreport und erstelle eine Zusammenfassung der wichtigsten finanziellen Kennzahlen. Formatiere das Ergebnis als Tabelle mit den Spalten 'Kennzahl', 'Aktueller Wert', 'Vorjahresvergleich' und 'Bewertung'. Berücksichtige dabei besonders Umsatzentwicklung, Deckungsbeitrag und Cash-Flow."

### Optimierungstechniken für Assistenten-Prompts

- **Rollenanweisung:** "Antworte als Finanzexperte mit Fokus auf Anlagestrategien"
- **Beispielanforderung:** "Formatiere deine Antwort ähnlich wie dieses Beispiel: [Beispiel]"
- **Klare Grenzen:** "Beschränke dich auf die letzten 5 Jahre und europäische Märkte"

In meiner Arbeit mit Kunden hat sich gezeigt, dass besonders für Einsteiger die klare Aufgabenstellung den größten Unterschied macht. Anstatt "Erzähl mir etwas über Solarenergie" wirkt "Erkläre die drei wichtigsten Vorteile von Solarenergie für mittelständische Unternehmen" deutlich fokussierter und liefert konsistentere Ergebnisse.

## 4. Prompting für KI-Agenten: Ziele und Autonomie im Fokus

KI-Agenten repräsentieren die nächste Entwicklungsstufe. Sie agieren proaktiv, treffen eigenständige Entscheidungen und verfolgen übergeordnete Ziele. Ihr Prompting ist grundlegend anders – wir delegieren hier Aufgaben statt sie direkt anzuweisen.

### Die fünf Kernelemente eines Agenten-Prompts

1. **Zieldefinition:** Was soll der Agent erreichen? (nicht: wie)
2. **Verfügbare Werkzeuge:** Welche Tools und Ressourcen kann der Agent nutzen?
3. **Einschränkungen und Leitplanken:** In welchem Rahmen darf der Agent agieren?
4. **Kontext und Hintergrund:** Relevantes Wissen für fundierte Entscheidungen
5. **Feedback-Mechanismen:** Wie soll der Agent Zwischenergebnisse kommunizieren?

### Beispiel-Prompt für einen Recherche-Agenten

```
Ziel: Erstelle eine umfassende Marktanalyse für den europäischen E-Bike-Markt 2025.

Verfügbare Tools:
- Web-Suche zur Recherche aktueller Marktdaten und Prognosen
- Datenbank-API zum Abruf historischer Verkaufsdaten
- Visualisierungs-Tool zur Erstellung aussagekräftiger Diagramme

Rahmenbedingungen:
- Fokussiere auf die fünf größten europäischen Märkte
- Berücksichtige nur verlässliche Quellen (Marktforschungsinstitute, Branchenverbände)
- Behalte stets die ethischen Richtlinien zur Datenverarbeitung im Blick

Hintergrund:
- Unser Unternehmen plant den Markteintritt im Premium-Segment
- Besonderes Interesse an demografischen Faktoren und Kaufverhalten
- Vorherige Analysen zeigten starkes Wachstum im urbanen Pendler-Segment

Prozessablauf:
1. Sammle relevante Marktdaten aus verschiedenen Quellen
2. Analysiere Trends und identifiziere Wachstumssegmente
3. Erstelle visualisierte Prognosen für die nächsten 3 Jahre
4. Formuliere konkrete Handlungsempfehlungen
5. Präsentiere Zwischenergebnisse nach Schritt 2 zur Validierung
```

### Was Agenten-Prompts besonders macht

Bei Agenten-Prompts definieren wir ein übergeordnetes Ziel und den Handlungsrahmen, überlassen aber die konkrete Ausführung und Planung dem Agenten selbst. Im Gegensatz zu Assistenten oder Automatisierung:

- Wir erklären **was** erreicht werden soll, nicht unbedingt **wie**
- Wir definieren verfügbare **Werkzeuge** und **Ressourcen**
- Wir setzen **Leitplanken** statt starrer Prozesse
- Wir ermöglichen **autonome Entscheidungen** im definierten Rahmen

### Fortgeschrittene Agenten-Prompt-Techniken

- **Standard Operating Procedures (SOPs):** Grundlegende Vorgehensweisen für komplexe Aufgaben
- **Tool-Integration:** Präzise Definition verfügbarer Tools und deren Anwendungsbereiche
- **Sub-Agenten:** Delegation von Teilaufgaben an spezialisierte Unter-Agenten
- **Feedback-Schleifen:** Mechanismen zur Kurskorrektur und Zwischenbewertung

In meiner Praxis hat sich gezeigt, dass der Übergang von Assistenten zu Agenten oft die größte konzeptuelle Herausforderung darstellt. Der entscheidende Unterschied: Wir müssen lernen, Ziele und Rahmenbedingungen zu definieren, statt detaillierte Anweisungen zu geben – ähnlich wie bei der Delegation an einen menschlichen Mitarbeiter.

## 5. Fortgeschrittene Techniken im Überblick

Für komplexere Aufgaben, besonders im Bereich der KI-Agenten, kommen spezialisierte Prompt-Techniken zum Einsatz:

### Chain-of-Thought (CoT) Prompting

CoT verbessert die Reasoning-Fähigkeiten des Modells, indem es dazu ermutigt wird, seinen "Gedankengang" schrittweise offenzulegen.

**Einfaches Beispiel:**
"Berechne den Gesamtumsatz für Q1-Q3 2024, wenn Q1 120.000€, Q2 145.000€ und Q3 132.000€ betrug. Denke Schritt für Schritt."

**Anwendungsbereiche:**
- Komplexe Berechnungen
- Mehrstufige logische Probleme
- Fehlersuche bei unerwarteten Ergebnissen

### ReAct Framework (Reason + Act)

ReAct kombiniert Denken und Handeln in einer iterativen Schleife, ideal für Agenten, die mit externen Ressourcen interagieren.

**Ablaufschema:**
1. **Thought:** Analyse der Situation und Planung des nächsten Schritts
2. **Action:** Ausführung einer konkreten Aktion (z.B. API-Aufruf)
3. **Observation:** Aufnahme des Ergebnisses und Integration in die Planung
4. Wiederholung der Schleife, bis das Ziel erreicht ist

**Anwendungsbereiche:**
- Informationsrecherche und -validierung
- Komplexe Entscheidungsfindung mit externen Daten
- Interaktion mit APIs und Datenbanken

### Strukturierte Prompt-Frameworks

Für besonders komplexe Aufgaben haben sich standardisierte Framework-Strukturen bewährt:

```
[Role]: Definiert die Persona des Agenten
[Objective]: Beschreibt das übergeordnete Ziel
[Context]: Erklärt Hintergrund und Wichtigkeit
[Tools]: Verfügbare Ressourcen und Werkzeuge
[Constraints]: Grenzen und Einschränkungen
[Format]: Erwartetes Ergebnisformat
[Examples]: Beispiele für gewünschtes Verhalten
[Process]: Grober Ablaufplan oder Methodik
```

Diese Frameworks sorgen für Konsistenz und Vollständigkeit bei komplexen Prompts, besonders für KI-Agenten.

## 6. Praxisbeispiele: Direkte Vergleiche

Um die Unterschiede greifbarer zu machen, hier ein direkter Vergleich, wie dieselbe Grundaufgabe für jedes System formuliert werden könnte:

### Aufgabe: E-Mail-Terminplanung

**KI-Automatisierung:**
```
Trigger: Eingehende E-Mail mit Betreff "Terminanfrage" oder Schlüsselwort "Meeting"
Prozess:
1. Extrahiere vorgeschlagene Zeiten aus dem E-Mail-Text
2. Prüfe Verfügbarkeit im Kalender [ID: 12345] für extrahierte Zeiten
3. Wenn mindestens ein Slot verfügbar:
   a. Erstelle Kalendereintrag für frühesten verfügbaren Slot
   b. Sende Bestätigungs-E-Mail aus Vorlage "Meeting_Confirm"
4. Wenn alle Slots belegt:
   a. Sende E-Mail aus Vorlage "Meeting_Alternative" mit Link zu Calendly
Ausgabe: Statusbericht mit erstellten Terminen oder versendeten Alternativvorschlägen
```

**KI-Assistent:**
```
Entwirf eine höfliche E-Mail an Dr. Schmidt (schmidt@example.com), in der ich ein 45-minütiges Meeting für kommenden Dienstag oder Mittwoch zwischen 14:00 und 16:00 Uhr vorschlage. Thema ist die Präsentation unseres neuen Produkts. Erwähne, dass ich flexible Zeiten anbieten kann, falls diese nicht passen.
```

**KI-Agent:**
```
Ziel: Vereinbare ein 45-minütiges Meeting mit Dr. Schmidt zum Thema "Produktpräsentation"

Verfügbare Tools:
- Kalender-API (für Zugriff auf meinen Outlook-Kalender)
- E-Mail-API (für Kommunikation mit Dr. Schmidt)
- Kontakt-Datenbank (für Kontaktdetails)

Rahmenbedingungen:
- Priorisiere Termine in der kommenden Woche
- Bevorzuge Nachmittagstermine (13:00-17:00 Uhr)
- Berücksichtige meine blockierten Zeiten für andere Meetings
- Halte die Kommunikation professionell und höflich

Prozess:
1. Identifiziere freie Zeitslots in meinem Kalender für die nächsten 7 Tage
2. Schlage Dr. Schmidt 2-3 alternative Termine vor
3. Verarbeite die Antwort und bestätige den finalen Termin
4. Erstelle einen Kalendereintrag mit Erinnerung 
5. Informiere mich über das vereinbarte Meeting
```

### Aufgabe: Datenanalyse und Berichterstellung

**KI-Automatisierung:**
```
Trigger: Letzter Arbeitstag des Monats, 17:00 Uhr
Prozess:
1. Führe SQL-Abfrage "monthly_sales_report.sql" auf Datenbank aus
2. Exportiere Ergebnisse als CSV-Datei in Ordner "Reports/[Monat]/[Jahr]"
3. Erstelle Excel-Bericht basierend auf Vorlage "sales_report_template.xlsx"
4. Fülle dynamische Felder mit Werten aus CSV-Datei
5. Berechne KPIs gemäß Formeln in Zellen B10:F15
6. Generiere Monatsgrafiken auf Blatt 2
7. Sende fertige Datei per E-Mail an vertrieb@unternehmen.de
Fehlerfall: Bei Datenbankfehler Benachrichtigung an admin@unternehmen.de
```

**KI-Assistent:**
```
Analysiere die beigefügte Verkaufsdaten-CSV und erstelle eine prägnante Zusammenfassung mit folgenden Elementen:
1. Top 5 Produkte nach Umsatz
2. Vergleich zum Vormonat (prozentuale Veränderung)
3. Auffällige Trends oder Anomalien
4. Eine kurze Handlungsempfehlung basierend auf den Daten

Formatiere das Ergebnis übersichtlich mit Zwischenüberschriften und stelle die wichtigsten Zahlen hervor.
```

**KI-Agent:**
```
Ziel: Erstelle einen umfassenden Vertriebsbericht für Q1 2025 mit Trends, Prognosen und Handlungsempfehlungen.

Verfügbare Tools:
- Datenbank-Zugriff auf Verkaufsdaten (SQL)
- Business Intelligence Tool für Visualisierungen
- Historische Berichte der letzten 8 Quartale
- Marktdaten für Wettbewerbsvergleich

Anforderungen:
1. Analysiere Verkaufszahlen nach Produktkategorie, Region und Kundentyp
2. Identifiziere Wachstumstreiber und problematische Bereiche
3. Entwickle Prognosen für Q2-Q4 basierend auf historischen Daten
4. Formuliere datengestützte Handlungsempfehlungen
5. Erstelle aussagekräftige Visualisierungen der Kernerkenntnisse

Format: Strukturierter Bericht mit Executive Summary, Detailanalyse, Visualisierungen und Empfehlungsteil.

Prozesshinweise:
- Führe Ausreißeranalyse durch, bevor du Trends ableitest
- Berücksichtige saisonale Effekte bei der Prognoseentwicklung
- Priorisiere Handlungsempfehlungen nach potenzieller Umsatzwirkung
- Zeige Zwischenergebnisse nach der ersten Datenanalyse
```

## 7. Vermeidung typischer Fallstricke

Jedes KI-System hat seine eigenen Stolpersteine beim Prompting. Hier eine Übersicht der häufigsten Probleme und wie du sie vermeidest:

### KI-Automatisierung

| Häufige Fehler | Lösungsansatz |
|----------------|---------------|
| Unvollständige Prozessdefinition | Alle möglichen Pfade und Bedingungen durchdenken und definieren |
| Fehlende Fehlerbehandlung | Explizite Anweisungen für Ausnahmen und Fehlerszenarien |
| Zu unpräzise Parameter | Exakte Definitionen von Datentypen, Formaten und Quellen |
| Unklare Trigger-Bedingungen | Eindeutige, messbare Auslöser definieren |
| Fehlende Validierungsschritte | Zwischenprüfungen für kritische Prozessschritte einbauen |

### KI-Assistenten

| Häufige Fehler | Lösungsansatz |
|----------------|---------------|
| Vage oder mehrdeutige Anweisungen | Präzise, spezifische Formulierungen mit klaren Verben |
| Überkomplexe Prompts | Aufgaben in Teilschritte zerlegen, mehrere einfache Prompts statt eines komplexen |
| Fehlender Kontext | Notwendige Hintergrundinformationen bereitstellen |
| Unrealistische Erwartungen | Modellbegrenzungen kennen und respektieren |
| Unklare Formatvorgaben | Explizite Strukturierung der gewünschten Antwort vorgeben |

### KI-Agenten

| Häufige Fehler | Lösungsansatz |
|----------------|---------------|
| Unklare Zieldefinition | Messbare, spezifische Zielsetzung mit klaren Erfolgskriterien |
| Unzureichende Tool-Beschreibungen | Detaillierte Erklärung verfügbarer Tools, ihrer Parameter und Anwendungsfälle |
| Fehlende Leitplanken | Klare Grenzen und ethische Richtlinien definieren |
| Zu starre Prozessvorgaben | Balance zwischen Anleitung und Autonomie finden |
| Mangelnde Feedback-Mechanismen | Zwischenberichte und Validierungspunkte einbauen |

## Fazit: Der richtige Ansatz für jedes System

Die effektive Kommunikation mit KI-Systemen erfordert ein Verständnis ihrer spezifischen Charakteristika:

- **KI-Automatisierung** braucht präzise, regelbasierte Prompts mit klaren Parametern und vollständigen Prozessdefinitionen – hier geht es um Genauigkeit und Zuverlässigkeit.

- **KI-Assistenten** benötigen direkte, aufgabenorientierte Prompts mit klaren Anweisungen und Formatvorgaben – der Fokus liegt auf der unmittelbaren Aufgabenerfüllung.

- **KI-Agenten** verlangen zielorientierte Prompts mit definierten Rahmenbedingungen und verfügbaren Ressourcen – hier delegieren wir Aufgaben statt sie direkt auszuführen.

In meiner Arbeit mit Unternehmen verschiedenster Branchen habe ich immer wieder beobachtet, dass der bewusste Einsatz des richtigen Prompting-Stils den Unterschied zwischen mittelmäßigen und herausragenden KI-Ergebnissen ausmacht. Der Schlüssel liegt nicht nur im Verständnis der technischen Möglichkeiten, sondern in der Fähigkeit, mit jedem KI-System in seiner eigenen "Sprache" zu kommunizieren.

Je besser wir verstehen, wie unterschiedlich KI-Systeme "denken" und arbeiten, desto effektiver können wir sie als Werkzeuge und Partner in unseren Arbeitsalltag integrieren.

---

Welche Erfahrungen hast du mit verschiedenen KI-Systemen gemacht? Teile deine Erkenntnisse und Fragen in den Kommentaren!
