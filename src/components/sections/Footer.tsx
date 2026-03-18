export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] py-4 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-center text-xs text-[var(--text-dim)]/60">
        <span>&copy; {new Date().getFullYear()} Vistry Homes</span>
      </div>
    </footer>
  );
}
