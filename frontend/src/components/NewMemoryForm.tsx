'use client'

import { api } from "@/lib/api";
import { uploadImage } from "@/utils/uploadImage";
import Cookie from 'js-cookie';
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { MediaPicker } from "./MediaPicker";

export const NewMemoryForm = () => {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      coverUrl = await uploadImage(fileToUpload)
    }

    const token = Cookie.get('token')

    await api.post('/memories', { 
      coverUrl, 
      content: formData.get('content'),
      isPublic: formData.get('isPublic'),
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    router.push('/')
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="size-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input type="checkbox" name="isPublic" id="isPublic" value="true" className="size-4 rounded-full border-gray-400 bg-gray-700 text-purple-500 focus:ring-0" />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      >
      
      </textarea>

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  );
}
