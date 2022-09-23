import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import blankProfilePicture from "../../media/blank-profile-picture.png";
import { WilderType } from "../../types";
import CloseButton from "../CloseButton/CloseButton";
import Dialog from "../Dialog/Dialog";
import Skill from "../Skill/Skill";
import { deleteWilder } from "./rest";
import {
  Card,
  CardImage,
  CardParagraph,
  CardSecondaryTitle,
  CardSkillList,
  CardTitle,
} from "./Wilder.styled";

type PropType = Omit<WilderType, "school"> & { onDelete: () => void };

const Wilder = ({ firstName, lastName, skills, id, onDelete }: PropType) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const onCloseButtonClick = () => {
    setShowDeleteConfirmation(true);
  };

  const onDeleteConfirmation = async () => {
    try {
      await deleteWilder(id);
      onDelete();
      toast.success("Wilder supprimé avec succès.");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card>
      <CardImage src={blankProfilePicture} alt="Jane Doe Profile" />
      <CardTitle>
        {firstName} {lastName}
      </CardTitle>
      <CardParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </CardParagraph>
      <CardSecondaryTitle>Wild Skills</CardSecondaryTitle>
      <CardSkillList>
        {skills.map((skill) => (
          <li key={skill.id}>
            <Skill skillName={skill.skillName} numberOfVotes={1} />
          </li>
        ))}
      </CardSkillList>
      <CloseButton onClick={onCloseButtonClick} />
      {showDeleteConfirmation && (
        <Dialog
          onCancel={() => {
            setShowDeleteConfirmation(false);
          }}
          onConfirm={() => {
            setShowDeleteConfirmation(false);
            onDeleteConfirmation();
          }}
        />
      )}
      <ToastContainer />
    </Card>
  );
};

export default Wilder;
