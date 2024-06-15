import { useState } from "react";

import Perfil from "./components/Perfil";
import Formulario from "./components/Formulario";
import ReposList from "./components/ReposList";

function App() {
  // criando um novo estado (const) para aplicar boolean à exibição do formulário
  const [formularioEstaVisivel, setFormularioEstaVisivel] = useState(true);
  // criando novo estado para tornar dinâmica a mudança do nomeUsuario
  const [nomeUsuario, setNomeUsuario] = useState('');

  return (
    <>
    {/* criando input para inserir nome de usuário. onBlur faz requizição qndo o usuário sai do campo */}
      <input type="text" onBlur={(e) => setNomeUsuario(e.target.value)} />

      {nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario}/>
          <ReposList nomeUsuario={nomeUsuario}/>
        </>
      )}
      
      {/* {formularioEstaVisivel && (
        <Formulario />
      )}

      <button onClick={() => setFormularioEstaVisivel(!formularioEstaVisivel)} type="button">toggle form</button> */}
    </>
  )
}

export default App
