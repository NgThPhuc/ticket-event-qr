import { Facebook, Instagram, Mail, MapPin, Phone, Ticket, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-700 font-sans border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Brand & Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Ticket className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-900">Ticket</span>
            </div>
            <p className="mb-6 text-slate-600 leading-relaxed">
              Your premier destination for tickets to concerts, sports, theater, and entertainment events.
            </p>
            <h4 className="font-semibold text-slate-900 mb-3">Stay Connected</h4>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 transition-all duration-300"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/all-events" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">Browse Events</a></li>
              <li><a href="/search?q=concerts" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">Concerts</a></li>
              <li><a href="/search?q=sports" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">Sports</a></li>
              <li><a href="/search?q=theater" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">Theater</a></li>
              <li><a href="/search?q=comedy" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">Comedy</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-5">Support</h4>
            <ul className="space-y-3">
              <li><a href="/help" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">Help Center</a></li>
              <li><a href="/contact" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">Contact Us</a></li>
              <li><a href="/refund-policy" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">Refund Policy</a></li>
              <li><a href="/terms" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="/privacy" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-5">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 shrink-0 text-blue-600" />
                <span className="text-slate-600">Hanoi, Vietnam</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 shrink-0 text-blue-600" />
                <a href="mailto:support@ticket.com" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">support@ticket.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 shrink-0 text-blue-600" />
                <a href="tel:0123456789" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">0123456789</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Ticket. All rights reserved.
          </p>
          <div className="flex gap-5 text-slate-500">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition-colors duration-300">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-600 transition-colors duration-300">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-blue-600 transition-colors duration-300">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

