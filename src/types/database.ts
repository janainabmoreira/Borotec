export type DbLead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  created_at: string;
};

export type DbBlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  image: string | null;
  content: string;
  faqs: Array<{ q: string; a: string }>;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type DbProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string | null;
  gallery: string[];
  cable: string;
  probe: string;
  camera: string;
  ip: string;
  active: boolean;
  seo_title: string | null;
  seo_description: string | null;
  spec_labels: { probe?: string; cable?: string; camera?: string; ip?: string } | null;
  created_at: string;
  updated_at: string;
};

export type DbProductDetails = {
  product_id: string;
  manual_url: string | null;
  accessories_tip: string | null;
  features: Array<{ icon_name: string; label: string; sublabel: string }>;
  specs_description: string | null;
  specs_left: Array<{
    title: string;
    icon_name: string;
    rows: Array<{ label: string; value: string; highlight?: string }>;
  }>;
  specs_right: Array<{
    title: string;
    icon_name: string;
    rows: Array<{ label: string; value: string; highlight?: string }>;
  }>;
  accessories: Array<{
    model: string;
    probeDiameter: string;
    rigidity: string;
    cableDiameter: string;
    cameraType: string;
    coating: string;
    length: string;
  }>;
  accessories_table: Array<{ title: string; columns: string[]; rows: string[][] }> | null;
  accessories_list: string[];
  applications: string[];
  faqs: Array<{ question: string; answer: string }>;
  videos: Array<{ title: string; duration: string; url?: string }>;
};
