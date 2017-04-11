var Auth = require('./index');
var auth = new Auth({
  url: 'redis://x:RFLQETEKFFUDWXSI@aws-us-east-1-portal.16.dblayer.com:10127',
  prefix: 'stage',
  expire: 3600
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
