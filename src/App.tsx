import { useMemo, useRef, useState } from 'react'
import styles from './App.module.css'

interface Item {
  item: string | undefined
}
interface SearchQuery {
  searchQuery: string | undefined
}
function App() {
  const [items, setItems] = useState<Item[]>([])
  const [query, setQuery] = useState<SearchQuery>({ searchQuery: '' })
  const inputRef = useRef<HTMLInputElement | null>(null)

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
    setItems((prev) => [...prev, { item: value }])
    if (null !== inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <>
      <article className={styles.card}>
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
          <button type="submit">Adicionar</button>
        </form>
        <div className={styles.items}>
          <h3>Items:</h3>
          {filteredItems.map(({ item }) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </article>
    </>
  )
}

export default App
