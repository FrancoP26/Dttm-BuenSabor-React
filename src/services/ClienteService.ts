import { Cliente } from "../types/Cliente";

const BASE_URL = 'http://localhost:8080';

export const ClienteService ={

    createCliente: async (cliente: Cliente): Promise<Cliente> => {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        const data = await response.json();
        return data;
},

updateCliente: async (id: number, cliente: Cliente): Promise<Cliente> => {
    const response = await fetch(`${BASE_URL}/api/v1/usuario/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    });
    const data = await response.json();
    return data;

    },
   
}