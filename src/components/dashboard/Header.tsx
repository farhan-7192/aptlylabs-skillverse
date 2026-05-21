function Header() {
  return (
    <div className="sticky top-0 z-10 border-b border-rose-100 bg-white/70 px-8 py-6 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-medium uppercase tracking- text-pink-300">
          Welcome back to
        </p>
        <h1
          className="text-6xl text-pink-600"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontWeight: 100,
          }}
        >
          Pastel
        </h1>
      </div>
    </div>
  )
}

export default Header
