---
title: "Glossar der Prompt-Begriffe"
description: "Die wichtigsten Fachbegriffe im Bereich Prompt Engineering im Überblick"
category: "ressourcen"
order: 6
icon: "📘"
tags: ["Glossar", "Begriffe", "Terminologie", "Definitionen", "Referenz"]
---

# Glossar der Prompt-Begriffe: Die wichtigsten Fachbegriffe im Überblick

Ein klares Verständnis der Fachterminologie ist der Schlüssel zur effektiven Kommunikation über Prompt Engineering. Dieses Glossar bietet einen kompakten Überblick über die wichtigsten Begriffe und Konzepte im Bereich des Promptings, speziell zugeschnitten auf Anwendungen im Marketing und in der Kommunikation.

## Grundlegende Begriffe

### Prompt
Eine Anweisung, Frage oder Aufforderung an ein KI-Modell, die dessen Antwort steuert. Ein Prompt kann von einer einfachen Frage bis hin zu einem komplexen, mehrteiligen Anweisungsset reichen.

### Prompt Engineering
Die Kunst und Wissenschaft, Prompts zu erstellen, zu optimieren und zu verfeinern, um bestmögliche Ergebnisse von KI-Modellen zu erhalten. Umfasst verschiedene Techniken und Strategien zur Steuerung von KI-Outputs.

### Large Language Model (LLM)
Ein KI-Modell, das auf riesigen Textmengen trainiert wurde und in der Lage ist, menschenähnlichen Text zu generieren und zu verstehen. Beispiele sind GPT-4, Claude oder Gemini.

### Token
Die Grundeinheit, in die Text für die Verarbeitung durch KI-Modelle zerlegt wird. Ein Token kann ein Wort, ein Teil eines Wortes oder ein einzelnes Zeichen sein. Wichtig für das Verständnis von Kontext- und Eingabebeschränkungen.

### Context Window
Die maximale Anzahl an Tokens, die ein KI-Modell auf einmal verarbeiten kann. Umfasst sowohl den Prompt als auch die generierte Antwort. Begrenzt die Länge von Prompts und die Menge an Informationen, die das Modell berücksichtigen kann.

### Temperature
Ein Parameter, der den Grad der "Kreativität" oder Zufälligkeit in KI-Antworten steuert. Niedrige Temperatur (nahe 0) führt zu deterministischeren, fokussierteren Antworten, während höhere Werte (nahe 1 oder höher) zu vielfältigeren, überraschenderen Ergebnissen führen.

## Prompt-Strukturen und -Techniken

### Zero-Shot Prompting
Eine Technik, bei der das Modell eine Aufgabe ohne spezifische Beispiele oder vorheriges Training für diese Aufgabe lösen soll. Beispiel: "Erstelle einen Tweet über nachhaltige Mode."

### Few-Shot Prompting
Eine Methode, bei der dem Modell einige Beispiele für die gewünschte Aufgabe gegeben werden, bevor es selbst eine Lösung generieren soll. Beispiel: "Hier sind zwei Beispiele für überzeugende Produktbeschreibungen: [Beispiele]. Erstelle eine ähnliche Beschreibung für unser neues Produkt."

### Chain-of-Thought (CoT) Prompting
Technik, die das Modell ermutigt, seinen Denkprozess Schritt für Schritt darzulegen, was zu genaueren und nachvollziehbareren Ergebnissen führt. Beispiel: "Denke Schritt für Schritt durch, wie wir unsere Conversion Rate optimieren können."

### Role Prompting
Eine Strategie, bei der dem Modell eine spezifische Rolle oder Persona zugewiesen wird, aus deren Perspektive es antworten soll. Beispiel: "Antworte als erfahrener Social Media Manager mit 10 Jahren Erfahrung im Luxussegment."

### Constrained Prompting
Technik, bei der dem Modell spezifische Einschränkungen oder Parameter für seine Antwort vorgegeben werden. Beispiel: "Erstelle einen Werbeslogan mit maximal 5 Wörtern, der die Begriffe 'Innovation' und 'Zukunft' nicht verwendet."

### Self-Consistency Prompting
Methode, bei der mehrere Antworten auf denselben Prompt generiert und dann die konsistentesten oder häufigsten Ergebnisse ausgewählt werden, um die Genauigkeit zu verbessern.

### Meta-Prompting
Ein Prompt, der Anweisungen zur Verbesserung oder Evaluation anderer Prompts enthält. Beispiel: "Analysiere diesen Prompt und schlage Verbesserungen vor, um präzisere Marketingideen zu generieren."

## Fortgeschrittene Konzepte

### Prompt Injection
Ein Sicherheitsrisiko, bei dem bösartige Anweisungen in einen Prompt eingeschleust werden, um die beabsichtigte Funktionalität zu umgehen oder unerwünschte Ergebnisse zu erzielen.

### Prompt Leakage
Situation, in der ein Modell sensible Informationen aus seinem Training oder aus früheren Interaktionen preisgibt, was zu Datenschutz- oder Sicherheitsproblemen führen kann.

### Hallucination
Die Tendenz von KI-Modellen, Informationen zu generieren, die faktisch falsch oder erfunden sind, aber überzeugend klingen. Besonders problematisch bei faktenbezogenen Aufgaben oder Spezialwissen.

### Fine-Tuning
Der Prozess, ein vortrainiertes Modell mit spezifischen Daten weiterzutrainieren, um es für bestimmte Aufgaben oder Domänen zu optimieren. Kann die Notwendigkeit komplexer Prompts reduzieren.

### RAG (Retrieval-Augmented Generation)
Technik, die KI-Antworten durch externe Informationsquellen anreichert. Das Modell sucht relevante Informationen aus einer Datenbank und nutzt diese, um präzisere, faktisch korrektere Antworten zu generieren.

### Jailbreaking
Versuch, die Sicherheitsmaßnahmen eines KI-Modells zu umgehen, um es zu Antworten zu bewegen, die es normalerweise verweigern würde (z.B. schädliche oder unethische Inhalte).

### Embedding
Die Umwandlung von Text in numerische Vektoren, die die semantische Bedeutung des Textes erfassen. Ermöglicht Ähnlichkeitsvergleiche und ist grundlegend für viele KI-Anwendungen.

## Marketing-spezifische Prompt-Konzepte

### Brand Voice Prompting
Eine Technik, bei der spezifische Sprachangaben für eine Marke dem Modell als Teil des Prompts bereitgestellt werden, um konsistente, markenspezifische Kommunikation zu erzeugen. Beispiel: "Verwende den verspielten, jugendlichen Tonfall unserer Marke, der sich durch einfache Sprache, kurze Sätze und gelegentliche Slang-Ausdrücke auszeichnet."

### Audience-Targeted Prompting
Prompts, die speziell darauf abzielen, Content für eine bestimmte Zielgruppe zu generieren, indem demographische, psychographische und verhaltensbezogene Merkmale spezifiziert werden. Beispiel: "Erstelle Content für umweltbewusste Millennials mit akademischem Hintergrund und aktivem Lebensstil."

### Funnel-Stage Prompting
Technik, bei der Prompts auf die spezifische Phase der Customer Journey ausgerichtet werden. Beispiel: "Erstelle einen Email-Text für die Conversion-Phase, der die letzten Bedenken von Fast-Käufern ausräumt."

### A/B Test Prompt Design
Methode, bei der verschiedene Prompt-Varianten erstellt werden, um alternative Marketingansätze zu testen, bevor sie tatsächlich implementiert werden. Beispiel: "Generiere zwei unterschiedliche Ansätze für unsere Kampagne: einen emotionalen und einen faktenbasierten."

### KPI-Optimized Prompting
Prompts, die spezifisch auf bestimmte Marketing-KPIs ausgerichtet sind. Beispiel: "Erstelle Social-Media-Posts, die primär auf Engagement-Maximierung abzielen, mit besonderem Fokus auf Kommentare und Shares."

## Prompt-Komponenten und -Elemente

### Prompt Prefix
Der einleitende Teil eines Prompts, der oft die grundlegende Anweisung oder den Kontext enthält. Beispiel: "Als erfahrener Copywriter für Luxusmarken, ..."

### System Instructions
Anweisungen, die dem Modell grundlegende Verhaltensregeln oder Kontextinformationen geben, bevor die eigentliche Anfrage gestellt wird. Oft unsichtbar für den Endnutzer.

### Prompt Template
Eine vordefinierte Struktur für Prompts mit Platzhaltern, die für verschiedene Anwendungsfälle angepasst werden können. Erleichtert konsistentes Prompting für wiederkehrende Aufgaben.

### Negative Prompting
Die explizite Angabe, was das Modell vermeiden oder nicht tun soll. Beispiel: "Erstelle Werbetexte ohne übertriebene Adjektive und Superlative."

### Prompt Parameters
Steuerungselemente innerhalb eines Prompts, die das Verhalten des Modells beeinflussen, wie Temperature, Top-p (Nucleus Sampling) oder Max Tokens.

### In-Context Learning
Die Fähigkeit eines Modells, aus Beispielen innerhalb des Prompts zu lernen, ohne dass sein Basismodell verändert wird.

## Evaluierung und Optimierung

### Prompt Evaluation
Der Prozess der systematischen Bewertung der Effektivität eines Prompts basierend auf der Qualität, Relevanz und Nützlichkeit der generierten Antworten.

### Prompt Versioning
Die Praxis, verschiedene Versionen von Prompts zu verwalten, um Änderungen nachzuverfolgen und A/B-Tests zu ermöglichen.

### Prompt Library
Eine organisierte Sammlung von bewährten Prompts für verschiedene Anwendungsfälle, die als Ressource und Ausgangspunkt für neue Prompts dient.

### Prompt Decomposition
Die Technik, komplexe Aufgaben in kleinere, handhabbare Teilprompts zu zerlegen, um bessere Ergebnisse zu erzielen.

### Iterative Prompt Refinement
Der Prozess der schrittweisen Verbesserung eines Prompts basierend auf den erhaltenen Ergebnissen und gewonnenen Erkenntnissen.

## Technische und rechtliche Konzepte

### Model Card
Eine Dokumentation, die Informationen über ein KI-Modell bereitstellt, einschließlich seiner Fähigkeiten, Einschränkungen und empfohlenen Anwendungsfälle.

### Ethical Prompting
Die Praxis, Prompts zu erstellen, die ethische Grundsätze respektieren und potenziell schädliche Outputs vermeiden.

### GDPR-Compliant Prompting
Prompting-Praktiken, die den Datenschutzbestimmungen der DSGVO entsprechen, insbesondere in Bezug auf personenbezogene Daten.

### Content Moderation
Die Überwachung und Filterung von KI-generierten Inhalten, um sicherzustellen, dass sie bestimmten Richtlinien entsprechen und keine unangemessenen oder schädlichen Inhalte enthalten.

### Explainable AI (XAI)
Ansätze, die darauf abzielen, die Entscheidungen und Ausgaben von KI-Systemen transparent und nachvollziehbar zu machen.

> **Praxis-Tipp:** Stelle sicher, dass du und dein Team ein gemeinsames Verständnis dieser Begriffe entwickeln. Eine klare, einheitliche Kommunikation über Prompt-Engineering-Konzepte macht die Zusammenarbeit effektiver und führt zu besseren Ergebnissen. Erweitere dieses Glossar kontinuierlich, wenn neue Begriffe und Techniken in diesem sich schnell entwickelnden Feld auftauchen.

###
