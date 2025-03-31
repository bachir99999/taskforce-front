import { Button } from "primereact/button";
import "./PopupButton.css";

function PopupButton({ onClick }: any) {
  return (
    <div className="taskforce-popupbutton">
      <Button
        icon="pi pi-eye"
        onClick={onClick}
        onPointerDown={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default PopupButton;
