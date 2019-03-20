export interface Toolbar {
    title: string;
    button: {
        icon: string;
        route: string;
    } | null;
}

export interface User {
    display_name: string | null;
    email: string | null;
}
