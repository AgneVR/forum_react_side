import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import http from '../../plugins/http';
import { setUser } from '../../features/user';
import './UserProfilePhoto.scss';

const UserProfilePhoto = () => {
  const [changeUserImageOpen, setChangeUserImageOpen] = useState(false);
  const [getErrorMsg, setErrorMsg] = useState('');
  let currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const inputImageUrlValue = useRef();

  const onClickHandler = () => {
    let imageUrlValue = inputImageUrlValue.current.value;

    const image = {
      imageUrl: imageUrlValue,
    };

    http.post(image, 'change-user-photo').then((res) => {
      if (res.success) {
        dispatch(setUser(res.userInfo));
        setChangeUserImageOpen(false);
        window.location.reload();
        setErrorMsg('');
      } else {
        setErrorMsg(res.message);
      }
    });
  };

  const onCancelHandler = () => {
    setChangeUserImageOpen(false);
    setErrorMsg('');
  };

  function changeUserPhoto() {
    return (
      <Modal centered={true} isOpen={changeUserImageOpen} toggle={onCancelHandler}>
        <ModalHeader charcode='Y' toggle={() => setChangeUserImageOpen(false)}>
          Change profile picture
        </ModalHeader>
        <ModalBody>
          <p className='error-message'>{getErrorMsg}</p>
          <div className='new-title-form'>
            <input
              ref={inputImageUrlValue}
              type='text'
              placeholder='Enter image url'
              className='mb-3'
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={onClickHandler} className='create-btn-form-topic'>
            Save
          </button>
          <button className='cancel-btn-form-topic' onClick={onCancelHandler}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <div className='box-user-img'>
      {changeUserPhoto()}
      <img className='profile-img' src={currentUser && currentUser.imageUrl} alt='' />
      <div className='middle'>
        <button onClick={() => setChangeUserImageOpen(true)} className='text'>
          Change photo
        </button>
      </div>
    </div>
  );
};

export default UserProfilePhoto;
