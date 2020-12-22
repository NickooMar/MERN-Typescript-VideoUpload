import axios from 'axios';
import { Video } from './Video';

const API = 'http://localhost:4000'

export const getVideos = async() => {
    return await axios.get<Video[]>(`${API}/videos`)
}

export const createVideo = async (video: Video) => {
    return await axios.post(`${API}/videos`, video)
} 

export const getVideo = async (id: string) => {
    return await axios.get<Video>(`${API}/videos/${id}`)
} 

export const updateVideo = async (id: string, video: Video) => { //Toma un id hace una peticion al id y a su vez envía el video actualizado
    return await axios.put<Video>(`${API}/videos/${id}`, video) //Por eso aparece video aqui debajo 
} 


export const deleteVideo = async (id: string) => {
    return await axios.delete<Video>(`${API}/videos/${id}`)
} 