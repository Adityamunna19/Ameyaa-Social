import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/auth/AuthModal';

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <AuthModal isOpen={true} onClose={handleClose} />
    </div>
  );
}