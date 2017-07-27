var Auth = require('./index');
var auth = new Auth({
  "url": "",
  "expire": 3600,
  "prefix": "",
  "secret": ""
});

var opts = {
  payload: { thisopts: 'thisdoiwefwe', secondone: 'soihfwoeifhw2' },
  iam: {
    Statement: [
      {
        Effect: 'Allow',
        Action: [ 'Read' ],
        Resource: [ 'ssrn:ss:iam::100:assessmentgroup/*/customquestions' ]
      },
      {
        Effect: 'Allow',
        Action: [ 'Update', 'Delete', 'Create' ],
        Resource: 'ssrn:ss:iam::100:assessmentgroup/1/customquestions'
      }
    ]
  }
};
var newTestToken = null
auth.register(opts)
  .then(res => {
      newTestToken = res.token;
      return auth.ttl(res.token)
  })
  .then(console.log)
setTimeout(() => {auth.logout(newTestToken).then(console.log).catch(console.log)},3000)  
setTimeout(
  () => {
    auth.register(opts, 5).then(res => {
      setTimeout(
        () => {
          auth.check(res.token).then(console.log).catch(console.log);
        },
        7000
      );
    });
  },
  3000
);

auth.register(opts).then(res => {
  var token = res.token;
  auth.permissions(token).then(console.log).catch(console.log);
  auth.check(token).then(console.log).catch(console.log);
  setTimeout(
    () => {
      auth.logout(token).then(console.log).catch(console.log);
      auth.permissions(token).then(console.log).catch(console.log);
      auth.check(token).then(console.log).catch(console.log);
    },
    2000
  );
}).catch(console.log);
