# Backend Moment 2 Uppgift 1
## Anne-Lii Hansen
#### Mail: anha2324@student.miun.se

Detta är en enkel RESTful webbtjänst. Byggt med express, Node.js och postgreSQL. APIet hanterar arbetslivserfarenheter.
Grundläggande funktionalitet för CRUD är implementerad.

### Installation
* Klona repo: git clone https://github.com/Anne-Lii/backend_moment2_1.git
* npm install
* npm start

### CRUD Operationer
Här är URI:erna för CRUD-operationerna
* GET /api/work
* POST /api/work
* PUT /api/work/:id
* DELETE /api/work/:id

Exempel på POST:

POST /api/work {
    "companyname": "Företag AB",
    "location": "Stockholm",
    "jobtitle": "Webbutvecklare",
    "description": "Fullstack webbutvecklare"
    "startdate": "2025-06-03",
    "enddate": "2035-06-03"    
}


