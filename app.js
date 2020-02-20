const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// write function
const writeFileAsync = util.promisify(fs.writeFile);

function questionsAnswers() {
    return inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Please enter your team member's name?"
        },
        {
            type: "list",
            name: "memberTitle",
            message: "Please chose your team member's title?",
            choices: ["Manager", "Engineer", "Intern"]
        },
        {
            type: "input",
            name: "id",
            message: "Please enter your team member's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your team member's E-mail?"
        },


    ]);
}


function generateHTML(answers) {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <title>Engineer</title>
</head>

<body>
    <div class="container">
        <div class="jumbotron bg-primary" style="color: white; text-align: center;">
            <h1><strong>Our Teams</strong></h1>
        </div>
        <!--card number 1-->
        <div class="row justify-content-center">
            <div class="col align-self-start">
                <div class="card border-dark mb-4" style="width: 19rem;height: 19rem;">
                    <div class="card-header bg-primary" style="color: white;">
                        <h4>${answers.name}</h4>
                        <h5><i class="fas fa-mug-hot"></i> ${answers.memberTitle}</h5>
                    </div>
                    <div class="card-body text-dark">
                        <div class="card" style="width: 16rem;">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" style="text-align:left"><strong>ID: </strong>${answers.id}</li>
                                <li class="list-group-item" style="text-align:left"><strong>Email: </strong>${answers.email}
                                </li>
                                <li class="list-group-item" style="text-align:left"><strong>Office: </strong>1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"></script>
</body>

</html>`;
}

async function init() {

    try {
        const answers = await questionsAnswers();

        const html = generateHTML(answers);

        await writeFileAsync("index.html", html);


    } catch (err) {
        console.log(err);
    }
}

init();