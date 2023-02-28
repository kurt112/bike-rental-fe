import Image from "next/image";
import logo from '../../_images/erick.jpg'
import mtb1 from '../../_images/landing/MTB1.jpg'
import mtb2 from '../../_images/landing/MTB2.jpg'
import mtb3 from '../../_images/landing/MTB3.jpg'
import mtb4 from '../../_images/landing/MTB4.jpg'
import mtb5 from '../../_images/landing/MTB5.jpg'
import bmx1 from '../../_images/landing/BMX1.jpg'

const Landing = ({
                     setLogin,
                     setRegisterClick
                 }: any) => {

    return (
        <div className='w-full h-screen '>
            <nav className="w-full bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="#" className="flex items-center">
                        <Image src={logo} className="h-6 mr-6 sm:h-9"
                               width={60}
                               height={60}
                               alt="Bike Shop logo"/>
                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Erik&lsquo;s Bike Shop</span>
                    </a>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <button onClick={() => setLogin(true)}
                                        className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                        aria-current="page">Login
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setRegisterClick(true)}
                                        className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                        aria-current="page">Register
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <div
                className="full m-auto text-center relative overflow-hidden bg-no-repeat bg-cover"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`,
                    height: 500
                }}
            >
                <div
                    className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                    style={{backgroundImage: 'rgba(0, 0, 0, 0.6)'}}
                >
                    <div className="flex justify-center items-center h-full">
                        <div className="text-white">
                            <h2 className="font-semibold text-4xl mb-4">Erik&lsquo;s         Bike Shop</h2>
                            <h4 className="font-semibold text-xl mb-6">Best bike rental in town</h4>
                            <button
                                className="inline-block px-7 py-3 mb-1 border-2 border-gray-200 text-gray-200 font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                onClick={() => setRegisterClick(true)}
                                role="button"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Become a member now&#x21;
                            </button
                            >
                            <h2 className="mt-10 font-semibold text-2xl mb-4">Contact us: </h2>
                            <h2 className="font-semibold text-1xl mb-4">09391455383</h2>


                            <p className="font-semibold text-xl mb-4">Located at 41 E. Rodriguez Avenue, Antipolo, Rizal, 1870</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className={'h-full text-center w-full m-auto bg-white h-96 pt-5'} style={{height: '100vh'}}>
                <h2 className="text-center font-semibold text-4xl mb-4">Erick Bike Shop</h2>
                <span className={'text-xl'}>
                     The business started selling way back in 2006 when it
                    was firstly named Rik&sbquo;s Enterprises where they sold Japan
                    <br/>
                    Bikes before by repairing and at the same time repainting it
                    which made it look brand new, then started to sell MTB and BMX later on.
                </span>

                <section className="h-full text-gray-700">
                    <div className="h-full px-5 py-2 mx-auto">
                        <div className="flex flex-wrap -m-1 md:-m-2 justify-content-evenly flex-row ">
                            <div className="w-1/4 h-full mt-5">
                                <Image
                                    alt="mtb 1"
                                    className="block object-cover object-center w-full h-full rounded-lg"
                                    width="100"
                                    height="100"
                                    layout="responsive"
                                    objectFit="contain"
                                    src={mtb1}
                                />
                            </div>
                            <div className="w-1/4 h-full mt-5">
                                <Image
                                    alt="mtb 2"
                                    className="block object-cover object-center w-full h-full rounded-lg"
                                    width="100"
                                    height="100"
                                    layout="responsive"
                                    objectFit="contain"
                                    src={mtb2}
                                />
                            </div>
                            <div className="w-1/4 h-full mt-5">
                                <Image
                                    alt="mtb 3"
                                    className="block object-cover object-center w-full h-full rounded-lg"
                                    width="100"
                                    height="100"
                                    layout="responsive"
                                    objectFit="contain"
                                    src={mtb3}
                                />
                            </div>
                            <div className="w-1/4 h-full mt-5">
                                <Image
                                    alt="mtb 4"
                                    className="block object-cover object-center w-full h-full rounded-lg"
                                    width="100"
                                    height="100"
                                    layout="responsive"
                                    objectFit="contain"
                                    src={mtb4}
                                />
                            </div>
                            <div className="w-1/4 h-full mt-5">
                                <Image
                                    alt="mtb 5"
                                    className="block object-cover object-center w-full h-full rounded-lg"
                                    width="100"
                                    height="100"
                                    layout="responsive"
                                    objectFit="contain"
                                    src={mtb5}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>


        </div>

    )
}

export default Landing;
