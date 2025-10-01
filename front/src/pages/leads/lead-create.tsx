import { app, user } from "@/atoms/kuepa"
import { useToast } from "@/components/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { leadService } from "@/services/leadService"
import { programService } from "@/services/programService"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export interface LeadsProps {
}

export default function LeadCreate (props?: LeadsProps) {

 const { t } = useTranslation()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_phone: "",
    interestProgram: ""
  })

  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      console.log(formData);
      
      const response = await leadService.post({_data: formData})
      toast({
        title: "¡Lead guardado!",
        description: "Lead guardado exitosamente",
      })
      // setMessage("✅ Lead creado con éxito")
      setFormData({
        ...formData,
        first_name: "",
        last_name: "",
        email: "",
        mobile_phone: ""
      }) // limpiar form
    } catch (err) {
      console.error(err)
      setMessage("❌ Error al crear el lead")
    } finally {
      setLoading(false)
    }
  }

  const init = async () => {
    programService.getAll().then(({list})=>{
      setPrograms(list.map(({_id, name}) => ({value: _id, label: name})))
    })
  }

  useEffect(() => {
    init()
    app.set({
      ...(app.get() || {}),
      app: 'kuepa',      module: 'leads',
      window: 'crm',
      back: null,
      accent: 'purple',
      breadcrumb:[
        {
          title: 'Leads',
          url: '/leads'
        }
      ]
    })
  }, [])

  return (
    <div className="p-6">
      <h1 className="flex text-4xl font-title text-purple-800 mb-6">¡Hola Aswinnn!</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Crear nuevo Lead
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
            value={formData.first_name}
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
            value={formData.last_name}
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
            value={formData.email}
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
            value={formData.mobile_phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="program">
            Programa en el que estas interesado 
          </Label>
          <Select name="program" value={formData.interestProgram} onValueChange={(value)=>{ setFormData({...formData, interestProgram: value})}}>
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
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Crear Lead"}
        </button>

        {message && (
          <p className="mt-3 text-sm font-medium text-gray-700">{message}</p>
        )}
      </form>
    </div>
  )
}