import { Partido } from "./partido"

interface Candidato {
    id: string,
    cedula: string,
    resolucion: string,
    partido: Partido[]
}

export {Candidato}