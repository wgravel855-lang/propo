const brands = ["Northwind", "Lumen Goods", "Harbor & Co", "Driftwear", "Pinecrest", "Vela"]

export function LogoCloud() {
  return (
    <section className="border-y border-border px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by operators at fast-growing ecommerce brands
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {brands.map((b) => (
            <span
              key={b}
              className="text-lg font-semibold tracking-tight text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
