/**
 * Promise, or maybe not
 */
export declare type Awaitable<T> = T | PromiseLike<T>;
export interface ImportInfo {
    as?: string;
    name?: string;
    from: string;
}
export declare type SideEffectsInfo = (ImportInfo | string)[] | ImportInfo | string | undefined;
export interface ComponentInfo extends ImportInfo {
    sideEffects?: SideEffectsInfo;
}
export declare type ComponentResolveResult = Awaitable<string | ComponentInfo | null | undefined | void>;
export declare type ComponentResolverFunction = (name: string) => ComponentResolveResult;
export interface ComponentResolverObject {
    type: "component" | "directive";
    resolve: ComponentResolverFunction;
}
export declare type ComponentResolver = ComponentResolverFunction | ComponentResolverObject;
