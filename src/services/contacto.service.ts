import api from './api'

export interface CreateContactoDto {
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  mensaje: string
}

export const contactoService = {
  create(dto: CreateContactoDto) {
    return api.post('/api/contacto', dto)
  },
}
