export interface LLAMAConfig {
    url: string;
}

export interface ServerResponse {
    content: string;
    stop: boolean;
    id_slot: number;
    multimodal: boolean;
}