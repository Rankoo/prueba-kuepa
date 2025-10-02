import { leadService } from "@/services/leadService"
import { useState } from "react"

export function useLeads() {
  interface Lead {
    _id: string
    full_name: string
    email: string
    mobile_phone: string
    status: string
    interestProgram: {
      name: string
      description: string
    }
  }

  const [leads, setLeads] = useState<Lead[]>([])

  const fetchLeads = async () => {
    try {
      leadService.getAll().then(({ list }) => {
        setLeads(list)
      })

    } catch (err) {
      console.error("Error al cargar leads:", err)
    }
  }

  const changeLeadStatus = async (id) => {
    const newLeads = [...leads]
    const index = newLeads.findIndex(lead => lead._id === id)
    if (index != -1) {
      const response = await leadService.post({ 
        _data: { 
          _id: id, 
          status: newLeads[index].status === "active" ? 'inactive':'active' 
        }
      }).then(({ object:leadModified }) => {
        newLeads[index] = {...newLeads[index], status: leadModified.status}
        setLeads(newLeads)
      })
    }
  }

  return { leads, fetchLeads, changeLeadStatus }
}
