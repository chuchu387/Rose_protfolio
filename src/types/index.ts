export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AboutData {
  name: string;
  title: string;
  bio: string;
  image: string;
  cvUrl: string;
  social: {
    instagram: string;
    pinterest: string;
    linkedin: string;
  };
}
