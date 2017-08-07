var Auth = require('./index');
var auth = new Auth({
    "url": "",
    "expire": 3600,
    "prefix": "",
    "secret": ""
});

var opts = {
"payload":{},
"iam":{
 "Statement": [
            {
                 "Effect": "Allow",
                 "Action": "sp:*",
                 "Resource": [
                     "ssrn:ss:sp:::*",
                     "ssrn:ss:sp::global:*"
                 ]
             }
          ]
}
};
// auth.register(opts,0)
//   .then(res => {
//     console.log('==============')
//     console.log(res.token)
//   // auth.permissions(res.token).then(console.log).catch(console.log);
// })
auth.check('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjA4MWRlMjUwLTc5NDUtMTFlNy1iMWJmLTE3NGY3MzhmNGRlMSIsInRpbWVvdXQiOjAsImNyZWF0ZV90aW1lIjoxNTAxODcyMzA1Mzk3fQ.UNaZHd7J01DzbnRmLUOOEL_ezw5LfDeVVmRuR5NwTso')
.then(res => console.dir(res,{depth:10}))
.catch(console.log)
// auth.register(opts,0)
//   .then(res => {
//     console.log('==============')
//     console.log(res.token)
//   // auth.permissions(res.token).then(console.log).catch(console.log);
// })
// auth.register(opts)
//   .then(res => {
//     console.log('==============')
//     console.log(res.token)
//   // auth.permissions(res.token).then(console.log).catch(console.log);
// })
// auth.ttl('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjYzOGE1MDIwLTc5MjEtMTFlNy1iY2JkLWQ3MjIyOTI3NTA0MSIsImNyZWF0ZV90aW1lIjoxNTAxODU2OTk2ODk4fQ.yJh-sG0XOL6eCKhkm1ZvYo9294ZAd6Yibl3JVq8ER0Y').then(console.log).catch(console.log)
// auth.register(opts)
//   .then(res => {
//     setTimeout(() => {

//     auth.check(res.token)
//     .then(r => {
//       console.log(res)
//       auth.ttl(res.token)  
//     .then(console.log)
//     .catch(console.log)
//     })
//     .catch(console.log)
  
//     },2000)
//   // auth.permissions(res.token).then(console.log).catch(console.log);
// })
  


// auth.register(opts)
//   .then(res => {
//       newTestToken = res.token;
//       return auth.ttl(res.token)
//   })
//   .then(console.log)
// setTimeout(() => {auth.logout(newTestToken).then(console.log).catch(console.log)},3000)  
// setTimeout(
//   () => {
//     auth.register(opts, 5).then(res => {
//       setTimeout(
//         () => {
//           auth.check(res.token).then(console.log).catch(console.log);
//         },
//         7000
//       );
//     });
//   },
//   3000
// );

// auth.register(opts).then(res => {
//   var token = res.token;
//   auth.permissions(token).then(console.log).catch(console.log);
//   auth.check(token).then(console.log).catch(console.log);
//   setTimeout(
//     () => {
//       auth.logout(token).then(console.log).catch(console.log);
//       auth.permissions(token).then(console.log).catch(console.log);
//       auth.check(token).then(console.log).catch(console.log);
//     },
//     2000
//   );
// }).catch(console.log);
