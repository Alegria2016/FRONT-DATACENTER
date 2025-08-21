export interface RecargaDataRequest {
  valor: number;
  numeroTelefono: string;
  operadorId: number;
  usuarioId: number;
}

export interface Operador {
  id: string;
  nombre: string;
}

export interface User {
  id: string;
  name: string;
}