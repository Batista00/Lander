import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const status = location.pathname.split('/')[2]; // success, failure, o pending

  const getContent = () => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircleIcon className="h-20 w-20 text-green-500" />,
          title: '¡Pago exitoso!',
          message: 'Tu suscripción ha sido activada correctamente.',
          buttonText: 'Ir al Dashboard',
          buttonAction: () => navigate('/dashboard'),
          buttonColor: 'bg-green-600 hover:bg-green-700'
        };
      case 'failure':
        return {
          icon: <XCircleIcon className="h-20 w-20 text-red-500" />,
          title: 'Error en el pago',
          message: 'Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.',
          buttonText: 'Intentar de nuevo',
          buttonAction: () => navigate('/pricing'),
          buttonColor: 'bg-red-600 hover:bg-red-700'
        };
      case 'pending':
        return {
          icon: <ClockIcon className="h-20 w-20 text-yellow-500" />,
          title: 'Pago pendiente',
          message: 'Tu pago está siendo procesado. Te notificaremos cuando se complete.',
          buttonText: 'Ir al inicio',
          buttonAction: () => navigate('/'),
          buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
        };
      default:
        return {
          icon: <XCircleIcon className="h-20 w-20 text-gray-500" />,
          title: 'Estado desconocido',
          message: 'No pudimos determinar el estado de tu pago.',
          buttonText: 'Ir al inicio',
          buttonAction: () => navigate('/'),
          buttonColor: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {content.icon}
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {content.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {content.message}
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={content.buttonAction}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${content.buttonColor}`}
            >
              {content.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
