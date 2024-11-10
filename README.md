# Previsão do Tempo

Este projeto é uma aplicação web simples que permite ao usuário consultar a previsão do tempo atual e para os próximos 5 dias de uma cidade específica. A aplicação consome dados da [API OpenWeatherMap](https://openweathermap.org/) e exibe informações como temperatura máxima e mínima, condições climáticas (sol, nublado, chuva) e intensidade de chuva (leve, moderada, forte) em uma interface agradável e responsiva.

## Funcionalidades

- Busca de previsão do tempo por cidade.
- Exibe o clima atual com temperatura e ícone.
- Exibe a previsão para os próximos 5 dias:
  - Temperatura máxima e mínima.
  - Condição climática (Ensolarado, Nublado, Chuva).
  - Intensidade da chuva (leve, moderada, forte).
- Tratamento de erros:
  - Mensagens de erro para cidades não encontradas.
  - Mensagem de erro para falhas de conexão com a API.

## Pré-requisitos

- Uma conta no [OpenWeatherMap](https://openweathermap.org/) para obter uma chave de API.
- Navegador web para rodar a aplicação localmente.

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu_usuario/nome_do_repositorio.git
   cd nome_do_repositorio
   ```

2. Abra o arquivo `index.html` em um editor de código e insira sua chave de API OpenWeatherMap no script `script.js`, substituindo o valor de `apiKey` pela sua chave.

   ```javascript
   const apiKey = 'SUA_CHAVE_API'; // Substitua pela sua chave de API
   ```

3. Abra o arquivo `index.html` no navegador para visualizar a aplicação.

## Estrutura do Projeto

```
/teste-tecnico
├── index.html       # Estrutura HTML da página
├── styles.css        # Estilos CSS para o layout e aparência
└── script.js        # Lógica JavaScript para manipulação de API e DOM
```

### Explicação dos Arquivos

- `index.html`: Estrutura da página com os elementos para busca e exibição de resultados.
- `styles.css`: Define a aparência da aplicação, tornando-a responsiva e visualmente agradável.
- `script.js`: Manipula a busca da API e exibe os dados de previsão na página, tratando possíveis erros.

## Como Usar

1. Abra a aplicação no navegador.
2. Insira o nome da cidade para a qual deseja consultar a previsão do tempo e clique em "Buscar".
3. O clima atual será exibido, juntamente com a previsão dos próximos 5 dias, incluindo temperatura, condição climática e intensidade de chuva (se houver).

## Exemplo de Uso

1. **Busca por Cidade**: Insira "São Paulo" e pressione o botão "Buscar."
2. **Resultados**: A aplicação exibe:
   - Clima atual em São Paulo.
   - Previsão dos próximos 5 dias:
     - Temperatura máxima e mínima.
     - Condição climática, com ícones.
     - Intensidade de chuva (leve, moderada, forte), caso a previsão seja de chuva.

## Personalização

- **Estilos**: Você pode personalizar as cores e o layout editando o arquivo `style.css`.
- **Unidade de Temperatura**: A aplicação usa Celsius (`units=metric`). Para Fahrenheit, substitua `units=metric` por `units=imperial` nas URLs da API no arquivo `script.js`.


## Tecnologias Utilizadas

- **HTML**: Estrutura da interface.
- **CSS**: Estilização e responsividade.
- **JavaScript**: Manipulação de API, lógica da aplicação e interação com o DOM.
- **OpenWeatherMap API**: Fonte de dados para a previsão do tempo.

