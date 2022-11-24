import { Partido } from "./partido"

interface Candidato {
    id: string,
    cedula: string,
    resolucion: string,
    nombre: string,
    apellido: string,
    partido: Partido
}

export {Candidato}
