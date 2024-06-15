// OBS: lembrar de importar o componente Perfil no arquivo principal App.jsx
import styles from './Perfil.module.css'

const Perfil = ({ nomeUsuario }) => {
    return (
        <header className={styles.header}>
            <img className={styles.avatar} src={`https://github.com/${nomeUsuario}.png`} />
            <h1 className={styles.name}>
                {nomeUsuario}
            </h1>
        </header>
    )
}

// Exportar a função
export default Perfil;