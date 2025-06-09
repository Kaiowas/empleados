import axios from "axios"
import Empleado from "../models/Empleado";
import Usuario from "../models/Usuario";

export default class EmpleadosService {

    private baseUrl: string = 'https://jsonplaceholder.typicode.com'
    private limit: number = 15

    getAll = async () => {
        return await axios.get(`${this.baseUrl}/posts`, {
            params: {
                _limit: this.limit ?? null
            }
        });
    }

    getByUser = async (usuario: Usuario) => {
        return await axios.get(`${this.baseUrl}/users/${usuario.id}/posts`);
    }

    create = async (empleado: Empleado) => {
        return await axios.post(`${this.baseUrl}/posts`, empleado);
    }

}