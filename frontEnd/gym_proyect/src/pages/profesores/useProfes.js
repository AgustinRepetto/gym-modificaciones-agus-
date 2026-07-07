import { useState, useEffect } from 'react'
import { userService } from '../../services/userService'

export function useProfes() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setIsLoading(true)
      const data = await userService.getAllUsers()
      setUsers(data.content || [])
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error cargando usuarios:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      await userService.updateUserRole(userId, newRole)
      // Actualizar el estado local
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ))
    } catch (err) {
      setError(err.message)
      console.error('Error actualizando rol:', err)
    }
  }

  return {
    users,
    isLoading,
    error,
    handleRoleChange,
    loadUsers
  }
}
