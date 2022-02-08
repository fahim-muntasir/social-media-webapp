import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../auth";
import MainSection from "./Main";

const Home = () => {
  const { currentUser, logOut } = useAuth();
  const navigation = useNavigate();

  const logoutHandlear = () => {
    setTimeout(async () => {
      await logOut();
      navigation("/");
    }, 1000);
  };

  return (
    <>
      <Header>
        <Container>
          <Nav>
            <NavBrand>
              <a href="/">Media</a>
            </NavBrand>
            <UserControl>
              {currentUser && (
                <>
                  <span>{currentUser.displayName}</span>
                  <img src={currentUser.photoURL} alt="" />
                </>
              )}
              {!currentUser && (
                <>
                  <span>Demo</span>
                  <img src="images/user.svg" alt="" />
                </>
              )}
              <UserHandlear>
                <ul>
                  <li onClick={logoutHandlear}>Sign out </li>
                </ul>
              </UserHandlear>
            </UserControl>
          </Nav>
        </Container>
      </Header>

      <Container>
        <HomeWrap>
          <Left>
            <UserCard>
              <UserCoverImage>
                <UserProfileImage>
                  {currentUser && <img src={currentUser.photoURL} alt="" />}
                  {!currentUser && <img src="images/photo.svg" alt="" />}
                </UserProfileImage>
              </UserCoverImage>
              <div>
                <InfoWrap>
                  <Info>
                    <a href="@">Flowers 10</a>
                  </Info>
                  <Info>
                    <a href="@">Flowing 1</a>
                  </Info>
                </InfoWrap>
              </div>
            </UserCard>
          </Left>
          <Main>
            {/* main section component  */}
            <MainSection />
          </Main>
          <Right>
            <AllActiveUsers>
              <TitleDiv>
                <h1>Your active friends</h1>
                <img src="images/feed-icon.svg" alt="feed icon" />
              </TitleDiv>
              <UserWrap>
                <User>
                  <a href="@">
                    <UserInfo>
                      <img src="images/mypic.jpg" alt="user" />
                      <div>
                        <h2>Fahim muntasir</h2>
                        <span>CEO at FM's</span>
                      </div>
                    </UserInfo>
                  </a>
                </User>
                <User>
                  <a href="@">
                    <UserInfo>
                      <img src="images/mypic.jpg" alt="user" />
                      <div>
                        <h2>Fahim muntasir</h2>
                        <span>CEO at FM's</span>
                      </div>
                    </UserInfo>
                  </a>
                </User>
              </UserWrap>
            </AllActiveUsers>
          </Right>
        </HomeWrap>
      </Container>
    </>
  );
};

const Container = styled.section`
  width: 1128px;
  margin: auto;
  @media (max-width: 1200px) {
    width: 90%;
  }
`;

const HomeWrap = styled.div`
  width: 100%;
  display: grid;
  /* grid-template-columns: 25% 45% 25%; */
  grid-template-columns: repeat(12, 1fr);
  justify-content: space-between;
`;

const Left = styled.div`
  grid-column: 1 / 4;
  margin-right: 10px;
  @media (max-width: 960px) {
    grid-column: 3 / 11;
    grid-row: 1 / 3;
    margin: 0 0 15px 0;
  }
  @media (max-width: 900px) {
    grid-column: 2 / 12;
  }
  @media (max-width: 600px) {
    grid-column: 1 / 13;
  }
`;

const Main = styled.div`
  grid-column: 4 / 10;
  margin: 0 10px;
  @media (max-width: 960px) {
    grid-column: 3 / 11;
    margin: 0;
  }
  @media (max-width: 900px) {
    grid-column: 2 / 12;
  }
  @media (max-width: 600px) {
    grid-column: 1 / 13;
  }
`;

const Right = styled.div`
  grid-column: 10 / 13;
  margin-left: 10px;
  @media (max-width: 960px) {
    grid-column: 3 / 11;
    grid-row: 3 / 5;
    margin: 0 0px 15px 0;
  }
  @media (max-width: 900px) {
    grid-column: 2 / 12;
  }
  @media (max-width: 600px) {
    grid-column: 1 / 13;
  }
`;

const Header = styled.header`
  background-color: #3b5998;
  padding: 8px 0;
  margin-bottom: 30px;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBrand = styled.div`
  width: 100px;
  a {
    font-size: 25px;
    color: white;
    text-decoration: none;
  }
`;

const UserHandlear = styled.div`
  position: absolute;
  background-color: white;
  bottom: -42px;
  left: 4px;
  width: 200px;
  box-shadow: 0px 0px 3px 1px #9595956e;
  display: none;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    li {
      box-sizing: border-box;
      padding: 10px 15px;
      font-size: 18px;
      &:hover {
        background-color: #ededed;
      }
    }
  }
`;

const UserControl = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  border: 1px dashed #ddd;
  border-radius: 10px;
  padding: 3px 15px;
  position: relative;
  &:hover {
    background-color: #4969abab;
    cursor: pointer;
  }

  &:hover ${UserHandlear} {
    display: block;
  }

  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 100%;
  }
  span {
    font-size: 20px;
    margin-right: 10px;
    color: white;
  }
`;

const UserCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 10px;
  background-color: white;
`;

const UserCoverImage = styled.div`
  background-image: url("images/card-bg.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  padding-top: 76px;
  display: flex;
  justify-content: center;
  margin-bottom: 53px;
`;

const UserProfileImage = styled.div`
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    border-radius: 100%;
  }
`;

const InfoWrap = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: 10px;
`;

const Info = styled.li`
  margin-bottom: 5px;
  a {
    text-decoration: none;
    color: #1c1c1c;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AllActiveUsers = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px 8px;
  border-radius: 10px;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin-bottom: 10px;
  h1 {
    font-size: 19px;
    color: #202020;
    margin: 0;
  }
`;

const UserWrap = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const User = styled.li`
  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 100%;
  }
  a {
    text-decoration: none;
  }

  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    background-color: #efefef;
  }
`;

const UserInfo = styled.div`
  display: flex;
  div {
    margin-left: 5px;
    color: #202020;
    h2 {
      margin: 0;
      font-size: 17px;
      color: #505050;
    }
    span {
      font-size: 13px;
      color: #505050;
    }
  }
`;

export default Home;
