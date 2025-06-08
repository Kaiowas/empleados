import axios from "axios"
import Empleado from "../models/Empleado";

export default class EmpleadosService {

    private baseUrl: string = 'https://jsonplaceholder.typicode.com/posts'

    getAll = async () => {
        return await axios.get(`${this.baseUrl}?userId=1`);
    }

    create = async (empleado: Empleado) => {
        return await axios.post(this.baseUrl, empleado);
    }

}