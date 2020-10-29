import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data)
    })
  }, [])
  async function handleAddRepository() {
    const res = await api.post('repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Umbriel",
      techs: ["Node", "Express", "TypeScript"]
    })
    const repository = res.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((items =>
          (
            <li>
              <li key={items.id}>{items.title}</li>
              <li>{items.url}</li>
              <li>{items.techs}</li>
              <button onClick={() => handleRemoveRepository(items.id)}>
                Remover
          </button>
            </li>
          )
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
