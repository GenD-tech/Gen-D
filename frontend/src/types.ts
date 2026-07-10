export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // To match lucide-react icon names
  color: string; // Tailwind accent class color, e.g. "from-purple-500 to-indigo-500"
  hoverBg: string; // Tailwind hover color
  features: string[];
  metricValue: string;
  metricLabel: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string;
  metricValue?: string;
  metricLabel?: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  buttonText: string;
  accentColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isOfflineMode?: boolean;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  category: string;
  client: string;
  imageUrl: string;
  statsValue: string;
  statsLabel: string;
  link: string;
}
