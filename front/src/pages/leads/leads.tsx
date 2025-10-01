import { app } from "@/atoms/kuepa"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { leadService } from "@/services/leadService"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import { Button, buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
export interface LeadsProps {
}

export default function Leads (props?: LeadsProps) {
  interface Lead {
    _id: string
    full_name: string
    email: string
    mobile_phone: string
    interestProgram: {
      name: string
      description: string
    }
  }

  const [leads, setLeads] = useState<Lead[]>([])
  const fetchLeads = async () => {
    try {
      leadService.getAll().then(({list:data}) => {
        console.log('data:', data);
        setLeads(data)
      })
      
    } catch (err) {
      console.error("Error al cargar leads:", err)
    }
  }

  useEffect(() => {
    fetchLeads()
    app.set({
      ...(app.get() || {}),
      app: 'kuepa',      module: 'leads',
      window: 'crm',
      back: null,
      accent: 'purple',
      breadcrumb:[
        {
          title: 'Home',
          url: '/home'
        },
        {
          title: 'Leads',
          url: '/leads'
        }
      ]
    })
  }, [])

  return (
    <div className="p-6">
      <h1 className="flex text-4xl font-title text-purple-800 mb-6">Contactos</h1>
      <Button tone="purple" to="/leads/new">
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="3"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
      Nuevo Lead
      </Button>
      <Table>
        <TableCaption>Listado de leads registrados en el sistema</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Nombre del Interesado</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Programa de Interes</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.map((lead) => {
            console.log('lead: ', lead);
            return (
            <TableRow key={lead._id}>
              <TableCell>{lead.full_name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.mobile_phone}</TableCell>
              <TableCell>{lead.interestProgram?.name}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Editar Lead.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Borrar Lead.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </div>
  )
}