import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import { useAuth } from "../auth";

const PostModal = ({ show, onHide, modalHandle }) => {
  const [imageFile, setImageFile] = useState("");
  const [textareaText, setTextareaText] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, sherePostApi } = useAuth();

  const reset = () => {
    setImageFile("");
    setTextareaText("");
    modalHandle();
  };

  const postDataController = () => {
    setLoading(true);
    if (imageFile && textareaText) {
      sherePostApi(imageFile, textareaText, (response) => {
        if (!response.error) {
          setLoading(false);
          reset();
        }
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      {loading && (
        <SpinnerContainer>
          <div>
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        </SpinnerContainer>
      )}
      <Modal.Header closeButton>
        <Modal.Title>Create a post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <UserInfo>
          {currentUser && <img src={currentUser.photoURL} alt="" />}
          {!currentUser && <img src="images/user.svg" alt="" />}

          <div>
            {currentUser && <h2>{currentUser.displayName}</h2>}
            <span>Public</span>
          </div>
        </UserInfo>
        <TextAreaInput>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="What do you want to talk about?"
            onChange={(e) => setTextareaText(e.target.value)}
            value={textareaText}
          />
        </TextAreaInput>
        <UploadFileHere>
          {imageFile && <img src={URL.createObjectURL(imageFile)} alt="" />}
        </UploadFileHere>
      </Modal.Body>

      <Modal.Footer>
        <PostFile>
          <div>
            <label htmlFor="imageUpload">
              <i className="far fa-image"></i>
            </label>
            <input
              type="file"
              id="imageUpload"
              hidden
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <div>
            <label htmlFor="videoUpload">
              <i className="fad fa-video"></i>
            </label>
            <input type="file" id="videoUpload" hidden />
          </div>
        </PostFile>
        <Button
          variant="primary btn-sm"
          disabled={imageFile || textareaText ? false : true}
          onClick={postDataController}
        >
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const SpinnerContainer = styled.div`
  position: absolute;
  background: #5c5c5c7d;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 100;
  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ddd;
    font-size: 50px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  img {
    width: 45px;
    height: 45px;
    border-radius: 100%;
    margin-right: 8px;
    object-fit: cover;
  }
  div {
    & > h2 {
      margin: 0;
      font-size: 17px;
      margin-bottom: -5px;
    }
    & > span {
      font-size: 13px;
    }
  }
`;

const TextAreaInput = styled.div`
  & > textarea {
    border: none;
    resize: none;
    &:focus {
      box-shadow: none;
    }
  }
`;

const PostFile = styled.div`
  position: absolute;
  left: 0;
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
  div {
    width: 41px;
    height: 41px;
    &:hover {
      background-color: #ebebeb;
      border-radius: 100%;
    }
    label {
      width: 100%;
      height: 100%;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      i {
        margin: 0;
        padding: 0;
        color: #5e5e5e;
      }
    }
  }
`;

const UploadFileHere = styled.div`
  & > img {
    width: 100%;
    height: 218px;
  }
  & > video {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

export default PostModal;
