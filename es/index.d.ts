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
export declare function kebabCase(key: string): string;
export declare function getResolved(name: string, options: FunnnyUIResolverOptions): ComponentResolveResult;
/**
 * Resolver for Funny UI
 *
 * @link https://github.com/programmermark/funny-ui
 */
export declare function FunnyUIResolver(options?: FunnnyUIResolverOptions): ComponentResolver[];
