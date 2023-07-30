# Crypto Exchange Website with Django

This is a crypto exchange website developed using Django, with the main directory named 'config' and several other directories: 'getway', 'plans', 'price', 'static', and 'template'. Below, you'll find a brief overview of each component and its functionalities.

## Overview

## Getway App (Using Moralis for Transactions)

The 'getway' app is responsible for handling transactions and payment gateways. We utilize Moralis, a powerful web3 development platform, to simplify and enhance the transaction process. Moralis provides tools and services that facilitate seamless integration with the blockchain, making it easier to interact with cryptocurrencies.

### Features

1. **Payment Gateway Integration:** This script allows us to integrate various payment gateways, enabling users to make secure and efficient cryptocurrency payments.

2. **Transaction Verification:** With Moralis, we can verify the success of cryptocurrency transactions quickly and reliably.

3. **Real-Time Notifications:** When a transaction is completed, Getway enables us to send real-time notifications to the site owner via Telegram. This notification system ensures that the owner is promptly informed about any trading activities on the platform.

4. **Blockchain Interactions:** Moralis simplifies interactions with the blockchain, enabling smooth communication with different networks and currencies.

5. **Enhanced Security:** Using Moralis ensures that our platform adheres to the highest security standards, protecting both user funds and sensitive data.

### Moralis Web3 Integration

To use Moralis web3 services in the 'getway' app, we have implemented the necessary configurations and integrated the required libraries. This integration allows seamless interactions with blockchain networks and enhances the overall user experience.

For detailed information on Moralis and its web3 integration, please visit [https://moralis.io/](https://moralis.io/).

Moralis has been instrumental in providing a robust foundation for our cryptocurrency exchange platform, ensuring smooth transactions and secure operations.

## Note

Please note that the details provided in this README are for illustrative purposes and do not represent actual code snippets or configurations. The implementation of Moralis may vary based on your specific project requirements and the version of Moralis available at the time of development.

For specific implementation details and code examples, refer to the source code in the 'getway' app directory within the project repository. If you encounter any issues or have questions related to Moralis integration, feel free to reach out to our support team or refer to Moralis documentation for assistance.

### Plans
The 'plans' directory contains a blue map of the entire project, illustrating the flow and structure. To access the blue map, follow this link: [Blue Map of the Project](/plans/swap.html).

### Price App
The 'price' app is used to check the price of each cryptocurrency and responds with JSON data. This app is utilized in the frontend to display the trading price of each coin relative to other coins. The cryptocurrency prices are fetched using the CoinMarketCapAPI Python library.

## Repository
The project repository can be found at: [https://github.com/TestCoper/CryptoExchange-Django/](https://github.com/TestCoper/CryptoExchange-Django/)

## Setup Instructions
To set up the crypto exchange website locally, follow these steps:

1. Clone the repository from GitHub:
   ```
   git clone https://github.com/TestCoper/CryptoExchange-Django.git
   ```

2. Navigate to the project directory:
   ```
   cd CryptoExchange-Django/config
   ```

3. Install the required dependencies. It's recommended to create and activate a virtual environment before installing the dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Make sure you have MySQL and MongoDB installed and properly configured, as per the requirements of different apps.

5. Migrate the database for the Django project:
   ```
   python manage.py migrate
   ```

6. Create a superuser to access the Django admin interface (if required):
   ```
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```
   python manage.py runserver
   ```

8. Access the website in your browser at `http://localhost:8000/` and the Django admin interface at `http://localhost:8000/admin/` if you created a superuser.

9. Follow the blue map in the 'plans' directory to understand the project structure and flow. [File](./plans/swap.html)

Please note that this README provides a high-level overview of the project. For more detailed information about each app and their functionalities, refer to the specific README files within each app's directory.

## Contact
If you have any questions or need assistance with the project, feel free to reach out to us at [lap.mmd@outlook.com](mailto:lap.mmd@outlook.com). We welcome any feedback and contributions to enhance the crypto exchange website.

Happy trading!
