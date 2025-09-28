import { XIcon } from "lucide-react"

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
  useSidebar,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { useChoices } from "@/hooks/useChoices"

export function AppSidebar() {
  const { choices, setChoices } = useChoices();
  const { toggleSidebar } = useSidebar();

  const handleAddEntry = () => {
    setChoices([...choices, {input: "", id: crypto.randomUUID()}])
  }

  const handleUpdateEntry = (index: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    const updatedChoices = choices.map((choice) => {
      return choice.id === index ? { ...choice, ["input"]: newInput, ["id"]: index} : choice
    })
    
    setChoices(updatedChoices)
  }

  const handleRemoveEntry = (idToRemove: string) => {
    setChoices(choices.filter(choice => choice.id != idToRemove))
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {choices.map((choice) => (
                <SidebarMenuItem key={choice.id} className="flex items-center justify-center">
                  <Input className="mb-2 mt-2 mr-1 flex-14" onChange={(e) => handleUpdateEntry(choice.id, e)} value={choice.input}/>
                  <SidebarMenuButton className="flex-1" onClick={() => handleRemoveEntry(choice.id)}><XIcon /></SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuButton onClick={handleAddEntry}>+ Add Entry</SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton className="flex items-center justify-center" style={{backgroundColor: "#d3cfc7"}}>Save Changes</SidebarMenuButton>
        <SidebarMenuButton className="flex items-center justify-center" style={{backgroundColor: "#f5f5dc"}} onClick={toggleSidebar}>Close</SidebarMenuButton>
        </SidebarFooter>
    </Sidebar>
  )
}