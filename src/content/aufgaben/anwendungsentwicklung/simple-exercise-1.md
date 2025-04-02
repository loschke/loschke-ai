---
title: "Codeoptimierung mit KI"
description: "Lerne, wie du KI nutzen kannst, um bestehenden Code zu optimieren und zu verbessern"
complexity: "simple"
branch: "anwendungsentwicklung"
---

# Codeoptimierung mit KI

In dieser Übung lernst du, wie du KI-Tools nutzen kannst, um bestehenden Code zu analysieren, zu optimieren und zu verbessern.

## Aufgabenstellung

Du hast einen JavaScript-Code erhalten, der funktioniert, aber nicht optimal geschrieben ist. Der Code berechnet die Fibonacci-Folge, ist aber ineffizient implementiert. Nutze ChatGPT, um:

1. Den Code zu analysieren und Verbesserungspotenziale zu identifizieren
2. Eine optimierte Version des Codes zu erstellen
3. Die Verbesserungen zu erklären und zu begründen

Hier ist der zu optimierende Code:

```javascript
function fibonacci(n) {
  if (n <= 0) {
    return 0;
  }
  
  if (n === 1) {
    return 1;
  }
  
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test
console.time('Fibonacci');
const result = fibonacci(35);
console.timeEnd('Fibonacci');
console.log(`Fibonacci(35) = ${result}`);
```

## Hinweise

- Achte besonders auf die Zeitkomplexität des Algorithmus
- Überlege, wie du redundante Berechnungen vermeiden kannst
- Denke an Lesbarkeit und Wartbarkeit des Codes

## Lösungsansatz

Um diese Aufgabe zu lösen, kannst du folgenden Prompt verwenden:

```
Ich habe einen JavaScript-Code, der die Fibonacci-Folge berechnet, aber nicht optimal implementiert ist. Bitte analysiere diesen Code, identifiziere Verbesserungspotenziale und erstelle eine optimierte Version.

Hier ist der Code:

```javascript
function fibonacci(n) {
  if (n <= 0) {
    return 0;
  }
  
  if (n === 1) {
    return 1;
  }
  
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test
console.time('Fibonacci');
const result = fibonacci(35);
console.timeEnd('Fibonacci');
console.log(`Fibonacci(35) = ${result}`);
```

Bitte erkläre in deiner Antwort:
1. Was sind die Probleme mit diesem Code?
2. Wie kann er optimiert werden?
3. Warum ist deine optimierte Version besser?
4. Wie unterscheiden sich die Laufzeiten?
```

### Beispielhafte Lösung

#### Analyse des ursprünglichen Codes

Der ursprüngliche Code hat folgende Probleme:

1. **Exponentielle Zeitkomplexität (O(2^n))**: Die rekursive Implementierung berechnet die gleichen Fibonacci-Zahlen mehrfach. Zum Beispiel wird bei der Berechnung von `fibonacci(5)` die Funktion `fibonacci(3)` zweimal aufgerufen.

2. **Hoher Speicherverbrauch**: Durch die vielen rekursiven Aufrufe kann es bei größeren Werten von n zu einem Stack Overflow kommen.

3. **Ineffizienz**: Für größere Werte von n (z.B. n=35) wird die Berechnung extrem langsam, da exponentiell mehr Funktionsaufrufe nötig sind.

#### Optimierte Version mit Memoization

```javascript
function fibonacciOptimized(n, memo = {}) {
  // Basisfall
  if (n <= 0) return 0;
  if (n === 1) return 1;
  
  // Prüfen, ob das Ergebnis bereits berechnet wurde
  if (memo[n] !== undefined) {
    return memo[n];
  }
  
  // Berechnen und speichern des Ergebnisses
  memo[n] = fibonacciOptimized(n - 1, memo) + fibonacciOptimized(n - 2, memo);
  return memo[n];
}

// Test
console.time('Fibonacci Optimized');
const resultOptimized = fibonacciOptimized(35);
console.timeEnd('Fibonacci Optimized');
console.log(`Fibonacci(35) = ${resultOptimized}`);
```

#### Iterative Version (noch effizienter)

```javascript
function fibonacciIterative(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  
  let a = 0;
  let b = 1;
  let result;
  
  for (let i = 2; i <= n; i++) {
    result = a + b;
    a = b;
    b = result;
  }
  
  return result;
}

// Test
console.time('Fibonacci Iterative');
const resultIterative = fibonacciIterative(35);
console.timeEnd('Fibonacci Iterative');
console.log(`Fibonacci(35) = ${resultIterative}`);
```

#### Vergleich der Lösungen

1. **Ursprüngliche rekursive Lösung**:
   - Zeitkomplexität: O(2^n) - exponentiell
   - Speicherkomplexität: O(n) für den Aufrufstack
   - Laufzeit für n=35: Mehrere Sekunden bis Minuten

2. **Optimierte Lösung mit Memoization**:
   - Zeitkomplexität: O(n) - linear
   - Speicherkomplexität: O(n) für den Aufrufstack und das Memo-Objekt
   - Laufzeit für n=35: Wenige Millisekunden

3. **Iterative Lösung**:
   - Zeitkomplexität: O(n) - linear
   - Speicherkomplexität: O(1) - konstant
   - Laufzeit für n=35: Wenige Millisekunden, etwas schneller als die Memoization-Lösung

Die optimierten Versionen sind deutlich effizienter, da sie redundante Berechnungen vermeiden. Die iterative Lösung ist besonders effizient, da sie keinen rekursiven Aufrufstack benötigt und mit konstantem Speicherverbrauch arbeitet.
