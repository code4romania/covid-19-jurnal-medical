# StamAcasa - email service

A service that send emails using a configurable SMTP server.
The email service consumes requests via rabbitMQ.
A request will contain the following information:

- the email address where we will be sending the email
- a key-value list with the tokens that need to be merged with the email template
- [OPTIONAL] a document that will be sent as attachment in the email, if this is the case

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- .NET core 3.1

### Installing

- Start the process using `dotnet run`

## Developing
