import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from "../../../../../common/iu/components/atoms/button"
import {ForgotPassword, TitleLogin} from "../molecules"
import { InputsForm } from "../organisms"
import { loginUser } from "../../../services"

const FormLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (data) => {
    setFormData(data);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.username || !formData.password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    const result = await loginUser(formData.username, formData.password);

    if (result.success) {
      navigate('/gestion');
    } else {
      setError(result.error || 'Error al iniciar sesión');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#FFFFFF] border-1 border-[#E5E7EB] rounded-xl py-10 px-11 w-full ml-10">
      <TitleLogin/>
      <InputsForm formData={formData} onInputChange={handleInputChange} />
      <ForgotPassword/>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mt-4">
          {error}
        </div>
      )}
      <PrimaryButton
        text={loading ? "Iniciando..." : "Iniciar Sesión"}
        className={"w-full py-1 text-sm"}
        disabled={loading}
        type="submit"
      />
    </form>
  );
}

export default FormLogin