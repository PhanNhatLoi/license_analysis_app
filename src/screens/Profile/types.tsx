export type menuItemType = {
  id: number;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  required?: boolean;
};
