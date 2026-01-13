"use client";

export default function Footer() {
  return (
    <footer className="bg-[var(--navy-light)] text-white py-12 px-6 border-t border-[var(--slate)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold mb-2">Vistry Homes</div>
            <p className="text-[var(--text-muted)] text-sm">
              Building communities, creating homes
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <a
              href="/privacy-policy"
              className="text-[var(--text-muted)] hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#support-form"
              className="bg-[var(--teal)] text-[var(--navy)] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[var(--teal-light)] transition-colors"
            >
              Register Support
            </a>
          </div>
        </div>

        <div className="border-t border-[var(--slate)] mt-8 pt-8 text-center">
          <p className="text-[var(--text-dim)] text-sm">
            © 2025 Vistry Homes – Website by SEC Newgate
          </p>
        </div>
      </div>
    </footer>
  );
}
