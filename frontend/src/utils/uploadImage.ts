import axios, { AxiosRequestConfig } from "axios";

export async function uploadImage(fileToUpload: any) {
  const uploadFormData = new FormData()
  uploadFormData.set('file', fileToUpload)

  const formData = new FormData();

  formData.append('image', fileToUpload);
  formData.append('key', process.env.NEXT_PUBLIC_IMGBB_API_KEY as string);

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  } as AxiosRequestConfig;

  try {
    const uploadResponse = await axios.create().post(
      'https://api.imgbb.com/1/upload',
      formData,
      config
    );

    console.log("oi")
    return uploadResponse.data.data.url
  } catch (error) {
    throw new Error(error as any)
  }
}