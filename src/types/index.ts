export type ListItemState = 'done' | 'pending';

export interface ListItem {
  id: string;
  description: string;
  state: ListItemState;
}
