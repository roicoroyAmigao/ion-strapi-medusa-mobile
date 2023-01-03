
export namespace ThemeActions {
    export class GetTheme {
        static readonly type = '[ThemeActions] Get User';
    }
    export class SetTheme {
        static readonly type = '[ThemeActions] Set Theme on State';
        constructor(public theme: any) { }
    }
    export class PostUpdateTheme {
        static readonly type = '[ThemeActions] Post Update Theme';
        // constructor(public id?: any, public theme?: any) { }
        constructor(public theme?: any) { }
    }
}
