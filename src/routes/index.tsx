import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gradient-primary)] text-3xl shadow-[var(--shadow-glow)]">
            🔧
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            أهلاً يا هندسة <span className="inline-block">👋</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
            حابب تعمل إيه النهاردة؟
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/measurements"
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] sm:p-8"
          >
            <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-0 transition group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl text-primary group-hover:bg-white/20 group-hover:text-white">
                📐
              </div>
              <h2 className="text-2xl font-extrabold text-foreground group-hover:text-primary-foreground">
                تجميع المقاسات
              </h2>
              <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                أضف مقاسات الشبابيك واحسب المساحة الإجمالية والسعر النهائي.
              </p>
            </div>
          </Link>

          <Link
            to="/cutting"
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] sm:p-8"
          >
            <div className="absolute inset-0 bg-[var(--gradient-steel)] opacity-0 transition group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-aluminum-dark/10 text-3xl text-aluminum-dark group-hover:bg-white/20 group-hover:text-white">
                ✂️
              </div>
              <h2 className="text-2xl font-extrabold text-foreground group-hover:text-primary-foreground">
                التخصيمات
              </h2>
              <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                احسب أبعاد قطع الألوميتال للحلق والشبك والزجاز حسب نوع القطاع.
              </p>
            </div>
          </Link>
        </div>
      </main>

      <footer className="mx-auto max-w-4xl px-4 pb-8 pt-4 text-center text-sm text-muted-foreground">
        ❤ Created by <span className="font-bold text-foreground">Anton Hany ❤</span>
      </footer>
    </div>
  );
}
