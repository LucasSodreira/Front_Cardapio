import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { FoodData } from "../interface/FoodData";

const API_URL = "http://localhost:8080";

const updateData = async (data: FoodData): Promise<FoodData> => {
    const response = await axios.put(`${API_URL}/food/${data.id}`, data);
    return response.data;
}

export function useFoodUpdate() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateData,
        retry: 1,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['food-data'] });
        }
    })

    return mutation;
}
