import { PromptConfig } from "./types/prompt.types";

import fs from 'fs';
import path from 'path';

export default class PromptManager {

    private prompt: string;
    private config: { [key: string]: string } = {}

    constructor(
        config: PromptConfig
    ) {
        this.prompt = fs.readFileSync(path.resolve('prompts', config.promptFile), 'utf-8');
        this.config = JSON.parse(fs.readFileSync(path.resolve('configs', config.configFile), 'utf-8'));
    }

    public parse = () => {
        return this.prompt.replace(/{([^}]*)}/g,
            (match, key) => {
                const value = this.config[key];

                if (!value) {
                    return match;
                }

                return Array.isArray(value) ? value.join(', ') : value;
            })
    }
}