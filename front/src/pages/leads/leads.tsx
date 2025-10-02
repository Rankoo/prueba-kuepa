import { app } from "@/atoms/kuepa"
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
import { useLeads } from "./hooks/useLeads"
export interface LeadsProps {
}

export default function Leads(props?: LeadsProps) {

  const { leads, fetchLeads, changeLeadStatus } = useLeads()
  const { t } = useTranslation();
  const badgeColor = (status: string): string => {
    if (status === "active") {
      return "bg-green-200 text-green-700 inset-ring-green-600/20"
    }
    return "bg-red-200 text-red-700 inset-ring-red-600/10"
  }
  useEffect(() => {
    fetchLeads()
    app.set({
      ...(app.get() || {}),
      app: 'kuepa', module: 'leads',
      window: 'crm',
      back: null,
      accent: 'purple',
      breadcrumb: [
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
        Nuevo Lead
      </Button>
      <Table>
        <TableCaption>Listado de leads registrados en el sistema</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Nombre del Interesado</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Programa de Interés</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.map((lead) => {

            return (
              <TableRow key={lead._id}>
                <TableCell>{lead.full_name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.mobile_phone}</TableCell>
                <TableCell>
                  <span className={
                    `inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium inset-ring ${badgeColor(lead.status)} `
                    }>
                    {t(lead.status)}
                  </span>
                </TableCell>
                <TableCell>{lead.interestProgram?.name}</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button tone="blue" to={`/leads/edit/${lead._id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          Editar Lead.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {lead.status === "active" ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button tone="rose" onClick={() => changeLeadStatus(lead._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            Desactivar Lead.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button tone="green" onClick={() => changeLeadStatus(lead._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M15 12h-6" /><path d="M12 9v6" /></svg>
                            </Button>
                          </TooltipTrigger>  
                          <TooltipContent side="top">
                            Activar Lead.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                    )}
                  </div>

                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}