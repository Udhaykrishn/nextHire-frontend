export interface User {
  role: string;
  id?: string;
  email: string;
  name: string;
  phone: string;
  experience: string;
  role_of_title: string;
  location?: string;
  status: string;
  resume_url: {
    key: string;
    url: string;
  };
  profile_url: {
    key: string;
    url: string;
  };
  bio: string;
  badge: boolean;
  google_id: string;
  subscription: {
    current_plan: string;
    is_subscribed: boolean;
  };
  social_link: {
    linkedin: string;
    portfolio: string;
    github: string;
  };
  skills: string[];
  languages: {
    name: string;
    proficiency: string;
  }[];
  createdAt?: string | Date;
}
