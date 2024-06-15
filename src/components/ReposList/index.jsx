import { useEffect, useState } from "react";

import styles from './ReposList.module.css';

// criando o state para armazenar a lista de repos
// desestruturar o useState -> [repos,setRepos] = useState()
// useState recebe inicialmente um array vazio [] como argumento
const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    // extra: criando um estate para estaCarregando com valor incial true
    const [estaCarregando, setEstaCarregando] = useState(true);
    
// em seguida, criar o useEffect (uma função, que recebe uma função imperativa, no caso, arrow function)
// o useEffect será chamado qndo o componente for montado, logo o segundo argumento é um array (inicialmente vazio, mas depois recebe o parâmetro dinâmico)
// dentro do bloco da array function, passar o fetch (faz a requisição da api). o fetch recebe a url da API
// acrescentar o .then para atrelar um callback da promise, aplicando "json()" à resposta
// OBS: json() é um método da interface "response" que pega um fluxo de responce e o lê até o fim.
// ele retorna uma "promise", que resulta na análise do corpo como JSON
// OBS: "response" é o objeto resposta da requisição fetch
// em seguida, mais um .then para adicionar a resJson dentro do useState repos
// obs: resJson é a lista de repositórios extraídos da api. 
    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => res.json())
        .then(resJson => {
            // extra: criando timeout para renderizar mensagem "carregando..." durante carregamento do componente
            // após 3seg, roda setRepos e setEstaCarregando não é mais true (terminou de carregar)
            setTimeout(() => {
                setEstaCarregando(false);
                setRepos(resJson);
            }, 3000)
        })
    }, [nomeUsuario]);

// agora, no return do useEffect, aplicamos .map ao arrey "repos", passando o parâmetro
// "repositorio", que aplicará a estrutura <li> para cada item mapeado dentro de "repos"
// como cada item do array foi titulado "repositorio", podemos acessar as propridades dos repositórios
// dentro da API com "repositorio.propriedade", de forma a renderizar uma lista dinâmica
// obs: lembrando que para preencher um conteúdo do HTML com um item dinâmico, usa-se {}, por regra do JSX
// obs2: "target" é uma propriedade que retorna o node no qual o evento ocorreu.
// "_blank" é um valor de target que abre links em uma nova janela
// obs3: qndo renderizando uma lista em React, deve-se adicionar uma key prop para cada elemento (no caso, cada <li>).
// keys devem ser unicas para cada elemento. no caso, cada repositório tem um número de ID na API,
// logo, podemos atribuir "repositorio.id" na prop key dentro da tag <li>
    return (
        <div className="container">
        {/* o texto Carregando... só renderiza se estaCarregando for true, caso contrário renderiza a ul */}
        {estaCarregando ? (
            <h1>Carregando...</h1>
        ) : (
        <ul className={styles.list}>
            {repos.map(({ id, name, language, html_url }) => (
                <li className={styles.listItem} key={id}>
                    <div className={styles.itemName}>
                        <b>Nome:</b> 
                        {name}
                    </div>
                    <div className={styles.itemLanguage}>
                        <b>Linguagem:</b> 
                        {language}
                    </div>
                    <a className={styles.itemLink} target="_blank" href={html_url}>Visitar no Github</a>
                </li>
            ))}
        </ul>
        )}
        </div>
    )
}
// OBS: pode-se fazer o mesmo de forma etruturada (mais longa):
        {/* <ul>
            {repos.map(repositorio) => (
                <li key={repositorio.id}>
                    <b>Nome:</b> {repositorio.name} <br />
                    <b>Linguagem:</b> {repositorio.language} <br />
                    <a target="_blank" href={repositorio.html_url}>Visitar no Github</a>
                </li>
            ))}
        </ul> */}

// resumo: diz pro React que, assim que montar meu componente, vá lá no github (API linkada),
// pega a lista de repositórios, preenche o estado de repositórios com o conteúdo de requisição (dados da API)
// DENTRO DO BLOCO RETURN (parte que constroi o html):
// ao identificar a mudança do estado, aplicar o repos.map e redenrizar a lista como determinado
export default ReposList;