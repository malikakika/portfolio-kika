import '../styles/globals.css';

export default function Services() {
  return (
    <section className="services-section">
      <h2 className="services-title">Mes Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <h3>UI/UX Design</h3>
          <p>Création de maquettes modernes et intuitives. Tests utilisateurs et design system.</p>
        </div>
        <div className="service-card">
          <h3>Développement Web</h3>
          <p>Sites et applications responsives, performants, en React, Angular, Next.js.</p>
        </div>
        <div className="service-card">
          <h3>Applications Mobiles</h3>
          <p>Création d'applications mobiles cross-plateformes avec Flutter et PWA.</p>
        </div>
        <div className="service-card">
          <h3>Accompagnement Projet</h3>
          <p>Conseil technique, gestion Agile, MVP, planification et suivi de projet.</p>
        </div>
      </div>
    </section>
  );
}
