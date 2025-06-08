import axios from "axios"
//import Usuario from "../models/Usuario";

export default class UsuariosService {

    private baseUrl: string = 'https://jsonplaceholder.typicode.com/users'

    getAll = async () => {
        return await axios.get(this.baseUrl);
    }

}