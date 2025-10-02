import { app } from "@/atoms/kuepa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"
import { useLeadForm } from "./hooks/useLeadForm"
import { useNavigate, useParams } from "react-router-dom";

export interface LeadsProps {
}

export default function LeadForm (props?: LeadsProps) {

  const { id } = useParams();
  const navigate = useNavigate()

  const {
    form, 
    loading,
    programs,
    shouldRedirect,
    handleChange,
    handleChangeSelect,
    handleSubmit,
  } = useLeadForm({
    first_name: "",
    last_name: "",
    email: "",
    mobile_phone: "",
    interestProgram: ""
  }, id)

  useEffect(() => {
    
    if (shouldRedirect) {
      navigate('/leads');
    }

   },[shouldRedirect])

  useEffect(() => {
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
        },
        {
          title: 'New',
          url: '/leads/new'
        }
      ]
    })
  }, [])

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="flex text-4xl font-title text-purple-800 mb-6">{id ? 'Editar' : 'Crear nuevo'} Lead</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {id ? 'Editar' : 'Crear nuevo'} Lead
        </h2>

        <div className="mb-4">
          <Label htmlFor="first_name">
            Nombres
          </Label>
          <Input
            id="first_name"
            name="first_name"
            type="text"
            placeholder="Tus nombres"
            value={form.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="last_name">
            Apellidos
          </Label>
          <Input
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Tus apellidos"
            value={form.last_name}
            onChange={handleChange}
            required
          />
        </div>
         <div className="mb-4">
          <Label htmlFor="email">
            Correo
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="mobile_phone">
            Teléfono 
          </Label>
          <Input
            id="mobile_phone"
            name="mobile_phone"
            type="tel"
            pattern="[0-9]{10}"
            placeholder="Ej: 3013690003"
            value={form.mobile_phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="program">
            Programa de Interés
          </Label>
          <Select
            name="program"
            value={form.interestProgram}
            onValueChange={
              (value) => {
                handleChangeSelect({ name: "interestProgram", value})
              }
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un programa" />
            </SelectTrigger>

            <SelectContent>
              {
                programs.map(program => (
                  <SelectItem key={program.value} value={program.value}>
                    {program.label}
                  </SelectItem>

                ))
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row justify-between">
          <Button
            type="submit"
            disabled={loading}
            tone="purple"
          >
            {loading ? "Guardando..." : "Crear Lead"}
          </Button>
          <Button
            to="/leads"     
            tone="slate"    
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}