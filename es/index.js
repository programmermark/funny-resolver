export function kebabCase(key) {
    const result = key.replace(/([A-Z])/g, " $1").trim();
    return result.split(" ").join("-").toLowerCase();
}
const facFunctions = [
// "Snackbar",
// "Picker",
// "ActionSheet",
// "Dialog",
// "Locale",
// "StyleProvider",
];
const facDirectives = ["Ripple"];
export function getResolved(name, options) {
    const { importStyle = "css", importCss = true, importLess, autoImport = false, } = options;
    const path = "funny-ui";
    const sideEffects = [];
    if (importStyle || importCss) {
        if (importStyle === "less" || importLess)
            sideEffects.push(`${path}/es/${kebabCase(name)}/style/less.js`);
        else
            sideEffects.push(`${path}/es/${kebabCase(name)}/style`);
    }
    return {
        from: path,
        name: autoImport ? name : `_${name}Component`,
        sideEffects,
    };
}
/**
 * Resolver for Funny UI
 *
 * @link https://github.com/programmermark/funny-ui
 */
export function FunnyUIResolver(options = {}) {
    return [
        {
            type: "component",
            resolve: (name) => {
                const { autoImport = false } = options;
                if (autoImport && facFunctions.includes(name))
                    return getResolved(name, options);
                if (name.startsWith("Fac"))
                    return getResolved(name.slice(3), options);
            },
        },
        {
            type: "directive",
            resolve: (name) => {
                const { directives = true } = options;
                if (!directives)
                    return;
                if (!facDirectives.includes(name))
                    return;
                return getResolved(name, options);
            },
        },
    ];
}
