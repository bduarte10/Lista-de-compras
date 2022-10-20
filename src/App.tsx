import { useMemo, useRef, useState } from 'react'

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
      Search
      <input
        value={query.searchQuery}
        onChange={(e) => setQuery({ searchQuery: e.target.value })}
        type="search"
      />
      <br />
      <br />
      <form onSubmit={onSubmit}>
        New Item: <input ref={inputRef} type="text" />
        <button type="submit">Add</button>
      </form>
      <h3>Items:</h3>
      {filteredItems.map(({ item }) => (
        <div key={item}>{item}</div>
      ))}
    </>
  )
}

export default App
