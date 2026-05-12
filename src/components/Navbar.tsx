import { Link } from "@tanstack/react-router";


export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--gradient-primary)] text-primary-foreground font-bold shadow-[var(--shadow-glow)]">
            <img src="./icon-192.png"></img>
          </div>
          <span className="text-base font-bold text-foreground">حاسبة الألوميتال</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/measurements"
            className="rounded-md px-3 py-1.5 font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&[data-status=active]]:bg-primary [&[data-status=active]]:text-primary-foreground"
          >
            المقاسات
          </Link>
          <Link
            to="/cutting"
            className="rounded-md px-3 py-1.5 font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&[data-status=active]]:bg-primary [&[data-status=active]]:text-primary-foreground"
          >
            التخصيمات
          </Link>
        </nav>
      </div>
    </header>
  );
}