# Boas práticas de desenvolvimento

Este guia define uma base de trabalho para o Tabularium. Ele deve evoluir junto com a arquitetura, a stack e as necessidades do produto.

## 1. Comece pelo problema

- Registre o problema, o público e o resultado esperado antes da implementação.
- Transforme requisitos grandes em entregas pequenas, verificáveis e priorizadas.
- Defina critérios de aceitação objetivos para cada funcionalidade.
- Documente decisões arquiteturais importantes e seus motivos.

## 2. Mantenha o repositório compreensível

- Atualize o `README.md` sempre que instalação, comandos, configuração ou comportamento mudarem.
- Declare e fixe as dependências nos manifestos e lockfiles da stack; não dependa de pacotes instalados globalmente.
- Organize o código por responsabilidades, com nomes claros e baixo acoplamento.
- Prefira configurações explícitas e mantenha um `.env.example` sem valores secretos.
- Não versione artefatos gerados, caches, dependências instaladas ou configurações pessoais.

## 3. Trabalhe com branches e revisão

- Preserve `main` como uma linha estável e use branches curtas para funcionalidades e correções.
- Abra pull requests pequenos, com contexto, escopo, riscos e instruções de validação.
- Exija testes e checks obrigatórios antes do merge quando a automação estiver disponível.
- Resolva os comentários da revisão e evite misturar refatorações sem relação com a entrega.
- Proteja a branch principal contra exclusão, force push e merges sem checks.

Sugestão de nomes:

```text
feat/nome-curto
fix/nome-curto
docs/nome-curto
refactor/nome-curto
```

## 4. Escreva commits claros

Use commits pequenos, autocontidos e no imperativo. O formato de Conventional Commits facilita leitura, changelogs e automação:

```text
<tipo>(<escopo opcional>): <descrição>
```

Tipos comuns:

- `feat`: nova funcionalidade.
- `fix`: correção de defeito.
- `docs`: documentação.
- `test`: testes.
- `refactor`: mudança interna sem alterar o comportamento esperado.
- `chore`: manutenção e ferramentas.
- `ci`: integração e entrega contínuas.

Exemplo: `feat(auth): adiciona recuperação de senha`.

## 5. Garanta a qualidade com automação

- Use um formatador e um linter reproduzíveis para toda a equipe.
- Cubra regras de negócio com testes unitários e fluxos críticos com testes de integração ou ponta a ponta.
- Todo bug corrigido deve receber um teste de regressão quando viável.
- Execute formatação, análise estática, testes e build na integração contínua.
- Não use apenas percentual de cobertura como medida de qualidade; valide cenários e comportamento.

## 6. Desenvolva com segurança

- Nunca grave senhas, tokens, chaves ou credenciais no código ou no histórico Git.
- Valide no servidor todos os dados vindos de fontes não confiáveis, preferindo listas de valores permitidos.
- Use consultas parametrizadas e codificação de saída adequada ao contexto.
- Aplique autenticação e autorização no servidor e conceda apenas as permissões necessárias.
- Mantenha dependências atualizadas e habilite alertas, revisão de dependências, code scanning e secret scanning.
- Não registre dados sensíveis em logs; rotacione imediatamente qualquer segredo exposto.

## 7. Separe código e configuração

- Armazene configurações variáveis entre ambientes em variáveis de ambiente ou em um gerenciador de segredos.
- Mantenha desenvolvimento, homologação e produção tão semelhantes quanto possível.
- Separe as etapas de build, release e execução.
- Produza logs estruturados como fluxo de eventos e inclua contexto suficiente para diagnóstico, sem dados confidenciais.
- Planeje inicialização rápida e encerramento gracioso para serviços.

## 8. Versione e publique de forma previsível

Quando houver uma API pública e releases, use Versionamento Semântico no formato `MAJOR.MINOR.PATCH`:

- `MAJOR`: mudança incompatível.
- `MINOR`: funcionalidade compatível.
- `PATCH`: correção compatível.

Não altere uma versão já publicada. Registre mudanças relevantes em um changelog e marque releases com tags Git.

## 9. Definição de pronto

Uma mudança está pronta quando:

- [ ] Atende aos critérios de aceitação.
- [ ] Tem implementação simples e legível.
- [ ] Inclui testes adequados e todos os checks passam.
- [ ] Não introduz segredos nem vulnerabilidades conhecidas.
- [ ] Atualiza a documentação relevante.
- [ ] Foi revisada e pode ser revertida ou implantada com segurança.

## Referências

- [GitHub Docs — Best practices for repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories)
- [GitHub Docs — Managing and standardizing pull requests](https://docs.github.com/en/pull-requests/reference/managing-and-standardizing-pull-requests)
- [GitHub Docs — Continuous integration](https://docs.github.com/en/actions/get-started/continuous-integration)
- [The Twelve-Factor App](https://12factor.net/)
- [OWASP Secure Coding Practices Checklist](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist)
- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/pt-br/v1.0.0/)
- [Semantic Versioning 2.0.0](https://semver.org/lang/pt-BR/)

