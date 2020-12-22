import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Video } from "./Video";
import * as VideoService from "./VideoService";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>; //Defino que tipo de elementos se usaran en el inputChange.

interface Params {
  id: string;
}

function VideoForm() {
  const history = useHistory();
  const params = useParams<Params>();
  console.log(params);

  //Captura inputs:

  const initialState = {
    title: "",
    description: "",
    url: "",
  };

  const [video, setVideo] = useState<Video>(initialState);

  const handleInputChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value }); //Cada vez que yo tipee algo, cada elemento se modificara dependiendo lo que yo ponga.
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!params.id) { //Si el params.id no existe entonces ejecuta crear.
      await VideoService.createVideo(video);
      toast.success("New Video Added");
      setVideo(initialState);
    } else {
      await VideoService.updateVideo(params.id, video) //De videoService utiliza el metodo de updateVideo que necesita el params.id y el video que es el estado.
    }

    history.push("/");
  };

  const getVideo = async (id: string) => {
    const res = await VideoService.getVideo(id);
    const { title, description, url } = res.data; //Extraigo los valores de la ruta getVideo
    setVideo({ title, description, url }); //Cambio los valores de la constante initialState
  };

  useEffect(() => {
    if (params.id) getVideo(params.id); //si existe el params.id solicita la ruta get videos, con todos los datos del video.
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New Video</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="write a title"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.title}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="url"
                  placeholder="https://somesite.com"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.url}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="description"
                  rows={3}
                  className="form-control"
                  placeholder="Write a description"
                  onChange={handleInputChange}
                  value={video.description}
                ></textarea>
              </div>

              {params.id ? (
                <button className="btn btn-info">Update Video</button>
              ) : (
                <button className="btn btn-primary">Create Video</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoForm;



