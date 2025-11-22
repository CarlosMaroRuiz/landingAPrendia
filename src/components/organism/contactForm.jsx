import { useState, useEffect } from "react"
import Input from "../atoms/input"
import Select from "../atoms/select"
import TextArea from "../atoms/textarea"
import { getMunicipalitiesByState } from "../../services/municipalityService"
import { sendFormData } from "../../services/serviceForm"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    comunidad: "",
    otraComunidad: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    municipio: "",
    estado: "Chiapas",
    motivo: ""
  })

  const [municipios, setMunicipios] = useState([])
  const [loadingMunicipios, setLoadingMunicipios] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Cargar municipios al montar el componente (stateId = 1 para Chiapas)
  useEffect(() => {
    const fetchMunicipios = async () => {
      setLoadingMunicipios(true)
      const data = await getMunicipalitiesByState(1)
      setMunicipios(data)
      setLoadingMunicipios(false)
    }

    fetchMunicipios()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus(null)

    const result = await sendFormData(formData)

    if (result.success) {
      setSubmitStatus({ type: 'success', message: 'Formulario enviado correctamente' })
      // Limpiar formulario
      setFormData({
        comunidad: "",
        otraComunidad: "",
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        municipio: "",
        estado: "Chiapas",
        motivo: ""
      })
      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        setSubmitStatus(null)
      }, 3000)
    } else {
      setSubmitStatus({ type: 'error', message: 'Error al enviar el formulario. Intente nuevamente.' })
    }

    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mt-8 md:mt-12 space-y-4 md:space-y-6">
      <div className="w-full">

        <Select
          label="Comunidad a la que pertenece el beneficiario"
          name="comunidad"
          options={["CAM", "USAER", "PARTICULAR", "ADAS", "ASODECH", "OTROS"]}
          required
          placeholder="CAM"
          className="w-full"
          value={formData.comunidad}
          onChange={handleChange}
        />

        {/* Campo condicional para especificar otra comunidad */}
        {formData.comunidad === "OTROS" && (
          <div className="mt-4">
            <Input
              label="Especifique la comunidad"
              name="otraComunidad"
              placeholder="Ingrese el nombre de la comunidad"
              required
              className="w-full"
              value={formData.otraComunidad}
              onChange={handleChange}
            />
          </div>
        )}

        <p className="text-pink-ia text-lg md:text-xl font-semibold my-3">Datos de la persona de contacto</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">

          <Input
            label="Nombre(s)"
            name="nombre"
            placeholder="Víctor"
            required
            className="w-full"
            value={formData.nombre}
            onChange={handleChange}
          />

          <Input
            label="Apellidos"
            name="apellidos"
            placeholder="Perez Constantino"
            required
            className="w-full"
            value={formData.apellidos}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="villalobos@gmail.com"
            required
            className="w-full"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Número de teléfono"
            name="telefono"
            type="tel"
            placeholder="9637894562"
            className="w-full"
            value={formData.telefono}
            onChange={handleChange}
          />

          <Select
            label="Municipio"
            name="municipio"
            options={municipios}
            required
            placeholder={loadingMunicipios ? "Cargando..." : "Seleccionar municipio"}
            className="w-full"
            value={formData.municipio}
            onChange={handleChange}
          />

          <Select
            label="Estado"
            name="estado"
            options={["Chiapas"]}
            required
            className="w-full"
            value={formData.estado}
            onChange={handleChange}
          />

          {/* TextArea ocupa las 2 columnas */}
          <div className="col-span-1 md:col-span-2">
            <TextArea
              label="Por qué me interesa"
              name="motivo"
              placeholder="Hola estoy intersado en la aplicación APRENDIA y quisiera que me contacten para recibir más información."
              required
              rows={4}
              className="w-full"
              maxLength={200}
              value={formData.motivo}
              onChange={handleChange}
            />
          </div>

          {/* Mensaje de estado */}
          {submitStatus && (
            <div className={`col-span-1 md:col-span-2 p-3 rounded-lg text-center ${
              submitStatus.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {submitStatus.message}
            </div>
          )}

          {/* Botón */}
          <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`bg-pink-ia text-white px-8 md:px-10 py-3 rounded-lg text-lg md:text-xl font-bold transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:scale-105 hover:shadow-xl flex items-center gap-3 w-full md:w-auto justify-center ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Enviando...' : 'Enviar'}
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </form>
  )
}

export default ContactForm
