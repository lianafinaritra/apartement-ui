/** @type {DefaultColors} */
const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
        "./src/components/*.{js,jsx,ts,tsx}",
        "./src/pages/*.{js,jsx,ts,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            height: theme => ({
                "header": "80vh",
                "screen/3": "calc(100vh / 3)",
                "screen/4": "calc(100vh / 4)",
                "screen/5": "calc(100vh / 5)",
            })
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: "#000",
            white: "#fff",
            slate: colors.slate,
            gray: colors.gray,
            neutral: colors.neutral,
            stone: colors.stone,
            red: colors.red,
            orange: colors.orange,
            amber: colors.amber,
            yellow: colors.yellow,
            lime: colors.lime,
            green: colors.green,
            emerald: colors.emerald,
            teal: colors.teal,
            cyan: colors.cyan,
            sky: colors.sky,
            blue: colors.blue,
            indigo: colors.indigo,
            violet: colors.violet,
            purple: colors.purple,
            fuchsia: colors.fuchsia,
            pink: colors.pink,
            rose: colors.rose,
            bgl: "#e8e8e8"
        },
        fontFamily: {
            sans: ['Graphic', 'sans-serif'],
            serif: ['Merryweather', 'serif'],
            fair: ['Playfair Display', 'serif'],
            work: ['Work Sans', 'sans-serif']
        }
    },
    plugins: [
        require('flowbite/plugin')
    ]
}
