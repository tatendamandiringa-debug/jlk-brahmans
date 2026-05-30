import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Search, 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone,
  MapPin,
  ArrowRight,
  Play,
  FileText,
  Dna,
  Filter,
  Download,
  ExternalLink,
  Globe,
  Plus,
  Trash2,
  Edit3,
  LogOut,
  LogIn,
  Youtube,
  Award,
  ChevronUp,
  Music,
  Quote,
  Trophy,
  Target,
  Star,
  BookOpen,
  Briefcase,
  FileBadge,
  Newspaper,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { collection, query, onSnapshot, orderBy, limit, where, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { cn, formatDate } from './lib/utils';

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[60] p-4 bg-brand-red text-white rounded-full shadow-2xl hover:bg-brand-maroon transition-colors group"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.08z"></path>
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Sires', path: '/sires' },
    { name: 'Champions', path: '/champions' },
    { name: 'Juniors', path: '/juniors' },
    { name: 'News', path: '/news' },
    { name: 'Genetics', path: '/genetics' },
    { name: 'Sale', path: '/sale' },
  ];

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const isHome = location.pathname === '/';
  const isScrolledOrSubpage = scrolled || !isHome;

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500",
      isScrolledOrSubpage ? "glass-nav py-3 shadow-sm" : "bg-transparent py-8"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative w-30 h-30 overflow-hidden transition-all group-hover:border-brand-maroon group-hover:scale-110">
            <img 
              src="/logo.png" 
              alt="JLK Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className={cn(
            "hidden lg:block font-serif text-lg tracking-[0.2em] uppercase font-bold transition-colors",
            isScrolledOrSubpage ? "text-brand-dark" : "text-white"
          )}>
            JLK Brahmans
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={cn(
                "text-[10px] uppercase tracking-[0.25em] font-display font-bold transition-all hover:text-brand-maroon relative group",
                location.pathname === link.path 
                  ? "text-brand-maroon" 
                  : isScrolledOrSubpage ? "text-brand-dark/70" : "text-white/80"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-maroon transition-all duration-300 group-hover:w-full",
                location.pathname === link.path ? "w-full" : ""
              )} />
            </Link>
          ))}
          {/* Desktop Social Icons */}
          <div className={`flex items-center gap-4 ml-2 pl-6 border-l ${isScrolledOrSubpage ? 'border-brand-maroon/20' : 'border-white/20'}`}>
            <a href="https://www.facebook.com/jlkbrahmans" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={cn('relative group transition-colors hover:text-brand-maroon', isScrolledOrSubpage ? 'text-brand-dark/70' : 'text-white/80')}>
              <Facebook className="w-4 h-4" />
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-maroon transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="https://www.youtube.com/@jlkbrahmans" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={cn('relative group transition-colors hover:text-brand-maroon', isScrolledOrSubpage ? 'text-brand-dark/70' : 'text-white/80')}>
              <Youtube className="w-4 h-4" />
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-maroon transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="https://www.instagram.com/jlkbrahmans/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={cn('relative group transition-colors hover:text-brand-maroon', isScrolledOrSubpage ? 'text-brand-dark/70' : 'text-white/80')}>
              <Instagram className="w-4 h-4" />
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-maroon transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link to="/admin" className="text-[10px] uppercase tracking-widest font-display font-bold text-brand-maroon bg-brand-maroon/5 px-4 py-2 rounded-full hover:bg-brand-maroon/10 transition-colors">Admin</Link>
              <button onClick={handleLogout} className="text-brand-gray hover:text-brand-maroon transition-colors p-2 rounded-full hover:bg-brand-maroon/5"><LogOut className="w-4 h-4" /></button>
            </div>
          ) : null}
        </div>

        {/* Mobile Social Icons + Toggle */}
        <div className="xl:hidden flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/jlkbrahmans" target="_blank" rel="noopener noreferrer" className={isScrolledOrSubpage ? 'text-brand-maroon hover:text-brand-red transition-colors' : 'text-white/80 hover:text-white transition-colors'} aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/@jlkbrahmans" target="_blank" rel="noopener noreferrer" className={isScrolledOrSubpage ? 'text-brand-maroon hover:text-brand-red transition-colors' : 'text-white/80 hover:text-white transition-colors'} aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/jlkbrahmans/" target="_blank" rel="noopener noreferrer" className={isScrolledOrSubpage ? 'text-brand-maroon hover:text-brand-red transition-colors' : 'text-white/80 hover:text-white transition-colors'} aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.tiktok.com/@jlkbrahmanszw" target="_blank" rel="noopener noreferrer" className={isScrolledOrSubpage ? 'text-brand-maroon hover:text-brand-red transition-colors' : 'text-white/80 hover:text-white transition-colors'} aria-label="TikTok">
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a href="https://x.com/jlkbrahmans" target="_blank" rel="noopener noreferrer" className={isScrolledOrSubpage ? 'text-brand-maroon hover:text-brand-red transition-colors' : 'text-white/80 hover:text-white transition-colors'} aria-label="X (Twitter)">
              <XIcon className="w-4 h-4" />
            </a>
          </div>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className={isScrolledOrSubpage ? 'text-brand-dark' : 'text-white'} /> : <Menu className={isScrolledOrSubpage ? 'text-brand-dark' : 'text-white'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] xl:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 bg-white z-[60] p-8 flex flex-col xl:hidden shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10 shrink-0">
                <div className="font-serif text-xl font-bold text-brand-maroon">JLK BRAHMANS</div>
                <button onClick={() => setIsOpen(false)}><X className="w-6 h-6 text-brand-dark" /></button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-serif uppercase tracking-widest text-brand-dark hover:text-brand-maroon border-b border-brand-maroon/5 pb-3"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-brand-maroon/5 flex gap-6 justify-center shrink-0">
                <a href="https://www.facebook.com/jlkbrahmans" target="_blank" rel="noopener noreferrer" className="text-brand-maroon hover:text-brand-red transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="https://www.instagram.com/jlkbrahmans/" target="_blank" rel="noopener noreferrer" className="text-brand-maroon hover:text-brand-red transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="https://www.tiktok.com/@jlkbrahmanszw" target="_blank" rel="noopener noreferrer" className="text-brand-maroon hover:text-brand-red transition-colors"><TikTokIcon className="w-5 h-5" /></a>
                <a href="https://x.com/jlkbrahmans" target="_blank" rel="noopener noreferrer" className="text-brand-maroon hover:text-brand-red transition-colors"><XIcon className="w-5 h-5" /></a>
                <a href="https://www.youtube.com/@jlkbrahmans" target="_blank" rel="noopener noreferrer" className="text-brand-maroon hover:text-brand-red transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        subscribedAt: serverTimestamp()
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <footer className="bg-brand-dark text-white py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-maroon via-brand-gold to-brand-maroon opacity-20" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Rich Information Row - Moved to Top */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-24 border-b border-white/5 mb-24">
          <div className="space-y-6">
            <h4 className="font-serif text-2xl text-brand-red">Our Team</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h5 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">The Founder</h5>
                <p className="text-white/60 text-xs leading-relaxed">
                  Lawrence Kutinyu established JLK Brahmans with a vision to bring world-class genetics to Zimbabwe. As an active breeder and member of the Zimbabwe Brahman Breeders Society, he leads our genetic program.
                </p>
              </div>
              <div>
                <h5 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">Genetic Excellence</h5>
                <p className="text-white/60 text-xs leading-relaxed">
                  Our team includes dedicated geneticists and ranch managers who monitor every aspect of herd health and performance data, ensuring only the finest animals enter our elite program.
                </p>
              </div>
            </div>
            <Link to="/team" className="inline-flex items-center gap-2 text-brand-red text-[10px] font-bold uppercase tracking-widest hover:gap-4 transition-all">
              Meet the Full Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-6">
            <h4 className="font-serif text-2xl text-brand-red">Brahman Breeding</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h5 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">Selection Criteria</h5>
                <p className="text-white/60 text-xs leading-relaxed">
                  We focus on the "Big Three": Structural Soundness, Fertility, and Adaptability. Our Brahmans are bred to thrive in the Zimbabwean veld while maintaining superior growth rates.
                </p>
              </div>
              <div>
                <h5 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">Genetic Progress</h5>
                <p className="text-white/60 text-xs leading-relaxed">
                  Through intensive AI and Embryo Transfer programs, we accelerate genetic gain, bringing the best of American and Australian bloodlines to the African continent.
                </p>
              </div>
            </div>
            <Link to="/breeding-education" className="inline-flex items-center gap-2 text-brand-red text-[10px] font-bold uppercase tracking-widest hover:gap-4 transition-all">
              Learn Breeding Science <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="JLK Logo" 
                className="w-40 h-40 rounded-full object-cover"
              />
              <div className="font-serif text-1xl font-bold tracking-widest">JLK BRAHMANS</div>
            </div>
            <p className="text-white/50 leading-relaxed text-sm font-light">
              Breeding precision. Raising excellence. The premier source for elite Brahman genetics in Zimbabwe and across Africa.
            </p>
            <div className="flex gap-6">
              <a href="https://www.facebook.com/jlkbrahmans" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red transition-colors" title="Facebook"><Facebook className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/jlkbrahmans/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red transition-colors" title="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.tiktok.com/@jlkbrahmanszw" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red transition-colors" title="TikTok"><TikTokIcon className="w-5 h-5" /></a>
              <a href="https://x.com/jlkbrahmans" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red transition-colors" title="Twitter (X)"><XIcon className="w-5 h-5" /></a>
              <a href="https://www.youtube.com/@jlkbrahmans" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red transition-colors" title="YouTube"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.3em] text-brand-red mb-10">Quick Links</h4>
            <ul className="space-y-4 text-white/50 text-sm font-light">
              <li><Link to="/about" className="hover:text-white transition-colors">About the Ranch</Link></li>
              <li><Link to="/sires" className="hover:text-white transition-colors">Elite Sires</Link></li>
              <li><Link to="/champions" className="hover:text-white transition-colors">Champions</Link></li>
              <li><Link to="/juniors" className="hover:text-white transition-colors">Juniors</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">Latest News</Link></li>
              <li><Link to="/sale" className="hover:text-white transition-colors">Buy from JLK Brahmans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.3em] text-brand-red mb-10">Contact</h4>
            <ul className="space-y-6 text-white/50 text-sm font-light">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                  <Phone className="w-4 h-4 text-brand-red" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Phone</span>
                  <span>+263 773 710 121 / 772 133 144</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                  <Mail className="w-4 h-4 text-brand-red" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Email</span>
                  <span>lawrencekutinyu@gmail.com</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                  <MapPin className="w-4 h-4 text-brand-red" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Location</span>
                  <span>9 Todmorden Rd, Ashdown Park, Harare</span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.3em] text-brand-red mb-10">Newsletter</h4>
            <p className="text-white/50 mb-8 text-sm font-light leading-relaxed">Join our inner circle for exclusive sale previews and ranch updates.</p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" 
                  className="bg-white/5 border border-white/10 px-6 py-4 w-full rounded-2xl focus:ring-1 focus:ring-brand-red outline-none transition-all text-sm font-light placeholder:text-white/20" 
                />
                <button 
                  disabled={status === 'loading'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-red p-3 rounded-xl hover:scale-110 transition-transform disabled:opacity-50 shadow-xl"
                >
                  {status === 'loading' ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {status === 'success' && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 text-xs font-bold">Successfully subscribed!</motion.p>}
              {status === 'error' && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs font-bold">Something went wrong. Try again.</motion.p>}
            </form>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-[10px] uppercase tracking-[0.3em]">
          <div>© 2026 JLK Brahmans. All Rights Reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const Home = () => {
  const [featuredCattle, setFeaturedCattle] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const fallbackCattle = [
    {
      id: 'fallback-1',
      name: 'JLK LEGACY 101',
      registrationNumber: 'ZIM-B-2024-101',
      description: 'A powerhouse gray bull with exceptional length and muscle definition. Sired by the legendary JDH Mr. Elmo Manso.',
      imageUrl: 'https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=800',
      isForSale: true
    },
    {
      id: 'fallback-2',
      name: 'JLK RUBY 205',
      registrationNumber: 'ZIM-B-2024-205',
      description: 'A deep-bodied red cow with perfect udder placement and a gentle temperament. A cornerstone for any red Brahman program.',
      imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
      isForSale: false
    },
    {
      id: 'fallback-3',
      name: 'JLK TITAN 309',
      registrationNumber: 'ZIM-B-2025-309',
      description: 'An elite young bull showing incredible growth potential and structural correctness. Built for the African environment.',
      imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=800',
      isForSale: true
    }
  ];

  useEffect(() => {
    const q = query(collection(db, 'cattle'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeaturedCattle(items.length > 0 ? items : fallbackCattle);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl p-12"
            >
              <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-8 right-8 text-brand-gray/40 hover:text-brand-red transition-colors">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-4xl font-serif mb-4 tracking-tight">Submit a Review</h3>
              <p className="text-brand-gray/60 mb-10 font-light">Share your experience with JLK Brahmans genetics and service.</p>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsReviewModalOpen(false); alert('Thank you for your review! It will be moderated before appearing.'); }}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-brand-gray/40 ml-1">Name</label>
                    <input required className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-brand-gray/40 ml-1">Role/Location</label>
                    <input required className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all" placeholder="e.g. Rancher, Bulawayo" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-brand-gray/40 ml-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-6 h-6 text-brand-red cursor-pointer fill-brand-red" />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-brand-gray/40 ml-1">Review</label>
                  <textarea required rows={4} className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all resize-none" placeholder="Write your testimonial here..."></textarea>
                </div>
                <button type="submit" className="btn-primary w-full !py-5 text-[10px] uppercase tracking-[0.4em] font-bold">
                  Submit Testimonial
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Hero Section with Image Background */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden py-20">
        {/* Background Image with Subtle Zoom Animation */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=2000" 
            alt="JLK FUTURE 605" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Sophisticated Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 z-10" />
        <div className="absolute inset-0 bg-brand-dark/20 z-10" />
        
        <div className="relative z-20 text-center max-w-6xl px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.div
              custom={0}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: (i: number) => ({
                  opacity: 1,
                  y: 0,
                  transition: { 
                    delay: i * 0.6, 
                    duration: 1.5, 
                    type: "spring",
                    stiffness: 40,
                    damping: 12
                  }
                })
              }}
              className="mb-6"
            >
              <h1 className="text-6xl md:text-9xl font-serif tracking-tighter leading-[0.8] drop-shadow-2xl">
                Breeding <span className="italic text-white">Precision. </span><br />
                Raising <span className="text-brand-red">Excellence.</span>
              </h1>
            </motion.div>
            
            <motion.div
              custom={1}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: (i: number) => ({
                  opacity: 1,
                  y: 0,
                  transition: { 
                    delay: i * 0.6, 
                    duration: 1.5, 
                    type: "spring",
                    stiffness: 40,
                    damping: 12
                  }
                })
              }}
              className="mb-12"
            >
              <h2 className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-white py-4 px-8 inline-block">
                The Premier Source for Elite <span className="text-brand-red">Brahman Genetics</span> in Africa
              </h2>
            </motion.div>
            
            <motion.div 
              custom={2}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: (i: number) => ({
                  opacity: 1,
                  y: 0,
                  transition: { 
                    delay: i * 0.6, 
                    duration: 1.5, 
                    type: "spring",
                    stiffness: 40,
                    damping: 12
                  }
                })
              }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/sale" className="group bg-brand-red text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:bg-brand-maroon hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3">
                Buy from JLK Brahmans <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/sires" className="group border border-white/30 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:bg-white hover:text-brand-dark backdrop-blur-md flex items-center gap-3">
                View Elite Sires <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Breeding Philosophy */}
      <section className="section-padding bg-brand-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-maroon/5 -skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="subheading !text-brand-red">The Zimbabwean Standard</span>
            <h2 className="heading-lg">
              Built for the <br /><span className="italic text-white/80">African Veld.</span>
            </h2>
            <p className="text-white/70 text-xl leading-relaxed mb-12 font-light">
              At JLK Brahmans, we don't just breed cattle; we engineer resilience. Our breeding program is specifically designed to produce Brahmans that thrive in the Zimbabwean climate—hardy, fertile, and high-performing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {[
                { title: 'Heat Tolerance', desc: 'Superior thermoregulation for the harshest Zimbabwean summers.' },
                { title: 'Disease Resistance', desc: 'Natural immunity to local tick-borne diseases and parasites.' },
                { title: 'Foraging Ability', desc: 'Exceptional efficiency in converting natural veld into high-quality beef.' },
                { title: 'Elite Fertility', desc: 'Strict selection for early maturity and consistent calving intervals.' }
              ].map((item) => (
                <div key={item.title} className="group">
                  <div className="w-8 h-[2px] bg-brand-red mb-6 transition-all group-hover:w-16" />
                  <h4 className="font-serif text-2xl mb-3 tracking-tight">{item.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative group">
            <div className="absolute -inset-6 border border-brand-maroon/30 rounded-full animate-spin-slow opacity-50" />
            <div className="relative z-10 aspect-square overflow-hidden rounded-full border-8 border-brand-dark shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <img 
                src="front.jpg" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                alt="Brahman Excellence"
              />
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-brand-red p-10 rounded-full z-20 shadow-2xl hidden md:flex items-center justify-center"
            >
              <Award className="w-12 h-12 text-white" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* YouTube Channel Preview Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-cream/50 -skew-x-12 translate-x-32" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-red-600 mb-6">
                <Youtube className="w-6 h-6" />
                <span className="subheading !mb-0 !text-red-600">YouTube Channel</span>
              </div>
              <h2 className="heading-lg">JLK TV: Inside the Ranch</h2>
              <p className="text-brand-gray/70 text-lg leading-relaxed font-light">
                Go behind the scenes at JLK Brahmans. Watch our latest cattle showcases, educational videos, and ranch updates.
              </p>
            </div>
            <a href="https://youtube.com/@jlkbrahmans" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-3">
              Subscribe on YouTube <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative aspect-video bg-brand-dark rounded-[3rem] overflow-hidden group shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-1000"
                alt="Main Video Thumbnail"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform group-hover:bg-red-700">
                  <Play className="w-10 h-10 fill-current ml-2" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 p-12 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <h3 className="text-white text-3xl font-serif mb-3 tracking-tight">2026 Herd Showcase: The Next Generation</h3>
                <div className="flex items-center gap-4">
                  <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Featured Video</span>
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">12:45</span>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-col gap-8">
              {[
                { title: 'Brahman Nutrition Guide', views: '1.2K views', img: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400' },
                { title: 'Show Prep: Grooming Elite Bulls', views: '850 views', img: 'https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=400' },
                { title: 'Veld Management in Harare', views: '2.4K views', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=400' }
              ].map((video, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group cursor-pointer"
                >
                  <div className="w-32 h-24 bg-brand-gray/20 rounded-2xl overflow-hidden shrink-0 relative shadow-lg">
                    <img src={video.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={video.title} />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                  </div>
                  <div className="py-1">
                    <h4 className="font-serif text-lg leading-snug mb-2 group-hover:text-brand-red transition-colors tracking-tight">{video.title}</h4>
                    <p className="text-[10px] text-brand-gray/60 uppercase tracking-widest font-bold">{video.views}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Genetics Section */}
      <section className="section-padding bg-brand-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <Dna className="w-full h-full" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-brand-red mb-6">
                <Dna className="w-6 h-6" />
                <span className="subheading !mb-0">Genetic Excellence</span>
              </div>
              <h2 className="heading-lg">The Genetic Database</h2>
              <p className="text-brand-gray/70 text-xl leading-relaxed font-light">
                Explore our comprehensive database of Brahman and commercial cattle genetics. 
                Filter by lineage, performance data, and phenotype to find the perfect match for your breeding program.
              </p>
            </div>
            <Link to="/genetics" className="group flex items-center gap-6 text-brand-red font-bold uppercase tracking-[0.4em] text-[10px]">
              Explore Database <div className="w-16 h-[2px] bg-brand-red transition-all duration-500 group-hover:w-24" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {[
              { title: 'Gray Brahmans', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800' },
              { title: 'Red Brahmans', img: 'https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=800' },
              { title: 'Commercial Genetics', img: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=800' }
            ].map((cat, i) => (
              <motion.div 
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15 }}
                className="group relative h-[650px] rounded-[3.5rem] overflow-hidden bg-brand-dark shadow-2xl"
              >
                <img 
                  src={cat.img}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-1000"
                  alt={cat.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-12 w-full">
                  <h3 className="text-white text-4xl font-serif mb-6 tracking-tight">{cat.title}</h3>
                  <p className="text-white/50 text-sm mb-10 leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    Superior bloodlines selected for performance, fertility, and breed character. Built for the African environment.
                  </p>
                  <Link to={`/genetics?cat=${cat.title.split(' ')[0].toLowerCase()}`} className="text-white text-[10px] uppercase tracking-[0.4em] font-bold flex items-center gap-4 group-hover:text-brand-red transition-colors">
                    View Data <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-brand-cream relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <Quote className="w-full h-full -rotate-12 translate-x-1/4 translate-y-1/4" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <span className="subheading">Client Success</span>
              <h2 className="heading-lg">Trusted by the Best</h2>
              <p className="text-brand-gray/60 text-lg font-light">
                Hear from the ranchers and breeders who have transformed their herds with JLK Brahmans genetics.
              </p>
            </div>
            
            <div className="bg-white px-10 py-8 rounded-[2.5rem] shadow-xl flex items-center gap-8">
              <div className="text-center border-r border-brand-maroon/10 pr-8">
                <div className="text-4xl font-serif text-brand-red mb-1">4.9</div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-brand-red text-brand-red" />
                  ))}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-brand-gray/40">Avg Rating</div>
              </div>
              <div>
                <div className="text-2xl font-serif mb-1">500+</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-brand-gray/40">Happy Clients</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "John Sibanda",
                role: "Commercial Rancher, Bulawayo",
                content: "The resilience of JLK genetics is unmatched. Our calving rates have improved by 15% since introducing their bulls into our commercial herd. They truly thrive in the African veld.",
                rating: 5,
                image: "https://picsum.photos/seed/sibanda/100/100"
              },
              {
                name: "Sarah Miller",
                role: "Stud Breeder, South Africa",
                content: "JLK Brahmans represent the pinnacle of African breeding. Their attention to performance data and breed character is what sets them apart from the rest. A true partner in excellence.",
                rating: 5,
                image: "https://picsum.photos/seed/miller/100/100"
              },
              {
                name: "David Moyo",
                role: "Livestock Consultant",
                content: "I consistently recommend JLK to my clients across the region. You're not just buying cattle; you're buying a legacy of excellence and a commitment to genetic progress.",
                rating: 5,
                image: "https://picsum.photos/seed/moyo/100/100"
              },
              {
                name: "Robert Mugabe Jr.",
                role: "Emerging Farmer, Mashonaland",
                content: "Starting a new stud is daunting, but the team at JLK provided more than just genetics—they provided mentorship. Their heifers are the foundation of my future.",
                rating: 5,
                image: "https://picsum.photos/seed/robert/100/100"
              },
              {
                name: "Grace Chipo",
                role: "Agricultural Entrepreneur",
                content: "The docility and growth rates of the JLK-sired calves are exceptional. We've seen a significant reduction in handling stress and faster time to market.",
                rating: 5,
                image: "https://picsum.photos/seed/grace/100/100"
              },
              {
                name: "Hans Kruger",
                role: "Namibian Cattleman",
                content: "Importing JLK genetics to Namibia was the best decision we made. These animals handle the semi-arid conditions with ease while maintaining incredible muscle mass.",
                rating: 5,
                image: "https://picsum.photos/seed/hans/100/100"
              }
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[3rem] shadow-lg relative group hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="absolute -top-5 left-10 w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-white shadow-lg z-20">
                  <Quote className="w-4 h-4" />
                </div>
                
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-brand-red text-brand-red" />
                  ))}
                </div>

                <p className="text-brand-gray/80 text-base leading-relaxed mb-8 font-light italic flex-grow">
                  "{t.content}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-brand-maroon/5 mt-auto">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif text-lg tracking-tight">{t.name}</h4>
                    <p className="text-brand-red text-[9px] uppercase font-bold tracking-[0.2em]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="group inline-flex items-center gap-4 text-brand-red font-bold uppercase tracking-[0.4em] text-[10px] hover:gap-6 transition-all"
            >
              Submit Your Review <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Cattle */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-maroon/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="subheading">Our Pride</span>
            <h2 className="heading-lg">Featured Herd</h2>
            <div className="w-24 h-1 bg-brand-maroon/10 mx-auto rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-brand-red"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-32">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-brand-maroon/10 rounded-full" />
                <div className="absolute inset-0 border-4 border-brand-maroon border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {featuredCattle.length > 0 ? featuredCattle.map((animal, i) => (
                <motion.div 
                  key={animal.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-[3.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={animal.imageUrl || "https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=800"} 
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                      alt={animal.name}
                    />
                    <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors" />
                    {animal.isForSale && (
                      <div className="absolute top-8 right-8 bg-brand-red text-white text-[10px] uppercase font-bold tracking-[0.4em] px-6 py-2.5 rounded-full shadow-2xl backdrop-blur-md">
                        For Sale
                      </div>
                    )}
                  </div>
                  <div className="p-12">
                    <div className="text-brand-red font-bold text-[10px] uppercase tracking-[0.4em] mb-4">{animal.registrationNumber || 'Pending Registration'}</div>
                    <h3 className="text-3xl font-serif mb-6 group-hover:text-brand-red transition-colors tracking-tight leading-tight">{animal.name}</h3>
                    <p className="text-brand-gray/60 text-sm mb-10 leading-relaxed font-light line-clamp-2">{animal.description}</p>
                    <Link to={`/cattle/${animal.id}`} className="btn-primary !py-4 text-center flex items-center justify-center gap-3">
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-3 text-center py-32 text-brand-gray/60 italic bg-brand-cream/50 rounded-[3rem] border-2 border-dashed border-brand-maroon/10">
                  <div className="max-w-md mx-auto">
                    <Search className="w-12 h-12 mx-auto mb-6 opacity-20" />
                    <p className="text-lg font-serif mb-2">No cattle listed yet.</p>
                    <p className="text-sm">Check back soon for our latest elite offerings.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const CattleList = ({ category }: { category: 'Bull' | 'Cow' }) => {
  const [cattle, setCattle] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'cattle'), where('gender', '==', category));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCattle(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [category]);

  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <Dna className="w-full h-full" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24">
          <span className="subheading">Our Herd</span>
          <h1 className="heading-lg !text-6xl md:!text-8xl">Elite <span className="italic text-brand-gray/40">{category}s.</span></h1>
          <p className="text-xl text-brand-gray/70 leading-relaxed font-light max-w-2xl">
            Explore our selection of high-performing {category.toLowerCase()}s, bred for excellence and resilience in the African environment.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-brand-maroon/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-brand-maroon border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {cattle.map((animal, i) => (
              <motion.div 
                key={animal.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-10 shadow-2xl bg-brand-cream">
                  <img 
                    src={animal.imageUrl || "https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=800"} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    alt={animal.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Link to={`/cattle/${animal.id}`} className="w-full btn-primary !py-3 flex justify-center items-center gap-2">
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="px-4">
                  <h3 className="text-3xl font-serif mb-2 group-hover:text-brand-red transition-colors tracking-tight">{animal.name}</h3>
                  <p className="text-brand-gray/60 text-[10px] uppercase tracking-[0.4em] font-bold">{animal.registrationNumber || 'Pending Registration'}</p>
                </div>
              </motion.div>
            ))}
            {cattle.length === 0 && (
              <div className="col-span-3 text-center py-32 text-brand-gray/40 italic bg-white/50 rounded-[3rem] border-2 border-dashed border-brand-maroon/10">
                <div className="max-w-md mx-auto">
                  <Search className="w-12 h-12 mx-auto mb-6 opacity-20" />
                  <p className="text-lg font-serif mb-2">No {category.toLowerCase()}s listed yet.</p>
                  <p className="text-sm">Check back soon for our latest elite offerings.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const GeneticsDatabase = () => {
  const [searchParams] = useSearchParams();
  const [cattle, setCattle] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(searchParams.get('cat') || 'all');
  const [activeTab, setActiveTab] = useState<'herd' | 'registry'>('herd');
  const [regSearch, setRegSearch] = useState('');

  useEffect(() => {
    let q = query(collection(db, 'cattle'));
    if (filter !== 'all') {
      q = query(collection(db, 'cattle'), where('category', '==', filter.charAt(0).toUpperCase() + filter.slice(1)));
    }
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCattle(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [filter]);

  const handleRegistrySearch = (e: React.FormEvent) => {
    e.preventDefault();
    const baseUrl = "https://i4.abri.au/online/cgi-bin/i4.dll?1=382F332E30&2=2431&3=56&5=2B3C2B3C3A";
    window.open(baseUrl, '_blank');
  };

  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-maroon/5 -skew-x-12 translate-x-32 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="subheading">Genetic Excellence</span>
            <h1 className="heading-lg !text-6xl md:!text-8xl">Genetic <span className="italic text-brand-gray/40">Database.</span></h1>
            <p className="text-xl text-brand-gray/70 leading-relaxed font-light">
              Search and filter through our elite bloodlines and the official Zimbabwe Brahman registry.
            </p>
          </div>
          <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-lg border border-brand-maroon/5">
            <button 
              onClick={() => setActiveTab('herd')}
              className={cn(
                "px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-all rounded-xl",
                activeTab === 'herd' ? "bg-brand-dark text-white shadow-xl" : "hover:bg-brand-gray/5 text-brand-gray/60"
              )}
            >
              JLK Herd
            </button>
            <button 
              onClick={() => setActiveTab('registry')}
              className={cn(
                "px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-all rounded-xl",
                activeTab === 'registry' ? "bg-brand-dark text-white shadow-xl" : "hover:bg-brand-gray/5 text-brand-gray/60"
              )}
            >
              Official Registry
            </button>
          </div>
        </div>

        {activeTab === 'herd' ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {['all', 'gray', 'red', 'commercial'].map((f) => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold border transition-all rounded-full whitespace-nowrap",
                    filter === f 
                      ? "bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/20" 
                      : "bg-white border-brand-maroon/10 text-brand-gray/60 hover:border-brand-red/30"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-brand-maroon/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-brand-dark text-white/40 text-[10px] uppercase tracking-[0.4em]">
                    <tr>
                      <th className="p-8 font-bold">Animal Name</th>
                      <th className="p-8 font-bold">Reg #</th>
                      <th className="p-8 font-bold">Category</th>
                      <th className="p-8 font-bold">Sire</th>
                      <th className="p-8 font-bold">Dam</th>
                      <th className="p-8 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-maroon/5">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="p-32 text-center">
                          <div className="flex justify-center">
                            <div className="w-10 h-10 border-4 border-brand-maroon/10 border-t-brand-maroon rounded-full animate-spin" />
                          </div>
                        </td>
                      </tr>
                    ) : cattle.map((animal) => (
                      <tr key={animal.id} className="hover:bg-brand-cream/50 transition-colors text-sm group">
                        <td className="p-8 font-serif text-lg tracking-tight text-brand-dark">{animal.name}</td>
                        <td className="p-8 text-brand-gray/60 font-mono text-xs">{animal.registrationNumber}</td>
                        <td className="p-8">
                          <span className="bg-brand-cream text-brand-red px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand-red/10">
                            {animal.category}
                          </span>
                        </td>
                        <td className="p-8 text-brand-gray/70 italic font-light">{animal.sire || '—'}</td>
                        <td className="p-8 text-brand-gray/70 italic font-light">{animal.dam || '—'}</td>
                        <td className="p-8 text-right">
                          <Link to={`/cattle/${animal.id}`} className="inline-flex items-center gap-2 text-brand-red hover:text-brand-dark font-bold text-[10px] uppercase tracking-[0.3em] transition-colors">
                            Details <ArrowRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {!loading && cattle.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-32 text-center text-brand-gray/40 italic">
                          <Search className="w-12 h-12 mx-auto mb-6 opacity-10" />
                          No records found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[4rem] shadow-2xl border border-brand-maroon/5 p-16 lg:p-24 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-red via-brand-maroon to-brand-red" />
            <div className="max-w-3xl mx-auto relative z-10">
              <div className="w-24 h-24 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                <Search className="w-10 h-10 text-brand-red" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 tracking-tight">Official Zimbabwe Brahman Registry</h2>
              <p className="text-brand-gray/70 mb-12 text-lg leading-relaxed font-light">
                Access the complete national database managed by the Brahman Cattle Breeders' Society of Zimbabwe. 
                Search for pedigrees, Breedplan data, and official EPDs for any registered animal in the country.
              </p>
              
              <form onSubmit={handleRegistrySearch} className="flex flex-col md:flex-row gap-4 mb-16">
                <div className="relative flex-grow">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray/40" />
                  <input 
                    type="text" 
                    placeholder="Registration Number or Animal Name" 
                    value={regSearch}
                    onChange={(e) => setRegSearch(e.target.value)}
                    className="w-full bg-brand-cream/50 border border-brand-maroon/10 rounded-2xl px-14 py-5 outline-none focus:border-brand-red focus:bg-white transition-all text-lg font-light"
                  />
                </div>
                <button type="submit" className="btn-primary flex items-center justify-center gap-3 px-10">
                  Launch Search <ExternalLink className="w-4 h-4" />
                </button>
              </form>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[
                  { step: '01', title: 'Identify', desc: 'Enter the animal\'s unique registration number or full name.' },
                  { step: '02', title: 'Analyze', desc: 'Review official Breedplan data and performance metrics.' },
                  { step: '03', title: 'Decide', desc: 'Analyze EPDs to make informed breeding decisions.' }
                ].map((item) => (
                  <div key={item.step} className="p-8 bg-brand-cream/50 rounded-3xl border border-brand-maroon/5 hover:bg-white transition-colors group">
                    <div className="text-brand-red font-bold text-2xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity font-serif italic">{item.step}</div>
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-3 text-brand-dark">{item.title}</h4>
                    <p className="text-xs text-brand-gray/60 leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const [user, setUser] = useState<any>(null);
  const [cattle, setCattle] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    gender: 'Bull',
    category: 'Gray',
    sire: '',
    dam: '',
    description: '',
    imageUrl: '',
    isForSale: false
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => setUser(u));
    const q = query(collection(db, 'cattle'), orderBy('name'));
    const unsubscribeCattle = onSnapshot(q, (snapshot) => {
      setCattle(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsubscribeAuth();
      unsubscribeCattle();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'cattle'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsAdding(false);
      setFormData({
        name: '',
        registrationNumber: '',
        gender: 'Bull',
        category: 'Gray',
        sire: '',
        dam: '',
        description: '',
        imageUrl: '',
        isForSale: false
      });
    } catch (err) {
      console.error("Error adding cattle", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      await deleteDoc(doc(db, 'cattle', id));
    }
  };

  if (!user) return <div className="pt-40 text-center">Please login to access admin panel.</div>;

  return (
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-serif">Admin Dashboard</h1>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="btn-primary flex items-center gap-2"
          >
            {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {isAdding ? 'Cancel' : 'Add New Animal'}
          </button>
        </div>

        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 border border-brand-maroon/10 mb-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold mb-2">Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-2 outline-none focus:border-brand-maroon" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold mb-2">Reg #</label>
                <input value={formData.registrationNumber} onChange={e => setFormData({...formData, registrationNumber: e.target.value})} className="w-full border p-2 outline-none focus:border-brand-maroon" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold mb-2">Gender</label>
                  <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full border p-2 outline-none">
                    <option>Bull</option>
                    <option>Cow</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold mb-2">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border p-2 outline-none">
                    <option>Gray</option>
                    <option>Red</option>
                    <option>Commercial</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold mb-2">Sire</label>
                <input value={formData.sire} onChange={e => setFormData({...formData, sire: e.target.value})} className="w-full border p-2 outline-none focus:border-brand-maroon" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold mb-2">Dam</label>
                <input value={formData.dam} onChange={e => setFormData({...formData, dam: e.target.value})} className="w-full border p-2 outline-none focus:border-brand-maroon" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold mb-2">Image URL</label>
                <input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border p-2 outline-none focus:border-brand-maroon" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={formData.isForSale} onChange={e => setFormData({...formData, isForSale: e.target.checked})} />
                <label className="text-[10px] uppercase font-bold">Available for Sale</label>
              </div>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary w-full">Save Record</button>
            </div>
          </motion.form>
        )}

        <div className="bg-white border border-brand-maroon/10">
          <div className="p-6 border-b font-serif text-xl">Manage Herd ({cattle.length})</div>
          <div className="divide-y">
            {cattle.map(animal => (
              <div key={animal.id} className="p-6 flex justify-between items-center hover:bg-brand-cream transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-gray/20 overflow-hidden">
                    {animal.imageUrl && <img src={animal.imageUrl} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <div className="font-bold">{animal.name}</div>
                    <div className="text-xs text-brand-gray uppercase tracking-widest">{animal.registrationNumber} • {animal.gender}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="text-brand-gray hover:text-brand-dark"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(animal.id)} className="text-brand-gray hover:text-brand-maroon"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4500); 
    
    // Play sound after initial bounce
    const soundTimer = setTimeout(() => {
      const audio = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_c352702747.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {
        console.log("Audio playback requires user interaction first");
      });
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(soundTimer);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-brand-dark flex items-center justify-center overflow-hidden"
    >
      <div className="relative">
        {/* Three bouncing circles */}
        <div className="flex gap-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                y: [0, -40, 0],
                opacity: [1, 1, 0],
                scale: [1, 1, 0]
              }}
              transition={{
                y: {
                  duration: 0.8,
                  repeat: 2,
                  delay: i * 0.15,
                  ease: "easeInOut"
                },
                opacity: { delay: 2.8, duration: 0.4 },
                scale: { delay: 2.8, duration: 0.4 }
              }}
              className="w-10 h-10 bg-brand-red rounded-full shadow-[0_0_30px_rgba(185,28,28,0.5)]"
            />
          ))}
        </div>

        {/* Merging and Zooming Circle (X-style entry) */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 1, 150],
            opacity: [0, 1, 1, 1]
          }}
          transition={{
            duration: 2.5,
            times: [0, 0.2, 0.7, 1],
            delay: 2.6,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-red rounded-full"
        />
      </div>
    </motion.div>
  );
};

const About = () => (
  <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-maroon/5 -skew-x-12 translate-x-32 pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="subheading">Our Story</span>
          <h1 className="heading-lg !text-6xl md:!text-8xl">The Legacy of <br /><span className="italic text-brand-gray/40">JLK Brahmans.</span></h1>
          <p className="text-xl text-brand-gray leading-relaxed mb-10 font-light max-w-xl">
            Founded in 2023 in the heart of Harare, Zimbabwe, JLK Brahmans was born from a passion for superior cattle genetics and a vision to elevate the African beef industry.
          </p>
          <p className="text-brand-gray/70 leading-relaxed mb-12 max-w-xl font-light">
            Inspired by the world's leading Brahman ranches, we have implemented a strict selection process that prioritizes breed character, structural integrity, and performance on the veld. Our goal is to be the premier source for elite Brahman genetics in the region.
          </p>
          <div className="flex gap-16">
            {[
              { label: 'Founded', value: '2023' },
              { label: 'Zimbabwean', value: '100%' },
              { label: 'Genetics', value: 'Elite' }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-5xl font-serif text-brand-red mb-3 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gray/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="relative group">
          <div className="absolute -inset-8 border border-brand-maroon/10 rounded-[4rem] group-hover:scale-105 transition-transform duration-1000" />
          <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.1)]">
            <img 
              src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1200" 
              className="w-full grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              alt="Ranch Life"
            />
          </div>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute -bottom-12 -right-12 bg-brand-dark text-white p-14 rounded-[3rem] shadow-2xl hidden md:block max-w-xs border border-white/5"
          >
            <Quote className="w-10 h-10 text-brand-red mb-6 opacity-50" />
            <h4 className="font-serif text-2xl mb-4 italic leading-tight">"Breeding Precision. Raising Excellence."</h4>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Our Core Philosophy</p>
          </motion.div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { title: 'Our Mission', desc: 'To provide Zimbabwean ranchers with elite Brahman genetics that improve herd performance and profitability.', img: 'https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=600' },
          { title: 'Our Vision', desc: 'To become the most trusted and influential Brahman breeder in Africa, recognized for excellence and innovation.', img: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=600' },
          { title: 'Our Values', desc: 'Integrity, transparency, and a relentless pursuit of genetic perfection in everything we do.', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600' }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[3rem] overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500"
          >
            <div className="h-72 overflow-hidden relative">
              <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={item.title} />
              <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="p-12">
              <h3 className="text-3xl font-serif mb-6 tracking-tight group-hover:text-brand-red transition-colors">{item.title}</h3>
              <p className="text-brand-gray/70 text-base leading-relaxed font-light">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const Sires = () => {
  const [sires, setSires] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const eliteSires = [
    {
      id: 'sire-1',
      name: 'JLK COMMANDER 502',
      registrationNumber: 'ZIM-BR-2023-502',
      sire: 'MR V8 458/7 "NOBLE"',
      dam: 'JLK LADY ROSE 102',
      category: 'Bull',
      imageUrl: 'https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=1200',
      awards: 'Grand Champion Bull - Zimbabwe National Show 2025',
      epds: { bw: '+1.4', ww: '+32', yw: '+58', milk: '+8' },
      description: 'Commander is our flagship sire, combining the legendary Noble genetics with our most consistent maternal line. He offers exceptional length, muscle expression, and a perfect Brahman breed character.'
    },
    {
      id: 'sire-2',
      name: 'JLK TITAN 415',
      registrationNumber: 'ZIM-BR-2022-415',
      sire: 'MR V8 146/8 "SLOAN"',
      dam: 'JLK MISS BELLA 205',
      category: 'Bull',
      imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1200',
      awards: 'Reserve Junior Champion - Bulawayo Agricultural Fair 2024',
      epds: { bw: '+2.1', ww: '+28', yw: '+45', milk: '+12' },
      description: 'Titan is a powerhouse of a bull, noted for his incredible bone structure and depth of body. He is a high-growth sire that doesn\'t sacrifice calving ease.'
    },
    {
      id: 'sire-3',
      name: 'JLK LEGACY 308',
      registrationNumber: 'ZIM-BR-2021-308',
      sire: 'JDH MR WOODMAN MANSO',
      dam: 'JLK QUEEN 050',
      category: 'Bull',
      imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=1200',
      awards: 'Top Performance Sire 2024',
      epds: { bw: '+0.8', ww: '+22', yw: '+38', milk: '+15' },
      description: 'Legacy brings the classic Manso influence to our herd. He is exceptionally smooth-shouldered and has produced some of our highest-selling heifers to date.'
    }
  ];

  useEffect(() => {
    const q = query(collection(db, 'cattle'), where('category', '==', 'Bull'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSires(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const allSires = [...sires, ...eliteSires];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Sires Hero Section with Video */}
      <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=2000"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://v1.pexels.com/video-files/3015488/3015488-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          <img src="https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=2000" alt="Brahman Sires" />
        </video>
        
        <div className="relative z-20 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-8xl font-serif mb-6 tracking-tighter">
              The <span className="italic text-brand-gray">Elite</span> <span className="text-brand-maroon">Sires</span>
            </h1>
            <p className="text-lg md:text-xl font-light tracking-widest uppercase opacity-90">
              The Genetic Foundation of JLK Excellence
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Superior Genetics. <br /><span className="text-brand-maroon">Proven Performance.</span></h2>
          <p className="text-xl text-brand-gray leading-relaxed">
            Our sires are selected for their ability to pass on economically important traits: growth, fertility, and structural integrity. Each bull in our lineup represents years of careful selection and performance testing.
          </p>
        </div>

        {loading && sires.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-brand-maroon/10 border-t-brand-maroon rounded-full animate-spin mx-auto mb-4" />
            <p className="text-brand-gray/60 font-serif italic">Loading elite sires...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {allSires.map((sire) => (
              <motion.div 
                key={sire.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-brand-maroon/5 group overflow-hidden flex flex-col md:flex-row shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2rem]"
              >
                <div className="md:w-1/2 aspect-square md:aspect-auto overflow-hidden relative">
                  <img 
                    src={sire.imageUrl || "https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=800"} 
                    alt={sire.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {sire.awards && (
                    <div className="absolute bottom-0 left-0 right-0 bg-brand-maroon/90 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-3 backdrop-blur-sm">
                      <Award className="w-3 h-3 inline-block mr-2 mb-1" /> {sire.awards}
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-10 flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-3xl font-serif mb-2 group-hover:text-brand-red transition-colors">{sire.name}</h3>
                    <p className="text-brand-maroon text-xs font-bold uppercase tracking-widest mb-4">{sire.registrationNumber}</p>
                    <div className="space-y-1 text-sm text-brand-gray">
                      <p><span className="font-bold text-brand-dark">Sire:</span> {sire.sire}</p>
                      <p><span className="font-bold text-brand-dark">Dam:</span> {sire.dam}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-8 border-y border-brand-maroon/5 py-6">
                    <div className="text-center">
                      <div className="text-[10px] text-brand-gray uppercase tracking-widest mb-1">BW</div>
                      <div className="font-bold text-sm">{sire.epds?.bw || '—'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-brand-gray uppercase tracking-widest mb-1">WW</div>
                      <div className="font-bold text-sm">{sire.epds?.ww || '—'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-brand-gray uppercase tracking-widest mb-1">YW</div>
                      <div className="font-bold text-sm">{sire.epds?.yw || '—'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-brand-gray uppercase tracking-widest mb-1">Milk</div>
                      <div className="font-bold text-sm">{sire.epds?.milk || '—'}</div>
                    </div>
                  </div>

                  <p className="text-sm text-brand-gray leading-relaxed mb-8 italic line-clamp-3">
                    "{sire.description}"
                  </p>

                  <div className="mt-auto">
                    <Link to={`/cattle/${sire.id}`} className="w-full btn-primary text-xs flex items-center justify-center gap-2">
                      View Full Pedigree <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Champions = () => {
  const champions = [
    {
      id: 'champ-1',
      title: 'Grand Champion Bull',
      name: 'JLK POWERHOUSE 402',
      show: 'Zimbabwe National Brahman Show 2025',
      description: 'Powerhouse dominated the 2025 show circuit, being praised by international judges for his exceptional breed character and structural correctness.',
      imageUrl: 'https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'champ-2',
      title: 'Grand Champion Female',
      name: 'JLK LADY CRYSTAL 215',
      show: 'Bulawayo Agricultural Fair 2024',
      description: 'Crystal represents the ideal Brahman female—feminine, fertile, and with a perfect udder. She is now a key donor in our ET program.',
      imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'champ-3',
      title: 'Junior Champion Bull',
      name: 'JLK MAVERICK 510',
      show: 'Harare Agricultural Show 2025',
      description: 'A young sire with an incredible future. Maverick shows exceptional growth and muscle for his age.',
      imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-maroon/5 -skew-x-12 translate-x-32 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="subheading">Excellence Recognized</span>
          <h1 className="heading-lg !text-6xl md:!text-8xl">Our <br /><span className="italic text-brand-red">Champions.</span></h1>
          <p className="text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
            A showcase of our most decorated animals. These champions represent the successful realization of our breeding goals and genetic potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {champions.map((champ, i) => (
            <motion.div 
              key={champ.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row hover:shadow-[0_0_60px_rgba(0,0,0,0.1)] transition-all duration-500 group"
            >
              <div className="lg:w-1/2 h-96 lg:h-auto overflow-hidden relative">
                <img 
                  src={champ.imageUrl} 
                  alt={champ.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 left-8 bg-brand-red text-white text-[10px] uppercase font-bold tracking-[0.4em] px-6 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2">
                  <Trophy className="w-3 h-3" /> Champion
                </div>
              </div>
              <div className="lg:w-1/2 p-12 lg:p-14 flex flex-col justify-center">
                <div className="text-brand-red font-bold text-[10px] uppercase tracking-[0.4em] mb-6">{champ.title}</div>
                <h3 className="text-4xl font-serif mb-6 group-hover:text-brand-red transition-colors tracking-tight leading-tight">{champ.name}</h3>
                <p className="text-brand-gray/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">{champ.show}</p>
                <p className="text-brand-gray/70 text-sm mb-12 leading-relaxed italic font-light">"{champ.description}"</p>
                <Link to={`/cattle/${champ.id}`} className="btn-primary !py-4 text-center flex items-center justify-center gap-3">
                  View Pedigree <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Juniors = () => {
  const juniors = [
    { id: 1, name: 'JLK RISING STAR 601', birth: 'Sept 2025', sire: 'Commander 502', imageUrl: 'https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'JLK FUTURE 605', birth: 'Oct 2025', sire: 'Titan 415', imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'JLK PROMISE 612', birth: 'Nov 2025', sire: 'Legacy 308', imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'JLK NOBLE SON 615', birth: 'Dec 2025', sire: 'Commander 502', imageUrl: 'https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=800' },
    { id: 5, name: 'JLK BELLE 620', birth: 'Jan 2026', sire: 'Titan 415', imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800' },
    { id: 6, name: 'JLK QUEEN 625', birth: 'Feb 2026', sire: 'Legacy 308', imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <Dna className="w-full h-full" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="subheading">The Future</span>
          <h1 className="heading-lg !text-6xl md:!text-8xl">Rising <br /><span className="italic text-brand-red">Juniors.</span></h1>
          <p className="text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
            Our next generation of elite genetics. These young animals show incredible promise and represent the ongoing evolution of the JLK breeding program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {juniors.map((junior, i) => (
            <motion.div 
              key={junior.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={junior.imageUrl} 
                  alt={junior.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 left-8 bg-brand-dark/80 text-white text-[10px] uppercase font-bold tracking-[0.4em] px-6 py-2.5 rounded-full shadow-2xl backdrop-blur-md">
                  Future Star
                </div>
              </div>
              <div className="p-12">
                <h3 className="text-3xl font-serif mb-6 tracking-tight group-hover:text-brand-red transition-colors">{junior.name}</h3>
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between items-center border-b border-brand-maroon/5 pb-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gray/40">Born</span>
                    <span className="text-sm font-medium text-brand-gray">{junior.birth}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-brand-maroon/5 pb-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gray/40">Sire</span>
                    <span className="text-sm font-medium text-brand-gray">{junior.sire}</span>
                  </div>
                </div>
                <Link to={`/cattle/${junior.id}`} className="btn-outline !py-3 w-full text-center flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold">
                  View Pedigree <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OurTeam = () => {
  const team = [
    { name: 'Lawrence Kutinyu', role: 'Founder & Lead Breeder', bio: 'Lawrence is an active breeder and financial member of the Zimbabwe Brahman Breeders Society since 2024, dedicated to elite genetics.', imageUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=800' },
    { name: 'Dr. David Moyo', role: 'Chief Geneticist', bio: 'David oversees our AI and ET programs, focusing on rapid genetic advancement.', imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=800' },
    { name: 'Sarah Sibanda', role: 'Ranch Manager', bio: 'Sarah handles the day-to-day management of the herd and veld resources.', imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-maroon/5 -skew-x-12 translate-x-32 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="subheading">The Experts</span>
          <h1 className="heading-lg !text-6xl md:!text-8xl">Our <br /><span className="italic text-brand-red">Team.</span></h1>
          <p className="text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
            The people behind the precision. Meet the dedicated experts who make JLK Brahmans a leader in elite genetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {team.map((member, i) => (
            <motion.div 
              key={member.name} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" referrerPolicy="no-referrer" />
              </div>
              <div className="p-12">
                <div className="text-brand-red font-bold text-[10px] uppercase tracking-[0.4em] mb-4">{member.role}</div>
                <h3 className="text-3xl font-serif mb-6 tracking-tight group-hover:text-brand-red transition-colors">{member.name}</h3>
                <p className="text-brand-gray/60 text-sm leading-relaxed font-light">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BrahmanBreeding = () => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <Dna className="w-full h-full" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="subheading">The Methodology</span>
          <h1 className="heading-lg !text-6xl md:!text-8xl">Breeding <br /><span className="italic text-brand-red">Science.</span></h1>
          <p className="text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
            Discover the rigorous selection criteria and advanced technologies we use to produce the finest Brahmans in Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 group"
          >
            <div className="w-16 h-16 bg-brand-red/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-serif mb-6 tracking-tight group-hover:text-brand-red transition-colors">Selection Criteria</h3>
            <p className="text-brand-gray/70 leading-relaxed mb-8 font-light">
              Our selection process is brutal. We only retain animals that meet the highest standards for structural correctness, fertility, and temperament.
            </p>
            <ul className="space-y-4 text-sm text-brand-gray/60 font-medium">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> Perfect Feet & Legs</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> High Fertility EPDs</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> Docile Temperament</li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-12 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 group"
          >
            <div className="w-16 h-16 bg-brand-red/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-serif mb-6 tracking-tight group-hover:text-brand-red transition-colors">Veld Adaptation</h3>
            <p className="text-brand-gray/70 leading-relaxed mb-8 font-light">
              Zimbabwean conditions are tough. Our cattle are bred to thrive on natural veld, ensuring they perform for our commercial clients in real-world conditions.
            </p>
            <ul className="space-y-4 text-sm text-brand-gray/60 font-medium">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> Heat Tolerance</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> Parasite Resistance</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> Efficient Foraging</li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-12 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 group"
          >
            <div className="w-16 h-16 bg-brand-red/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
              <Dna className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-serif mb-6 tracking-tight group-hover:text-brand-red transition-colors">Genetic Progress</h3>
            <p className="text-brand-gray/70 leading-relaxed mb-8 font-light">
              We use the latest in AI and ET technology to multiply our best genetics, ensuring rapid progress and consistent quality across our entire herd.
            </p>
            <ul className="space-y-4 text-sm text-brand-gray/60 font-medium">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> Embryo Transfer</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> Artificial Insemination</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> DNA Parentage Verification</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-maroon/5 -skew-x-12 translate-x-32 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="subheading">Get in Touch</span>
            <h1 className="heading-lg !text-6xl md:!text-8xl">Let's Build a <br /><span className="italic text-brand-red">Legacy.</span></h1>
            <p className="text-xl text-brand-gray/70 leading-relaxed mb-16 font-light max-w-xl">
              Whether you're looking for elite genetics or expert consultancy, we're here to help you elevate your program.
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-8">
                <div className="w-12 h-12 bg-brand-red/5 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gray/40 mb-3">Phone</h4>
                  <p className="text-xl font-serif text-brand-gray">+263 773 710 121</p>
                  <p className="text-xl font-serif text-brand-gray">+263 772 133 144</p>
                </div>
              </div>

              <div className="flex items-start gap-8">
                <div className="w-12 h-12 bg-brand-red/5 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gray/40 mb-3">Email</h4>
                  <p className="text-xl font-serif text-brand-gray">lawrencekutinyu@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-8">
                <div className="w-12 h-12 bg-brand-red/5 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gray/40 mb-3">Location</h4>
                  <p className="text-xl font-serif text-brand-gray">9 Todmorden Rd, Ashdown Park</p>
                  <p className="text-xl font-serif text-brand-gray">Harare, Zimbabwe</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-brand-maroon/5"
          >
            <h3 className="text-4xl font-serif mb-10 tracking-tight">Send a Message</h3>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gray/40 ml-1">Name</label>
                  <input type="text" className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gray/40 ml-1">Email</label>
                  <input type="email" className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gray/40 ml-1">Subject</label>
                <input type="text" className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gray/40 ml-1">Message</label>
                <textarea rows={5} className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all resize-none"></textarea>
              </div>
              <button className="btn-primary w-full !py-5 text-[10px] uppercase tracking-[0.4em] font-bold">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const News = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const featuredNews = [
    {
      id: 'feat-1',
      title: 'Zimbabwe Brahman Breeders Society Annual Sale Results',
      content: 'The 2026 Annual National Brahman Sale saw record-breaking prices as demand for high-quality genetics continues to rise across the region. Top bulls averaged significantly higher than previous years, reflecting the growing confidence in Zimbabwean Brahman bloodlines.',
      date: 'April 2, 2026',
      imageUrl: 'https://picsum.photos/seed/brahman-sale/800/450'
    },
    {
      id: 'feat-2',
      title: 'New Import Regulations for Cattle Genetics in SADC Region',
      content: 'Recent updates to the SADC protocol on animal health have introduced new streamlined processes for the movement of semen and embryos between member states. This is expected to facilitate easier access to elite South African and Australian bloodlines for local breeders.',
      date: 'March 25, 2026',
      imageUrl: 'https://picsum.photos/seed/genetics-news/800/450'
    },
    {
      id: 'feat-3',
      title: 'JLK Brahmans Expands Elite Donor Cow Program',
      content: 'We are proud to announce the addition of three new donor cows to our intensive embryo transfer program. These females represent some of the most consistent and high-performing maternal lines in our herd, focusing on fertility and udder quality.',
      date: 'March 15, 2026',
      imageUrl: 'https://picsum.photos/seed/donor-cow/800/450'
    },
    {
      id: 'feat-4',
      title: 'Sustainable Ranching: Managing Veld During the Dry Season',
      content: 'As we enter the dry season, effective veld management becomes critical for maintaining herd condition. Experts recommend strategic rotational grazing and early supplementation to ensure that breeding females remain at optimal body condition scores.',
      date: 'March 5, 2026',
      imageUrl: 'https://picsum.photos/seed/veld-management/800/450'
    }
  ];

  useEffect(() => {
    const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const allNews = [...posts, ...featuredNews];

  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-maroon/5 -skew-x-12 translate-x-32 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="subheading">Industry Updates</span>
          <h1 className="heading-lg !text-6xl md:!text-8xl">Latest <br /><span className="italic text-brand-red">News.</span></h1>
          <p className="text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
            Stay updated with the latest happenings at JLK Brahmans and the wider Zimbabwean cattle industry.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-brand-gray/40 font-serif text-2xl animate-pulse italic">Loading news...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {allNews.map((post, i) => (
              <motion.article 
                key={post.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/9] bg-brand-dark overflow-hidden mb-10 rounded-[3rem] shadow-2xl">
                  <img 
                    src={post.imageUrl || `https://picsum.photos/seed/news-${post.id}/800/450`} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-4">
                  <div className="text-brand-red text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
                    {post.createdAt?.toDate().toLocaleDateString() || post.date || 'Recent News'}
                  </div>
                  <h3 className="text-4xl font-serif mb-6 group-hover:text-brand-red transition-colors leading-tight tracking-tight">{post.title}</h3>
                  <p className="text-brand-gray/60 leading-relaxed mb-10 line-clamp-3 font-light">{post.content}</p>
                  <button className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px] flex items-center gap-3 group-hover:gap-5 transition-all">
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
            
            {allNews.length === 0 && (
              <div className="col-span-2 text-center py-32 bg-white rounded-[4rem] shadow-xl border border-brand-maroon/5">
                <p className="text-brand-gray/40 italic font-serif text-2xl">No news articles found. Check back soon for updates!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Sale = () => {
  const [saleCattle, setSaleCattle] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'cattle'), where('isForSale', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSaleCattle(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-maroon/5 -skew-x-12 translate-x-32 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="subheading">Opportunities</span>
          <h1 className="heading-lg !text-6xl md:!text-8xl">Buy from <br /><span className="italic text-brand-red">JLK Brahmans.</span></h1>
          <p className="text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
            Invest in the future of your herd. We offer a select group of elite bulls, donor cows, and commercial genetics for sale throughout the year.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-brand-maroon/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-brand-maroon border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {saleCattle.length > 0 ? saleCattle.map((animal, i) => (
              <motion.div 
                key={animal.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={animal.imageUrl || "https://images.unsplash.com/photo-1545468835-3024172cd35e?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt={animal.name} />
                  <div className="absolute top-8 left-8 bg-brand-red text-white text-[10px] uppercase font-bold tracking-[0.4em] px-6 py-2.5 rounded-full shadow-2xl backdrop-blur-md">Available</div>
                </div>
                <div className="p-12">
                  <h3 className="text-3xl font-serif mb-3 tracking-tight group-hover:text-brand-red transition-colors">{animal.name}</h3>
                  <p className="text-brand-gray/50 text-[10px] uppercase tracking-[0.4em] font-bold mb-10">{animal.registrationNumber}</p>
                  <div className="flex justify-between items-center pt-8 border-t border-brand-maroon/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gray/40 mb-1">Price</span>
                      <span className="text-brand-red font-serif text-2xl tracking-tighter">{animal.price || 'Inquire'}</span>
                    </div>
                    <Link to={`/cattle/${animal.id}`} className="btn-outline !py-3 !px-6 text-[10px] uppercase tracking-[0.2em] font-bold">Inquire Now</Link>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center py-32 text-brand-gray/40 italic bg-white/50 rounded-[3rem] border-2 border-dashed border-brand-maroon/10">
                <div className="max-w-md mx-auto">
                  <Search className="w-12 h-12 mx-auto mb-6 opacity-20" />
                  <p className="text-lg font-serif mb-2">No cattle currently for sale.</p>
                  <p className="text-sm">Check back soon or contact us for private treaty opportunities.</p>
                  <Link to="/contact" className="btn-primary mt-8 inline-block">Contact Sales Team</Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Resources = () => {
  const guides = [
    { title: 'Brahman Breeding Guide', size: '4.2 MB', type: 'PDF', desc: 'Comprehensive selection and genetics manual for African conditions.' },
    { title: 'Calving Management', size: '2.8 MB', type: 'PDF', desc: 'Best practices for ensuring healthy calves and high weaning rates.' },
    { title: 'Nutrition & Veld Management', size: '3.5 MB', type: 'PDF', desc: 'Optimizing natural grazing in the Zimbabwean climate.' }
  ];

  const articles = [
    { 
      title: 'Resilience in the Lowveld', 
      date: 'March 2026', 
      excerpt: 'How the Brahman breed has revolutionized cattle ranching in Zimbabwe\'s harshest environments.',
      readTime: '8 min'
    },
    { 
      title: 'Tick Resistance Strategies', 
      date: 'February 2026', 
      excerpt: 'Leveraging natural Brahman immunity to reduce chemical dipping costs and improve herd health.',
      readTime: '12 min'
    },
    { 
      title: 'The Future of Beef Exports', 
      date: 'January 2026', 
      excerpt: 'Positioning Zimbabwean Brahman genetics for the global premium beef market.',
      readTime: '10 min'
    }
  ];

  const organizations = [
    { name: 'Zimbabwe Brahman Breeders Society', url: 'https://www.brahman.co.zw', desc: 'The official breed society for Brahmans in Zimbabwe.' },
    { name: 'Agricultural Research Council (ARC)', url: 'https://www.arc.org.zw', desc: 'Leading agricultural research and development in the region.' },
    { name: 'Zimbabwe Farmers Union (ZFU)', url: 'https://www.zfu.org.zw', desc: 'Representing the interests of farmers across the nation.' },
    { name: 'Department of Veterinary Services', url: 'https://www.dlvs.gov.zw', desc: 'National authority for animal health and disease control.' }
  ];

  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-maroon/5 -skew-x-12 translate-x-32 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="subheading">Knowledge Hub</span>
          <h1 className="heading-lg !text-6xl md:!text-8xl">Breeder <br /><span className="italic text-brand-red">Resources.</span></h1>
          <p className="text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
            Empowering the next generation of Zimbabwean breeders. Access our curated library of expert guides, research articles, and industry connections.
          </p>
        </div>

        {/* Downloadable Guides */}
        <section className="mb-32">
          <div className="flex items-center gap-8 mb-16">
            <h2 className="text-3xl font-serif tracking-tight whitespace-nowrap">Breeding Guides</h2>
            <div className="h-[1px] flex-grow bg-brand-maroon/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {guides.map((guide, i) => (
              <motion.div 
                key={guide.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 bg-brand-red/5 text-brand-red rounded-2xl flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                    <Download className="w-8 h-8" />
                  </div>
                  <div className="text-[10px] font-bold text-brand-gray/30 uppercase tracking-[0.4em]">{guide.size} • {guide.type}</div>
                </div>
                <h3 className="text-2xl font-serif mb-6 group-hover:text-brand-red transition-colors tracking-tight">{guide.title}</h3>
                <p className="text-brand-gray/60 text-sm leading-relaxed mb-10 font-light">{guide.desc}</p>
                <button className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px] flex items-center gap-3 group-hover:gap-5 transition-all">
                  Download Guide <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Research Articles */}
        <section className="mb-32">
          <div className="flex items-center gap-8 mb-16">
            <h2 className="text-3xl font-serif tracking-tight whitespace-nowrap">Research & Insights</h2>
            <div className="h-[1px] flex-grow bg-brand-maroon/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {articles.map((article, i) => (
              <motion.div 
                key={article.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="text-brand-red text-[10px] font-bold uppercase tracking-[0.4em] mb-6">{article.date} • {article.readTime} Read</div>
                <h3 className="text-3xl font-serif mb-6 group-hover:text-brand-red transition-colors tracking-tight leading-tight">{article.title}</h3>
                <p className="text-brand-gray/60 text-sm leading-relaxed mb-10 font-light">{article.excerpt}</p>
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Industry Links */}
        <section>
          <div className="flex items-center gap-8 mb-16">
            <h2 className="text-3xl font-serif tracking-tight whitespace-nowrap">Industry Connections</h2>
            <div className="h-[1px] flex-grow bg-brand-maroon/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {organizations.map((org, i) => (
              <motion.a 
                key={org.name} 
                href={org.url} 
                target="_blank" 
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-brand-maroon/5 group"
              >
                <div className="w-10 h-10 bg-brand-red/5 rounded-xl flex items-center justify-center mb-8 group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif mb-4 tracking-tight group-hover:text-brand-red transition-colors">{org.name}</h3>
                <p className="text-brand-gray/60 text-xs leading-relaxed font-light">{org.desc}</p>
              </motion.a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const Careers = () => {
  const jobs = [
    { title: 'Ranch Hand', type: 'Full-time', location: 'Harare', desc: 'Seeking an experienced ranch hand for daily cattle management and veld maintenance.' },
    { title: 'Livestock Geneticist', type: 'Consultant', location: 'Remote/Harare', desc: 'Expert in Brahman genetics to assist with our ET and AI program planning.' },
    { title: 'Marketing Coordinator', type: 'Part-time', location: 'Harare', desc: 'Passionate about agriculture and social media to manage our digital presence.' }
  ];

  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-maroon/5 -skew-x-12 translate-x-32 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="subheading">Join the Legacy</span>
          <h1 className="heading-lg !text-6xl md:!text-8xl">Careers at <br /><span className="italic text-brand-red">JLK.</span></h1>
          <p className="text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
            We are always looking for passionate individuals who share our commitment to genetic excellence and sustainable ranching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {jobs.map((job, i) => (
            <motion.div 
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-12 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="text-brand-red font-bold text-[10px] uppercase tracking-[0.4em] mb-4">{job.type} • {job.location}</div>
              <h3 className="text-2xl font-serif mb-6 tracking-tight">{job.title}</h3>
              <p className="text-brand-gray/60 text-sm leading-relaxed mb-10 font-light">{job.desc}</p>
              <Link to="/contact" className="btn-outline !py-3 w-full text-center block text-[10px] uppercase tracking-[0.2em] font-bold">Apply Now</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AICertificate = () => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <Dna className="w-full h-full" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <span className="subheading">Documentation</span>
            <h1 className="heading-lg !text-6xl md:!text-8xl">AI Certificate <br /><span className="italic text-brand-red">Request.</span></h1>
            <p className="text-xl text-brand-gray/70 leading-relaxed mb-12 font-light max-w-xl">
              Request official Artificial Insemination certificates for your JLK-sired calves. Please provide accurate details for breed society registration.
            </p>
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-brand-maroon/5">
              <h4 className="font-serif text-xl mb-6">Required Information</h4>
              <ul className="space-y-4 text-sm text-brand-gray/60">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> Dam Registration Number</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> Date of Insemination</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> Sire Name & Batch Number</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-red rounded-full" /> Owner Details</li>
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-brand-maroon/5"
          >
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Request submitted. Our team will verify and send the certificate via email.'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gray/40 ml-1">Owner Name</label>
                  <input required type="text" className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gray/40 ml-1">Email</label>
                  <input required type="email" className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gray/40 ml-1">Sire Name</label>
                  <input required type="text" className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gray/40 ml-1">Dam Reg #</label>
                  <input required type="text" className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gray/40 ml-1">Insemination Date</label>
                <input required type="date" className="w-full bg-brand-cream/30 border border-brand-maroon/5 px-6 py-4 rounded-2xl outline-none focus:border-brand-red transition-all" />
              </div>
              <button className="btn-primary w-full !py-5 text-[10px] uppercase tracking-[0.4em] font-bold">
                Request Certificate
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const BottomNav = () => {
  const navItems = [
    { label: 'Home', path: '/', icon: Globe },
    { label: 'About', path: '/about', icon: Users },
    { label: 'Sales', path: '/sale', icon: Trophy },
    { label: 'Sires', path: '/sires', icon: Award },
    { label: 'Cows', path: '/genetics?cat=cow', icon: Dna },
    { label: 'Learn', path: '/breeding-education', icon: BookOpen },
    { label: 'New to Brahman', path: '/resources', icon: Target },
    { label: 'Blog', path: '/news', icon: Newspaper },
    { label: 'Careers', path: '/careers', icon: Briefcase },
    { label: 'Contact', path: '/contact', icon: Mail },
    { label: 'AI Request', path: '/ai-request', icon: FileBadge },
  ];

  return (
    <div className="w-full bg-brand-dark py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.path} 
              className="flex flex-col items-center gap-2 group transition-all"
            >
              <item.icon className="w-5 h-5 text-white/30 group-hover:text-brand-red transition-colors" />
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 group-hover:text-white transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <ScrollToTopButton />
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      
      {!showSplash && (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/sires" element={<Sires />} />
              <Route path="/champions" element={<Champions />} />
              <Route path="/juniors" element={<Juniors />} />
              <Route path="/news" element={<News />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/genetics" element={<GeneticsDatabase />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/team" element={<OurTeam />} />
              <Route path="/breeding-education" element={<BrahmanBreeding />} />
              <Route path="/cattle/:id" element={<div className="pt-40 text-center font-serif text-3xl">Animal Pedigree Details</div>} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/ai-request" element={<AICertificate />} />
            </Routes>
          </main>
          <BottomNav />
          <Footer />
        </div>
      )}
    </Router>
  );
}
