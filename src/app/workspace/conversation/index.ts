export interface Conversation {
    uuid: string | null
    name: string
    last_activity: number | null
    last_message: string | null
}