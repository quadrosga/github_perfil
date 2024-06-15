import { useState, useEffect } from "react";

const Formulario = () => {
    // estados:
    const [materiaA, setMateriaA] = useState(0);
    const [materiaB, setMateriaB] = useState(0);
    const [materiaC, setMateriaC] = useState(0);
    const [nome, setNome] = useState('');

    // Para executar o useEffect apenas qndo o componente for iniciado->
    // após o bloco }, usa a virgula seguida de array vazio
    useEffect(() => {
        console.log('o componente iniciou');
        
        // para executar uma função qndo o componente for finilizado:
        return () => {
            console.log('o componente finilizou')
        }
    }, []);

    // Para executar o useEffect apenas qndo houver mudanças em caso especifico->
    // após o bloco }, usa a virgula seguida de array contendo os casos (lista de dependências)
    useEffect(() => {
        console.log('o estado nome mudou')
    }, [nome]);
    // só executará a função useEffect qndo houver mudança no campo nome
    
    const alteraNome = (evento) => {
        setNome(estadoAnterior => {

            return evento.target.value;
        })
    }
    
    const renderizaResultado = () => {
        const soma = materiaA + materiaB + materiaC;
        const media = soma / 3;

        if (media >= 7) {
            return (
                <p>{nome} foi aprovado</p>
            )
        } else {
            return (
                <p>{nome} não foi aprovado</p>
            )
        }
    }

    return (
        <form>
            {/* /* obs: todo conteúdo dentro de {} é JavaScript */}
            {/* criando um array ara renderizar os elementos em li */}
            {/* cada child da lista deve receber uma propriedade key, que deve ser única */}
            <ul>
                {[1,2,3,4,5].map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <input type="text" placeholder="Seu nome" onChange={alteraNome} />
            <input type="number" placeholder="Nota matéria A" onChange={evento => setMateriaA(parseInt(evento.target.value))} />
            <input type="number" placeholder="Nota matéria B" onChange={evento => setMateriaB(parseInt(evento.target.value))} />
            <input type="number" placeholder="Nota matéria C" onChange={evento => setMateriaC(parseInt(evento.target.value))} />
            {renderizaResultado()}
        </form>
    )
}

export default Formulario;

// ciclo de vida no react:
// mount
// update
// onmount