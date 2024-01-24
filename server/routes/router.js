const { GoogleSpreadsheet } = require('google-spreadsheet');
const google = require("googleapis");
const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const app = express();

const uploads = require("../models/teachermodal");
const totalRegistration = require("../models/TotalRegistrationNo");
// const totalRegistrationdev = require("../models/TotalRegistrationDev");

const bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fs = require("fs");

const subCourse = require("../models/Subcourse");
const registerStudent = require("../models/RegisteredStudent");
const registerStudentDev = require("../models/RegisterStudentDev");
const registerStudentDev2 = require("../models/RegistrationDev2");
const counselors = require("../models/Counselor")
// const uploadfiles = require('../models/UploadedItem')
const options = { stats: true }
const { JWT } = require('google-auth-library');


const jwt_secret = "uuu"


router.post("/google-sheet-data",async(req,res) =>{

 

    try{
    const serviceAccountAuth = new JWT({
        // env var values here are copied from service account credentials generated by google
        // see "Authentication" section in docs for more info
        email: 'registrationgooglesheet@optical-wall-409909.iam.gserviceaccount.com',
        key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCNFZEHF0DuPXs+\nDcW3tnCO7K5R0AhBGFljvbyKn5QtNm6fgrTit4CSw49wtVDWxosjk8zSeBThc0Xw\nk4MneJe0o1xVKJ92Yl7CfGj9VbeBX/iuSGDsw7YO5H1s99dWnhlvZXx8BXpt/Hjm\nEpeFPhwZMvg7T+aQZDOlxyZhpvFK7NVF+L6kkGjCG+ZauEzmPzKKH6ULAw2IwPyd\ncwFcGAIcp69EJIE8gzaCRpOeSC2USd5oBkkAGs1xEy/qu1a2Px7bKtlTUj7nq546\nokzNFJqSYBZyxOr0g/OdCEQx5m1fnseBZEf1aDRENn7fRy/W10NRRFoxCIxKVe9g\n6H6albuLAgMBAAECggEAQP7egVXFI/xO+pd9rtTtpeqDpE0igFqnU7vlUDeUHAAn\nlnSwwIGpSfOt8U6Wn1t4XjuI8K1BcVuZrOtIULbNrPpVXyYH0JIg9Zg7BfqnP4Ln\nHeNaQ7kl9lZtMfY7zjunnBo07y3W6TSWvedyxn+GklVY5no4zexbntPQasxt/QXP\nQzQqk+EkvdHu/C1S3kVs45TD0gwjjBXfYAv1XnmwXcH2UGJsCjh+keNVdmFWKb1+\np2Milo86rbe656jH+BycPwgv+Ag0FX13CBh5/4uFg9vRlr1l5OiUaWETQlSusp+5\ncJ4LvR7X1034RIqJDdjPXBAT2Td/SBDs42GJIyTpAQKBgQDE+f4dtZVscxFe3cjB\nBepiTPVEDl2ofE/9/XHDdT7GAj3gNpt8Njfxcrp/Iyxah1RJX4norQ9Yo3mpzRBi\nOFktfQLjqv6sHINn35w5Ab9gAp/1TyAtBgPtu9h38TnjyKptQaj8jHLvgLqrENYJ\nn/mK9A0bdwNiL+BSw6eVpNzC4wKBgQC3XBgWNzDFgkQUDZYD+ixKZZRn+9UZ9MF7\nhbmzTJr5bbEiVNIsZVtW4Weo0O1SEys7/talBj4vO5qJPcoGhxWo9agJMQHvm6lC\nYfJjXJVa/aC+n+vb5OF8tKRc17zO/PzuzJ/JE6uyMXV0aZ57V0Y0uklsxiJCqZWW\nM5V1eBz9OQKBgAQ8H7OB0OmY+7mfaQ6FUwmz/93rtSXHLm0Wgtih76yQJcZpRiSA\ngell/w52siBsImrFbBCdj+Pm99mnt/90mK46rtI4PetzXXvhOdmb6QJmbAv5HIb7\nRyBYVooVnJoCGW/p5nkvh9UQXnMJFKD2WIYdQx7hCyiUQO1mmXbFKZ3jAoGAHPXH\nvCKFanyTohMvQXuO6UU39mB5HPtiX88UMHSF+aVQl9qLw4VSstsxEyHEifULHBO4\n9SGSSsWAN/LxaKyHSENcge8iniSYzCpKLVVfJZrve4wopXd2ActKNnvAj3S3wkPB\nbPHVaXSUV4mjBVoYdZWCqVJ18M92F94X2hDZi0kCgYARpi6PQL4F3bcIwGDwA5lh\nRaZ7tv9DZi6WvJRjy1Kd65oxyljPImcPaxt7I+HuVikub3a1uFoFM/Kk7NJbNHVy\nTaJX84JQSfpLGn9l7beimzGuho8obEJOZKWtK4SIdtgh9p62ji7I6NFKdsfA4myO\nKY9vH2DLSFlOVHibsKmFgg==\n-----END PRIVATE KEY-----\n',
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
        ],
      });

    // const doc = new GoogleSpreadsheet('1Uyn8D87__CUhM0m08kpS63cD2nbw7DI6j3bVUkWZm_4', serviceAccountAuth);
    const doc = new GoogleSpreadsheet('1_PMdmi3cd24bTEt3IVANPUvMxYQCQ8t-0zxNSOOF_JU', serviceAccountAuth);

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0];
   
      
      // console.log(doc.title);
      await doc.updateProperties({ title: 'Admission Details 2024' });

      const HEADERS = ['Enrollment_Id','Counselor_Name','Student_Name','Email_ID','Contact_No', 'Course_Name','Total_Amount','Registation_Amount','Date_of_Reg','Expected_Batch_Allocation','Batch_Allocation','Payment_Method','Total_Installment','Batch_Mode','Remark']
      await sheet.setHeaderRow(HEADERS)

      let data = { 
        Enrollment_Id: req.body.RegistrationNo,
        Counselor_Name:  req.body.Counselor,
        Guardian_Name: req.body.pname, 
        Student_Name: req.body.Name,
        Email_ID: req.body.Email,
        Contact_No: req.body.Number,
        Course_Name: req.body.subCourse,
        Total_Amount: req.body.CourseFees,
        Registation_Amount:req.body.RegistrationFees,
        Date_of_Reg:req.body.RegistrationDate,
        Expected_Batch_Allocation:req.body.joinDate,
        Batch_Allocation:"",
        Payment_Method:req.body.PaymentMethod,
        Batch_Mode:req.body.BatchMode,
        Remark:req.body.Remark,
        Total_Installment:req.body.totalInstallment
    }
    //   ['S.No','Counselor_Name','Enrollment_Id','Student_Name','Email_ID','Contact_No.', 'Course_ Name','Total_Amount','Registation_Amount','Date_of_Reg.','Batch_Allocation','Payment_Mode','Batch_Mode','Remark']

      await sheet.addRow(data)
      
        // Reload the sheet to get the updated data
    await sheet.loadCells();

    sheet.rowCount;

    let usedRowCount = 0;

    // Iterate through rows and check if they have values
    for (let i = 0; i < sheet.rowCount; i++) {
        const cell = sheet.getCell(i, 0); // Assuming checking the first column for data
        if (cell.value !== null) {
            usedRowCount++;
        } else {
            break; // Stop checking once an empty row is encountered
        }
    }

    // console.log('row count =',usedRowCount)

    let updateRegister = await registerStudentDev.updateOne({RegistrationNo:req.body.RegistrationNo},{index:usedRowCount})

    // Find the added row based on some criteria (for example, Enrollment_Id)
    const addedRow = await sheet.getRows({ offset: 1, limit: 1, query: 'Enrollment_Id = ' + req.body.RegistrationNo });

    if (addedRow) {
      // This is the row number, you can use it as an ID
      // console.log('Added row ID:', addedRowId);
      res.json({ "status": true });
    } else {
      res.json({ "status": false });
    }

    const afterMemoryUsage = process.memoryUsage();

        // console.log(`Memory before operation google-sheet  route: ${beforeMemoryUsage.heapUsed / 1024 / 1024} MB`);
        // console.log(`Memory after operation  google-sheet route: ${afterMemoryUsage.heapUsed / 1024 / 1024} MB`);
  } catch (error) {
      console.log('error google-sheet =', error.message);
    res.json({ "status": false });
  }
    

})

router.post("/updateRegisterStudent", async (req, res) => {
    
    // // console.log("register route =", req.body)
    try {
    const totalMonthRegistration = await totalRegistration.find({"month":req.body.month,"year":req.body.year})
    const StudentByRegistration = await totalRegistration.findOne({"RegistrationNo":req.body.RegistrationNo})
    const Student = await registerStudentDev.findOne({"RegistrationNo":req.body.RegistrationNo})

     let oldRegistrationNo = req.body.RegistrationNo

        const updateRegistration = await updateRegisterNo(totalMonthRegistration,Student,req.body,StudentByRegistration)
        // console.log('update registration',updateRegistration)
        req.body.RegistrationNo = updateRegistration
        
        if(req.body.PaymentMethod==="OTP"){
            req.body.RemainingFees="0" 
        }
        else{
    
            req.body.RemainingFees = req.body.CourseFees - req.body.RegistrationFees
        }
    

       // console.log('update total register =',oldRegistrationNo)
        const savedUser = await registerStudentDev.updateOne({RegistrationNo:oldRegistrationNo},req.body)
        const data = await registerStudentDev.findOne({RegistrationNo:req.body.RegistrationNo})
        req.body.oldRegistrationNo = oldRegistrationNo;      
            
       
        res.status(200).json(req.body);
        // console.log('updated register student =',savedUser,data)
    } catch (error) {
        console.log("update register =",error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.post("/update-google-sheet-data", async (req, res) => {
    // console.log('update google =', req.body);
  
    try {
      const serviceAccountAuth = new JWT({
        email: 'registrationgooglesheet@optical-wall-409909.iam.gserviceaccount.com',
        key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCNFZEHF0DuPXs+\nDcW3tnCO7K5R0AhBGFljvbyKn5QtNm6fgrTit4CSw49wtVDWxosjk8zSeBThc0Xw\nk4MneJe0o1xVKJ92Yl7CfGj9VbeBX/iuSGDsw7YO5H1s99dWnhlvZXx8BXpt/Hjm\nEpeFPhwZMvg7T+aQZDOlxyZhpvFK7NVF+L6kkGjCG+ZauEzmPzKKH6ULAw2IwPyd\ncwFcGAIcp69EJIE8gzaCRpOeSC2USd5oBkkAGs1xEy/qu1a2Px7bKtlTUj7nq546\nokzNFJqSYBZyxOr0g/OdCEQx5m1fnseBZEf1aDRENn7fRy/W10NRRFoxCIxKVe9g\n6H6albuLAgMBAAECggEAQP7egVXFI/xO+pd9rtTtpeqDpE0igFqnU7vlUDeUHAAn\nlnSwwIGpSfOt8U6Wn1t4XjuI8K1BcVuZrOtIULbNrPpVXyYH0JIg9Zg7BfqnP4Ln\nHeNaQ7kl9lZtMfY7zjunnBo07y3W6TSWvedyxn+GklVY5no4zexbntPQasxt/QXP\nQzQqk+EkvdHu/C1S3kVs45TD0gwjjBXfYAv1XnmwXcH2UGJsCjh+keNVdmFWKb1+\np2Milo86rbe656jH+BycPwgv+Ag0FX13CBh5/4uFg9vRlr1l5OiUaWETQlSusp+5\ncJ4LvR7X1034RIqJDdjPXBAT2Td/SBDs42GJIyTpAQKBgQDE+f4dtZVscxFe3cjB\nBepiTPVEDl2ofE/9/XHDdT7GAj3gNpt8Njfxcrp/Iyxah1RJX4norQ9Yo3mpzRBi\nOFktfQLjqv6sHINn35w5Ab9gAp/1TyAtBgPtu9h38TnjyKptQaj8jHLvgLqrENYJ\nn/mK9A0bdwNiL+BSw6eVpNzC4wKBgQC3XBgWNzDFgkQUDZYD+ixKZZRn+9UZ9MF7\nhbmzTJr5bbEiVNIsZVtW4Weo0O1SEys7/talBj4vO5qJPcoGhxWo9agJMQHvm6lC\nYfJjXJVa/aC+n+vb5OF8tKRc17zO/PzuzJ/JE6uyMXV0aZ57V0Y0uklsxiJCqZWW\nM5V1eBz9OQKBgAQ8H7OB0OmY+7mfaQ6FUwmz/93rtSXHLm0Wgtih76yQJcZpRiSA\ngell/w52siBsImrFbBCdj+Pm99mnt/90mK46rtI4PetzXXvhOdmb6QJmbAv5HIb7\nRyBYVooVnJoCGW/p5nkvh9UQXnMJFKD2WIYdQx7hCyiUQO1mmXbFKZ3jAoGAHPXH\nvCKFanyTohMvQXuO6UU39mB5HPtiX88UMHSF+aVQl9qLw4VSstsxEyHEifULHBO4\n9SGSSsWAN/LxaKyHSENcge8iniSYzCpKLVVfJZrve4wopXd2ActKNnvAj3S3wkPB\nbPHVaXSUV4mjBVoYdZWCqVJ18M92F94X2hDZi0kCgYARpi6PQL4F3bcIwGDwA5lh\nRaZ7tv9DZi6WvJRjy1Kd65oxyljPImcPaxt7I+HuVikub3a1uFoFM/Kk7NJbNHVy\nTaJX84JQSfpLGn9l7beimzGuho8obEJOZKWtK4SIdtgh9p62ji7I6NFKdsfA4myO\nKY9vH2DLSFlOVHibsKmFgg==\n-----END PRIVATE KEY-----\n',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
  
      const doc = new GoogleSpreadsheet('1_PMdmi3cd24bTEt3IVANPUvMxYQCQ8t-0zxNSOOF_JU', serviceAccountAuth);
  
      await doc.loadInfo(); // loads document properties and worksheets
      const sheet = doc.sheetsByIndex[0];
  
    //   const rows = await sheet.getRows({
    //     query: `Enrollment_Id = '${req.body.oldRegistrationNo}'`
    //   });

    const rows = await sheet.getRows({
        offset: 1,
        limit: 1,
      });

      // console.log('rows =',rows)
  
      if (rows.length > 0) {
        const existingRow = rows[0];
        // console.log('Existing row =', req.body.oldRegistrationNo, existingRow);
  
        existingRow.Enrollment_Id = req.body.RegistrationNo;
        existingRow.Counselor_Name = req.body.Counselor;
        existingRow.Guardian_Name = req.body.pname;
        existingRow.Student_Name = req.body.Name;
        existingRow.Email_ID = req.body.Email;
        existingRow.Contact_No = req.body.Number;
        existingRow.Course_Name = req.body.subCourse;
        existingRow.Total_Amount = req.body.CourseFees;
        existingRow.Registation_Amount = req.body.RegistrationFees;
        existingRow.Date_of_Reg = req.body.RegistrationDate;
        existingRow.Batch_Allocation = req.body.joinDate;
        existingRow.Batch_Allocation = req.body.joinDate;
        existingRow.Payment_Method = req.body.PaymentMethod;
        existingRow.Batch_Mode = req.body.BatchMode;
        existingRow.Remark = req.body.Remark;
        existingRow.Total_Installment = req.body.totalInstallment;
  
        await existingRow.save();
        // console.log('Row updated successfully');
      } else {
        let data = {
          Enrollment_Id: req.body.RegistrationNo,
          Counselor_Name: req.body.Counselor,
          Guardian_Name: req.body.pname,
          Student_Name: req.body.Name,
          Email_ID: req.body.Email,
          Contact_No: req.body.Number,
          Course_Name: req.body.subCourse,
          Total_Amount: req.body.CourseFees,
          Registation_Amount: req.body.RegistrationFees,
          Date_of_Reg: req.body.RegistrationDate,
          Batch_Allocation: req.body.joinDate,
          Payment_Method: req.body.PaymentMethod,
          Batch_Mode: req.body.BatchMode,
          Remark: req.body.Remark,
          Total_Installment: req.body.totalInstallment
        };
  
        await sheet.addRow(data);
        // console.log('Row added successfully');
      }
  
      res.json({ "status": true });
    } catch (error) {
      console.log('update google-sheet Error:', error.message);
      res.json({ "status": false, "error": error.message });
    }
  });


  router.post('/edit-google-sheet', async (req, res) => {
   

    try {
        const serviceAccountAuth = new JWT({
            email: 'registrationgooglesheet@optical-wall-409909.iam.gserviceaccount.com',
            key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCNFZEHF0DuPXs+\nDcW3tnCO7K5R0AhBGFljvbyKn5QtNm6fgrTit4CSw49wtVDWxosjk8zSeBThc0Xw\nk4MneJe0o1xVKJ92Yl7CfGj9VbeBX/iuSGDsw7YO5H1s99dWnhlvZXx8BXpt/Hjm\nEpeFPhwZMvg7T+aQZDOlxyZhpvFK7NVF+L6kkGjCG+ZauEzmPzKKH6ULAw2IwPyd\ncwFcGAIcp69EJIE8gzaCRpOeSC2USd5oBkkAGs1xEy/qu1a2Px7bKtlTUj7nq546\nokzNFJqSYBZyxOr0g/OdCEQx5m1fnseBZEf1aDRENn7fRy/W10NRRFoxCIxKVe9g\n6H6albuLAgMBAAECggEAQP7egVXFI/xO+pd9rtTtpeqDpE0igFqnU7vlUDeUHAAn\nlnSwwIGpSfOt8U6Wn1t4XjuI8K1BcVuZrOtIULbNrPpVXyYH0JIg9Zg7BfqnP4Ln\nHeNaQ7kl9lZtMfY7zjunnBo07y3W6TSWvedyxn+GklVY5no4zexbntPQasxt/QXP\nQzQqk+EkvdHu/C1S3kVs45TD0gwjjBXfYAv1XnmwXcH2UGJsCjh+keNVdmFWKb1+\np2Milo86rbe656jH+BycPwgv+Ag0FX13CBh5/4uFg9vRlr1l5OiUaWETQlSusp+5\ncJ4LvR7X1034RIqJDdjPXBAT2Td/SBDs42GJIyTpAQKBgQDE+f4dtZVscxFe3cjB\nBepiTPVEDl2ofE/9/XHDdT7GAj3gNpt8Njfxcrp/Iyxah1RJX4norQ9Yo3mpzRBi\nOFktfQLjqv6sHINn35w5Ab9gAp/1TyAtBgPtu9h38TnjyKptQaj8jHLvgLqrENYJ\nn/mK9A0bdwNiL+BSw6eVpNzC4wKBgQC3XBgWNzDFgkQUDZYD+ixKZZRn+9UZ9MF7\nhbmzTJr5bbEiVNIsZVtW4Weo0O1SEys7/talBj4vO5qJPcoGhxWo9agJMQHvm6lC\nYfJjXJVa/aC+n+vb5OF8tKRc17zO/PzuzJ/JE6uyMXV0aZ57V0Y0uklsxiJCqZWW\nM5V1eBz9OQKBgAQ8H7OB0OmY+7mfaQ6FUwmz/93rtSXHLm0Wgtih76yQJcZpRiSA\ngell/w52siBsImrFbBCdj+Pm99mnt/90mK46rtI4PetzXXvhOdmb6QJmbAv5HIb7\nRyBYVooVnJoCGW/p5nkvh9UQXnMJFKD2WIYdQx7hCyiUQO1mmXbFKZ3jAoGAHPXH\nvCKFanyTohMvQXuO6UU39mB5HPtiX88UMHSF+aVQl9qLw4VSstsxEyHEifULHBO4\n9SGSSsWAN/LxaKyHSENcge8iniSYzCpKLVVfJZrve4wopXd2ActKNnvAj3S3wkPB\nbPHVaXSUV4mjBVoYdZWCqVJ18M92F94X2hDZi0kCgYARpi6PQL4F3bcIwGDwA5lh\nRaZ7tv9DZi6WvJRjy1Kd65oxyljPImcPaxt7I+HuVikub3a1uFoFM/Kk7NJbNHVy\nTaJX84JQSfpLGn9l7beimzGuho8obEJOZKWtK4SIdtgh9p62ji7I6NFKdsfA4myO\nKY9vH2DLSFlOVHibsKmFgg==\n-----END PRIVATE KEY-----\n',
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet('1_PMdmi3cd24bTEt3IVANPUvMxYQCQ8t-0zxNSOOF_JU', serviceAccountAuth);

        await doc.loadInfo(); // loads document properties and worksheets

        const sheet = doc.sheetsByIndex[0];
        let index = parseInt(req.body.index)

        // console.log('req body =',req.body)

        // Assume you want to update the values in the first row of "Sheet2"
        await sheet.loadCells();

        let Enrollment_Id = sheet.getCellByA1(`A${index}`);
        let Counselor_Name = sheet.getCellByA1(`B${index}`);
        let Student_Name = sheet.getCellByA1(`C${index}`);
        let Email_ID = sheet.getCellByA1(`D${index}`);
        let Contact_No = sheet.getCellByA1(`E${index}`);
        let Course_Name = sheet.getCellByA1(`F${index}`);
        let Total_Amount = sheet.getCellByA1(`G${index}`);
        let Registation_Amount = sheet.getCellByA1(`H${index}`);
        let Date_of_Reg = sheet.getCellByA1(`I${index}`);
        let Expected_Batch_Allocation = sheet.getCellByA1(`J${index}`);
        let Batch_Allocation = sheet.getCellByA1(`K${index}`);
        let Payment_Method = sheet.getCellByA1(`L${index}`);
        let Total_Installment = sheet.getCellByA1(`M${index}`);
        let Batch_Mode = sheet.getCellByA1(`N${index}`);
        let Remark = sheet.getCellByA1(`O${index}`);


        Enrollment_Id.value = req.body.RegistrationNo;
        Counselor_Name.value = req.body.Counselor;
        Student_Name.value = req.body.Name;
        Email_ID.value = req.body.Email;
        Contact_No.value = req.body.Number;
        Course_Name.value = req.body.subCourse;
        Total_Amount.value = req.body.CourseFees;
        Registation_Amount.value = req.body.RegistrationFees;
        Payment_Method.value = req.body.PaymentMethod;
        Date_of_Reg.value = req.body.RegistrationDate;
        Expected_Batch_Allocation.value=req.body.joinDate;
        Batch_Allocation.value = "";
        Total_Installment.value = req.body.totalInstallment;
        Batch_Mode.value = req.body.BatchMode;
        Remark.value = req.body.Remark;

        await sheet.saveUpdatedCells();  // Save the changes

        res.json({ "status": true });
    } catch (error) {
        console.log('error edit  =', error.message);
        res.json({ "status": false });
    }
});

  

router.get('/allSubMainCourse',async(req,res)=>{  
    
    // // console.log("all sub main course func =")
    let allCourse = await subCourse.find()

    let courses =[]
    allCourse.map(data=>{

        data.subCourse.map(element=>{
            courses.push(element)
        })
    
    })
    let maincourses =[]

    allCourse.map(data=>{
            maincourses.push(data.mainCourse)       
    
    })
        res.send({courses:courses,mainCourse:maincourses,allCourse:allCourse})
})



router.post("/registerStudent", async (req, res) => {
    const beforeMemoryUsage = process.memoryUsage();
      // const lastStudent = await registerStudentDev.findOne({}, {}, { sort: { _id: -1 } }).exec();
      try {
    const totalRegistrationNo = await totalRegistration.find({"month":req.body.month,"year":req.body.year})


    let newRegistration;
    
    newRegistration = generateRegisterNo(totalRegistrationNo,req.body)
    req.body.RegistrationNo = newRegistration
    if(req.body.PaymentMethod==="OTP"){
        req.body.RemainingFees="0" 
    }
    else{

        req.body.RemainingFees = req.body.CourseFees - req.body.RegistrationFees
    }
    req.body.index = "";

   
        const savedUser = await registerStudentDev.create(req.body);
        // console.log('saved user =',savedUser)
        const addRegistrationNo = await totalRegistration.create(req.body)

        const afterMemoryUsage = process.memoryUsage();

        // console.log(`Memory before operation add register route: ${beforeMemoryUsage.heapUsed / 1024 / 1024} MB`);
        // console.log(`Memory after operation add register route: ${afterMemoryUsage.heapUsed / 1024 / 1024} MB`);
        res.status(200).json(savedUser);
    } catch (error) {
        console.log("error register student =",error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});


// Generate EnrollmentNo
const generateRegisterNo = (monthStudent, data) => {

    try
    {
     // // console.log("data of student =",data)
        let course = data.courseCode;
        let newStudentCourse = data.Course
 
     let registrationNo;
    
 
     let year =  data.year;
     let month = data.month;
 
     if (monthStudent) {
              let courseCount = 1;
 
             monthStudent.map(data=>{
                 if(data.Course===newStudentCourse){
 
                     courseCount = courseCount+1
                 }
             })
 
             courseCount  =  courseCount < 10 ? '0' + courseCount : courseCount.toString()
             registrationNo = `UC${year}/${course}-${data.counselorReference}/${month}-${courseCount}`;
         }
      else {
         registrationNo = `UC${year}/${course}-${data.counselorReference}/${month}-01`;
     }
 
     return registrationNo;}
 
     catch(error){
         // console.log("error =",error.message)
         res.status(500).json({ error: "Something went wrong" });
     }
 };


// update generate enrollment no

const updateRegisterNo = async(totalMonthRegistration,Student,data,StudentByRegistration) => {
   
    try {
      // console.log("update register =", data,Student)
  
  
      let oldRegistartion = data.RegistrationNo;
      let newRegistrationNo;
      let courseCount = oldRegistartion.split('/')[2].split('-')[1]
  
      let oldCourseCode = oldRegistartion.split('/')[1].split('-')[0]
      let oldMonth = oldRegistartion.split('/')[2].split('-')[0]
  
      let oldCourse = Student.Course;
      let newCourse = data.Course;
      let newCourseCode = data.courseCode;
  
      let year =  data.year;
      let month = data.month;
  
  
      let totalOldCourse = await totalRegistration.find({"Course":oldCourse,"month":data.month,"year":data.year})
      let totalNewCourse = await totalRegistration.find({"Course":newCourse,"month":data.month,"year":data.year})
  
      totalOldCourse = totalOldCourse.length>10?totalOldCourse.length:`0${totalOldCourse.length}`
      totalNewCourse = (totalNewCourse.length+1)>10?(totalNewCourse.length+1):`0${(totalNewCourse.length+1)}`
      // console.log('courseCount =',courseCount,totalOldCourse,StudentByRegistration)
  
      if(parseInt(courseCount)==totalOldCourse){
  
          newRegistrationNo = `UC${year}/${newCourseCode}-${data.counselorReference}/${month}-${totalNewCourse}`;
          // console.log('registration new =',newRegistrationNo)
          data.RegistrationNo = newRegistrationNo
  
          let updateTotalRegister = await totalRegistration.updateOne({_id:StudentByRegistration._id},data)
  
      }
  
      else if(totalMonthRegistration.length>0)
      {
          if(month===oldMonth){
          if(oldCourse===newCourse){
  
              if(oldCourseCode===newCourseCode){
  
                  // console.log('code is same =',newCourseCode,data.counselorReference)
  
                  newRegistrationNo = `UC${year}/${newCourseCode}-${data.counselorReference}/${month}-${courseCount}`;
              }
  
              else{
                  // console.log('code is not same =',oldCourseCode,newCourseCode,data.counselorReference)
              newRegistrationNo = `UC${year}/${oldCourseCode}-${newCourseCode}-${data.counselorReference}/${month}-${courseCount}`;
  
              }
          }
          else{
              let count = 1;
              totalMonthRegistration.map(data=>{
                  if(data.Course===newCourse){
                      count = count + 1 
                  }
              })
              count = count>10?count:`0${count}`
              newRegistrationNo = `UC${year}/${oldCourseCode}-${newCourseCode}-${data.counselorReference}/${month}-${count}`;
              data.RegistrationNo = newRegistrationNo
              let addtotalRegister  = await totalRegistration.create(data)
  
          }
      }
  
      else{
          let count = 1
          // console.log("count",count)
  
          totalMonthRegistration.map(data=>{
              if(data.Course===newCourse){
                  count = count + 1
              }
          })
  
          count = count>10?count:`0${count}`
  
          if(oldCourseCode===newCourseCode){
              // console.log('month is not same =',newCourseCode,data.counselorReference)
  
              newRegistrationNo = `UC${year}/${newCourseCode}-${data.counselorReference}/${month}-${count}`;
          }
          else{
              newRegistrationNo = `UC${year}/${oldCourseCode}-${newCourseCode}-${data.counselorReference}/${month}-${count}`;
              data.RegistrationNo = newRegistrationNo
              let addtotalRegister  =await totalRegistration.create(data)
  
          }
  
         
      }
      }
  
      else{
          // console.log('registration no. else =')
          newRegistrationNo = `UC${year}/${newCourse}-${data.counselorReference}/${month}-01`;
  
      }
  
  
   return newRegistrationNo;
  }
  
   catch(error){
      // console.log("error =",error.message)
      res.status(500).json({ error: "Something went wrong" });
   }
  };


//Get resister student

router.get("/getregisterStudent", async (req, res) => {
    try {
        const userdata = await registerStudentDev.find();
        res.status(200).json(userdata);
    } catch (error) {
        console.log('error get register=', error.message)
        res.status(500).json(error);
    }
});

// route to get all counselor data

router.get('/getAllCounselor', async (req, res) => {
    try {
        const counselorData = await counselors.find({});
        res.send({ "status": "active", "counselorData": counselorData })
    }
    catch (error) {
        console.log("get counselor error =",error.message)
        res.send({ "status": "error" })

    }
})


// route to get batch student 


module.exports = router;






