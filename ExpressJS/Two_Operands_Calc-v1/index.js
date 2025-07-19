import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const appEx = express();
const port = 8080;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let result = "";

appEx.use(express.json());
appEx.use(bodyParser.urlencoded({ extended: true }));
appEx.use(express.static(path.join(__dirname, "public")));

//Custom MiddleWare
function calculator(req, res, next) {
    if (req.path === '/calculate' && req.method === 'POST') {
        let { num1, num2, operator } = req.body;
        num1 = parseInt(num1);
        num2 = parseInt(num2);
        switch (operator) {
            case "+": result = num1 + num2;
                break;
            case "-": result = num1 - num2;
                break;
            case "*": result = num1 * num2;
                break;
            case "**": result = num1 ** num2;
                break;
            case "/": result = num1 / num2;
                break;
            case "//": result = Math.floor(num1 / num2);
                break;
            case "%": result = num1 % num2;
                break;
            case "&": result = num1 & num2;
                break;
            case "|": result = num1 | num2;
                break;
            case "^": result = num1 ^ num2;
                break;
            default: result = "Operator Not found";
        }
    }
    next();
}

// MiddleWare
appEx.use(calculator);


appEx.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

appEx.post("/calculate", (req, res) => {
    res.json({ result });
});

appEx.listen(port, (req, res) => {
    console.log(`Server hosted on http://localhost:${port}`)
});