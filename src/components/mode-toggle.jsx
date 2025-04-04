import { Moon, Sun } from "lucide-react"

import { Button } from "../components/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/dropdown-menu"
import { useTheme } from "../components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()  // Destructure `theme` to detect the current theme

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon">
          {/* Icons update dynamically based on theme */}
          {theme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem] text-black" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
       {/* Background color fix for visibility */}
       <DropdownMenuContent align="end" className="bg-gray-400 text-black dark:text-white">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
