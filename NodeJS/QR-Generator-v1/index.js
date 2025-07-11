import qr from "qr-image";
import inquirer from "inquirer";
import fs from "fs";

inquirer.prompt([{message:"Enter url",name:"URL"}])
        .then((answers)=>{
            console.log(answers);
            let qrImg=qr.image(answers.URL);
            qrImg.pipe(fs.createWriteStream("./qr-img.png"));
            fs.writeFile("./url.txt",`URL - ${answers.URL}`,(error)=>{
                if(error){
                    console.log("Fs error - ",error);
                }
            });
        })
        .catch((error)=>{
            if(error){
                console.log(error);
            }
        });

/*

- This program takes user input using inquirer.

- It uses qr-image to generate a QR code from that input.

- It then saves the QR code as a PNG file using the fs module.

*/