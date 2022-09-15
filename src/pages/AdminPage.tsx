import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Label, Modal, Table, TextInput} from "flowbite-react";
import {CategoryProps} from "../types/CategoryProps";
import Category from "../types/Category";
import City from "../types/City";
import axios from "axios";

const AdminPage: React.FC<CategoryProps> = ({data}) => {
    const navigate = useNavigate();

    const [postCategory, setPostCategory] = useState<string>("");
    const [postCity, setPostCity] = useState<string>("");
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [cityData, setCityData] = useState<City[]>([]);

    const [postModal, togglePostModal] = useState<boolean>(false)
    const [cityModal, toggleCityModal] = useState<boolean>(false)
    const [deleteCategoryId, setDeleteCategoryId] = useState<number>(0)
    const [deleteCategoryName, setDeleteCategoryName] = useState<string>("")
    const [deleteCityId, setDeleteCityId] = useState<number>(0)
    const [deleteCityName, setDeleteCityName] = useState<string>("")

    const [postHouse, setPostHouse] = useState<string>("");
    const [houseModal, setHouseModal] = useState<boolean>(false);

    const [categoryName, setCN] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [cityName, setCityName] = useState<string>("")
    const [territory, setTerritory] = useState<string>("")
    const [rooms, setRoom] = useState<number>(0)
    const [description, setDes] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [phone, setPhone] = useState<string>("")

    useEffect(() => {
            const promise = axios.get("http://localhost:8080/category");
            promise.then((response) => {
                setCategoryData(response.data);
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

    const PostCategory = () => {
        const promise = axios.post(
            "http://localhost:8080/category", {
                "name": postCategory
            });
        promise
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                CleanningForms();
                togglePostModal(false);
            })
    }

    const PostCity = () => {
        const promise = axios.post(
            "http://localhost:8080/city", {
                "name": postCity
            });
        promise
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                CleanningForms();
                toggleCityModal(false);
            })
    }

    const DeleteCategory = (e: any) => {
        var datas: any = [];
        var target = e.target;
        while (target && target.nodeName !== "TR") {
            target = target.parentNode;
        }
        if (target) {
            var cells = target.getElementsByTagName("td");
            for (var i = 0; i < cells.length; i++) {
                datas.push(cells[i].innerHTML);
            }
        }
        setDeleteCategoryId(datas[0]);
        setDeleteCategoryName(datas[1]);
        const promise = axios.delete(
            "http://localhost:8080/category?id_category=" + deleteCategoryId + "&name=" + deleteCategoryName + "");
        promise
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                CleanningForms();
            })
    }

    const DeleteCity = (e: any) => {
        var datas: any = [];
        var target = e.target;
        while (target && target.nodeName !== "TR") {
            target = target.parentNode;
        }
        if (target) {
            var cells = target.getElementsByTagName("td");
            for (var i = 0; i < cells.length; i++) {
                datas.push(cells[i].innerHTML);
            }
        }
        setDeleteCityId(datas[0]);
        setDeleteCityName(datas[1]);
        const promise = axios.delete(
            "http://localhost:8080/city?id_city=" + deleteCityId + "&name=" + deleteCityName + "");
        promise
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                CleanningForms();
            })
    }

    const CleanningForms = (): void => {
        setPostCategory("");
        setPostCity("")
    }

    return (
        <>
            <div className="pb-8 ">
                <nav className="bg-gray-600 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                    <div className="container flex flex-wrap justify-between items-center mx-auto">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9"
                                 alt="Flowbite Logo"/>
                            <span
                                className="self-center text-xl text-white font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>
                        <button data-collapse-toggle="navbar-default" type="button"
                                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M3 5a1 1 mb-10 0 011-1h12a1 1 mb-10 0 110 2H4a1 1 mb-10 0 01-1 mb-10-1zM3 10a1 1 mb-10 0 011-1h12a1 1 mb-10 0 110 2H4a1 1 mb-10 0 01-1 mb-10-1zM3 15a1 1 mb-10 0 011-1h12a1 1 mb-10 0 110 2H4a1 1 mb-10 0 01-1 mb-10-1z"
                                      clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-gray-600 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a href="#"
                                       className="block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                       onClick={() => navigate("/")}>Se déconnecter</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="flex">
                <div>
                    <aside className="w-full" aria-label="Sidebar">
                        <div className="overflow-y-auto py-4 px-3 bg-white rounded dark:bg-gray-800">
                            <ul className="space-y-2">
                                <li>
                                    <a href="#"
                                       className="flex  m-auto items-center p-1 mb-10 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                       onClick={() => navigate("/History")}>
                                        <svg aria-hidden="true"
                                             className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                        </svg>
                                        <span className="ml-10">Historique</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="flex  m-auto items-center p-1 mb-10 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <svg aria-hidden="true"
                                             className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                        </svg>
                                        <span className="ml-10"> C & V </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>

                </div>
                <div className="inline-block w-full">
                    <div className="w-full inline-flex my-12">
                        <div className="mx-auto w-1/5">
                            <button type="button"
                                    className="inline-block m-0 px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={() => togglePostModal(true)}>Ajouter
                            </button>
                        </div>
                        <div className="mx-auto w-2/3">
                            <Table hoverable={true}
                                   className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <Table.Head
                                    className="text-xs text-white uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
                                    <Table.HeadCell scope="col" className="px-6 py-3">
                                        Id
                                    </Table.HeadCell>
                                    <Table.HeadCell scope="col" className="px-6 py-3">
                                        Nom de la catégorie
                                    </Table.HeadCell>
                                    <Table.HeadCell scope="col" className="px-6 py-3">
      <span className="sr-only">
        Edit
      </span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {
                                        categoryData.map((item) => (
                                            <Table.Row
                                                className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <Table.Cell scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                    {item.id_category}
                                                </Table.Cell>
                                                <Table.Cell className="px-6 py-4">
                                                    {item.name}
                                                </Table.Cell>
                                                <Table.Cell className="px-6 py-4">
                                                    <a
                                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                                        onClick={DeleteCategory}
                                                    >
                                                        Supprimer
                                                    </a>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                    <div className="w-full inline-flex my-12">
                        <div className="mx-auto w-1/5">
                            <button type="button"
                                    className="inline-block m-0 px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={() => toggleCityModal(true)}>Ajouter
                            </button>
                        </div>
                        <div className="mx-auto w-2/3">
                            <Table hoverable={true}
                                   className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <Table.Head
                                    className="text-xs text-white uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
                                    <Table.HeadCell scope="col" className="px-6 py-3">
                                        Id
                                    </Table.HeadCell>
                                    <Table.HeadCell scope="col" className="px-6 py-3">
                                        Nom de la ville
                                    </Table.HeadCell>
                                    <Table.HeadCell scope="col" className="px-6 py-3">
      <span className="sr-only">
        Edit
      </span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {
                                        cityData.map((item) => (
                                            <Table.Row
                                                className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <Table.Cell scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                    {item.id_city}
                                                </Table.Cell>
                                                <Table.Cell className="px-6 py-4">
                                                    {item.name}
                                                </Table.Cell>
                                                <Table.Cell className="px-6 py-4">
                                                    <a
                                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                                        onClick={DeleteCity}
                                                    >
                                                        Supprimer
                                                    </a>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>
                <div className="w-full ">
                    <button type="button"
                            className="inline-block m-0 px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={() => togglePostModal(true)}>Ajouter une nouvelle maison
                    </button>
                </div>

                <Modal
                    show={postModal}
                    onClose={() => togglePostModal(false)}
                >
                    <Modal.Header>
                        Ajoute une nouvelle catégorie
                    </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <form className="flex flex-col gap-4">
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password1"
                                            value="Nom de la nouvelle Categorie"
                                        />
                                    </div>
                                    <TextInput
                                        onChange={(e) => setPostCategory(e.target.value)}
                                        value={postCategory}
                                        id="categoryName"
                                        type="string"
                                        required={true}
                                    />
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" type="submit" onClick={() => PostCategory()}>
                            Envoyer
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={cityModal}
                    onClose={() => toggleCityModal(false)}
                >
                    <Modal.Header>
                        Ajoute une nouvelle ville
                    </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <form className="flex flex-col gap-4">
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password1"
                                            value="Nom de la nouvelle Ville"
                                        />
                                    </div>
                                    <TextInput
                                        onChange={(e) => setPostCity(e.target.value)}
                                        value={postCity}
                                        id="categoryName"
                                        type="string"
                                        required={true}
                                    />
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" type="submit" onClick={() => PostCity()}>
                            Envoyer
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={houseModal}
                    onClose={() => setHouseModal(false)}
                >
                    <Modal.Header>
                        Ajoute une nouvelle maison
                    </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <form className="flex flex-col gap-4">
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password1"
                                            value="Nom de la nouvelle Ville"
                                        />
                                    </div>
                                    <TextInput
                                        onChange={(e) => setPostCity(e.target.value)}
                                        value={postCity}
                                        id="categoryName"
                                        type="string"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password1"
                                            value="Nom de la nouvelle Ville"
                                        />
                                    </div>
                                    <TextInput
                                        onChange={(e) => setCN(e.target.value)}
                                        value={postCity}
                                        id="categoryName"
                                        type="string"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password1"
                                            value="Nom de la nouvelle Ville"
                                        />
                                    </div>
                                    <TextInput
                                        onChange={(e) => setType(e.target.value)}
                                        value={postCity}
                                        id="categoryName"
                                        type="string"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password1"
                                            value="Nom de la nouvelle Ville"
                                        />
                                    </div>
                                    <TextInput
                                        onChange={(e) => setTerritory(e.target.value)}
                                        value={postCity}
                                        id="categoryName"
                                        type="string"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password1"
                                            value="Nom de la nouvelle Ville"
                                        />
                                    </div>
                                    <TextInput
                                        value={postCity}
                                        id="rooms"
                                        type="number"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password1"
                                            value="Nom de la nouvelle Ville"
                                        />
                                    </div>
                                    <TextInput
                                        onChange={(e) => setDes(e.target.value)}
                                        value={postCity}
                                        id="description"
                                        type="string"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password1"
                                            value="Nom de la nouvelle Ville"
                                        />
                                    </div>
                                    <TextInput
                                        value={postCity}
                                        id="price"
                                        type="number"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password1"
                                            value="Nom de la nouvelle Ville"
                                        />
                                    </div>
                                    <TextInput
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={postCity}
                                        id="phone"
                                        type="string"
                                        required={true}
                                    />
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" type="submit" onClick={() => PostCity()}>
                            Envoyer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default AdminPage