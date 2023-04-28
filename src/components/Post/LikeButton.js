import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
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
    const { post, userInfoPerfil, vista} = props.props;
    console.log("vista:",vista)
  
    const { data: dataLikeList = [], isFetching: fetchingLike } = useLikesList(post._id);
    const [likes, setLikes] = useState(dataLikeList);
    const { data: dataLikeByUser = [], isFetching: fetchingLikeByUser } = useLikeByUser(post._id, userInfoPerfil.uid_user);
    const [starActive, setStarActive] = useState(dataLikeByUser);
    const { mutate: updateLike } = useUpdateLike(post._id);
    const [isLiked, setLikeState] = useState(false);
    const lottieRef = useRef(32,true);
    const [viewLike, setViewLike] = useState({
      viewLike: starActive || dataLikeByUser === true ? true : false,
    });
 
    useEffect( () => {
      lottieRef.current.setSpeed(2);
      lottieRef.current.goToAndStop(0,true);
      if(starActive){
        lottieRef.current.playSegments([1,90], true)
      }
      if(!starActive){
        lottieRef.current.playSegments([90,1], true)
      }
    },[starActive] )
    useEffect(() => {
      !fetchingLikeByUser && setStarActive(dataLikeByUser);
      // eslint-disable-next-line
      lottieRef.current.setSpeed(2);
      lottieRef.current.goToAndStop(0,true);
      if(starActive){
        lottieRef.current.playSegments([1,90], true)
      }
      if(!starActive){
        lottieRef.current.playSegments([90,1], true)
      }
  }, [dataLikeByUser]);
    console.log("starActive:",starActive)
    console.log("viewLike:",viewLike)
   
    
    const [animationState, setAnimationState] = useState({
      isStopped: starActive === true ? false : true, isPaused: false,
      direction: starActive === true ? 1 : -1,
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
          setViewLike({
            ...viewLike,
            viewLike: starActive === true ? false : true,
          })
          setLikeState(!isLiked);
        }}>
          <div className="animation" style={{ position: 'absolute', width:'250px', height:'250px'}}>
            <Lottie
              options={defaultOptions}
              animationData={animationData}
              lottieRef={lottieRef}
              loop={false}
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