import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from './animation.json';
import { useLikesList, useLikeByUser, useUpdateLike, } from '../../hooks';

const ButtonWrapper = styled.button`
  --size: 35px;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 33px;
  background-color: #fff;
  border: 0;
  padding: 0;
  cursor: pointer;
  outline: 0;
  border-radius: 100%;
  .animation {
    pointer-events: none;
  }
`;

export const LikeButton = (props) => {
    const { post} = props.props;

    const {userInfoPerfil} = props.props;
  
    const { data: dataLikeList = [], isFetching: fetchingLike, isLoading: loadingLike } = useLikesList(post._id);
    const [likes, setLikes] = useState(dataLikeList);
    const { data: dataLikeByUser = [], isFetching: fetchingLikeByUser, isLoading: loadingLikeByUser } = useLikeByUser(post._id, userInfoPerfil.uid_user);
    const [starActive, setStarActive] = useState(dataLikeByUser);
    const { mutate: updateLike } = useUpdateLike(post._id);
    const [isLiked, setLikeState] = useState(false);
    const [animationState, setAnimationState] = useState({
      isStopped: starActive === true ? false : true, isPaused: false,
      direction: starActive === true ? 1 : 1,
    });
    const defaultOptions = {
      loop: false,
      autoplay: false, 
      animationData: animationData,
      speed: 2,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    useEffect(() => {
        !fetchingLike && setLikes(dataLikeList);
        // eslint-disable-next-line
    }, [dataLikeList]);
    
    return (
      <>
        <ButtonWrapper onClick={() => {
          const reverseAnimation = -1;
          const normalAnimation = 1;
          const likeUser = { 
            uid_user: userInfoPerfil.uid_user, 
            id_Post: post._id,
            action: `reacciono a tu publicación`,
            uid_creator: post.uid_user,
            type: 'like',
            career: post.career,
            starActive
            };
            updateLike(likeUser, {
                onSuccess: ({ data }) => {
                    setStarActive(data);
                }
            });

            
          setAnimationState({
            ...animationState,
            isStopped: false,
            direction: starActive === true ? reverseAnimation : normalAnimation,
          })
          setLikeState(!isLiked);
        }}>
          <div className="animation">
            <Lottie
              options={defaultOptions}
              width={270}
              height={270}
              direction={animationState.direction}
              isStopped={animationState.isStopped}
              isPaused={animationState.isPaused}/>
          </div>
        </ButtonWrapper>
        <span style={{
                            position: "absolute",
                            left: "30px",
                            color: "#858585"
                        }}>
          {likes}
        </span>
      </>
    );
  }