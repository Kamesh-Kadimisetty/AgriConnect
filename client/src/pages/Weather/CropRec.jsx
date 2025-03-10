import React, { useState } from "react";
import axios from "axios";

const CropRec = () => {
  const [N, setN] = useState(null);
  const [P, setP] = useState(null);
  const [K, setK] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [ph, setPh] = useState(null);
  const [rainfall, setRainfall] = useState(null);
  const [ans, setAns] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(import.meta.env.VITE_ML_API);
      const res = await axios.post(`${import.meta.env.VITE_ML_API}/predict`, {
        N,
        P,
        K,
        temperature,
        humidity,
        ph,
        rainfall,
      });

      if (res) {
        const answer = res.data.suggestion;
        console.log(answer);
        setAns(answer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-10 py-3 pb-10 bg-white rounded-lg"
      >
        <div className="flex justify-around space-x-10">
          <div>
            <div>
              <input
                value={P}
                type="number"
                placeholder="Phosphorous"
                className="py-2 my-2 text-xl bg-transparent border-b-2 outline-none placeholder:text-black"
                onChange={(e) => setP(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                value={K}
                type="number"
                placeholder="Potassium"
                className="py-2 my-2 text-xl bg-transparent border-b-2 outline-none placeholder:text-black"
                onChange={(e) => setK(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                value={N}
                type="number"
                placeholder="Nitrogen"
                className="py-2 my-2 text-xl bg-transparent border-b-2 outline-none placeholder:text-black"
                onChange={(e) => setN(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                value={ph}
                type="number"
                placeholder="pH"
                className="py-2 my-2 text-xl bg-transparent border-b-2 outline-none placeholder:text-black"
                onChange={(e) => setPh(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <input
                value={temperature}
                type="number"
                placeholder="Temperature"
                className="py-2 my-2 text-xl bg-transparent border-b-2 outline-none placeholder:text-black"
                onChange={(e) => setTemperature(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                value={humidity}
                type="number"
                placeholder="Humidity"
                className="py-2 my-2 text-xl bg-transparent border-b-2 outline-none placeholder:text-black"
                onChange={(e) => setHumidity(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                value={rainfall}
                type="number"
                placeholder="Rainfall"
                className="py-2 my-2 text-xl bg-transparent border-b-2 outline-none placeholder:text-black"
                onChange={(e) => setRainfall(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#00BF63] text-white px-3 py-2 rounded-md mt-5 mb-3"
        >
          Predict
        </button>
        <h1 className="text-center">
          {ans && (<p className="text-2xl"><b>The most suitable crop would be {ans}</b></p>)}
        </h1>
      </form>
    </div>
  );
};

export default CropRec;
