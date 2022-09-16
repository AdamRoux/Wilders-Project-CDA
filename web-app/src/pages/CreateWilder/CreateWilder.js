import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SectionTitle } from "../Home/Home.styled";
import { createWilder, getSchools } from "./rest";

const CreateWilder = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [schools, setSchools] = useState(null);
  const [school, setSchool] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const schools = await getSchools();
        setSchools(schools);
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    })();
  }, []);

  const submit = async () => {
    try {
      await createWilder(firstName, lastName, school);
      toast.success(`Wilder ${firstName} ${lastName} créé avec succès.`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setFirstName("");
      setLastName("");
      setSchool("");
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
      <SectionTitle>Ajouter un nouveau Wilder</SectionTitle>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await submit();
        }}>
        <label>
          Prénom
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Nom
          <br />
          <input
            type="text"
            id="firstName"
            name="lastName"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </label>
        <br />
        <label htmlFor="school">
          School
          <br />
          <select
            name="school"
            id="school"
            onChange={(event) => {
              setSchool(event.target.value);
            }}
            value={school ? school : ""}>
            <option value="" disabled>
              Select a school
            </option>
            {schools?.map((school) => (
              <option key={school.id} value={school.id}>
                {school.schoolName}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button>Valider</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreateWilder;
