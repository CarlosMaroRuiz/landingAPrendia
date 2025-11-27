import { useState, useEffect } from "react"
import { Input, Select } from "../index"
import TextArea from "../atoms/textarea"
import ModalMessage from "../molecules/modalMessage"
import { getMunicipalitiesByState } from "../../../../features/landing/services/municipalityService"
import { sendFormData } from "../../../../features/landing/services/serviceForm"

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
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalType, setModalType] = useState('success')

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

    // Validación para nombre y apellidos: solo letras españolas, espacios y acentos
    if (name === 'nombre' || name === 'apellidos') {
      // Elimina números y caracteres especiales no permitidos (_,@,/,-,#, etc.)
      // Solo acepta letras (incluyendo acentos y ñ) y espacios
      let filtered = value.replace(/[^a-záéíóúñA-ZÁÉÍÓÚÑ\s]/g, '')

      // Capitaliza la primera letra y cada palabra después de espacio
      filtered = filtered.split(' ').map(word => {
        if (word.length === 0) return word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }).join(' ')

      setFormData(prev => ({
        ...prev,
        [name]: filtered
      }))
    }
    // Validación para teléfono: solo números y máximo 10 dígitos
    else if (name === 'telefono') {
      const onlyNumbers = value.replace(/\D/g, '')
      const limitedNumbers = onlyNumbers.slice(0, 10)
      setFormData(prev => ({
        ...prev,
        [name]: limitedNumbers
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const validateEmail = (email) => {
    // Validación de email: no permitir .@, solo @, o dominios inválidos
    if (!email) return true // Si está vacío, lo validamos después

    // Regex para validar email correctamente
    // No permite punto al inicio, requiere usuario@dominio.extension
    const emailRegex = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Validar que al menos email o teléfono esté lleno
    if (!formData.email && !formData.telefono) {
      setModalMessage('Debe proporcionar al menos un email o número de teléfono para contactarlo.')
      setModalType('error')
      setModalOpen(true)
      setSubmitting(false)
      return
    }

    // Validar formato del email si está presente
    if (formData.email && !validateEmail(formData.email)) {
      setModalMessage('El email no es válido. Verifique que tenga el formato correcto (ej: usuario@gmail.com)')
      setModalType('error')
      setModalOpen(true)
      setSubmitting(false)
      return
    }

    const result = await sendFormData(formData)

    if (result.success) {
      setModalMessage('Formulario enviado correctamente')
      setModalType('success')
      setModalOpen(true)
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
    } else {
      setModalMessage(result.error || 'Error al enviar el formulario. Intente nuevamente.')
      setModalType('error')
      setModalOpen(true)
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
          placeholder="Seleccionar comunidad"
          className="w-full"
          value={formData.comunidad}
          onChange={handleChange}
        />

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
            placeholder="Juan"
            required
            className="w-full"
            value={formData.nombre}
            onChange={handleChange}
          />

          <Input
            label="Apellidos"
            name="apellidos"
            placeholder="Hernandez Lopez"
            required
            className="w-full"
            value={formData.apellidos}
            onChange={handleChange}
          />

    <Input
  label="Correo electrónico"
  name="email"
  type="email"
  placeholder="ejemplo@gmail.com"
  className="w-full"
  required
  value={formData.email}
  onChange={handleChange}
/>
          <div className="w-full">
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-base md:text-lg font-semibold text-gray-800">
                Número de teléfono <span className="text-pink-ia">*</span>
              </label>
              <span className="text-sm text-gray-500">{formData.telefono.length}/10</span>
            </div>
            <input
              type="tel"
              name="telefono"
              placeholder="1234567890"
              maxLength="10"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm md:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-ia transition-colors"
            />
          </div>

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

          <div className="col-span-1 md:col-span-2">
          <TextArea
  label="Por qué me interesa"
  name="motivo"
  placeholder="Hola, estoy interesado en la aplicación APRENDIA y quisiera que me contacten para recibir más información."
  required
  rows={4}
  className="w-full"
  maxLength={200}
  value={formData.motivo}
  onChange={handleChange}
/>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`bg-pink-ia text-white px-8 md:px-10 py-3 rounded-lg text-lg md:text-xl font-bold transition-all duration-200 ease-in-out hover:bg-opacity-90 hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-md flex items-center gap-3 w-full md:w-auto justify-center ${submitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {submitting ? 'Enviando...' : 'Registrarme'}

            </button>
          </div>

        </div>
      </div>

      <ModalMessage
        message={modalMessage}
        type={modalType}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        duration={modalType === 'success' ? 2000 : 3000}
      />
    </form>
  )
}

export default ContactForm
