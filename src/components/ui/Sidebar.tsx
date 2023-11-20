import { cn } from '@/lib/utils';

export interface SidebarProps {
  children?: React.ReactNode;
  position: 'left' | 'right';
}

export default function Sidebar({ children, position }: SidebarProps) {
  const id = `sidebar-${position}`;

  return (
    <div
      id={id}
      className={cn(
        "fixed top-[60px] min-h-screen w-[240px] bg-neutral-800 z-50 border-r border-neutral-600",
        {
          "left-0": position === 'left',
          "right-0": position === 'right',
        }
      )} >
      {children}
    </div>
  );
}
