/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            backgroundColor: {
                primary: "var(--bg-primary)",
                secondary: "var(--bg-secondary)",
                hover: "var(--hover-bg)",
            },
            textColor: {
                primary: "var(--text-primary)",
                secondary: "var(--text-secundary)",
            },
            fill: {
                primary: "var(--bg-primary)",
            },
            borderColor: {
                divider: "var(--divider)",
            },
        },
    },
    plugins: [],
}