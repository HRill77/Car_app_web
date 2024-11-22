import { useMutation, useQuery } from "@tanstack/react-query";
import { CarResponse } from "../type/CarResponse";
import CarService from "../../service/CarService";
import { Car } from "../type/Car";
import { CarEntry } from "../type/CarEntry";


export const useGetCars = () =>{
  return useQuery<CarResponse[], Error>({
    queryKey: ["getAllCarDetails"],
    queryFn: async (): Promise<CarResponse[]> => {
      const { data } = await CarService.getCarList(
      );
      console.log("API response:",  data?._embedded?.cars); 
      return data._embedded.cars;
    //   return data._embedded.cars;
},
staleTime: 3000 * 60,
});

}

export const useDeleteCar = () => {
    return useMutation(async (link: string) => {
        const response = await CarService.deleteCar(link);
        return response.data; 
    });
};

export const useAddCar = () =>{
    return useMutation( async (car: Car) =>{
        const response = await CarService.addCar(car);
        return response.data
    })
}

export const useEditcar = () => {
    return useMutation(async (carEntry: CarEntry)=>{
        const response = await CarService.updateCar(carEntry);
        return response.data
    })
}