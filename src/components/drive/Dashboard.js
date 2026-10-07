import React from "react";
import Navbar from "./Navbar";
import { useParams, useLocation } from "react-router-dom";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import Folder from "./Folder";
import File from "./File";
import "../../styles/main.scss";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state?.folder,
  );

  return (
    <>
      <Navbar />
      <main className="drive-page">
        <header className="drive-heading">
          <div>
            <span className="eyebrow">YOUR SPACE</span>
            <h1>{folder ? folder.name : "My Drive"}</h1>
          </div>
          <div className="drive-actions">
            <AddFileButton currentFolder={folder} />
            <AddFolderButton currentFolder={folder} />
          </div>
        </header>
        <div className="drive-toolbar">
          <FolderBreadcrumbs currentFolder={folder} />
        </div>
        <div className="dashboard-body">
          {childFolders.length > 0 && (
            <section className="drive-section">
              <div className="section-heading">
                <h2 className="section-label">Folders</h2>
                <span className="item-count">{childFolders.length}</span>
              </div>
              <div className="items-grid">
                {childFolders.map((childFolder) => (
                  <Folder key={childFolder.id} folder={childFolder} />
                ))}
              </div>
            </section>
          )}
          {childFiles.length > 0 && (
            <section className="drive-section">
              <div className="section-heading">
                <h2 className="section-label">Files</h2>
                <span className="item-count">{childFiles.length}</span>
              </div>
              <div className="items-grid">
                {childFiles.map((childFile) => (
                  <File key={childFile.id} file={childFile} />
                ))}
              </div>
            </section>
          )}
          {childFolders.length === 0 && childFiles.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon" aria-hidden="true">
                <span />
              </div>
              <h2>This folder is ready for something new</h2>
              <p>Upload a file or create a folder to get started.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
