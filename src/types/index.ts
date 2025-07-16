export type ListItemState = 'done' | 'pending';

export enum CategoryType {
    Work = 'work',
    Health = 'health',
    Personal = 'personal',
  }

export interface ListItem {
  id: string;
  description: string;
  state: ListItemState;
  category: CategoryType;
}