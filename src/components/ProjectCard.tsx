import '../styles/projects.css';

type ProjectCardProps = {
  title: string;
  tech: string;
  description: string;
  image: string;
};

export default function ProjectCard({ title, tech, description, image }: ProjectCardProps) {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-overlay">
        <h3>{title}</h3>
        <p>{tech}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}