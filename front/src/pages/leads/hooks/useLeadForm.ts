import { toast } from "@/components/hooks/use-toast";
import { leadService } from "@/services/leadService";
import { programService } from "@/services/programService";
import { useEffect, useState } from "react";

export function useLeadForm(initialValues =
  {
    first_name: "",
    last_name: "",
    email: "",
    mobile_phone: "",
    interestProgram: ""
  }, id = undefined)
{
  const [form, setForm] = useState(initialValues);
  const [loading, setLoading] = useState(false)
  const [programs, setPrograms] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeSelect = (obj: { name: string, value: string }) => {
    const { name, value } = obj;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setForm(initialValues);

  const init = async () => {
    if (id) {
      leadService.get({ _id: id }).then(({
        lead:{
          first_name,
          last_name,
          email,
          mobile_phone,
          interestProgram: {_id}
        }
      }) => {
        setForm( {
          first_name,
          last_name,
          email,
          mobile_phone,
          interestProgram: _id
        })
      })
    }
    programService.getAll().then(({ list }) => {
      setPrograms(list.map(({ _id, name }) => ({ value: _id, label: name })))
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {

      const response = await leadService.post({ _data: { _id: id, ...form }})
      toast({
        title: "¡Lead guardado!",
        description: "Lead guardado exitosamente",
      })
      resetForm()
      setShouldRedirect(true) // Marca para redireccionar

    } catch (err) {
      toast({
        title: "Error",
        description: "Hubo un error en la creación del lead",
      })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return {
    form,
    programs,
    loading,
    shouldRedirect,
    handleChange,
    handleChangeSelect,
    handleSubmit,
  };
}


