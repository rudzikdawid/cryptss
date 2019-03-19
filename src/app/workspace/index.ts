export interface Toolbar {
    title: string;
    button: {
        icon: string;
        route: string;
    } | null;
}
