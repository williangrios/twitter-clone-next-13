import { SVGProps } from "react"

interface SidebarMenuItemProps{
    href: string,
    caption: string,
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    active?: boolean;
}

export default function SidebarMenuItem(props: SidebarMenuItemProps) {
  return (
    <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
        <props.icon className="h-7" />
        <span className={`${props.active && "font-bold"} hidden xl:inline`}>{props.caption}</span>
    </div>
  )
}
