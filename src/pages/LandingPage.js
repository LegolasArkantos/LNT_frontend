import logo from '../assets/l-t-high-resolution-logo-transparent.png'

const LandingPage = () => {
  return (
    <div>
      <nav class="bg-teal-200 border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logo}
              class="h-8"
            />
          </div>
          <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="login"
              class="text-xl hover:underline"
            >
              Login
            </a>
            <a
              href="#"
              class="text-xl hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LandingPage;
