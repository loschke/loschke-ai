// Definiere die Kategorie-Farben für die gesamte Website
export type CategoryKey = "KI-Strategie" | "AI-Design" | "Prompt Engineering" | "KI-Tools" | "KI-Automation" | "KI-Praxis" | "KI-Transformation";

export const categoryColors: Record<CategoryKey, string> = {
    "KI-Strategie": "bg-[#2A4858]",
    "AI-Design": "bg-[#6B46C1]",
    "Prompt Engineering": "bg-[#38A169]",
    "KI-Tools": "bg-[#DD6B20]",
    "KI-Automation": "bg-[#E53E3E]",
    "KI-Praxis": "bg-[#319795]",
    "KI-Transformation": "bg-[#D69E2E]"
};

// Hilfsfunktion zur Typprüfung
export const isValidCategory = (cat: string): cat is CategoryKey => 
    Object.keys(categoryColors).includes(cat);

// Funktion zum Abrufen der Farbklasse für eine Kategorie
export const getCategoryColorClass = (category: string): string => {
    if (isValidCategory(category)) {
        return categoryColors[category];
    }
    return "bg-gray-500"; // Fallback-Farbe
};
