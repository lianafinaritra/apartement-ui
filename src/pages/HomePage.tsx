import React, {ChangeEventHandler, useEffect, useState} from "react";
import photo from "../appartement.jpg"
import {Card} from "flowbite-react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Category from "../types/Category";
import {data} from "autoprefixer";
import City from "../types/City";
import House from "../types/House";
import {storage} from "../firebase";
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [fakePage, setFakePage] = useState<number>(1);
    const nextPage: number = pageNumber + 1;
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [cityData, setCityData] = useState<City[]>([]);
    const [houseData1, setHouseData1] = useState<House[]>([]);
    const [houseData2, setHouseData2] = useState<House[]>([]);

    const [categoryName, setCategoryName] = useState<string>("All")
    const [cityName, setCityName] = useState<string>("antananarivo")
    const [type, setType] = useState<string>("All")
    const [minPrice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(1000000)
    const [houseId, setHouseId] = useState<number>()

    const AllCategory: Category = {
        id_category: 0,
        name: "All"
    }

    const Increment = () => {
        setPageNumber(pageNumber + 2)
        setFakePage(fakePage + 1)
    }

    const Decrement = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 2)
            setFakePage(fakePage - 1)
        }
    }

    const imageListRef = ref(storage, "images/")
    const [ImageUpload, setImageUpload] = useState<any>(null);
    const [ImageList, setImageList] = useState<any>([]);
    const [url, setUrl] = useState<any>(null);

    const UploadImage = () => {
        if (ImageUpload == null) return;
        const imageRef = ref(storage, `images/${ImageUpload.name + v4()}`);
        uploadBytes(imageRef, ImageUpload).then(() => {
            getDownloadURL(imageRef)
                .then((url) => {
                    setUrl(url);
                })
                .catch((error) => {
                    console.log(error.members, "ERROR BE MIHITSY");
                });
        });
    };

    useEffect(() => {
            const promise = axios.get("http://localhost:8080/category");
            promise.then((response) => {
                const allCategory: Category[] = response.data
                allCategory.unshift(AllCategory)
                setCategoryData(allCategory);
                console.log(categoryData)
            }).catch((err) => {
                console.log(err);
            })
        }, [categoryData, setCategoryData, data]
    )

    useEffect(() => {
            const promise = axios.get("http://localhost:8080/city");
            promise.then((response) => {
                setCityData(response.data);
                console.log(cityData)
            }).catch((err) => {
                console.log(err);
            })
        }, [cityData, setCityData, data]
    )

    useEffect(() => {
            const promise = axios.get("http://localhost:8080/houses?categoryName=" + categoryName + "&type=" + type + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice + "&cityName=" + cityName + "&pageNumber=" + pageNumber + "&pageSize=3");
            promise.then((response) => {
                setHouseData1(response.data);
                console.log(houseData1)
            }).catch((err) => {
                console.log(err);
            })
        }, [houseData1, setHouseData1, data, categoryName, type, minPrice, maxPrice, cityName, pageNumber]
    )

    useEffect(() => {
            const promise = axios.get("http://localhost:8080/houses?categoryName=" + categoryName + "&type=" + type + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice + "&cityName=" + cityName + "&pageNumber=" + nextPage + "&pageSize=3");
            promise.then((response) => {
                setHouseData2(response.data);
                console.log(houseData2)
            }).catch((err) => {
                console.log(err);
            })
        }, [houseData2, setHouseData2, data, categoryName, type, minPrice, maxPrice, cityName, pageNumber]
    )

    const PutBuyHouse = (id: number) => {
        setHouseId(id)
        const promise = axios.put(
            "http://localhost:8080/houses?id_house=");
        promise
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
            })
    }

    const admin: any = () => {
        navigate("/History")
    }
    const user: any = () => {
        navigate("/History")
    }

    interface item {
        id: number,
        name: string
    }

    interface itemCard {
        id: number,
        title: string,
        desc: string
    }

    const Type: item[] = [
        {
            id: 0,
            name: "All"
        },
        {
            id: 1,
            name: "vente"
        },
        {
            id: 2,
            name: "location"
        }
    ]

    const CardMock: itemCard[] = [
        {
            id: 1,
            title: "Appartement",
            desc: "A vendre"
        },
        {
            id: 2,
            title: "Maison",
            desc: "Location"
        },
        {
            id: 3,
            title: "Terrain",
            desc: "A vendre"
        }
    ]
    return (
        <>
        <div>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                            <button type="button"
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>

                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                </svg>

                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img className="block h-8 w-auto lg:hidden"
                                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                     alt="Your Company"/>
                                <img className="hidden h-8 w-auto lg:block"
                                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                     alt="Your Company"/>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">

                                    <a href="#"
                                       className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                       aria-current="page">Accueil</a>

                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button type="button"
                                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">View notifications</span>

                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                                </svg>
                            </button>


                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">

                                    <a href="#"
                                       className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                       onClick={() => navigate("/Login")}
                                       aria-current="page">Se connecter</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="w-full h-screen bg-gray-100">
                <img className="w-full h-header"
                     src={photo}
                     alt="Your Company"/>
            </div>
            <div className="bg-gray-100">
                <div>
                    <p id="text_select"
                       className="border-0 border-b-2 border-gray-200 text-2xl text-gray-900 dark:text-white mb-20">Recherche</p>
                </div>
                <div className="flex h-56 m-0">
                    <div className="w-80 h-full mx-auto object-contain  px-5">
                        <label htmlFor="underline_select" className="sr-only">Underline select</label>
                        <select id="underline_select"
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                onChange={(e: React.FormEvent<HTMLSelectElement>) => setCategoryName(e.currentTarget.value)}
                        >
                            {categoryData.map((item) => (
                                <option key={`${item.id_category}`} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-80 h-full mx-auto object-contain  px-5">
                        <label htmlFor="underline_select" className="sr-only bg-gray-800">Underline select</label>
                        <select id="underline_select"
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                onChange={(e: React.FormEvent<HTMLSelectElement>) => setCityName(e.currentTarget.value)}
                        >
                            {cityData.map((item) => (
                                <option key={`${item.id_city}`} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-80 h-full mx-auto object-contain  px-5">
                        <label htmlFor="underline_select" className="sr-only bg-gray-800">Underline select</label>
                        <select id="underline_select"
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                onChange={(e: React.FormEvent<HTMLSelectElement>) => setType(e.currentTarget.value)}
                        >
                            {Type.map((item) => (
                                <option key={`${item.id}`} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-80 h-full mx-auto object-contain  px-5">
                        <label htmlFor="small-input"
                               className="sr-only bg-gray-800">Small
                            input</label>
                        <input type="text" id="small-input"
                               className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                               onChange={(e: any) => setMinPrice(e.currentTarget.value)}/>
                    </div>
                    <div className="w-80 h-full mx-auto object-contain  px-5">
                        <label htmlFor="small-input"
                               className="sr-only bg-gray-800">Small
                            input</label>
                        <input type="text" id="small-input"
                               className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                               onChange={(e: any) => setMaxPrice(e.currentTarget.value)}/>
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-300 py-10">
                <div className="flex mx-6 my-12">
                    {houseData1.map((item) => (
                        <div className="max-w-sm mx-auto">
                            <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                                    key={`${item.id}`}>
                                    {item.category.name}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {item.city.name}
                                </p>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {item.price}
                                </p>
                                <button type="button"
                                        className="inline-block m-0 px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                                        onClick={() => PutBuyHouse(item.id)}
                                >Acheter
                                </button>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="flex mx-6 my-12">
                    {houseData2.map((item) => (
                        <div className="max-w-sm mx-auto">
                            <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                                    key={`${item.id}`}>
                                    {item.category.name}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {item.city.name}
                                </p>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {item.price}
                                </p>
                                <button type="button"
                                        className="inline-block m-0 px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                                        onClick={() => PutBuyHouse(item.id)}
                                >Acheter
                                </button>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex mt-8 mx-20">
                <nav aria-label="Page navigation example">
                    <ul className="flex list-style-none">
                        <li className="page-item"><strong
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                            onClick={Decrement}
                            aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </strong></li>
                        <li className="page-item"><a
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href="#">{fakePage}</a></li>
                        <li className="page-item"><strong
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            onClick={Increment}
                            aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </strong></li>
                    </ul>
                </nav>
            </div>
        </div>
        <Footer/>
    </>
    )
}

export default HomePage;