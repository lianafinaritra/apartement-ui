import Category from "./Category";
import City from "./City";

interface House{
    id: number,
    category: Category,
    type: string,
    city: City,
    territory: string,
    rooms: number,
    description: string,
    price: number,
    phone: string,
    status: string
}

export default House