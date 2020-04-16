import QueryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

function useLibraryRequest(url) {
  const [result, setResult] = useState({});

  useEffect(() => {
    if (!url) {
      return;
    }

    setResult(result => ({
      ...result,
      loading: true,
    }));

    fetch(`https://cors-anywhere.herokuapp.com/${url}`)
      .then(res => res.json())
      .then(library => {
        setResult(result => ({
          ...result,
          loading: false,
          library,
        }));
      })
      .catch(error =>
        setResult(result => ({
          ...result,
          loading: false,
          error,
        })),
      );
  }, [url]);

  return result;
}

function ShelfPage() {
  const { search } = useLocation();
  const { url } = useMemo(() => QueryString.parse(search), [search]);

  const { library, loading, error } = useLibraryRequest(url);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }
  if (error) {
    return <Error>Couldn&apos;t load the shelf :(</Error>;
  }
  if (library) {
    return (
      <Container>
        <SourceLink href={url} target="_blank">
          {url}
        </SourceLink>
        <ContentContainer>
          <Profile>
            <ProfileName>{library.name}</ProfileName>
            <ProfileBio>{library.bio}</ProfileBio>
            <ProfileLink href={library.url} target="_blank">
              View Profile
            </ProfileLink>
          </Profile>
          <Lists>
            {library.lists.map(list => (
              <List key={list.name}>
                <ListName>{list.name}</ListName>
                <BookContainer>
                  {list.books.map(book => (
                    <Book key={book.name} href={book.link} target="_blank">
                      <BookTitle>{book.title}</BookTitle>
                      <BookAuthor>
                        by&nbsp;
                        {book.author}
                      </BookAuthor>
                    </Book>
                  ))}
                </BookContainer>
              </List>
            ))}
          </Lists>
        </ContentContainer>
      </Container>
    );
  }
  return null;
}

const Loading = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const Error = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: red;
`;

const Container = styled.div`
  padding: 24px;
`;

const SourceLink = styled.a.attrs({ className: 'block' })`
  padding: 8px;
  text-decoration: none;
  font-weight: normal;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  & > * + * {
    margin-left: 16px;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;

    & > * + * {
      margin-left: 8px;
    }
  }
`;

const Profile = styled.div.attrs({ className: 'block fixed' })`
  min-width: 320px;

  display: flex;
  flex-direction: column;
  padding: 8px;

  & > * + * {
    margin-top: 16px;
  }

  @media only screen and (max-width: 768px) {
    min-width: inherit;
  }
`;

const ProfileName = styled.h1``;

const ProfileLink = styled.a`
  color: black;
  font-weight: normal;
`;

const ProfileBio = styled.p`
  font-weight: normal;
`;

const Lists = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 16px;

  & > * + * {
    margin-top: 24px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 8px;
  }
`;

const ListName = styled.h2``;

const BookContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media only screen and (max-width: 1168px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Book = styled.a.attrs({ className: 'block' })`
  flex-grow: 1;
  flex-basis: 0;
  text-decoration: none;
`;

const BookTitle = styled.h3``;

const BookAuthor = styled.h4`
  font-style: italic;
  font-weight: normal;
`;

export default ShelfPage;
