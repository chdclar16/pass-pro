# Pass Pro

-   Michael Gianoulakis
-   Joseph Ferraro
-   Chad Manuel

---

## Design

-   [API End points](docs/api.md)
-   [Graphical Human Interface](docs/ghi.md)
-   [Data Model](docs/model.md)

---

## Goal

Pass Pro's goal is to offer a simple and efficient platform for individuals to buy tickets and empower event hosts to easily create and sell tickets for their own events.

---

## Running the Project

To launch this application on your local machine, please ensure that you meet the requirements.

#### Requirements:

-   Docker
-   Google Chrome or any browser

#### Installation

1. Fork Project by clicking Fork on top right of project (Login Required)
2. Press Clone to grab URL from Forked project page then open up a terminal and run the git clone command.

```
    git clone "URL HERE"
```

3. Once the clone finishes, navigate to the correct directory by running this command in your terminal.

```
    cd passpro/app
```

4. While the terminal and run the following commands (Ensure Docker is running)

```
    1. docker-compose build
    2. docker-compose up
```

5. There should be 3 containers that are running(The containers should be green)
6. Wait until the terminal shows `You can now view app in the browser.`
7. Open up Chrome(Browser) and type in `http://localhost:3000/` in the address bar.

---
