import { type CSSProperties, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Boxes, Building2, Factory, Handshake, MapPin, PackageCheck, Store, Truck } from 'lucide-react';
import '../business.css';

const resources = [
  { icon: Factory, label: 'Manufacturers', note: 'Find the right makers, from small workshops to scaled production.' },
  { icon: Building2, label: 'Warehouses', note: 'Compare storage partners, locations, facilities and operating fit.' },
  { icon: Store, label: 'Traders', note: 'Meet trusted wholesale, sourcing and distribution partners.' },
  { icon: Truck, label: 'Logistics', note: 'Discover freight, last-mile and regional movement specialists.' },
  { icon: PackageCheck, label: 'Packaging', note: 'Source practical packaging partners for products of every size.' },
  { icon: Handshake, label: 'Local services', note: 'Connect with the people who help business happen on the ground.' },
];

export default function Business() {
  useEffect(() => {
    document.title = 'Let’s Do Business | Nukkad Network';
    window.scrollTo(0, 0);
    return () => { document.title = 'Nukkad Network'; };
  }, []);

  return <main className="biz-page">
    <header className="biz-nav">
      <Link to="/" className="biz-brand">nukkad<span>network</span><i /></Link>
      <nav aria-label="Business navigation">
        <Link to="/">Our story</Link>
        <Link to="/explore">Explore India</Link>
        <Link to="/business" className="biz-active">Let’s Do Business</Link>
        <Link to="/charity-run">28 states, 28 days</Link>
      </nav>
      <span className="biz-nav-note">Local connections. Real business.</span>
    </header>

    <section className="biz-hero">
      <div className="biz-copy">
        <p className="biz-kicker"><span /> NUKKAD FOR BUSINESS</p>
        <div className="biz-status">COMING SOON <small>Bas thoda sa intezaar.</small></div>
        <h1>Good business starts<br />with the <em>right people.</em></h1>
        <p className="biz-lede">A marketplace and practical resource directory for finding manufacturers, warehouses, traders and the local partners who keep things moving.</p>
        <p className="biz-hindi">Kaam ki baat, sahi logon ke saath.</p>
        <div className="biz-actions">
          <Link to="/explore" className="biz-primary">Explore India for now <ArrowRight size={17} /></Link>
          <Link to="/" className="biz-secondary"><ArrowLeft size={16} /> Back to our story</Link>
        </div>
      </div>

      <aside className="biz-board" aria-label="Planned business directory categories">
        <div className="biz-board-top">
          <span><MapPin size={15} /> INDIA-WIDE DIRECTORY</span>
          <Boxes size={24} />
        </div>
        <div className="biz-grid">
          {resources.map(({ icon: Icon, label, note }, index) => <article key={label} style={{ '--delay': `${index * 45}ms` } as CSSProperties}>
            <Icon size={22} />
            <h2>{label}</h2>
            <p>{note}</p>
          </article>)}
        </div>
        <p className="biz-board-note">Listings will be researched and organised before they appear here. No paid placements are being accepted yet.</p>
      </aside>
    </section>

    <footer className="biz-footer"><span>Built for business beyond the usual directories.</span><span>Marketplace and resource list in progress.</span></footer>
  </main>;
}
