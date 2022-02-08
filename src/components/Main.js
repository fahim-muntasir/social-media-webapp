import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../auth/index";
import PostModal from "./PostModal";

const Main = () => {
  const [show, setShow] = useState(false);
  const [allPost, setAllPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentUser, getDataApi } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setLoading(true);
    getDataApi((response) => {
      setAllPost(response.docs);
      setLoading(false);
    });
  }, [getDataApi]);

  return (
    <>
      <TopCard>
        <UploadContentBox>
          <div>
            {currentUser && <img src={currentUser.photoURL} alt="" />}
            {!currentUser && <img src="images/mypic.jpg" alt="" />}
          </div>
          <PostBox onClick={handleShow}>
            <span>Start a post</span>
          </PostBox>
          <PostModal
            show={show}
            onHide={handleClose}
            modalHandle={handleClose}
          />
        </UploadContentBox>
        <AllUploadController>
          <UploadWrap>
            <Item>
              <span>Photo</span>
            </Item>
            <Item>
              <span>Video</span>
            </Item>
            <Item>
              <span>Event</span>
            </Item>
            <Item>
              <span>Write article</span>
            </Item>
          </UploadWrap>
        </AllUploadController>
      </TopCard>

      <AllUploadContent>
        {loading && (
          <SpinnerContainer>
            <div>
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          </SpinnerContainer>
        )}

        {!loading &&
          allPost.map((doc, index) => (
            <SingleContent key={Math.random() * index}>
              <ContentTopNav>
                <img
                  src={doc.data().author.imageUrl}
                  alt="user"
                  width={"100px"}
                />
                <div>
                  <a href="@">
                    <h2>{doc.data().author.userName}</h2>
                  </a>
                  <span>CEO at FM</span>

                  <span>
                    {moment(doc.data().author.date.toDate()).fromNow()}
                  </span>
                </div>
              </ContentTopNav>
              <div>
                <PostDic>
                  <p>{doc.data().description && doc.data().description}</p>
                </PostDic>
                <PostFile>
                  {doc.data().shereImage && (
                    <img
                      src={doc.data().shereImage}
                      alt="user"
                      width={"500px"}
                    />
                  )}
                </PostFile>
              </div>
              <PostReactSection>
                <LikeCommentCounter>
                  <div>
                    <a href="@">100 Like</a>
                  </div>
                  <div>
                    <a href="@">10 comments</a>
                  </div>
                </LikeCommentCounter>
                <PostReactController>
                  <ReactWrap>
                    <SingleReact>Like</SingleReact>
                    <SingleReact>Comment</SingleReact>
                    <SingleReact>Share</SingleReact>
                    <SingleReact>Send</SingleReact>
                  </ReactWrap>
                </PostReactController>
              </PostReactSection>
            </SingleContent>
          ))}
      </AllUploadContent>
    </>
  );
};

const SpinnerContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 40px;
  color: #c3c3c3;
`;

const TopCard = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px 15px;
  box-sizing: border-box;
`;

const UploadContentBox = styled.div`
  display: grid;
  grid-template-columns: 70px auto;
  align-items: center;
  margin-bottom: 10px;
  div > img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 100%;
  }
`;

const PostBox = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  color: #6c6c6c;
  padding: 10px 15px;
  border-radius: 20px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background-color: rgb(241, 241, 241);
  }
`;

const AllUploadController = styled.div``;

const UploadWrap = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
`;

const Item = styled.li`
  color: #6c6c6c;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 17px;
  display: flex;
  &:hover {
    background-color: #e5e3e387;
    cursor: pointer;
  }
`;

const AllUploadContent = styled.div``;

const SingleContent = styled.div`
  background-color: white;
  border-radius: 10px;
  margin-top: 15px;
  padding: 10px;
`;

const ContentTopNav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    margin-right: 8px;
    border-radius: 100%;
    object-fit: contain;
  }
  div > a {
    text-decoration: none;
    h2 {
      margin: 0;
      font-size: 18px;
      color: black;
    }
  }

  div > span {
    font-size: 13px;
    color: #505050;
    display: block;
    margin-bottom: -2px;
    &:last-child {
      font-size: 12px;
    }
  }
`;

const PostDic = styled.div`
  p {
    font-size: 18px;
  }
`;

const PostFile = styled.div`
  margin-bottom: 10px;
  img,
  video {
    width: 100%;
  }
`;

const PostReactSection = styled.div``;

const LikeCommentCounter = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  margin-bottom: 10px;
  div > a {
    text-decoration: none;
    color: #505050;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PostReactController = styled.div``;

const ReactWrap = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
`;

const SingleReact = styled.li`
  padding: 10px 17px;
  color: #505050;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
  box-sizing: border-box;
  &:hover {
    background-color: #ebebeb;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 24% 45% 24%;
    justify-content: space-between;
  }
`;

export default Main;
