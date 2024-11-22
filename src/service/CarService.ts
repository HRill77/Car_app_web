import { Token } from "@mui/icons-material";
import http from "../service/http"
import { Car } from "../shared/type/Car";
import { CarEntry } from "../shared/type/CarEntry";
import { AxiosProxyConfig, AxiosRequestConfig } from "axios";

class CarService{

    getAxiosConfig = (): AxiosRequestConfig =>{
        const token = localStorage.getItem("jwt");
        return {
            headers: {
                'Authorization': token,

            }
        };
    };


    getCarList() {
        // const token = localStorage.getItem("jwt");
        return http.get("api/cars", this.getAxiosConfig());
    }

    deleteCar(link: any){
        // const token = localStorage.getItem("jwt");
        return http.delete(link, 
            this.getAxiosConfig());
    }

    addCar(car: Car){
        return http.post("api/cars", 
            car,
            this.getAxiosConfig()
        )
    }

   updateCar(carEntry: CarEntry){
    
    return http.put(carEntry.url, carEntry.car,
        this.getAxiosConfig()
    )
   }
}

export default new CarService();