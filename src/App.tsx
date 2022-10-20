import { useRef, useState } from 'react'

interface Item {
  item: string | undefined
}
interface SearchQuery {
  value: string
}
function App() {
  const [items, setItems] = useState<Item[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

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
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
      />
      <br />
      <br />
      <form onSubmit={onSubmit}>
        New Item: <input ref={inputRef} type="text" />
        <button type="submit">Add</button>
      </form>
      <h3>Items:</h3>
      {items.map(({ item }) => (
        <div key={item}>{item}</div>
      ))}
    </>
  )
}

export default App
