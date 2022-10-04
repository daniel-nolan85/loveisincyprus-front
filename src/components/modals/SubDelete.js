import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const SubDelete = ({
  subDeleteModalIsOpen,
  setSubDeleteModalIsOpen,
  subToDelete,
  removeSub,
  loading,
  setLoading,
  loadSubs,
}) => {
  let { token } = useSelector((state) => state.user);

  const deleteSub = async (sub) => {
    setLoading(true);
    removeSub(sub.slug, token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.name} has been deleted`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setSubDeleteModalIsOpen(false);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
    },
  };

  const { name } = subToDelete;

  return (
    <Modal
      isOpen={subDeleteModalIsOpen}
      onRequestClose={() => setSubDeleteModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete {name}?</h1>
        <br />
        <button className='submit-btn' onClick={() => deleteSub(subToDelete)}>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, delete'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setSubDeleteModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default SubDelete;
