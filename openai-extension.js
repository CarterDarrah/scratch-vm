const fetch = require('node-fetch');

class OpenAIExtension {
    getInfo() {
        return {
            id: 'openaiExtension',
            name: 'OpenAI',
            blocks: [
                {
                    opcode: 'callGPT4',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'call GPT-4 with [TEXT]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello, GPT-4!'
                        }
                    }
                }
            ]
        };
    }

    async callGPT4(args) {
        const response = await fetch('https://api.openai.com/v1/engines/gpt-4/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({
                prompt: args.TEXT,
                max_tokens: 50
            })
        });

        const data = await response.json();
        return data.choices[0].text.trim();
    }
}

Scratch.extensions.register(new OpenAIExtension());
