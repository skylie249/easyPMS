export type Project = {
  id: string;
  name: string;
  client_name: string | null;
  start_date: string | null;
  end_date: string | null;
  memo: string | null;
  share_code: string;
  created_at: string;
};

export type ChecklistCategory = {
  id: string;
  project_id: string;
  name: string;
  sort_order: number;
  is_custom: boolean;
  created_at: string;
};

export type ChecklistItem = {
  id: string;
  category_id: string;
  project_id: string;
  title: string;
  description: string | null;
  is_checked: boolean;
  checked_at: string | null;
  sort_order: number;
  is_custom: boolean;
  source: "template" | "custom";
  created_at: string;
  updated_at: string;
};

export type TemplateCategory = {
  id: string;
  name: string;
  sort_order: number;
  locale: string;
};

export type TemplateItem = {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  locale: string;
};

export type CategoryWithItems = ChecklistCategory & {
  items: ChecklistItem[];
};
