import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-bold tracking-tight text-foreground block mb-4" data-testid="footer-logo">
            timetablr<span className="text-primary">.</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed">
            Turning the chaos of class scheduling, attendance, and timetable planning into something calm, clear, and effortless.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-4">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-primary transition-colors" data-testid="footer-link-about">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors" data-testid="footer-link-contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-4">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/privacy" className="hover:text-primary transition-colors" data-testid="footer-link-privacy">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors" data-testid="footer-link-terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} Timetablr Inc. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex gap-5">
          <a href="#" className="hover:text-primary transition-colors" data-testid="footer-twitter">Twitter</a>
          <a href="#" className="hover:text-primary transition-colors" data-testid="footer-linkedin">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors" data-testid="footer-github">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
