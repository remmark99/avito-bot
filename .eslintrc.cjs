module.exports = {
    extends: ["airbnb", "airbnb/hooks", "prettier"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
            },
        ],
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": [2, { functions: "defaultArguments" }],
    },
};
