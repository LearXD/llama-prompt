import { LLAMAConfig, ServerResponse } from "./types/llama.types";

export default class LLAMA {

    private static config: LLAMAConfig;

    constructor(
        config: LLAMAConfig
    ) {
        LLAMA.config = config;
    }

    public static decode = function (data: Uint8Array): ServerResponse {
        const decoded = new TextDecoder().decode(data);
        try {
            if (decoded.startsWith('data: ')) {
                return (JSON.parse(decoded.replace('data: ', ''))) as ServerResponse;
            }
            return JSON.parse(decoded);
        } catch (e) {
            return {} as ServerResponse
        }
    }

    public generate = async function* (
        prompt: string,
        controller: AbortController = new AbortController()
    ) {

        const response = await fetch(
            `${LLAMA.config.url}/completion`,
            {
                method: 'POST',
                body: JSON.stringify({
                    stream: true,
                    n_predict: 500,
                    temperature: 0.2,
                    stop: ["</s>"],
                    prompt
                }),
                headers: {
                    'Connection': 'keep-alive',
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream'
                },
                signal: controller.signal,
            }
        );

        const reader = response.body.getReader();
        let content = "";

        try {
            let cont = true;

            while (cont) {
                const result = await reader.read();
                if (result.done) {
                    break;
                }

                const decoded = LLAMA.decode(result.value);

                if (decoded.stop) {
                    cont = false;
                    break;
                }

                content += decoded.content;
                yield decoded.content;
            }
        } catch (e) {
            throw e;
        }
        finally {
            controller.abort();
        }

        return content;
    }
}