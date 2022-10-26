import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './App.module.css'

interface Item {
  item: string | undefined
  index: number | undefined
}
interface SearchQuery {
  searchQuery: string | undefined
}

//save on local storage when items change

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [query, setQuery] = useState<SearchQuery>({ searchQuery: '' })
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('items')
    setItems(JSON.parse(saved || '[]'))
  }, [])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return item.item
        ?.toLowerCase()
        .includes(query.searchQuery?.toLowerCase() || '')
    })
  }, [items, query])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = inputRef.current?.value
    if (!value) return
    const newItem = {
      item: value,
      index: items.length,
    }
    setItems([...items, newItem])
    localStorage.setItem('items', JSON.stringify([...items, newItem]))

    if (null !== inputRef.current) {
      inputRef.current.value = ''
    }
  }
  function handleDeleteItem(index: number) {
    const updatedItems = items.filter((item) => item.index !== index)
    setItems(updatedItems)
    localStorage.setItem('items', JSON.stringify(updatedItems))
  }

  return (
    <>
      <article className={styles.card}>
        <h1 className={styles.title}>Lista de Compras</h1>
        <div className={styles.searchContainer}>
          <h3>Buscar:</h3>
          <input
            id="search"
            className={styles.searchBar}
            value={query.searchQuery}
            onChange={(e) => setQuery({ searchQuery: e.target.value })}
            type="search"
          />
        </div>
        <br />
        <br />
        <form onSubmit={onSubmit}>
          <h3>Novo Item: </h3>
          <input className={styles.inputItem} ref={inputRef} type="text" />
          <button className={styles.addBtn} type="submit">
            Adicionar
          </button>
        </form>
        <div className={styles.items}>
          <h3>Items:</h3>

          {items.length === 0 && <p>Nenhum item adicionado</p>}
          <ul>
            {filteredItems.map(({ item, index }) => (
              <li className={styles.item} key={index}>
                {item}
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteItem(index || 0)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </>
  )
}

export default App
