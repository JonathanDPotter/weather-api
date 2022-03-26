import React, { FC, FormEvent, useState } from "react";
import { createPortal } from "react-dom";
// utils
import api from "../../api";
import { useAppDispatch } from "../../store/hooks";
import { setZipCoords } from "../../store/slices/locationSlice";

interface Iprops {
  closeModal: () => void;
  setUseZipCoords: () => void;
}

const LocationModal: FC<Iprops> = ({ closeModal, setUseZipCoords }) => {
  // get portal for modal render
  const portal = document.getElementById("portal");

  const initialFormState = { zipcode: "" };
  const [formState, setFormState] = useState(initialFormState);
  const { zipcode } = formState;

  const dispatch = useAppDispatch();

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setFormState({ ...formState, [id]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    api.geoapify
      .getCoordsFromZip(zipcode)
      .then((result) => result && dispatch(setZipCoords(result)));
    setUseZipCoords();
    closeModal();
  };

  if (portal) {
    return createPortal(
      <div className="modal-back">
        <div className="modal-fore">
          <form action="submit" onSubmit={handleSubmit}>
            <div className="label-input">
              <label htmlFor="zipcode">Zip Code</label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                onChange={handleChange}
                value={zipcode}
              />
              <input type="submit" value="Go!" />
            </div>
          </form>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>,
      portal
    );
  } else {
    return <></>;
  }
};

export default LocationModal;
