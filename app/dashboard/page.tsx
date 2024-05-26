export default function Page() {
    const integrantes = ["Haroldy", "Cristian", "Isael"]

    return (
        <main>
            <p>mai</p>

            <h3>Integrantes:</h3>

            <ul>
                {integrantes.map((persona, id) => {
                    return (<li key={id}>{persona}</li>)
                })}
            </ul>
        </main>
    )
}