module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {},
        colors: {
            primary: "#191c24",
            secondary: "#6c7293",
            lightPrimary: "#f5eec8be",
            lightSecondary:"#fefce8",
            bgButton: "#0f8f31",
            hoverButton: "#0e6726",
            nightSecondary: "#094418",
            buttonAction: '#f5eec8'
        },
        screens: {
            'tb': '640px',
            'dt': '1280px',
          },
    },
    plugins: [],
};
