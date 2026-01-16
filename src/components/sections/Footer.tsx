export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] py-4 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-xs text-[var(--text-dim)]">
        <span>&copy; {new Date().getFullYear()} Vistry Homes</span>
        <span>|</span>
        <a
          href="https://www.vistryhookwood.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--teal)] transition-colors"
        >
          vistryhookwood.co.uk
        </a>
      </div>
    </footer>
  );
}
