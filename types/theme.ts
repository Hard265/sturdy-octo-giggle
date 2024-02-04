const Themes = {
    light: {
        border: "border-gray-400",
        bg: "bg-gray-50",
        text: "text-gray-800"
    },
    dark: {
        border: "border-gray-900",
        bg: "bg-gray-800",
        text: "text-gray-50"
    }

}

type ThemeVariantsT = keyof typeof Themes | "system"; // "light" | "dark"

export { Themes, ThemeVariantsT };
