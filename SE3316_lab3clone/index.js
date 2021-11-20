const express = require('express');
//const cookieParser = require('cookie-parser');

const newConnection = require('./dbConnection');



const app = express();
//app.use(cookieParser());
//note im not using cookies in this but i instaled the package just in case


//note on database name: mysql-dbinstance password:3316password

app.use(express.urlencoded({extended:true}));

app.use(express.static('static'));

//datavbase connection and table creation
//sets some default values for time slots
let connection = newConnection();
connection.connect();

connection.query(`Drop Table TimeData`

                 ,(error,rows,feilds)=>{
                console.log(error);

                })
connection.query(`CREATE TABLE TimeData(
                    name varchar(20),
                    ts1 varchar(20),
                    ts2 varchar(20),
                    ts3 varchar(20),
                    ts4 varchar(20),
                    ts5 varchar(20),
                    ts6 varchar(20),
                    ts7 varchar(20),
                    ts8 varchar(20),
                    ts9 varchar(20),
                    ts10 varchar(20)

                );
                `
                ,(error,rows,feilds)=>{
                    console.log(error);

                })

connection.query('INSERT INTO TimeData VALUES ("Slots avalable","1:00-2:00","2:00-3:00","3:00-4:00","4:00-5:00","5:00-6:00","6:00-7:00","7:00-8:00","8:00-9:00","9:00-10:00","10:00-11:00")'
        ,(error,rows,feilds)=>{
            console.log(error);

        })


//dynamicaly generated pages

//login page for admin, redirects to admin page if pasword is correct
app.get( '/login',(request, response) => {
    let userName = request.query.uname;
    let password = request.query.pass;
    let content = 'the username and password were incoredt try admin and 123';
    if (userName=='admin' && password == '123')
    {
        response.redirect('/adminPage.html');
    }
    else{
        response.send(content+ '<br><br> <a href=\'/index.html\'> Click here return to the home page</a>');
    }
    
})

//save function for guest, activates when i save data will display database content
app.get('/submitGuestData',(request,response)=>
{   //create connection again
    let connection = newConnection();
    connection.connect();
    //add a row with new data
    connection.query('INSERT INTO TimeData VALUES ("'+request.query.name+'","'+request.query.ts1+'","'+request.query.ts2+'","'+request.query.ts3+'","'+request.query.ts4+'","'+request.query.ts5+'","'+request.query.ts6+'","'+request.query.ts7+'","'+request.query.ts8+'","'+request.query.ts9+'","'+ request.query.ts10+'")'
        ,(error,rows,feilds)=>{
            console.log(error);

        }
    )
    
    //display the db contents
    let content = 'Slots listed and previous responses:';
    connection.query(`select * from  TimeData `
                    ,(error,rows,feilds)=>{
                     console.log(error);
                     console.log(rows);          
                     content+= '<Table>';
                    for (r of rows)
                        {   content+= '<tr>';
                            content+= '<th>';
                            if(r.name!= 'undefined'){content+= r.name;} else{content+='no name'}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts1!= 'undefined'){content+= ' '+r.ts1; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts2!= 'undefined'){content+= ' '+r.ts2; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts3!= 'undefined'){content+= ' '+r.ts3; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts4!= 'undefined'){content+= ' '+r.ts4; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts5!= 'undefined'){content+= ' '+r.ts5; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts6!= 'undefined'){content+= ' '+r.ts6; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts7!= 'undefined'){content+= ' '+r.ts7; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts8!= 'undefined'){content+= ' '+r.ts8; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts9!= 'undefined'){content+= ' '+r.ts9; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts10!= 'undefined'){content+= ' '+r.ts10; } else{content+='     '} 
                            content+= '</th>';

                            content+= '</tr>';
                        }
                     content+= '</Table>';
                     content+=` <a href='/index.html'> Click here to return to the home paget</a> `;
                     response.send(content);
                    });
    


connection.end();
})

//save function for admin, activates when i save data will display database content
app.get('/submitAdminData',(request,response)=>
{    //create connection again
    let connection = newConnection();
    connection.connect();
    //update the first row
    connection.query(`UPDATE TimeData
                        SET ts1= '`+request.query.ts1+`',
                        ts2= '`+request.query.ts2+`',
                        ts3= '`+request.query.ts3+`',
                        ts4= '`+request.query.ts4+`',
                        ts5= '`+request.query.ts5+`',
                        ts6= '`+request.query.ts6+`',
                        ts7= '`+request.query.ts7+`',
                        ts8= '`+request.query.ts8+`',
                        ts9= '`+request.query.ts9+`',
                        ts10= '`+request.query.ts10+`'
                        
                        WHERE name = "Slots avalable";
                    `
        ,(error,rows,feilds)=>{
            console.log(error);

        }
    )
    
    
    //display the db contents
    let content = 'New slots set, previous responses below:';
    connection.query(`select * from  TimeData `
                    ,(error,rows,feilds)=>{
                     console.log(error);
                     content+= '<div>';
                     for (r of rows)
                        {   content+= '<tr>';
                            content+= '<th>';
                            if(r.name!= 'undefined'){content+= r.name;} else{content+='no name'}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts1!= 'undefined'){content+= ' '+r.ts1; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts2!= 'undefined'){content+= ' '+r.ts2; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts3!= 'undefined'){content+= ' '+r.ts3; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts4!= 'undefined'){content+= ' '+r.ts4; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts5!= 'undefined'){content+= ' '+r.ts5; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts6!= 'undefined'){content+= ' '+r.ts6; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts7!= 'undefined'){content+= ' '+r.ts7; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts8!= 'undefined'){content+= ' '+r.ts8; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts9!= 'undefined'){content+= ' '+r.ts9; } else{content+='     '}
                            content+= '</th>';
                            content+= '<th>';
                            if(r.ts10!= 'undefined'){content+= ' '+r.ts10; } else{content+='     '} 
                            content+= '</th>';

                            content+= '</tr>';
                        }
                     content+= '</div>';
                     content+=` <a href='/index.html'> Click here to return to the home paget</a> `;
                     response.send(content);
                    });
    
                    

connection.end(); 
})

connection.end();

app.listen(80);