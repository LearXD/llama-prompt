# LLAMA Prompt
Um projeto feito para facilitar a criação de prompts

```bash
git clone https://github.com/LearXD/llama-prompt
cd llama-prompt

# Instalar dependências
npm install

# Transpilar o código
npm run build

# Rodar o projeto
# p: arquivo na pasta prompts contendo o prompt
# c: arquivo de configuração na pasta configs contendo as configurações do prompt
node . -p prompt.txt -c teste.json
```

## Prompt Global
O prompt global é chamado de `base.txt`, ele não tem suporte a configurações pois não é necessário. Coloque todo o contexto que quiser nele.

## Extras
Você pode testar o mesmo prompt com diferentes variações, basta criar um arquivo de configuração na pasta `configs` e rodar o comando com o arquivo de configuração desejado.

### Exemplo de Funcionamento
Caso você possua um arquivo variaveis.json na pasta configs com o seguinte conteúdo:
```json
{
  "nome": "Miguel",
  "idade": 18
}
```

E um arquivo prompt.txt na pasta prompts com o seguinte conteúdo:
```txt
Olá, meu nome é {nome} e tenho {idade} anos
```

Ao rodar o comando:
```bash
node . -p prompt.txt -c variaveis.json
```

O resultado será:
```
Olá, meu nome é Miguel e tenho 18 anos
```