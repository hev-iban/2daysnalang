const Contact = () => {
  return (
    <div className="page-container">
<h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Contact Us</h1>
      <p className="text-gray-600 text-lg mb-6 text-center">
        We're here to help! Feel free to get in touch with us through any of the following methods.
      </p>
      <ul className="list-none text-gray-700 space-y-4 text-center">
        <li>
          <strong>Email:</strong> <a href="mailto:support@artbid.com" className="text-blue-600 hover:underline">support@artbid.com</a>
        </li>
        <li>
          <strong>Phone:</strong> <a href="tel:+123456789" className="text-blue-600 hover:underline">(+1) 234-567-89</a>
        </li>
        <li>
          <strong>Address:</strong> Holy Angel University
        </li>
      </ul>
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h2>
        <div className="flex justify-center space-x-6">
          {/* Adjust icon size by reducing to w-3 h-3 */}
          <a href="https://facebook.com" className="text-blue-500 hover:text-blue-700" aria-label="Facebook">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.5 9.9V15h-2v-3h2v-2.3c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.1 2.5.1v2.8h-1.8c-1.4 0-1.7.7-1.7 1.6v2.1h3.1l-.5 3h-2.6v6.9A10 10 0 0 0 22 12z"/>
            </svg>
          </a>
          <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600" aria-label="Twitter">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5A4.5 4.5 0 0 0 23 3z"/>
            </svg>
          </a>
          {/* Add other social icons as needed */}
        </div>
      </div>
    </div>
  );
};
  export default Contact;
  