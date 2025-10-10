import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Ticket</h3>
            <p className="text-gray-400 mb-6">
              Your premier destination for tickets to concerts, sports, theater, and entertainment events.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 text-slate-200 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 text-slate-200 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 text-slate-200 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/all-events" className="text-gray-400 hover:text-white transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/search?q=concerts" className="text-gray-400 hover:text-white transition-colors">
                  Concerts
                </Link>
              </li>
              <li>
                <Link href="/search?q=sports" className="text-gray-400 hover:text-white transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/search?q=theater" className="text-gray-400 hover:text-white transition-colors">
                  Theater
                </Link>
              </li>
              <li>
                <Link href="/search?q=comedy" className="text-gray-400 hover:text-white transition-colors">
                  Comedy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Get notified about new events and exclusive offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="w-full bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <a
              href="mailto:support@ticket.com"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>support@ticket.com</span>
            </a>
            <a
              href="tel:1-800-842-5387"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>0123456789</span>
            </a>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>Ha Noi, Viet Nam</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            © 2025 Ticket. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}