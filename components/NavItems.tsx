"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Users, Map } from "lucide-react"

const navItems = [
	{ label: "Home", href: "/Home", icon: Home },
	{ label: "Companions", href: "/companions", icon: Users },
	{ label: "My Journey", href: "/my-journey", icon: Map },
	{ label: "Subscription", href: "/subscription", icon: Map },
]

const NavItems = () => {
	const pathname = usePathname()

	return (
		<nav className="flex items-center gap-6">
			{navItems.map(({ label, href, icon: Icon }) => {
				const isActive = pathname === href
				return (
					<Link
						href={href}
						key={label}
						className={cn(
							"flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[#EFBCD5]/10",
							isActive
								? "text-[#E84855] bg-[#EFBCD5]/20 font-semibold"
								: "text-[#403F4C] hover:text-[#E84855]",
						)}
					>
						<Icon className="w-4 h-4" />
						<span className="max-sm:hidden">{label}</span>
					</Link>
				)
			})}
		</nav>
	)
}

export default NavItems
