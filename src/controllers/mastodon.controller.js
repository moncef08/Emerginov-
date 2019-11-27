
const Mastodon=require('mastodon-api');

const M=new Mastodon({

  client_key: "sbkjjlFE2FXYL5NSU5M-aBG6wDuN7nKMusvTeTCU6L4" ,
  client_secret: "I_NrWXxS4TNcL-AQhuGacStY0rymQmOTdDYdwZus-bk" ,
  access_token: "ftD6_-7GUyICadICrUlhDFCBqCmJ8QBKS_4QBT5Y1Cg",
  timeout_ms: 60*1000
})


export async function putMessage(req,res){

  const params={
    status:req.body.message
  }
  M.post('statuses',params,(error,data)=>{
    if (error) {
        console.error(error);
    }else {
      console.log("success, id: "+data.id+" ");
      console.log(data);
      var username=data.account.username;
      console.log(username);
      res.json({
        "name":username
      })
    }
  })
}
  const listener = M.stream('streaming/user')

  listener.on('message', msg =>{
    console.log(msg.data.account.username+": "+msg.data.content);
    newMessage(msg);
  });


  listener.on('error', err => console.log(err));

  // export async function newMessage(msg,req,res){
  //   res.json({
  //     "new":msg.data.account.username+": "+msg.data.content
  //   })
  // }
