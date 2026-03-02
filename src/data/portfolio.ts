import type { Project, AboutData } from '@/types';

export const aboutData: AboutData = {
  name: "Roji Maharjan",
  title: "Fashion Designer",
  bio: `Roji Maharjan, known as "Rose" in the fashion community, is a dynamic and adaptable fashion design graduate with excellent time management skills and a track record of meeting deadlines in fast-moving settings. 

Experienced in both creative design and client interaction, supported by a strong foundation in marketing, sales, and leadership through AIESEC. Adept at merging creative vision with functional execution and effective teamwork across departments.

Excited to bring innovation, organization, and a strong sense of storytelling to forward-thinking fashion teams.`,
  image: "/images/about-sketch.jpg",
  cvUrl: "/cv/roji-maharjan-cv.pdf",
  social: {
    instagram: "https://www.instagram.com/rojii______/",
    pinterest: "https://www.pinterest.com/rojimaharjan",
    linkedin: "https://www.linkedin.com/in/roji-maharjan-61ab672bb/"
  }
};

export const initialProjects: Project[] = [
  {
    id: "1",
    title: "Summer Collection",
    description: "A vibrant summer collection featuring light fabrics and bright colors.",
    image: "/images/summer-collection.jpg",
    category: "clothing",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Evening Gowns",
    description: "Elegant evening wear designed for formal occasions.",
    image: "/images/evening-gowns.jpg",
    category: "formal",
    createdAt: "2024-02-20"
  },
  {
    id: "3",
    title: "Street Wear",
    description: "Urban-inspired streetwear combining comfort and style.",
    image: "/images/street-wear.jpg",
    category: "casual",
    createdAt: "2024-03-10"
  }
];