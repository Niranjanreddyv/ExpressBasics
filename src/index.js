import express from 'express';
import morgan from 'morgan';

const app = express(); // created a express App/ server Object 

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : true}));

app.use(morgan('combined'));

// function commonMiddleware(req, res,next){
//     console.log("common middleware");
//     next();
// }

// app.use(commonMiddleware); // all routes it will call

function mid1(req, res, next){
    console.log("mid1q ");
    next();
}

function mid2(req, res, next){
    console.log("mid2 ");
    next();
}

// what to do if someone raise a GET request to /hello
app.get('/hello', [mid1, mid2], (req,res)=>{ 
    return res.json({
        message : "World hii......"
    })
})

// query parameters(?)
app.post('/hello', (req,res)=>{
    // console.log(req.query); // [Object: null prototype] { name: 'jhon' } for safty issues in express js
    console.log('query params : ',{...req.query}); // { name: 'jhon' }
    console.log('body params : ',req.body); // { name: 'jk' }
    
    return res.json({
        message : "hello "
    })
})

// url parameters(:) /* wildcard for 1,3,4, 5, randomly write also work
app.get('/users/:userId/books/:bookId', (req, res) => {
    console.log(req.params); // [Object: null prototype] { userId: '6', bookId: '4' }
    console.log({...req.params}); // { userId: '6', bookId: '4' }
    console.log(JSON.stringify(req.params)) // {"userId":"6","bookId":"4"}
  return res.json({
        message : "user details"
  })
})

// express 5 not work this syntax now
// app.all('*', (req, res) => {
//   return res.json({
//     message: "Not Found"
//   });
// });



// Define a PORT ans attach it to a express app
app.listen(3000, ()=>{
    console.log("server runing on port 3000");
})