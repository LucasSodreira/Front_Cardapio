import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { FoodData } from "../interface/FoodData";

const API_URL = "http://localhost:8080";

const fetchData = async (): Promise<FoodData[]> => {
    const response = await axios.get(API_URL + '/food');
    return response.data;
}

export function useFoodData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['food-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data
    }
}
