import { useQuery } from "@tanstack/react-query";
import { CarResponse } from "../types";
import { getCars } from "../api/carapi";

export default function Carlist() {

  const { data, error, isSuccess } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars
  });

  if (!isSuccess) {
    return <span>Loading ... 💨</span>
  }

  else if (error) {
    return <span>데이터를 가져오는 중 오류가 발생했습니다 ... 😪</span>
  }

  else {
    return(
      <table>
        <tbody>
          {
            data.map((car: CarResponse) =>
              <tr key={car._links.self.href}>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.color}</td>
                <td>{car.registrationNumber}</td>
                <td>{car.modelYear}</td>
                <td>{car.price}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }
  
  
}