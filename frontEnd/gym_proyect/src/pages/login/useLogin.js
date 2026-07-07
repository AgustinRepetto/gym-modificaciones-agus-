import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loginService } from '../../services/loginService'

const GOOGLE_CLIENT_ID = "397777478100-8m0sbqbc5d79pj4c0a4vba3ecr2m0o6s.apps.googleusercontent.com"
const GOOGLE_REDIRECT_URI = "http://localhost:5173/auth/login" 
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile&prompt=select_account`

export function useAuthLogin() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const hasCalledGoogle = useRef(false)

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Manejo del flujo de redirección de Google
  useEffect(() => {
    const code = searchParams.get('code')

    if (code && !hasCalledGoogle.current) { 
      hasCalledGoogle.current = true 
      setIsLoading(true)

      const procesarLoginGoogle = async () => {
        try {
          const data = await loginService.requestGoogleLogin(code) 
          localStorage.setItem('token', data.token) 
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('role', data.role)
          
          navigate('/profile')
        } catch (error) {
          console.error('Error en el login de Google:', error)
          hasCalledGoogle.current = false 
          setIsLoading(false)
        }
      }

      procesarLoginGoogle()
    }
  }, [searchParams, navigate])

  // Formulario tradicional
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const data = await loginService.requestLogin(email, password)
      console.log('Login response:', data) // Debug
      localStorage.setItem('token', data.token) 
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('role', data.role)

      navigate('/profile')
    } catch (error) {
      console.error('Error en el login:', error)
      setIsLoading(false)
    }
  }

  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty('--mouse-x', `${x}px`);
    button.style.setProperty('--mouse-y', `${y}px`);
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit,
    handleMouseMove
  }
}