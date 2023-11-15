import { RubroInsumo } from "../types/RubroInsumo";

const BASE_URL = 'http://localhost:8080';

export const RubroService = {
    getRubros: async (): Promise<RubroInsumo[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubrosArticulo`)
        const data = await response.json();
        return data;
    },

    getRubro: async (id: number): Promise<RubroInsumo> => {
        const response = await fetch(`http://localhost:8080/api/v1/rubrosArticulo/${id}`);
        const data = await response.json();
        return data;
    },

    createRubro: async (rubroInsumo: RubroInsumo): Promise<RubroInsumo> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubrosArticulo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rubroInsumo)
        });
        const data = await response.json();
        return data;
    },

    updateRubro: async (id: number, rubroInsumo: RubroInsumo): Promise<RubroInsumo> => {
        const response = await fetch(`http://localhost:8080/api/v1/rubrosArticulo/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(rubroInsumo)
        });
        const data = await response.json();
        return data;
    },

    deleteRubro: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/rubrosArticulo/${id}`, {
            method: "DELETE",
        });
    }
}