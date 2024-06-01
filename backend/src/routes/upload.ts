// import { randomUUID } from "crypto";
// import { FastifyInstance } from "fastify";
// import { createWriteStream } from "fs";
// import { extname, resolve } from "path";
// import { pipeline } from "stream";
// import { promisify } from "util";
// import fs from 'fs';
// import axios, { AxiosRequestConfig } from "axios";

// const pump = promisify(pipeline)

// export async function uploadRoutes(app: FastifyInstance){ 
//   app.post('/upload', async (request, reply) => {
//     const upload = await request.file({
//       limits: {
//         fileSize: 5_242_880, // 5mb
//       }
//     })

//     if (!upload) {
//       return reply.status(400).send()
//     }

//     const mimeTypeRegex = /^(image|video)\/[a-zA-z]+/
//     const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

//     if (!isValidFileFormat) {
//       return reply.status(400).send()
//     }

//     const fileId = randomUUID()
//     const extension = extname(upload.filename)
    
//     const fileName = fileId.concat(extension)

//     const formData = new FormData();

//     formData.append('image', upload.file as unknown as string, fileName)
//     formData.append('key', process.env.IMGBB_API_KEY as string);

//     const config = {
//       headers: { 'content-type': 'multipart/form-data' },
//     } as AxiosRequestConfig;

//     try {
//       const response = await axios.post(
//         'https://api.imgbb.com/1/upload',
//         formData,
//         config
//       );
//       reply.send({ fileUrl: response.data.data.url });
//     } catch (error: any) {
//       console.log(error.response.data.error)
//       reply.status(400).send()
//     }
//   })
// }