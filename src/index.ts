import { program } from 'commander';
import LLAMA from './services/llama';
import PromptManager from './utils/prompt';

import path from 'path'
import fs from 'fs'

program
    .version('0.0.1')
    .option('-p, --prompt <prompt>', 'Arquivo de prompt')
    .option('-c, --config <config>', 'Arquivo de configuração')
    .description('LLAMA CLI')
    .parse(process.argv);

const options = program.opts();

if (!options.prompt) {
    console.error('É necessário informar o arquivo de prompt!');
    process.exit(1);
}

if (!options.config) {
    console.error('É necessário informar o arquivo de configuração!');
    process.exit(1);
}

(async () => {
    const llama = new LLAMA({ url: 'http://127.0.0.1:8080' });

    const promptManager = new PromptManager({
        promptFile: options.prompt,
        configFile: options.config
    });

    const basePrompt = fs.readFileSync(path.resolve('prompts', 'base.txt'), 'utf-8');

    const prompt = basePrompt.replace('{PERGUNTA}', promptManager.parse());
    console.log(prompt)

    console.log('')
    for await (const chunk of llama.generate(prompt)) {
        process.stdout.write(chunk)
    }
})()
