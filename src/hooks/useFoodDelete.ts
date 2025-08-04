import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:8080";

const deleteData = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/food/${id}`);
}

export function useFoodDelete() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteData,
        retry: 1,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['food-data'] });
        }
    })

    return mutation;
}
