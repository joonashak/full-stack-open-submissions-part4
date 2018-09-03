module.exports = {
    "extends": "airbnb-base",
    "env": {
        "jest": true,
    },
    "rules": {
        "no-underscore-dangle": [
            "error",
            {
                "allow": ["_id"],
            },
        ],
    },
};