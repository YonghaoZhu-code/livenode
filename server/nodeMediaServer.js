const NodeMediaServer = require('node-media-server');
const live=require('../DAO/LiveDao')
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8989,
    allow_origin: '*'
}
}

const nms = new NodeMediaServer(config)
nms.run()
nms.on('prePublish', async (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  let session = nms.getSession(id);
  let uuid = StreamPath.split('/').pop()
  let liver = await live.findLiver(uuid)
  if (liver===null) return session.reject()
  await live.updataIslive({uuid,islive:true})
})

//断开连接
nms.on('donePublish', async (id, StreamPath) => {
  let uuid = StreamPath.split('/').pop()
  let liver = await live.findLiver(uuid)
  if (liver===null) return 
  await live.updataIslive({uuid,islive:false})
});