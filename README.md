# SkyAirlines – Airport Ticket Reservation System (MEVN)
## Author 
Panagiotis Leftheriotis

## Contact
[p.leftheriotis@gmail.com](mailto:p.leftheriotis@gmail.com)

## Contents

- [Technologies Used](#technologies-used)
- [File Description](#file-description)
- [User Manual](#user-manual)

## Technologies Used

This application is built using the MEVN stack (MongoDB, Express.js, Vue.js, Node.js), along with HTML, CSS, Bootstrap, JavaScript, and jQuery for front-end functionality.

- MongoDB: A NoSQL database used to store flights, users, and tickets. MongoDB Atlas provides cloud-based access, with Node.js and Express.js handling database interactions.

- Express.js: A Node.js framework managing HTTP requests and routes, used to connect the front-end with the MongoDB database for tickets, users, and flights.

- Vue.js: A JavaScript framework used to create dynamic and reusable front-end components, including features like Dark Mode and dynamic tables for ticket history.

- Node.js: Provides the server environment and handles requests via Express.js, including email notifications and database connections.

- HTML & CSS: Define the structure and styling of pages, including responsive design for different devices.

- Bootstrap: Used for layout, styling, and prebuilt components such as cards, tables, and buttons.

- JavaScript & jQuery: Adds interactivity, handles user inputs, communicates with the server using Fetch API, and implements features like the anagram game, Dark Mode, and dynamic maps.

## File Description
## User Manual
### Database
- The MongoDB database was used to store the data used by the application, as mentioned in Section 3. While an attempt was made to use the classic MongoDB, due to connection and functionality problems between the database with the application and the Node.js Server, MongoDB Atlas was used, which is a cloud version of the regular MongoDB.
- The database used is called myFirstDB and consists of 4 collections: registered users, flights, tickets and transactions. Registered users are those who have an account in the application, flights are all flights offered by the airline, tickets are all user tickets and transactions are the user's ticket purchases and billing information.
- The image below shows a user's document. Each user has as fields the unique id that is automatically generated from the database “_id”, the name “firstname”, the surname “lastname”, the access name “username”, the access password “password”, the contact phone number “tel”, the identifier “trait” that is automatically entered for each user who creates an account and takes values ​​depending on whether they are a simple user “user” or an administrator “admin” and the unique 32-digit code “uuid”, unique for each user, that is automatically generated through the “UUID” library and is automatically entered with each user registration and may have the discount code “discountCode” if they have won the anagram game.
![dbimg1](https://github.com/LeftheriotisP/SkyAirlines#:~:text=22%20minutes%20ago-,dbimg1.png,-Rename%20image.png)

## Application Requirements
- Promotion of the company and its services: The main objective of the application is to increase the visibility of the company, its services, the countries it connects, the number of flights and the ticket prices it offers to a wider audience
- Online ticket purchase: Through the electronic application, users will be able to choose their flights and buy their tickets easily with just a few "clicks"
- Attracting customers due to competitive prices: The application will offer the possibility of a discount through a simple game that customers can easily win
- Reduction of staff: Online customer service will lead to a reduction in the staff involved in issuing tickets, providing information, etc.
- Ticket history: Full information to the customer about current and previous transactions
- Attract partners: Easy access to itineraries will make it easier for partners such as tourist offices and travel agents to choose the specific company
- Statistics: Storing tickets in the company's database will help in decision-making with the statistical study of customer preferences
## Modern Web Application Trends

## Application Technologies

## User Manual
  
## Επιπλέον Παραδοχές
- Όλες οι φόρμες χρήσης (κρατήσεις, αναζήτηση πτήσεων, είσοδος, εγγραφή) έχουν ελέγχους εγκυρότητας.

Τα δεδομένα των πτήσεων θεωρούνται έγκυρα και ενημερώνονται μόνο από τον διαχειριστή.

Τα usernames είναι μοναδικά.

Η τιμή των εισιτηρίων και η διαθεσιμότητα ενημερώνονται σε πραγματικό χρόνο κατά τη διάρκεια της κράτησης.

Τεχνολογίες που χρησιμοποιήθηκαν
Backend

Node.js – Εκτέλεση του server

Express.js – REST API routes & επιχειρησιακή λογική

MongoDB – Αποθήκευση χρηστών, πτήσεων και κρατήσεων

Mongoose – Μοντελοποίηση δεδομένων και schema validation

Frontend

Vue.js – Διεπαφή χρήστη

HTML5 / CSS3

Bootstrap – Σχεδιασμός & responsive στοιχεία

Axios – Επικοινωνία με το REST API

Other

RESTful API Architecture

JSON-based communication

npm για διαχείριση πακέτων

Περιγραφή των αρχείων

backend/app.js
Ο πυρήνας της εφαρμογής. Περιέχει τον Express server, σύνδεση με MongoDB και τα API routes.

backend/models/
Τα Mongoose models για:

Χρήστες

Πτήσεις

Κρατήσεις

backend/routes/
Περιέχει όλα τα REST API endpoints για:

Authentication

Flights

Bookings

backend/package.json
Βιβλιοθήκες & scripts του backend.

frontend/src/
Κύριος κώδικας Vue.js (σελίδες, components, views).

frontend/public/
Static αρχεία του front-end.

frontend/package.json
Βιβλιοθήκες & scripts του frontend.

docs/report.pdf
Προαιρετικό – αναλυτική τεκμηρίωση της εφαρμογής.

README.md
Το παρόν αρχείο που περιγράφει το σύστημα SkyAirlines.

Τρόπος Εκτέλεσης
1) Κατέβασμα του Project

Κατεβάζουμε ή κάνουμε clone το repository:

git clone https://github.com/your-username/your-repo.git
cd your-repo

2) Εκτέλεση Backend
cd backend
npm install
npm start


Ο server εκτελείται στο:
http://localhost:3000

3) Εκτέλεση Frontend
cd frontend
npm install
npm run serve


Το web interface εκτελείται στο:
http://localhost:8080

Τρόπος Χρήσης
Ως Χρήστης

Εγγραφή νέου χρήστη
Ο χρήστης μπορεί να δημιουργήσει λογαριασμό εισάγοντας τα στοιχεία του μέσω της σχετικής φόρμας.

Screenshot Placeholder

Σύνδεση στον λογαριασμό
Ο χρήστης συνδέεται εισάγοντας το username και τον κωδικό του.

Αναζήτηση πτήσεων
Ο χρήστης εισάγει:

Ημερομηνία

Προορισμό

Αεροπορική εταιρεία (προαιρετικά)

και εμφανίζονται οι διαθέσιμες πτήσεις.

Screenshot Placeholder

Κράτηση εισιτηρίου
Στην οθόνη μίας πτήσης μπορεί να γίνει κράτηση θέσης και επιβεβαίωση εισιτηρίου.

Screenshot Placeholder

Προβολή κρατήσεων
Ο χρήστης βλέπει όλες τις μελλοντικές κρατήσεις του και μπορεί να δει λεπτομέρειες.

Ακύρωση κράτησης
Ο χρήστης μπορεί να ακυρώσει μία κράτηση, με άμεση ενημέρωση των διαθεσίμων θέσεων.

Αποσύνδεση
Από το μενού μπορεί να γίνει logout.

Ως Διαχειριστής

Ο λογαριασμός του διαχειριστή καθορίζεται μέσα στη βάση ή στο αρχείο αρχικοποίησης.

Σύνδεση admin
Ο διαχειριστής συνδέεται με τα δικά του credentials.

Διαχείριση πτήσεων

Προσθήκη νέας πτήσης

Επεξεργασία υπαρχουσών

Διαγραφή πτήσεων

Screenshot Placeholder

Διαχείριση χρηστών
Ο admin μπορεί να δει χρήστες και κρατήσεις.

Προβολή όλων των κρατήσεων
Πλήρης λίστα όλων των εισιτηρίων που έχουν εκδοθεί.

Αποσύνδεση διαχειριστή

Αναφορές

Κατά την ανάπτυξη χρησιμοποιήθηκαν βασικές τεχνικές MEVN stack, επίσημη τεκμηρίωση των βιβλιοθηκών και παραδείγματα REST API αρχιτεκτονικής.
