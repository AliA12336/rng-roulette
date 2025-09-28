import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { XIcon } from "lucide-react"
import { useContext } from "react"
import { ChoicesContext } from "@/hooks/ChoicesContext"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    
    icon: Settings,
  },
]

export function AppSidebar() {
  const choiceCtx = useContext(ChoicesContext)

  if (!choiceCtx) throw new Error("choices context must be used within Provider")
  const { choices, setChoices } = choiceCtx;

  const handleAddEntry = () => {
    setChoices([...choices, {input: "", id: choices.length}])
  }

  const handleUpdateEntry = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
  const newInput = e.target.value;
    console.log("handle update entry", index, newInput)
    const updatedChoices = choices.map((choice, i) => {
      return i === index ? { ...choice, ["input"]: newInput, ["id"]: index} : choice
    })
    
    setChoices(updatedChoices)
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {choices.map((choice) => (
                <SidebarMenuItem key={choice.id} className="flex-1 flex items-center justify-center">
                  <Input className="mb-2 mt-2 mr-2" onChange={(e) => handleUpdateEntry(choice.id, e)} value={choice.input}/>
                  <XIcon />
                </SidebarMenuItem>
              ))}
              <SidebarMenuButton onClick={handleAddEntry}>+ Add Entry</SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton>Save Changes</SidebarMenuButton>
        <SidebarMenuButton>Close</SidebarMenuButton>
        </SidebarFooter>
    </Sidebar>
  )
}