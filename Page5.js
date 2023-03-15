const express = require('express')
const app = express()
const mysql = require('mysql2')

app.set('view engine','ejs')


const conn = mysql.createConnection({

    
            host:"localhost",
            user:'root',
            password:'root',
            database:'StudentDB'
})

conn.connect((err) =>
{
   if(err)
   {
    console.log("error");
   }
   console.log("succeed");
})

app.get('/pageee',(req,res)=>
{
    console.log(req.query);
    var fname = req.query.fname || '';
    var lname = req.query.lname || '';
    var email = req.query.email || '';
    var contact = req.query.contact || '';
    var college = req.query.college || '';
    var searchstr = req.query.searchstr || '';

    const value =[];
    value.push(fname,lname,email,contact,college);

    var substr = ' where ';

    const actual = ['sd_fname','sd_lname','sd_email','sd_contact','sd_collegeid'];

    for(let i=0;i<actual.length;i++)
    {
        if(value[i] != '')
        {
            console.log("i :::",i);
         substr += `${actual[i]} like "${value[i]}%" and `;
        
        }
    }
 
    if(substr.endsWith(' where '))
    {
        console.log("in if");
        substr ='';
    }

    substr = substr.slice(0,(substr.length - 5)); 
    console.log(substr);

    var sql = `select * from student_express ${substr} ` ;
    conn.query(sql,(err,data) =>
    {
          if(err)
          {
            console.log(err);
          }

          res.render('index5.ejs',{data,searchstr});
         });
})

app.listen(3000);