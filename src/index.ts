import type { ComponentResolveResult, ComponentResolver } from "./types";

export interface FunnnyUIResolverOptions {
  /**
   * support vue version
   * vue3 use funny-ui
   *
   * @default 'vue3'
   */
  version?: "vue3";

  /**
   * import style along with components
   *
   * @default 'css'
   */
  importStyle?: boolean | "css" | "less";

  /**
   * auto import for directives
   *
   * @default true
   */
  directives?: boolean;

  /**
   * compatible with unplugin-auto-import
   *
   * @default false
   */
  autoImport?: boolean;

  /**
   * @deprecated use `importStyle: 'css'` instead
   */
  importCss?: boolean;

  /**
   * @deprecated use `importStyle: 'less'` instead
   */
  importLess?: boolean;
}

export function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, " $1").trim();
  return result.split(" ").join("-").toLowerCase();
}

const facFunctions: string[] = [
  // "Snackbar",
  // "Picker",
  // "ActionSheet",
  // "Dialog",
  // "Locale",
  // "StyleProvider",
];
const facDirectives = ["Ripple"];

export function getResolved(
  name: string,
  options: FunnnyUIResolverOptions
): ComponentResolveResult {
  const {
    importStyle = "css",
    importCss = true,
    importLess,
    autoImport = false,
  } = options;

  const path = "funny-ui";
  const sideEffects = [];

  if (importStyle || importCss) {
    if (importStyle === "less" || importLess)
      sideEffects.push(`${path}/es/${kebabCase(name)}/style/less.js`);
    else sideEffects.push(`${path}/es/${kebabCase(name)}/style`);
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
export function FunnyUIResolver(
  options: FunnnyUIResolverOptions = {}
): ComponentResolver[] {
  return [
    {
      type: "component",
      resolve: (name: string) => {
        const { autoImport = false } = options;

        if (autoImport && facFunctions.includes(name))
          return getResolved(name, options);

        if (name.startsWith("Fac")) return getResolved(name.slice(3), options);
      },
    },
    {
      type: "directive",
      resolve: (name: string) => {
        const { directives = true } = options;

        if (!directives) return;

        if (!facDirectives.includes(name)) return;

        return getResolved(name, options);
      },
    },
  ];
}
