For the backend

To run the backend, you have to enter inside like

´´cd mimbral_backend/mimbral_backend´´

and inside run

´´python manage.py runserver´´

You can use the api to create users, login or logout using username, email and password. In this case I use the sessionid cookie from django and not jwt for the authentication.

For the frontend

To run the frontent, you have to enter inside of:

´´cd mimbral_front ´´

and inside run

´´npm start ´´

In this view, you can register users and login users using username, email and password. In this point, the interactions between axios and sessionid not work correctly because of the sessionid cookie created for Django are not compatible.
So this makes the sessionid when you do the Login are not saved because of the axios cors errors.
