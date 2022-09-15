import { SectionTitle } from "../Home/Home.styled";

const CreateWilder = () => {
  return (
    <>
      <SectionTitle>Ajouter </SectionTitle>
      <form>
        <h1>Add Wilder</h1>
        <input type="text" name="name" id="name" />
        <label htmlFor="name">Name</label>
      </form>
    </>
  );
};

export default CreateWilder;
