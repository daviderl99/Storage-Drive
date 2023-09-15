import React from "react";
import { Breadcrumb } from "react-bootstrap";

export default function FolderBreadcrumbs({ currentFolder }) {
  return (
    <Breadcrumb
      className="flex-grow-1"
      listProps={{ className: "bg-white m-0" }}
    >
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          style={{ maxWidth: "200px" }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}
