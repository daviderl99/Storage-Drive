import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import "../../styles/DropdownMenu.scss";

function DropdownMenu({ fileId }) {
  return (
    <Dropdown>
      <Dropdown.Toggle as={Click} />
      <Dropdown.Menu>
        <Dropdown.Item>Rename</Dropdown.Item>
        <Dropdown.Item onClick={() => deleteFile(fileId)}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const Click = React.forwardRef(({ children, onClick }, ref) => (
  <span
    className="three-dots-toggle"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    &#8942; {/* Unicode for vertical ellipsis */}
  </span>
));

const deleteFile = async (fileId) => {
  try {
    // await deleteDoc(doc(db, db.files, fileId));
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file: ", error);
  }
};

export default DropdownMenu;
