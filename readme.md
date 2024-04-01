# LLAMA Prompt
Um projeto feito para facilitar a criação de prompts

## Requisitos
Para rodar o projeto é necessário possuir um servidor LLAMA.cpp rodando localmente. Siga os passos abaixo:

### Preparando ambiente no Linux
Para configurar no LINUX siga o tutorial abaixo:
```bash
# Clone o repositorio do llama cpp	
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp

# Realize a build com o CMake
make

# Execute o servidor
./server -m ./models/llama-2-7b-chat.Q5_K_M.gguf -c 2048
```

### Preparando ambiente no Windows
Para Windos recomendo usar o [clblast](https://github.com/ggerganov/llama.cpp/releases/download/b2581/llama-b2581-bin-win-clblast-x64.zip). Baixe e extraia o arquivo baixado, e siga os passos abaixo:

```bash
# Entre na pasta baixada do clblast
...

# Abra o terminal (NA PASTA) e execute o comando
server.exe -m .\models\llama-2-7b-chat.Q5_K_M.gguf -c 2048
```

### Inserindo modelo generativo
Para inserir um modelo generativo, basta baixar o modelo na seguinte [pasta do drive](https://drive.google.com/file/d/1-4s0l3PEe2PXXWktnMMZnIlgl4rQDqzj/view?usp=sharing), e insira o arquivo baixado em uma pasta chamada `models` na pasta do llama.cpp.

## Instalação
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