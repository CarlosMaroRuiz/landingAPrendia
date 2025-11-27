import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from "../../../../../common/iu/components/atoms/button"
import ModalMessage from "../../../../../common/iu/components/molecules/modalMessage"
import {ForgotPassword, TitleLogin} from "../molecules"
import { InputsForm } from "../organisms"
import { loginUser } from "../../../services"

const FormLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');
  const navigate = useNavigate();

  const handleInputChange = (data) => {
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.password) {
      setModalMessage('Por favor completa todos los campos');
      setModalType('error');
      setModalOpen(true);
      setLoading(false);
      return;
    }

    const result = await loginUser(formData.username, formData.password);

    if (result.success) {
      setModalMessage('¡Inicio de sesión exitoso!');
      setModalType('success');
      setModalOpen(true);
      setTimeout(() => {
        navigate('/gestion');
      }, 1500);
    } else {
      setModalMessage(result.error || 'Error al iniciar sesión');
      setModalType('error');
      setModalOpen(true);
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl py-8 sm:py-10 px-6 sm:px-11 w-full ">
        <TitleLogin/>
        <InputsForm formData={formData} onInputChange={handleInputChange} />

        <PrimaryButton
          text={loading ? "Iniciando..." : "Iniciar Sesión"}
          className={"w-full py-2 sm:py-3 text-sm mt-19"}
          disabled={loading}
          type="submit"
        />
      </form>

      <ModalMessage
        message={modalMessage}
        type={modalType}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        duration={modalType === 'success' ? 1500 : 3000}
      />
    </>
  );
}

export default FormLogin