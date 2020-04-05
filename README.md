# **PGI-APP**
Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna - Plataforma de Gestão Interna  

**Versão Estável:** 0.1.0  
**Licensa:** Proprietário - Usu Privado  
Todos os direitos reservados - É estritamente proibida a cópia não autorizada de qualquer arquivo deste projeto, por qualquer meio..  

## **Definição do Projeto**
- **URL - Teste:** <http://staging.com.br>
- **URL - Produção:** <http://production.com.br>

## **Workflow do Projeto**
This workflow uses two branches to record the history of the project. The `master` branch stores the official release history, and the `develop` branch serves as an integration branch for features. It's also convenient to tag all commits in the master branch with a version number.

Each new feature should reside in its own branch. But, instead of branching off of `master`, feature branches use `develop` as their parent branch. When a feature is complete, it gets merged back into `develop`. Features should never interact directly with master.

## **Contributing**
1. [Fork it!](https://help.github.com/articles/fork-a-repo/)
2. [Configuring](https://help.github.com/articles/configuring-a-remote-for-a-fork/) a remote for a fork
3. [Syncing](https://help.github.com/articles/syncing-a-fork/) a fork with the latest version
4. Create your feature branch: `git checkout -b feature-123`
5. Commit your changes: `git commit -m 'Commit message'`
6. Push to the branch: `git push origin feature-123`
7. [Submit a pull request](https://help.github.com/articles/using-pull-requests/) :D

##### **Before commit, double check your code. Please dude.**
- Always check a branch that is being used: `git status`
- Execute a `git pull` to keep your checkout up-to-date
- Invoke a `git diff --cached` before committing
- **NOT COMMIT BEFORE RUNNING THE PROJECT LOCALLY AND SEE THE CHANGES RUNNING**
- **MAKE SURE THE CHANGES WORK**

> **[Here is a quick guide to git command](https://gist.github.com/leocomelli/2545add34e4fec21ec16)**

## **Método de Deploy**  
This project uses automated deployment using the git and [Buddy Works](https://app.buddy.works) tools.

### Credenciais de Deploy:
- **Deploybot URL:** [Account Buddy Works](DeployCustomURL)  
- **Usuário:** DeployUser  

## **Changelog**  
= **0.1.0 - 12/04/2020** =  
Scaffolding do Projeto

= **0.0.1 - 04/04/2020** =  
Scaffolding do Projeto  
