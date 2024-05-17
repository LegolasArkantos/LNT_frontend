import logo from '../assets/learnandtracklogofooter.png';

const Footer = () => {
  return (
    

    <div class="p-5 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={logo} class="h-8" alt="Flowbite Logo" />
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-[#7179C6] sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-white sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" class="hover:underline">Learn and Track™</a>. All Rights Reserved.</span>
    </div>


  )
}

export default Footer