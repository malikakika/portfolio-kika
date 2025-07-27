import '../styles/home.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';




import '../styles/home.css';
import HeroImage from '../assets/malika-hero.png'

export default function Home() {
  return (
    <section className="hero-wrapper">
      <div className="hero-content">
        <span className="hero-badge">Hello 👋</span>
        <h1 className="hero-title">
          Je suis <span className="highlight-orange">Malika</span>,<br /> Développeuse Fullstack
        </h1>
        <p className="hero-desc">
          Spécialisée en React, Angular, NestJS, je conçois des applications performantes & modernes.
        </p>

        <div className="hero-buttons">
<a href="https://www.linkedin.com/in/malika-choubri" className="btn linkedin" target="_blank" rel="noreferrer">
    <LinkedInIcon style={{ fontSize: '20px' }} /> LinkedIn
  </a>          <a href="https://github.com/malikakika" className="btn github" target="_blank" rel="noreferrer">
    <GitHubIcon style={{ fontSize: '20px' }} /> GitHub
  </a>
        </div>
      </div>

      <div className="hero-image">
        <img src={HeroImage} alt="Malika Choubri" />
        <div className="hero-badge-exp">
          <strong>4+</strong> ans d’expérience
        </div>
      </div>
    </section>
  );
}

